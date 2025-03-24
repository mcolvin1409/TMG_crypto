<template>
  <form
    id="alarmSettings"
    name="alarmSettings"
    method="POST"
    @submit.prevent="saveThresholds($event)"
    novalidate
  >
    <div class="row">
      <div class="col">
        <fieldset class="border px-4 border-secondary">
          <legend class="float-none w-auto px-2 fs-5">Tank Oil Temp</legend>
          <tmg-textbox
            id="tankOilTempMajorThreshold"
            type="number"
            label="Oil Temperature Major (°C)"
            min="0"
            max="90"
            step="1"
            v-model="oilTempThreshold.tankOilTempMajorThreshold"
            :showFocus="activeElementId === 'tankOilTempMajorThreshold'"
            :valid="validTankOilMajor.isValid"
            :validMessage="validTankOilMajor.message"
            invalidFeedbackStyle="block"
            @input="onInput($event)"
            @focus="onInputFocus($event)"
            @beforeinput="noDecimalsAllowed($event)"
            @paste.prevent
          >
            <span class="d-block help-text small lh-sm">
              The threshold must be between
              <span class="text-nowrap">0 and 90</span>, inclusive.
            </span>
          </tmg-textbox>
          <tmg-textbox
            id="tankOilTempCriticalThreshold"
            type="number"
            label="Oil Temperature Critical (°C)"
            min="0"
            max="90"
            step="1"
            v-model="oilTempThreshold.tankOilTempCriticalThreshold"
            :showFocus="activeElementId === 'tankOilTempCriticalThreshold'"
            :valid="validTankOilCritical.isValid"
            :validMessage="validTankOilCritical.message"
            invalidFeedbackStyle="block"
            @input="onInput($event)"
            @focus="onInputFocus($event)"
            @beforeinput="noDecimalsAllowed($event)"
            @paste.prevent
          >
            <span class="d-block help-text small lh-sm">
              The threshold must be between
              <span class="text-nowrap">0 and 90</span>, inclusive.
            </span>
          </tmg-textbox>
        </fieldset>
      </div>
      <div class="col">
        <fieldset class="border px-4 border-secondary">
          <legend class="float-none w-auto px-2 fs-5">
            Reservoir Oil Temp
          </legend>
          <tmg-textbox
            id="rsvrOilTempMajorThreshold"
            type="number"
            label="Oil Temperature Major (°C)"
            min="0"
            max="90"
            step="1"
            v-model="oilTempThreshold.rsvrOilTempMajorThreshold"
            :showFocus="activeElementId === 'rsvrOilTempMajorThreshold'"
            :valid="validRsvrOilMajor.isValid"
            :validMessage="validRsvrOilMajor.message"
            invalidFeedbackStyle="block"
            @input="onInput($event)"
            @focus="onInputFocus($event)"
            @beforeinput="noDecimalsAllowed($event)"
            @paste.prevent
          >
            <span class="d-block help-text small lh-sm">
              The threshold must be between
              <span class="text-nowrap">0 and 90</span>, inclusive.
            </span>
          </tmg-textbox>
          <tmg-textbox
            id="rsvrOilTempCriticalThreshold"
            type="number"
            label="Oil Temperature Critical (°C)"
            min="0"
            max="90"
            step="1"
            v-model="oilTempThreshold.rsvrOilTempCriticalThreshold"
            :showFocus="activeElementId === 'rsvrOilTempCriticalThreshold'"
            :valid="validRsvrOilCritical.isValid"
            :validMessage="validRsvrOilCritical.message"
            invalidFeedbackStyle="block"
            @input="onInput($event)"
            @focus="onInputFocus($event)"
            @beforeinput="noDecimalsAllowed($event)"
            @paste.prevent
          >
            <span class="d-block help-text small lh-sm">
              The threshold must be between
              <span class="text-nowrap">0 and 90</span>, inclusive.
            </span>
          </tmg-textbox>
        </fieldset>
      </div>
    </div>
    <div class="d-flex justify-content-between mt-4 mb-2">
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
import { getAlarmSettings, setAlarmSettings } from "@/api";

