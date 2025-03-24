<template>
  <form
    id="sysprops"
    name="sysprops"
    method="POST"
    @submit.prevent="saveManualDateTime($event)"
    novalidate
  >
    <!-- <div class="row mb-2">
      <div class="col">
        <tmg-textbox
          label="System ID"
          id="systemid"
          type="text"
          readonly
          v-model="$store.state.properties.unitId"
        ></tmg-textbox>
      </div>
    </div> -->
    <div class="row mb-4">
      <div class="col">
        <div class="form-group">
          <label for="fluidTypeSelect" class="form-label label-text">
            Fluid Type
          </label>
          <span
            v-if="!rules.fluidType(selectedFluidType)"
            class="invalid-feedback d-inline ms-1"
          >
            Please select a fluid type
          </span>
          <select
            :class="{
              'is-invalid': !rules.fluidType(selectedFluidType),
            }"
            class="form-select form-select-lg"
            id="fluidTypeSelect"
            v-model="selectedFluidType"
            @focus="$emit('openKeyboard', false)"
          >
            <option
              v-for="([prop, value], index) in Object.entries(
                $store.state.fluids
              )"
              :key="index"
              :value="prop"
              :disabled="prop === 'UNDEFINED'"
              :selected="selectedFluidType === prop"
            >
              {{
                prop === "UNDEFINED" || value === ""
                  ? "Select a fluid type"
                  : value
              }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col">
        <div class="form-group">
          <label for="timeZoneSelect" class="form-label label-text">
            Time Zone
          </label>
          <span
            v-if="!rules.timeZone(selectedTimeZone)"
            class="invalid-feedback d-inline ms-1"
          >
            Please select a time zone
          </span>
          <select
            :class="{
              'is-invalid': !rules.timeZone(selectedTimeZone),
            }"
            class="form-select form-select-lg"
            id="timeZoneSelect"
            v-model="selectedTimeZone"
            @focus="$emit('openKeyboard', false)"
          >
            <option value="" disabled :selected="selectedTimeZone === ''">
              Select a time zone
            </option>
            <option
              v-for="(item, index) in timeZones"
              :key="index"
              :value="item.text"
              :selected="selectedTimeZone === item.text"
            >
              {{ item.text }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="ntpSwitch"
            name="darkmode"
            v-model="ntp"
            :value="this.ntp ? 'yes' : 'no'"
            @click="toggleNtp()"
          />
          <label class="form-label label-text" for="ntpSwitch">
            Set time automatically (NTP)
          </label>
        </div>
      </div>
    </div>
    <div v-if="ntp">
      <div class="row">
        <div class="col">
          <tmg-textbox
            id="primaryNTP"
            type="text"
            label="Primary NTP Server"
            v-model="NTPServer.primaryNTP"
            :showFocus="activeElementId === 'primaryNTP'"
            :valid="rules.ntp(NTPServer.primaryNTP)"
            validMessage="Invalid NTP server"
            @input="onInput($event)"
            @focus="onInputFocus($event)"
          ></tmg-textbox>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <tmg-textbox
            id="secondaryNTP"
            type="text"
            label="Secondary NTP Server"
            v-model="NTPServer.secondaryNTP"
            :showFocus="activeElementId === 'secondaryNTP'"
            @input="onInput($event)"
            @focus="onInputFocus($event)"
          ></tmg-textbox>
        </div>
      </div>
    </div>
    <div v-else class="row gx-5">
      <div class="col-6">
        <tmg-textbox
          id="date"
          placeholder="____-__-__"
          type="date"
          label="Date"
          v-model="dateEntered"
          :valid="rules.dateEntered(dateEntered)"
          validMessage="Invalid date entered"
          @focus="$emit('openKeyboard', false)"
        ></tmg-textbox>
      </div>
      <div class="col-6">
        <div class="mb-3">
          <label class="form-label text-white"> Time </label>
          <vue-timepicker
            format="hh:mm A"
            v-model="timeValue"
            advanced-keyboard
            hour-label="Hour"
            minute-label="Minute"
            apm-label=" "
            auto-scroll
            :input-class="[
              'form-control form-control-lg w-100 text-white mb-1',
              showFocus ? 'focus' : '',
            ]"
            input-width="100%"
            drop-direction="up"
            hide-clear-button
            fixed-dropdown-button
            @open="showFocus = true"
            @close="showFocus = false"
          >
            <template v-slot:dropdownButton>
              <span
                class="bi-clock d-flex align-items-center justify-content-center"
              ></span>
            </template>
          </vue-timepicker>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between mt-3 mb-2">
      <tmg-button
        type="submit"
        btn-style="primary"
        spinner-size="small"
        :disabled="loading"
        :loading="loading"
      >
        Apply
      </tmg-button>
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="$emit('show', false)"
      >
        Cancel
      </button>
    </div>
    <slot name="keyboard"></slot>
  </form>
</template>

