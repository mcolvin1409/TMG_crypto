import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showLockScreen: true,
    toast: null,
    toastData: {
      type: "Info",
      message: "This is the information.",
    },
    fluids: {},
    network: {
      dhcp: false,
      address: "",
      gateway: "",
      dns1: "",
      dns2: "",
    },
    properties: {
      unitId: "",
      unitType: null,
      product: "",
      version: "",
      revision: "",
      factory: "",
      fluid: "UNDEFINED",
      manufactured: "",
      water: "",
      electrical: "",
      swversion: "",
      disclaimer: "",
      email: "",
      phone: "",
      fax: "",
      web: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      Timezone: "",
      NTP: "no",
      ntpServers: ["", ""],
    },
    status: {
      oilLevelLowAlarm: 0,
      rsvrOilTempAlarm: 0,
      tankOilTempAlarm: 0,
      pduPowerState: 10,
    },
    thresholds: {
      tankOilTempMajorThreshold: 45,
      tankOilTempCriticalThreshold: 55,
      rsvrOilTempMajorThreshold: 60,
      rsvrOilTempCriticalThreshold: 75,
    },
  },
  getters: {},
  mutations: {
    setLockScreen(state, payload) {
      state.showLockScreen = payload;
    },
    setToastData(state, payload) {
      state.toastData = Object.assign(state.toastData, payload);
      Vue.nextTick(() => {
        state.toast?.show();
      });
    },
    setToast(state, payload) {
      state.toast = payload;
    },
    setNetworkSettings(state, payload) {
      state.network = Object.assign(state.network, payload);
    },
    setProperties(state, payload) {
      state.properties = Object.assign(state.properties, payload);
    },
    setThresholds(state, payload) {
      state.thresholds = Object.assign(state.thresholds, payload);
    },
    setStatus(state, payload) {
      state.status = Object.assign(state.status, payload);
    },
    setTimezone(state, payload) {
      state.properties.Timezone = payload;
    },
    setNTP(state, payload) {
      state.properties.NTP = payload;
    },
    setNTPServers(state, { primary = null, secondary = null }) {
      try {
        if (primary !== null && typeof primary === "string") {
          state.properties.ntpServers[0] = primary;
        }

        if (secondary !== null && typeof secondary === "string") {
          state.properties.ntpServers[1] = secondary;
        }
      } catch (e) {
        console.error(`${e.name}: ${e.message}`);
      }
    },
    setFluids(state, payload) {
      state.fluids = Object.assign(state.fluids, payload);
    },
    setFluidType(state, payload) {
      state.properties.fluid = payload;
    },
  },
  actions: {},
  modules: {},
});
