<template>
  <div class="dropdown">
    <h2 class="visually-hidden">Machine Status and Alerts</h2>
    <button
      class="btn border border-0 fs-5 p-0 m-0 text-white"
      type="button"
      id="alerts"
      data-bs-toggle="dropdown"
      data-bs-auto-close="outside"
      aria-expanded="false"
      v-on="{ 'show.bs.dropdown': toggleIcon, 'hide.bs.dropdown': toggleIcon }"
    >
      Status:
      <span class="fs-4 bi" :class="setStatusIcon()"></span>
      <span ref="dropdownIcon" class="bi bi-chevron-down ms-1"></span>
    </button>
    <div class="dropdown-menu bg-light">
      <h3 class="dropdown-header d-flex align-items-center fs-6 m-0 mb-2 py-0">
        <span class="bi bi-bell-fill me-2"></span>Current Alerts
      </h3>
      <ul class="alert-list list-unstyled m-0 p-0 overflow-auto">
        <template v-if="currentAlarms.length === 0">
          <li><hr class="dropdown-divider mt-0" /></li>
          <li>
            <p class="d-flex align-items-center mb-0 px-3 py-1 small">
              <span class="ps-4">There are no current alerts</span>
            </p>
          </li>
        </template>
        <template v-else v-for="(item, index) in currentAlarms">
          <li :key="index">
            <hr class="dropdown-divider" :class="{ 'mt-0': index === 0 }" />
          </li>
          <li :key="index + currentAlarms.length">
            <p class="d-flex align-items-center mb-0 px-3 py-1">
              <span :class="setAlarmIcon(item.severity)"></span>
              <span class="d-flex flex-column">
                {{ item.text }}
                <span class="text-uppercase fs-10">
                  {{ item.severityText }} - {{ item.formattedDate }}
                </span>
              </span>
            </p>
          </li>
        </template>
      </ul>
      <div class="px-0 pt-2">
        <button
          class="btn dropdown-header d-flex justify-content-between rounded-0 px-3 position-relative text-start w-100"
          data-bs-toggle="collapse"
          data-bs-target="#collapseAlertHistory"
          aria-expanded="false"
          aria-controls="collapseAlertHistory"
        >
          Alerts History
          <span ref="historyIcon" class="bi bi-chevron-down ms-1"></span>
        </button>
        <div
          id="collapseAlertHistory"
          class="collapse"
          v-on="{
            'show.bs.collapse': toggleIcon,
            'hide.bs.collapse': toggleIcon,
          }"
        >
          <ul class="history-list list-unstyled m-0 p-0 pt-2 overflow-auto">
            <li v-if="alarmHistory.length === 0" class="px-3 py-1">
              <p class="small mb-0">There is currently no history</p>
            </li>
            <template v-else>
              <li
                class="px-3 py-1"
                v-for="(item, index) in alarmHistory"
                :key="index"
              >
                <p class="mb-0">
                  {{ item.text }}
                  <span
                    class="d-flex justify-content-between text-uppercase fs-10"
                  >
                    <span>
                      {{ item.severityText }} - {{ item.formattedDate }}
                    </span>
                    <span class="ms-3">Cleared {{ item.clearedDate }}</span>
                  </span>
                </p>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Map of alarms from backend
// alarms: {
//   ALARM_OFF: 0,
//   ALARM_INFO: 1,
//   ALARM_TRIPPED: 2,
//   ALARM_MINOR: 3,
//   ALARM_MAJOR: 4,
//   ALARM_CRITICAL: 5,
//   ALARM_ON: 6,
//   POWER_OFF: 10,
//   POWER_ON: 11,
// },
import EventsManager from "@/events";

