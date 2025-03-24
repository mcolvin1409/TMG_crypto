<template>
  <div class="h-100 container-fluid">
    <div class="row h-100">
      <div class="col d-flex flex-column">
        <div class="process-block rounded-2 p-3 mx-auto text-center w-100">
          <div class="row">
            <div class="col">
              <h3 class="h4 mb-4">Process Cooling System</h3>
            </div>
          </div>
          <div class="row gx-3 justify-content-center">
            <div class="col">
              <table
                class="table table-borderless table-sm align-middle mx-auto mb-0 w-auto text-white"
              >
                <tbody>
                  <tr>
                    <th scope="row" class="fw-normal text-end">
                      Tank Oil Temp:
                    </th>
                    <td>
                      <div
                        class="rounded-pill px-2 py-1 text-start"
                        :class="
                          setPillColor($store.state.status.tankOilTempAlarm)
                        "
                      >
                        {{
                          this.numberFormatter.format(
                            cooling.fluidTempRtdOilTank
                          )
                        }}
                        °C
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="fw-normal text-end">
                      Reservoir Oil Temp:
                    </th>
                    <td>
                      <div
                        class="rounded-pill px-2 py-1 text-start"
                        :class="
                          setPillColor($store.state.status.rsvrOilTempAlarm)
                        "
                      >
                        {{
                          this.numberFormatter.format(
                            cooling.fluidTempRtdOilReservoir
                          )
                        }}
                        °C
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="fw-normal text-end">Oil Level:</th>
                    <td>
                      <div
                        class="rounded-pill px-2 py-1 text-center"
                        :class="
                          setPillColor($store.state.status.oilLevelLowAlarm)
                        "
                      >
                        {{
                          this.$store.state.status.oilLevelLowAlarm === 6
                            ? "Low"
                            : "Normal"
                        }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col" v-if="isComputeCore">
              <table
                class="table table-borderless table-sm align-middle mx-auto mb-0 w-auto text-white"
              >
                <tbody>
                  <tr>
                    <th scope="row" class="fw-normal text-end">
                      Oil Supply Pressure:
                    </th>
                    <td>
                      <div class="stat rounded-pill px-2 py-1 text-start">
                        {{
                          this.numberFormatter.format(
                            cooling.fluidPressureSensorOilIn
                          )
                        }}
                        PSI
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="fw-normal text-end">
                      Oil Return Pressure:
                    </th>
                    <td>
                      <div class="stat rounded-pill px-2 py-1 text-start">
                        {{
                          this.numberFormatter.format(
                            cooling.fluidPressureSensorOilOut
                          )
                        }}
                        PSI
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="fw-normal text-end">
                      Oil Flow Rate:
                    </th>
                    <td>
                      <div class="stat rounded-pill px-2 py-1 text-start">
                        {{
                          this.numberFormatter.format(
                            cooling.flowMeterSensorOil
                          )
                        }}
                        GPM
                      </div>
                    </td>
                  </tr>
                  <!-- <tr>
                    <th scope="row" class="fw-normal text-end">
                      Water Supply Temp:
                    </th>
                    <td>
                      <div class="stat rounded-pill px-2 py-1 text-start">
                        {{
                          this.numberFormatter.format(
                            cooling.fluidTempRtdWaterIn
                          )
                        }}
                        °C
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="fw-normal text-end">
                      Water Return Temp:
                    </th>
                    <td>
                      <div class="stat rounded-pill px-2 py-1 text-start">
                        {{
                          this.numberFormatter.format(
                            cooling.fluidTempRtdWaterOut
                          )
                        }}
                        °C
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="fw-normal text-end">
                      Water Supply Pressure:
                    </th>
                    <td>
                      <div class="stat rounded-pill px-2 py-1 text-start">
                        {{
                          this.numberFormatter.format(
                            cooling.fluidPressureSensorWaterIn
                          )
                        }}
                        PSI
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="fw-normal text-end">
                      Water Return Pressure:
                    </th>
                    <td>
                      <div class="stat rounded-pill px-2 py-1 text-start">
                        {{
                          this.numberFormatter.format(
                            cooling.fluidPressureSensorWaterOut
                          )
                        }}
                        PSI
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="fw-normal text-end">
                      Water Flow Rate:
                    </th>
                    <td>
                      <div class="stat rounded-pill px-2 py-1 text-start">
                        {{
                          this.numberFormatter.format(
                            cooling.flowMeterSensorWater
                          )
                        }}
                        GPM
                      </div>
                    </td>
                  </tr> -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          class="process-block rounded-2 p-3 mx-auto text-center w-100"
          :class="{
            'mt-3': isCryptoCore,
            'mb-2': isComputeCore,
            'order-first': isComputeCore,
          }"
        >
          <div v-if="isCryptoCore" class="row">
            <div class="col">
              <h3 class="h4 mb-4">Power Distribution System</h3>
            </div>
          </div>
          <div class="row align-items-center justify-content-center gx-2">
            <div class="col-auto">
              <p class="m-0 table-cell-text">
                {{
                  isComputeCore ? "Operational Status" : "PDU Receptacle Power"
                }}:
              </p>
            </div>
            <div class="col-auto">
              <div
                class="stat rounded-pill px-3 py-1 text-center"
                :class="{
                  'bg-danger': $store.state.status.pduPowerState === 2,
                  'bg-secondary': $store.state.status.pduPowerState === 10,
                }"
              >
                {{
                  $store.state.status.pduPowerState === 2
                    ? "Tripped"
                    : $store.state.status.pduPowerState === 10
                    ? "Off"
                    : isComputeCore
                    ? "Running"
                    : "On"
                }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="isComputeCore"
          class="process-block rounded-2 mt-2 p-3 mx-auto text-center w-100"
        >
          <div class="row gx-3">
            <div class="col-6">
              <table
                class="table table-borderless table-sm align-middle mx-auto mb-0 w-auto text-white"
              >
                <tbody>
                  <tr>
                    <th scope="row" class="fw-normal text-end">
                      Pump 1 Speed:
                    </th>
                    <td>
                      <div class="stat rounded-pill px-2 py-1 text-center">
                        75%
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-6">
              <table
                class="table table-borderless table-sm align-middle mx-auto mb-0 w-auto text-white"
              >
                <tbody>
                  <tr>
                    <th scope="row" class="fw-normal text-end">
                      Pump 2 Speed:
                    </th>
                    <td>
                      <div
                        class="bg-secondary rounded-pill px-2 py-1 text-center"
                      >
                        0%
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col col-auto">
        <div class="mainMenu h-100 d-flex flex-column position-relative">
          <div class="row">
            <div class="col mb-3">
              <router-link to="/health" class="btn btn-primary fs-4 w-100">
                Health
              </router-link>
            </div>
            <div v-if="isCryptoCore || isComputeCore" class="col mb-3">
              <router-link
                :to="isCryptoCore ? '/mining' : '/servers'"
                class="btn btn-primary fs-4 w-100"
              >
                {{ isCryptoCore ? "Mining" : "Servers" }}
              </router-link>
            </div>
            <div class="col mb-3">
              <button
                type="button"
                class="btn btn-primary disabled fs-4 w-100"
                @click="$router.push('about')"
                disabled="true"
              >
                Diagnostics
              </button>
            </div>
            <div class="col mb-3">
              <button
                type="button"
                class="btn btn-primary disabled fs-4 w-100"
                @click="$router.push('Home')"
                disabled="true"
              >
                Logs
              </button>
            </div>
            <div class="col mb-3">
              <button
                type="button"
                class="btn btn-primary disabled fs-4 w-100"
                @click="$router.push('Home')"
                disabled="true"
              >
                Remote
              </button>
            </div>
          </div>
          <div class="row gx-2 align-items-center mt-auto">
            <div class="col" ref="lockCol">
              <tmg-button
                class="btn-link p-1 fs-4 text-white text-decoration-none"
                icon="bi-lock-fill"
                btn-style="none"
                spinner-size="medium"
                @click="$store.commit('setLockScreen', true)"
              >
                <span class="ms-1">Lock</span>
              </tmg-button>
            </div>
            <div class="col-auto">
              <div class="dropup">
                <tmg-button
                  ref="gear"
                  id="settingsToggle"
                  class="btn-link p-1 fs-4 text-white text-decoration-none"
                  icon="bi-gear-fill"
                  btn-style="none"
                  spinner-size="medium"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                >
                  <span class="ms-1">Settings</span>
                </tmg-button>
                <ul
                  ref="settings"
                  class="settings dropdown-menu text-center"
                  aria-labelledby="settingsToggle"
                >
                  <li v-for="(item, index) in settingsMenuItems" :key="index">
                    <button
                      type="button"
                      @click="doSettingMenuClick(index)"
                      class="btn btn-link rounded-0 dropdown-item text-decoration-none w-100"
                    >
                      {{ item.text }}
                    </button>
                    <hr class="dropdown-divider m-1" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <base-modal
      :title="settingsMenuSelected.text"
      v-model="showModal"
      :component="settingsMenuSelected.component"
      :width="settingsMenuSelected.width"
    ></base-modal>
  </div>
</template>

<script>
import BaseModal from "@/components/BaseModal.vue";
import TmgButton from "@/components/TmgButton.vue";
import { getFluids } from "@/api";
import EventsManager from "@/events";
import units from "@/mixins/units.js";

export default {
  name: "Dashboard",
  components: { BaseModal, TmgButton },
  mixins: [units],
  props: {
    msg: String,
  },
  data: function () {
    return {
      numberFormatter: new Intl.NumberFormat(navigator.language, {
        maximumFractionDigits: 2,
        useGrouping: "always",
      }),
      showModal: false,
      settingsMenuSelected: {
        text: "",
        component: "",
        disabled: false,
      },
      settingsMenuItems: [
        {
          text: "Network Settings",
          component: "NetworkDialog",
          disabled: false,
          width: "680px",
        },
        {
          text: "Alarm Thresholds",
          component: "AlarmSettingsDialog",
          disabled: false,
          width: "700px",
        },
        {
          text: "System Properties",
          component: "SystemPropertiesDialog",
          disabled: false,
          width: "600px",
        },
        {
          text: "Lockscreen Password",
          component: "LockScreenDialog",
          disabled: false,
          width: "560px",
        },
        {
          text: "System Information",
          component: "SystemInfo",
          disabled: false,
          width: "700px",
        },
      ],
      subscription: null,
      cooling: {
        flowMeterSensorOil: 0,
        flowMeterSensorWater: 0,
        fluidPressureSensorOilIn: 0,
        fluidPressureSensorOilOut: 0,
        fluidPressureSensorWaterIn: 0,
        fluidPressureSensorWaterOut: 0,
        fluidTempRtdOilReservoir: 0,
        fluidTempRtdOilTank: 0,
        fluidTempRtdOilIn: 0,
        fluidTempRtdOilOut: 0,
        fluidTempRtdWaterIn: 0,
        fluidTempRtdWaterOut: 0,
      },
    };
  },
  methods: {
    setPillColor(level) {
      switch (level) {
        case 6:
        case 5:
          return "bg-danger";
        case 4:
          return "bg-major";
        case 3:
          return "bg-minor";
        default:
          return "stat";
      }
    },
    doSettingMenuClick(index) {
      this.settingsMenuSelected = this.settingsMenuItems[index];
      this.showModal = true;
    },
    fetchCooling(data) {
      this.cooling = Object.assign(this.cooling, data);
    },
    async loadFluids() {
      const res = await getFluids();
      this.$store.commit("setFluids", res);
    },
    calculateGearOffset() {
      requestAnimationFrame(() => {
        const rect = this.$refs.settings.getBoundingClientRect(),
          gearRect =
            this.$refs.gear.$el.firstElementChild.getBoundingClientRect(),
          /**
           * Arrow is initially 8px in from the start edge of the menu.
           * 5px is the minimum, accounting for the padding and border
           * of the settings button.
           */
          spacing = Math.max(gearRect.x - rect.x + gearRect.width / 2 - 8, 5);

        this.$refs.settings.style.setProperty(
          "--gear-offset",
          Math.round((spacing + Number.EPSILON) * 100) / 100
        );
      });
    },
  },
  mounted() {
    this.subscription = EventsManager.subscribe("cooling", this.fetchCooling);
    this.loadFluids();

    this.$refs.gear.$el.addEventListener(
      "shown.bs.dropdown",
      this.calculateGearOffset,
      { passive: true }
    );
  },
  beforeDestroy() {
    this.subscription.remove();
    console.log("[Dashboard.clearInterval] Destroyed…");

    this.$refs.gear.$el.removeEventListener(
      "shown.bs.dropdown",
      this.calculateGearOffset,
      { passive: true }
    );
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/scss/globalvars.scss";

.process-block {
  background-color: $med-blue;

  th,
  .table-cell-text {
    font-size: 1.125rem;
    line-height: 1.7777;
  }

  .stat {
    background-color: green;
  }

  .rounded-pill {
    min-width: 5rem;
  }
}

.mainMenu,
.settings {
  width: 16rem;
}

.settings {
  background-color: #d4d4d4;
  bottom: 3px !important;
  color: #272727;

  & > li {
    border-bottom-color: gray !important;

    &:last-child {
      margin-bottom: -8px !important;

      & > .dropdown-divider {
        margin-bottom: 0 !important;
      }
    }
  }

  &::after {
    background-color: inherit;
    bottom: -8px;
    content: " ";
    display: block;
    height: 1rem;
    left: 0;
    position: relative;
    transform: translate(calc(var(--gear-offset, 0) * 1px), 8px) rotate(45deg);
    width: 1rem;
  }
}

.bg-major {
  background-color: $warning-color !important;
}

.bg-minor {
  background-color: $tmg-yellow !important;
}
</style>
