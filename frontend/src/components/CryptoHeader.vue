<template>
  <header
    class="container-fluid header border border-2 border-top-0 border-start-0 border-end-0 py-2"
  >
    <div class="row align-items-center">
      <div class="col">
        <img
          v-if="isCryptoCore || isComputeCore"
          class="logo h-auto user-select-none pe-none"
          :src="logoInfo.src"
          :alt="logoInfo.alt"
          :width="logoInfo.width"
          :height="logoInfo.height"
          loading="lazy"
        />
      </div>
      <div class="col">
        <h1 class="h4 m-0 text-center">OTTOcontrol</h1>
        <p class="h1 fs-4 fw-bold m-0 text-center page-title text-primary">
          {{ this.$route.name }}
        </p>
      </div>
      <div class="col text-end">
        <div class="d-inline-block align-middle">
          <status-indicator :status="$store.state.status" />
          <p class="header-text text-primary m-0">
            Machine ID: {{ machineId }}
          </p>
          <time
            class="header-text d-block m-0"
            :datetime="currentDateTime.toISOString()"
          >
            {{ formattedDateTime }}
          </time>
        </div>
        <button
          class="btn power-btn p-0 ms-3"
          aria-label="Tank Power Off Button"
          :disabled="
            $store.state.status.pduPowerState === 10 ||
            $store.state.status.pduPowerState === 2
          "
          @[tripBreakerEvent]="showWarning()"
        >
          <img
            v-if="isCryptoCore || isComputeCore"
            class="h-auto user-select-none pe-none"
            :src="
              isCryptoCore
                ? require('@/assets/EmergencyPowerOff.png')
                : require('@/assets/eSTOP.png')
            "
            alt=""
            width="84"
            height="84"
            loading="lazy"
            role="presentation"
          />
        </button>
      </div>
      <power-off-dialog v-model="show" />
    </div>
  </header>
</template>

<script>
import StatusIndicator from "@/components/StatusIndicator.vue";
import PowerOffDialog from "@/components/PowerOffDialog.vue";
import units from "@/mixins/units.js";

export default {
  name: "CryptoHeader",
  components: { StatusIndicator, PowerOffDialog },
  mixins: [units],
  props: {
    pageTitle: {
      type: String,
      default: "Dashboard",
    },
    machineId: {
      type: String,
      default: "",
    },
  },
  data: () => {
    return {
      clock: -1,
      currentDateTime: new Date(),
      dtFormatter: new Intl.DateTimeFormat(navigator.language, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      show: false,
    };
  },
  computed: {
    formattedDateTime() {
      return this.dtFormatter.format(this.currentDateTime).replace(",", "");
    },
    logoInfo() {
      if (this.isCryptoCore) {
        return {
          src: require("@/assets/Cryptocore-NO-BOX.png"),
          alt: "CryptoCore",
          width: 1007,
          height: 124,
        };
      } else {
        return {
          src: require("@/assets/ComputeCore_Logo.png"),
          alt: "ComputeCore",
          width: 283,
          height: 96,
        };
      }
    },
    tripBreakerEvent() {
      if (this.isCryptoCore) {
        return "click";
      }

      return null;
    },
  },
  methods: {
    showWarning() {
      this.show = true;
    },
  },
  mounted() {
    this.clock = setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.clock);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/scss/globalvars.scss";

.header {
  border-bottom-color: $med-blue-lt !important;
  --bs-gutter-x: 1.25rem;
}

.logo {
  max-width: 260px;
}

.header-text {
  font-size: 0.9375rem;
}

.power-btn {
  margin-right: calc(-0.5 * var(--bs-gutter-x));

  &:disabled,
  &.disabled {
    filter: grayscale(1);
  }
}
</style>