export default {
  name: "StatusIndicator",
  props: {
    status: {
      type: Object,
      default: () => {
        return {
          oilLevelLowAlarm: 0,
          rsvrOilTempAlarm: 0,
          pduPowerState: 10,
        };
      },
    },
  },
  data() {
    return {
      alarmHistory: [],
      currentAlarms: [],
      alarmMap: {
        oilLevelLowAlarm: {
          text: "Oil Level Low",
          critical: 6,
        },
        tankOilTempAlarm: {
          text: "Oil Temp - Tank High",
          critical: 5,
          major: 4,
          minor: 3,
        },
        rsvrOilTempAlarm: {
          text: "Oil Temp - Reservoir High",
          critical: 5,
          major: 4,
          minor: 3,
        },
        pduPowerState: {
          text: "Primary Breaker Tripped",
          major: 2,
        },
      },
      dtFormatter: new Intl.DateTimeFormat(navigator.language, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      subscription: null,
    };
  },
  watch: {
    status: {
      deep: true,
      handler(value) {
        this.setCurrentAlarms(value);
      },
    },
  },
  methods: {
    hasActiveAlarm() {
      return (
        this.status.oilLevelLowAlarm === 6 ||
        this.status.rsvrOilTempAlarm === 4 ||
        this.status.rsvrOilTempAlarm === 5 ||
        this.status.rsvrOilTempAlarm === 6 ||
        this.status.tankOilTempAlarm === 4 ||
        this.status.tankOilTempAlarm === 5 ||
        this.status.tankOilTempAlarm === 6
      );
    },
    setStatusIcon() {
      if (this.hasActiveAlarm()) {
        switch (this.currentAlarms?.[0]?.severity ?? -1) {
          case 0:
          case 3:
            return "bi-exclamation-triangle-fill text-danger";
          case 2:
            return "bi-exclamation-triangle-fill text-major";
          case 1:
            return "bi-exclamation-triangle-fill text-minor";
          default:
            break;
        }
      }

      return "bi-check-circle icon-success";
    },
    setAlarmIcon(severity) {
      switch (severity) {
        case 3:
          return "bi bi-exclamation-circle text-danger me-2";
        case 2:
          return "alert-dot alert-dot-major d-inline-block rounded-circle ms-1";
        case 1:
          return "alert-dot alert-dot-minor d-inline-block rounded-circle ms-1";
        default:
          return "alert-dot d-inline-block rounded-circle ms-1";
      }
    },
    toggleIcon(e) {
      const { type } = e;
      let icon;

      if (type.endsWith("dropdown")) {
        icon = this.$refs.dropdownIcon;
      } else {
        icon = this.$refs.historyIcon;
      }

      if (type.startsWith("show")) {
        icon.classList.replace("bi-chevron-down", "bi-chevron-up");
      } else {
        icon.classList.replace("bi-chevron-up", "bi-chevron-down");
      }
    },
    buildAlarms(status) {
      return Object.entries(status)
        .filter(([k, v]) => v <= 6 && v !== 0 && v !== 2 && k !== "")
        .map(([key, value]) => {
          const { critical, major, minor, text } = this.alarmMap[key],
            date = Date.now(),
            formattedDate = this.dtFormatter
              .format(new Date(date))
              .replace(",", "");

          let severity = 0,
            severityText = "none";

          switch (value) {
            case critical:
              severity = 3;
              severityText = "critical";
              break;
            case major:
              severity = 2;
              severityText = "major";
              break;
            case minor:
              severity = 1;
              severityText = "minor";
              break;
            default:
              break;
          }

          return {
            formattedDate,
            name: key,
            severity,
            severityText,
            text,
            timeStamp: date,
          };
        });
    },
    setCurrentAlarms(status) {
      const alarms = this.buildAlarms(status);

      // Compare the new alarms with the current alarms.
      // If it already exists don't overwrite it.
      alarms.forEach((alarm) => {
        const matchingIndex = this.currentAlarms.findIndex(
          (a) => a.name === alarm.name
        );

        // If the object doesn't exist in the current alarms,
        // add it.
        if (matchingIndex === -1) {
          this.currentAlarms.push(alarm);
        } else {
          const match = this.currentAlarms[matchingIndex];

          // Check if the incoming alarm has a different severity
          // than the match from the current alarms
          if (alarm.severity !== match.severity) {
            // If it is different, remove the existing one
            // from the current alarms
            this.currentAlarms.splice(matchingIndex, 1);

            // Add the new alarm with a different severity
            // to the current alarms
            this.currentAlarms.push(alarm);

            // Add the old alarm to the history log
            this.addItemToAlarmHistory(match);
          }
        }
      });

      this.moveClearedAlarmsToHistory(alarms);

      this.currentAlarms.sort((a, b) => {
        let cmp = b.severity - a.severity;

        if (cmp === 0) {
          cmp = b.timeStamp - a.timeStamp;
        }

        return cmp;
      });

      localStorage.setItem("alarms", JSON.stringify(this.currentAlarms));
      localStorage.setItem("history", JSON.stringify(this.alarmHistory));
    },
    addItemToAlarmHistory(alarm) {
      alarm.clearedDate = this.dtFormatter.format(new Date()).replace(",", "");

      this.alarmHistory.unshift(alarm);

      while (this.alarmHistory.length > 100) {
        this.alarmHistory.pop();
      }
    },
    moveClearedAlarmsToHistory(status) {
      if (status.length < this.currentAlarms.length) {
        // Find the items in the current alarms that
        // have been cleared
        const addToHistory = this.currentAlarms
          .map((a, idx) => {
            const index = status.findIndex(
              (s) => s.name === a.name && s.severity === a.severity
            );

            if (index === -1) {
              return {
                data: a,
                index: idx,
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);

        // There is an item that needs to be moved from current alarms
        // to the history.
        if (addToHistory.length > 0) {
          for (let i = addToHistory.length - 1; i >= 0; i--) {
            const { index, data } = addToHistory[i];
            this.currentAlarms.splice(index, 1);
            this.addItemToAlarmHistory(data);
          }
        }
      }
    },
    getAlarms(res) {
      this.$store.commit("setStatus", res);
    },
  },
  mounted() {
    this.subscription = EventsManager.subscribe("alarms", this.getAlarms);

    const alarms = localStorage.getItem("alarms"),
      history = localStorage.getItem("history");

    if (alarms !== null) {
      this.currentAlarms = JSON.parse(alarms);
    }

    if (history !== null) {
      this.alarmHistory = JSON.parse(history);
    }
  },
  beforeDestroy() {
    this.subscription.remove();
    console.log("[StatusIndicator.clearInterval] Destroyed…");
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/globalvars.scss";

[data-bs-toggle="dropdown"] {
  line-height: 1.2;
}

.dropdown-menu {
  min-width: 18rem;
}

.alert-list {
  max-height: 193px;
  -webkit-overflow-scrolling: touch;
}

.history-list {
  max-height: 16rem;
  -webkit-overflow-scrolling: touch;
}

.alert-dot {
  height: 0.5rem;
  margin-right: 0.75rem;
  width: 0.5rem;

  &-minor {
    background-color: $tmg-yellow;
  }

  &-major {
    background-color: $warning-color;
  }
}

.dismiss-alert {
  background-size: 0.75em 0.75em;
}

.icon-success {
  color: #00cc2d;
}

.icon-warning {
  color: #ffb800;
}

.text-major {
  color: $warning-color;
}

.text-minor {
  color: $tmg-yellow;
}

.dropdown-header.btn {
  background-color: #d9d9d9;
  color: $dark-blue;
  z-index: 1;

  & ~ .collapse,
  & ~ .collapsing {
    li:nth-child(even) {
      background-color: #e9ecef;
    }
  }
}

.fs-10 {
  font-size: 0.625rem;
}

.glow {
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 0;
  }
  to {
    text-shadow: 0 0 4px #fff, 0 0 4px #fff, 0 0 6px #ff4da6, 0 0 8px #ff4da6,
      0 0 20px #ff4da6;
  }
}
</style>
