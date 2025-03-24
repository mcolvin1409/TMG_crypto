import axios from "axios";
import store from "@/store";

const API_URL = `${location.protocol}//${location.hostname}:5000`;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export async function comparePassword(password, showToast = true) {
  try {
    const res = await axios.post(`${API_URL}/auth`, {
      password,
    });
    if (
      res.status === 200 &&
      res.headers["content-type"].indexOf("application/json") >= 0
    ) {
      return res.data.success;
    }
  } catch (e) {
    if (showToast) {
      store.commit("setToastData", {
        type: "Error",
        message: `Login error! ${e.message}`,
      });
    }
    console.error("[Compare]", `${e.name}: ${e.message}`);
  }

  return false;
}

export async function updatePassword(currentPassword, newPassword) {
  try {
    const res = await axios.post(`${API_URL}/auth/change`, {
      currentPassword,
      newPassword,
    });
    if (
      res.status === 200 &&
      res.headers["content-type"].indexOf("application/json") >= 0
    ) {
      return res.data.success;
    }
  } catch (e) {
    store.commit("setToastData", {
      type: "Error",
      message: `Change password error! ${e.message}`,
    });
    console.error("[Password]", `${e.name}: ${e.message}`);
  }

  return false;
}

export async function getNetworkSettings() {
  try {
    const res = await axios.get(`${API_URL}/network/settings`);
    if (
      res.status === 200 &&
      res.headers["content-type"].indexOf("application/json") >= 0
    ) {
      return res.data.settings;
    }
  } catch (e) {
    store.commit("setToastData", {
      type: "Error",
      message: `Error fetching network settings! ${e.message}`,
    });
    console.error("[Network (get)]", `${e.name}: ${e.message}`);
  }

  return {};
}

export async function setNetworkSettings(settings) {
  try {
    const res = await axios.post(`${API_URL}/network/settings`, {
      settings,
    });
    if (
      res.status === 200 &&
      res.headers["content-type"].indexOf("application/json") >= 0
    ) {
      return res.data.success;
    }
  } catch (e) {
    store.commit("setToastData", {
      type: "Error",
      message: `Failed to save network settings! ${e.message}`,
    });
    console.error("[Network (set)]", `${e.name}: ${e.message}`);
  }

  return false;
}

export async function getSystemProps() {
  try {
    const res = await axios.get(`${API_URL}/system/props`);
    if (
      res.status === 200 &&
      res.headers["content-type"].indexOf("application/json") >= 0
    ) {
      return res.data.properties;
    }
  } catch (e) {
    store.commit("setToastData", {
      type: "Error",
      message: `Error fetching system properties! ${e.message}`,
    });
    console.error("[System]", `${e.name}: ${e.message}`);
  }

  return {};
}

export async function setNTP({
  ntp = true,
  timezone = "",
  datetime,
  primary = "",
  secondary = "",
}) {
  try {
    const props = Object.create(null);

    if (!timezone) {
      return false;
    }

    if (typeof ntp !== "boolean") {
      ntp = true;
    }

    props.timezone = timezone;
    props.ntp = ntp;

    // `ntp` should be a boolean type at this point
    if (ntp) {
      if (!primary) {
        return false;
      }

      props.primary = primary;
      props.secondary = secondary;
    } else {
      if (!datetime) {
        return false;
      }

      props.datetime = datetime;
    }

    const res = await axios.post(`${API_URL}/system/ntp`, props);

    if (
      res.status === 200 &&
      res.headers["content-type"].indexOf("application/json") >= 0
    ) {
      return res.data.success;
    }
  } catch (e) {
    store.commit("setToastData", {
      type: "Error",
      message: `Failed to save system NTP properties! ${e.message}`,
    });
    console.error("[NTP DateTime]", `${e.name}: ${e.message}`);
  }

  return false;
}

export async function getHealth() {
  try {
    const res = await axios.get(`${API_URL}/system/health`);
    if (
      res.status === 200 &&
      res.headers["content-type"].indexOf("application/json") >= 0
    ) {
      return res.data.health;
    }
  } catch (e) {
    store.commit("setToastData", {
      type: "Error",
      message: `Error fetching health data! ${e.message}`,
    });
    console.error("[Health]", `${e.name}: ${e.message}`);
  }

  return {};
}

