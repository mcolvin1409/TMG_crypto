<template>
  <div id="app" class="d-flex flex-column h-100 text-white">
    <crypto-header :machineId="$store.state.properties.unitId" />
    <main class="h-100 py-2" style="padding-left: 20px; padding-right: 20px">
      <router-view v-if="!$store.state.showLockScreen" />
      <lock-screen v-else></lock-screen>
    </main>
    <div
      id="toastPlacement"
      class="toast-container position-absolute p-3 top-0 start-50 translate-middle-x"
    >
      <tmg-toast
        ref="toast"
        :type="$store.state.toastData.type"
        :message="$store.state.toastData.message"
      ></tmg-toast>
    </div>
  </div>
</template>

<script>
import { Toast } from "bootstrap";
import CryptoHeader from "@/components/CryptoHeader.vue";
import LockScreen from "@/components/LockScreen.vue";
import TmgToast from "@/components/TmgToast.vue";
import units from "@/mixins/units.js";
import { getSystemProps } from "@/api";
import { serversRouteConfig } from "@/router";

export default {
  name: "App",
  components: {
    CryptoHeader,
    LockScreen,
    TmgToast,
  },
  mixins: [units],
  data() {
    return {
      lock: true,
    };
  },
  methods: {
    async loadProperties() {
      const res = await getSystemProps();
      this.$store.commit("setProperties", res);

      if (this.isComputeCore) {
        this.$router.addRoute(serversRouteConfig);
      }
    },
  },
  mounted() {
    this.$store.commit(
      "setToast",
      new Toast(this.$refs.toast.$el, { delay: 7000 })
    );

    this.loadProperties();
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/globalvars.scss";
@import "@/assets/scss/app.scss";
</style>

<style lang="scss" scoped>
.toast-container {
  z-index: 1056;
}
</style>