<script>
import TmgTextbox from "@/components/TmgTextbox.vue";
import TmgButton from "@/components/TmgButton.vue";
import keyboard from "@/mixins/keyboard.js";
import validation from "@/mixins/validationRules.js";
import timeZones from "@/mixins/timeZones.js";
import { getSystemProps, setNTP, setFluid } from "@/api";

/**
 * The *.vue file with CSS included
 * https://github.com/phoenixwong/vue2-timepicker/blob/master/README.md
 **/
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";

export default {
  name: "SystemPropertiesDialog",
  components: { TmgTextbox, TmgButton, VueTimepicker },
  mixins: [keyboard, validation, timeZones],
  data() {
    return {
      ntp: false,
      selectedFluidType: "",
      dateEntered: "",
      timeValue: {
        hh: "",
        mm: "",
        A: "",
      },
      showFocus: false,
      selectedTimeZone: "",
      NTPServer: {
        primaryNTP: "",
        secondaryNTP: "",
      },
      loading: false,
      restoreDefaultData: true,
      rules: {
        dateEntered: (d) => {
          if (!this.formSubmitted) {
            return true;
          }

          /*
           * Date Regex makes sure the date string is entered in the proper
           * YYYY-MM-DD format and is close to resembling a real date.
           *
           * The rule is as follows:
           * 1. the first 4 characters must be numbers from 0-9 each
           * 2. the 5th character must a '-'
           * 3. the next two characters have the following rules:
           *   a. if the first character is a '0', then the next character
           *      must be a number from 1-9
           *   b. otherwise the first character must be '1' and the next
           *      character must be a number from 0-2
           * 4. the eighth character must be a '-'
           * 5. the final two characters have the following rules:
           *   a. if the first character is a '0', then the next character
           *      must be a number from 1-9
           *   b. if the first character is either a '1' or '2', then the
           *      next character must be a number from 0-9
           *   c. otherwise the first character must be '3' and the next
           *      character must be a number that is either 0 or 1
           */
          const dateRegex =
              /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])$/iu,
            isFormatted = dateRegex.test(d);

          if (isFormatted) {
            const [year, month, day] = d.split("-").map((p) => parseInt(p, 10)),
              testDate = new Date(d);

            // After testing that the date string is formatted correctly
            // and that when split, parts has a length of 3,
            // We test each piece matches with test date.
            // This is because 2022-02-31 is valid according to the regex,
            // but is not a real day for the month of February.
            return (
              year === testDate.getUTCFullYear() &&
              month === testDate.getUTCMonth() + 1 &&
              day === testDate.getUTCDate()
            );
          }

          return false;
        },
        timeEntered: (t) => {
          if (!this.formSubmitted) {
            return true;
          }

          const timeRegex = /^(?:[0-1][0-9]|2[0-3]):(?:[0-5][0-9])$/iu,
            isFormatted = timeRegex.test(t);

          if (isFormatted) {
            const [hours, minutes] = t.split(":").map((p) => parseInt(p, 10));
            return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
          }

          return false;
        },
        timeZone: (z) => {
          return !this.formSubmitted || z !== "";
        },
        ntp: (addr) => {
          return !this.formSubmitted || addr !== "";
        },
        fluidType: (f) => {
          return !this.formSubmitted || (f !== "" && f !== "UNDEFINED");
        },
      },
    };
  },
  computed: {
    formattedTime() {
      // converting into 24 hour format
      let tempHr = this.timeValue.hh;

      if (this.timeValue.A == "AM" && this.timeValue.hh == "12") {
        tempHr = "00";
      } else if (this.timeValue.A == "PM" && this.timeValue.hh != "12") {
        tempHr = (+this.timeValue.hh + 12).toString(10);
      }

      return `${tempHr}:${this.timeValue.mm}`;
    },
    formattedDateTime() {
      return `${this.dateEntered} ${this.formattedTime}`;
    },
    isValid() {
      return (
        this.rules.timeZone(this.selectedTimeZone) &&
        ((!this.ntp &&
          this.rules.dateEntered(this.dateEntered) &&
          this.rules.timeEntered(this.formattedTime)) ||
          (this.ntp && this.rules.ntp(this.NTPServer.primaryNTP)))
      );
    },
  },
  methods: {
    async saveManualDateTime() {
      this.formSubmitted = true;
      this.$emit("openKeyboard", false);

      if (this.isValid) {
        this.loading = true;

        const props = Object.create(null);

        props.ntp = this.ntp;
        props.timezone = this.selectedTimeZone;

        if (!this.ntp) {
          props.datetime = this.formattedDateTime;
        } else {
          props.primary = this.NTPServer.primaryNTP;
          props.secondary = this.NTPServer.secondaryNTP;
        }

        const success = (
          await Promise.allSettled([
            setNTP(props).then(
              (val) => {
                if (val) {
                  this.$store.commit("setNTPServers", {
                    primary: this.NTPServer.primaryNTP,
                    secondary: this.NTPServer.secondaryNTP,
                  });
                  this.$store.commit("setTimezone", this.selectedTimeZone);
                  this.$store.commit("setNTP", this.ntp ? "yes" : "no");
                }

                return val;
              },
              () => false
            ),
            setFluid(this.selectedFluidType).then(
              (val) => {
                if (val) {
                  this.$store.commit("setFluidType", this.selectedFluidType);
                }

                return val;
              },
              () => false
            ),
          ])
        )
          // Promise.allSettled returns an array
          // Need to test that every network request
          // was completed successfully
          .every((result) => result.status === "fulfilled" && result.value);

        if (success) {
          this.restoreDefaultData = false;
          this.formSubmitted = false;

          this.$emit("show", false);
        }

        this.loading = false;
      }
    },
    toggleNtp() {
      this.ntp = !this.ntp;
      this.formSubmitted = false;
      this.$emit("openKeyboard", false);
    },
    async loadProperties() {
      const res = await getSystemProps();
      this.$store.commit("setProperties", res);

      this.fetchSysProps();
    },
    fetchSysProps() {
      const props = this.$store.state.properties,
        now = new Date(),
        [date, fullTime] = now.toISOString().split("T", 2),
        [hours, minutes] = fullTime.split(":", 2).map((p) => parseInt(p, 10)),
        offset = now.getTimezoneOffset() / 60,
        localHours = hours - offset,
        hh =
          localHours < 0
            ? localHours + 24
            : localHours >= 24
            ? localHours - 24
            : localHours;

      if (props !== null) {
        this.ntp = props.NTP === "no" ? false : true;

        this.NTPServer.primaryNTP = props?.ntpServers?.[0] ?? "";
        this.NTPServer.secondaryNTP = props?.ntpServers?.[1] ?? "";

        this.selectedTimeZone =
          props?.Timezone ||
          Intl.DateTimeFormat(navigator.language).resolvedOptions().timeZone;
      }

      this.dateEntered = date;
      this.timeValue.hh = (hh > 12 ? hh - 12 : hh === 0 ? 12 : hh)
        .toString(10)
        .padStart(2, "0");
      this.timeValue.mm = `${minutes.toString(10).padStart(2, "0")}`;
      this.timeValue.A = `${hh < 12 ? "AM" : "PM"}`;

      this.selectedFluidType = props?.fluid || "UNDEFINED";

      if (
        !this.timeZones.findIndex((tz) => tz.text === this.selectedTimeZone)
      ) {
        this.selectedTimeZone = "";
      }

      if (!Object.hasOwn(this.$store.state.fluids, this.selectedFluidType)) {
        this.selectedFluidType = "UNDEFINED";
      }
    },
    onChange(input) {
      if (this.activeElementId) {
        this.NTPServer[this.activeElementId] = input;
      }
    },
    onKeyPress(button) {
      if (button === "{enter}") {
        this.saveManualDateTime();
      }
    },
    restoreDefaults() {
      if (this.restoreDefaultData) {
        this.fetchSysProps();
      }

      this.restoreDefaultData = true;
      this.formSubmitted = false;
    },
  },
  created() {
    this.loadProperties();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/globalvars.scss";

::v-deep .vue__time-picker .dropdown,
::v-deep .vue__time-picker-dropdown {
  background-color: $dark-blue;

  ::-webkit-scrollbar {
    width: 1em;
    height: 1em;
  }

  ::-webkit-scrollbar-button {
    background: none;
  }

  &.drop-up {
    bottom: calc(1.5em + 1.25rem + 4px);
    border: 1px solid $dark-blue;
    border-bottom-width: 0;
  }

  ul {
    scrollbar-color: #2d3655 #15182d;
    scrollbar-width: thin;
  }

  ul li {
    color: #fff;

    &:not(.hint):not([disabled]):hover,
    &:not(.hint):not([disabled]):focus,
    &:not(.hint):not([disabled]):hover,
    &:not(.hint):not([disabled]):focus {
      background-color: $med-blue-lt;
      color: #fff;
    }

    &:not([disabled]).active,
    &:not([disabled]).active:hover,
    &:not([disabled]).active:focus {
      background-color: grey;
    }
  }
}

::v-deep .vue__time-picker {
  .controls {
    bottom: 0.25rem;

    .has-custom-btn {
      color: #fff;
      font-size: 1.125rem;
      margin-left: 24px;
      margin-right: 0.75rem;
      padding: 2px 3px;
    }
  }

  input.display-time {
    background-color: $dark-blue;
    border: 1px solid $dark-blue;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    height: revert;

    &:focus,
    &.focus {
      border-color: #86b7fe;
    }

    &.form-control-lg {
      font-size: 1.25rem;
      padding: 0.5rem 1rem;
    }

    &.form-control-lg ~ .dropdown {
      font-size: 1.25rem;
    }

    &.form-control-lg ~ .controls {
      .has-custom-btn {
        font-size: 1.375rem;
        margin-right: 1rem;
      }
    }
  }
}
</style>
