<template>
  <div class="container-fluid px-2">
    <div class="row align-items-center gx-2">
      <div class="col col-auto me-1">
        <span :class="setIcon(alerts.iaHatVersion)" class="bi fs-4"></span>
      </div>
      <div class="col">
        <p class="m-0">
          IA Hat Version <span class="bi bi-arrow-right-short"></span>
          {{ sysInfo.iaHatVersion }}
        </p>
      </div>
    </div>
    <div class="row align-items-center gx-2">
      <div class="col col-auto me-1">
        <span :class="setIcon(alerts.rtdHatVersion)" class="bi fs-4"></span>
      </div>
      <div class="col">
        <p class="m-0">
          RTD Hat Version <span class="bi bi-arrow-right-short"></span>
          {{ sysInfo.rtdHatVersion }}
        </p>
      </div>
    </div>
    <div class="row align-items-center gx-2">
      <div class="col col-auto me-1">
        <span
          :class="setIcon(alerts.controlIoCpuBoardVoltage)"
          class="bi fs-4"
        ></span>
      </div>
      <div class="col">
        <p class="m-0">
          OTTOcontrol CPU Board Voltage
          <span class="bi bi-arrow-right-short"></span>
          {{ this.numberFormatter.format(sysInfo.controlIoCpuBoardVoltage) }} V
        </p>
      </div>
    </div>
    <div class="row align-items-center gx-2">
      <div class="col col-auto me-1">
        <span
          :class="setIcon(alerts.controlIoBoardVoltage)"
          class="bi fs-4"
        ></span>
      </div>
      <div class="col">
        <p class="m-0">
          OTTOcontrol I/O Board Voltage
          <span class="bi bi-arrow-right-short"></span>
          {{ this.numberFormatter.format(sysInfo.controlIoBoardVoltage) }} V
        </p>
      </div>
    </div>
    <div class="row align-items-center gx-2">
      <div class="col col-auto me-1">
        <span
          :class="setIcon(alerts.controlIoCpuTemperature)"
          class="bi fs-4"
        ></span>
      </div>
      <div class="col">
        <p class="m-0">
          OTTOcontrol I/O CPU Temperature
          <span class="bi bi-arrow-right-short"></span>
          {{ this.numberFormatter.format(sysInfo.controlIoCpuTemperature) }} °C
        </p>
      </div>
    </div>
    <div class="row align-items-center gx-2">
      <div class="col col-auto me-1">
        <span :class="setIcon(alerts.totalSystemMemory)" class="bi fs-4"></span>
      </div>
      <div class="col">
        <p class="m-0">
          Total System Memory <span class="bi bi-arrow-right-short"></span>
          {{ this.numberFormatter.format(sysInfo.totalSystemMemory) }} kB
        </p>
      </div>
    </div>
    <div class="row align-items-center gx-2">
      <div class="col col-auto me-1">
        <span :class="setIcon(alerts.freeSystemMemory)" class="bi fs-4"></span>
      </div>
      <div class="col">
        <p class="m-0">
          Free System Memory <span class="bi bi-arrow-right-short"></span>
          {{ this.numberFormatter.format(sysInfo.freeSystemMemory) }} kB
        </p>
      </div>
    </div>
    <div class="row align-items-center gx-2">
      <div class="col col-auto me-1">
        <span
          :class="setIcon(alerts.totalSystemStorage)"
          class="bi fs-4"
        ></span>
      </div>
      <div class="col">
        <p class="m-0">
          Total System Storage <span class="bi bi-arrow-right-short"></span>
          {{ this.numberFormatter.format(sysInfo.totalSystemStorage) }} kB
        </p>
      </div>
    </div>
    <div class="row align-items-center gx-2">
      <div class="col col-auto me-1">
        <span :class="setIcon(alerts.freeSystemStorage)" class="bi fs-4"></span>
      </div>
      <div class="col">
        <p class="m-0">
          Free System Storage <span class="bi bi-arrow-right-short"></span>
          {{ this.numberFormatter.format(sysInfo.freeSystemStorage) }} kB
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import EventsManager from "@/events";

export default {
  name: "Health",
  data() {
    return {
      numberFormatter: new Intl.NumberFormat(navigator.language, {
        maximumFractionDigits: 2,
        useGrouping: "always",
      }),
      sysInfo: {
        iaHatVersion: "0.0.0",
        rtdHatVersion: "0.0.0",
        controlIoCpuBoardVoltage: 0,
        controlIoBoardVoltage: 0,
        controlIoCpuTemperature: 0,
        totalSystemMemory: 0,
        freeSystemMemory: 0,
        totalSystemStorage: 0,
        freeSystemStorage: 0,
      },
      alerts: {
        iaHatVersion: false,
        rtdHatVersion: false,
        controlIoCpuBoardVoltage: false,
        controlIoBoardVoltage: false,
        controlIoCpuTemperature: false,
        totalSystemMemory: false,
        freeSystemMemory: false,
        totalSystemStorage: false,
        freeSystemStorage: false,
      },
      subscription: null,
    };
  },
  methods: {
    fetchHealth(data) {
      this.sysInfo = Object.assign(this.sysInfo, data);
    },
    setIcon(alert) {
      return alert ? "bi-x-circle text-danger" : "bi-check-circle text-success";
    },
  },
  mounted() {
    this.subscription = EventsManager.subscribe("health", this.fetchHealth);
  },
  beforeDestroy() {
    this.subscription.remove();
    console.log("[SystemInfo.clearInterval] Destroyed…");
  },
};
</script>

<style lang="scss" scoped></style>