export default {
  name: "AlarmSettingsDialog",
  components: {
    TmgTextbox,
    TmgButton,
  },
  mixins: [keyboard],
  data() {
    return {
      oilTempThreshold: {
        rsvrOilTempMajorThreshold: "60",
        rsvrOilTempCriticalThreshold: "75",
        tankOilTempMajorThreshold: "45",
        tankOilTempCriticalThreshold: "55",
      },
      formSubmitted: false,
      loading: false,
      restoreDefaultData: true,
      rules: {
        oilTemp: (num) => {
          if (!this.formSubmitted) {
            return true;
          }

          return this.isValidNumber(num);
        },
      },
    };
  },
  computed: {
    validTankOilMajor() {
      return this.getMessaging(
        this.oilTempThreshold.tankOilTempMajorThreshold,
        this.oilTempThreshold.tankOilTempCriticalThreshold
      );
    },
    validTankOilCritical() {
      return this.getMessaging(
        this.oilTempThreshold.tankOilTempMajorThreshold,
        this.oilTempThreshold.tankOilTempCriticalThreshold,
        false
      );
    },
    validRsvrOilMajor() {
      return this.getMessaging(
        this.oilTempThreshold.rsvrOilTempMajorThreshold,
        this.oilTempThreshold.rsvrOilTempCriticalThreshold
      );
    },
    validRsvrOilCritical() {
      return this.getMessaging(
        this.oilTempThreshold.rsvrOilTempMajorThreshold,
        this.oilTempThreshold.rsvrOilTempCriticalThreshold,
        false
      );
    },
    isValid() {
      return (
        this.validTankOilMajor.isValid &&
        this.validTankOilCritical.isValid &&
        this.validRsvrOilMajor.isValid &&
        this.validRsvrOilCritical.isValid
      );
    },
  },
  watch: {
    isValid(val) {
      if (!val) {
        this.$emit("scrollKeyboardIntoView", false);
      }
    },
  },
  methods: {
    noDecimalsAllowed(e) {
      if (e.data?.includes?.(".") || e.data?.includes?.(",")) {
        e.preventDefault();
        e.target.dispatchEvent(
          new InputEvent(e.type, {
            inputType: e.inputType,
            data: e.data.replace(/[.,]/g, ""),
            dataTransfer: e.dataTransfer,
            isComposing: e.isComposing,
            ranges: e.getTargetRanges(),
            detail: e.detail,
            view: e.view,
            bubbles: e.bubbles,
            cancelable: e.cancelable,
            composed: e.composed,
          })
        );
      }
    },
    isNegativeZero(num) {
      if (num !== 0) {
        return false;
      }

      return 1 / num === Number.NEGATIVE_INFINITY;
    },
    isValidNumber(num) {
      return (
        Number.isFinite(num) &&
        !this.isNegativeZero(num) &&
        num >= 0 &&
        num <= 90
      );
    },
    getMessaging(major, critical, isMajor = true) {
      if (!this.formSubmitted) {
        return { isValid: true, message: "" };
      }

      major = parseFloat(major);
      critical = parseFloat(critical);

      let isValid = this.rules.oilTemp(isMajor ? major : critical),
        message = "";

      if (!isValid) {
        // Temperature entered was either NaN, out of range, or -0
        message = "Invalid temperature";
      } else if (this.rules.oilTemp(isMajor ? critical : major)) {
        // This branch tests the associated temperature to
        // make sure it is valid before comparing the two

        if (major > critical) {
          if (isMajor) {
            message = "Major cannot be greater than Critical";
          } else {
            message = "Critical cannot be less than Major";
          }
          isValid = false;
        }
      }

      return {
        isValid,
        message,
      };
    },
    async saveThresholds() {
      this.formSubmitted = true;
      this.$emit("openKeyboard", false);

      if (this.isValid) {
        this.loading = true;

        const settings = {
            tankOilTempMajorThreshold: parseFloat(
              this.oilTempThreshold.tankOilTempMajorThreshold
            ),
            tankOilTempCriticalThreshold: parseFloat(
              this.oilTempThreshold.tankOilTempCriticalThreshold
            ),
            rsvrOilTempMajorThreshold: parseFloat(
              this.oilTempThreshold.rsvrOilTempMajorThreshold
            ),
            rsvrOilTempCriticalThreshold: parseFloat(
              this.oilTempThreshold.rsvrOilTempCriticalThreshold
            ),
          },
          result = await setAlarmSettings(settings);

        if (result) {
          this.$store.commit("setThresholds", settings);

          this.restoreDefaultData = false;
          this.formSubmitted = false;

          this.$emit("show", false);
        }

        this.loading = false;
      }
    },
    async loadThresholds() {
      const res = await getAlarmSettings();
      this.$store.commit("setThresholds", res);

      this.fetchThresholds();
    },
    fetchThresholds() {
      const thresholds = this.$store.state.thresholds,
        tom = parseFloat(thresholds.tankOilTempMajorThreshold),
        toc = parseFloat(thresholds.tankOilTempCriticalThreshold),
        rom = parseFloat(thresholds.rsvrOilTempMajorThreshold),
        roc = parseFloat(thresholds.rsvrOilTempCriticalThreshold);

      this.oilTempThreshold.tankOilTempMajorThreshold = this.isValidNumber(tom)
        ? tom
        : 45;
      this.oilTempThreshold.tankOilTempCriticalThreshold = this.isValidNumber(
        toc
      )
        ? toc
        : 55;
      this.oilTempThreshold.rsvrOilTempMajorThreshold = this.isValidNumber(rom)
        ? rom
        : 60;
      this.oilTempThreshold.rsvrOilTempCriticalThreshold = this.isValidNumber(
        roc
      )
        ? roc
        : 75;
    },
    onChange(input) {
      if (this.activeElementId) {
        this.oilTempThreshold[this.activeElementId] = input;
      }
    },
    onKeyPress(button) {
      if (button === "{enter}") {
        this.saveThresholds();
      }
    },
    restoreDefaults() {
      if (this.restoreDefaultData) {
        this.fetchThresholds();
      }

      this.restoreDefaultData = true;
      this.formSubmitted = false;
    },
  },
  created() {
    this.loadThresholds();
  },
};
</script>

<style lang="scss" scoped>
.help-text {
  color: var(--bs-gray-500);
}
</style>