export async function getCooling() {
  try {
    const res = await axios.get(`${API_URL}/cooling`);
    if (
      res.status === 200 &&
      res.headers["content-type"].indexOf("application/json") >= 0
    ) {
      return res.data.cooling;
    }
  } catch (e) {
    store.commit("setToastData", {
      type: "Error",
      message: `Error fetching cooling data! ${e.message}`,
    });
    console.error("[Cooling]", `${e.name}: ${e.message}`);
  }

  return {};
}

export async function getStatus() {
  try {
    const res = await axios.get(`${API_URL}/sensors/alarms`);
    if (
      res.status === 200 &&
      res.headers["content-type"].indexOf("application/json") >= 0
    ) {
      return res.data.alarms;
    }
  } catch (e) {
    store.commit("setToastData", {
      type: "Error",
      message: `Error fetching status data! ${e.message}`,
    });
    console.error("[Status]", `${e.name}: ${e.message}`);
  }

  return {};
}

export async function getAlarmSettings() {
  try {
    const res = await axios.get(`${API_URL}/sensors`);
    if (
      res.status === 200 &&
      res.headers["content-type"].indexOf("application/json") >= 0
    ) {
      return res.data.alarmThresholds;
    }
  } catch (e) {
    store.commit("setToastData", {
      type: "Error",
      message: `Error getting alarm settings! ${e.message}`,
    });
    console.error("[Alarm (get)]", `${e.name}: ${e.message}`);
  }

  return {};
}

export async function setAlarmSettings(settings) {
  try {
    const res = await axios.post(`${API_URL}/sensors`, settings);
    if (
      res.status === 200 &&
      res.headers["content-type"].indexOf("application/json") >= 0
    ) {
      return res.data.success;
    }
  } catch (e) {
    store.commit("setToastData", {
      type: "Error",
      message: `Error resetting alarm! ${e.message}`,
    });
    console.error("[Alarm (set)]", `${e.name}: ${e.message}`);
  }

  return false;
}

export async function clearAlarm(alarm) {
  try {
    const res = await axios.post(`${API_URL}/sensors/clear`, {
      clear: alarm,
    });
    if (
      res.status === 200 &&
      res.headers["content-type"].indexOf("application/json") >= 0
    ) {
      return res.data.success;
    }
  } catch (e) {
    store.commit("setToastData", {
      type: "Error",
      message: `Error resetting alarm! ${e.message}`,
    });
    console.error("[Alarm (clear)]", `${e.name}: ${e.message}`);
  }

  return false;
}

export async function powerOff() {
  try {
    await axios.get(`${API_URL}/sensors/power/off`);
  } catch (e) {
    store.commit("setToastData", {
      type: "Error",
      message: `Error tripping the primary breaker! ${e.message}`,
    });
    console.error("[Power]", `${e.name}: ${e.message}`);
  }

  return {};
}

export async function getFluids() {
  try {
    const res = await axios.get(`${API_URL}/system/fluids`);
    if (
      res.status === 200 &&
      res.headers["content-type"].indexOf("application/json") >= 0
    ) {
      return res.data.fluids;
    }
  } catch (e) {
    store.commit("setToastData", {
      type: "Error",
      message: `Error getting fluid list! ${e.message}`,
    });
    console.error("[Fluids (get)]", `${e.name}: ${e.message}`);
  }

  return {};
}

export async function setFluid(fluidType) {
  try {
    const res = await axios.post(`${API_URL}/system/fluids`, {
      fluid: fluidType,
    });
    if (
      res.status === 200 &&
      res.headers["content-type"].indexOf("application/json") >= 0
    ) {
      return res.data.success;
    }
  } catch (e) {
    store.commit("setToastData", {
      type: "Error",
      message: `Error setting fluid type! ${e.message}`,
    });
    console.error("[Fluid (set)]", `${e.name}: ${e.message}`);
  }

  return false;
}
