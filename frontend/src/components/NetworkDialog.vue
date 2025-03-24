<template>
  <form
    id="networkSettings"
    name="networkSettings"
    method="POST"
    @submit.prevent="saveNetworkSettings($event)"
    novalidate
  >
    <div class="row mb-2">
      <div class="col">
        <div id="dhcp-switch-form" class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="dhcpSwitch"
            name="darkmode"
            value="yes"
            v-model="network.dhcp"
            @focus="$emit('openKeyboard', false)"
          />
          <label class="form-label label-text" for="dhcpSwitch">DHCP</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <tmg-textbox
          id="address"
          placeholder="___.___.___.___"
          type="text"
          label="IP Address"
          :disabled="!!network.dhcp"
          v-model="network.address"
          :showFocus="activeElementId === 'address'"
          :valid="!!network.dhcp || validateIPAddress(network.address)"
          validMessage="Invalid IP adress entered"
          @input="onInput($event)"
          @focus="onInputFocus($event)"
        ></tmg-textbox>
      </div>
    </div>
    <div class="row gx-5">
      <div class="col-6">
        <tmg-textbox
          id="gateway"
          placeholder="___.___.___.___"
          type="text"
          label="Gateway"
          :disabled="!!network.dhcp"
          v-model="network.gateway"
          :showFocus="activeElementId === 'gateway'"
          :valid="!!network.dhcp || validateIPAddress(network.gateway)"
          validMessage="Invalid gateway adress entered"
          @input="onInput($event)"
          @focus="onInputFocus($event)"
        ></tmg-textbox>
      </div>
      <div class="col-6">
        <div class="form-group mb-3">
          <label
            for="subnet"
            class="form-label text-white"
            :class="{ labeltextdisabled: !!network.dhcp }"
          >
            CIDR Subnet Mask
          </label>
          <select
            id="subnetMask"
            class="form-select form-select-lg text-white"
            v-model="network.subnetMask"
            :disabled="!!network.dhcp"
            @focus="$emit('openKeyboard', false)"
          >
            <option
              v-for="({ text, value }, index) in cidrMasks"
              :key="index"
              :value="value"
              :selected="network.subnetMask === value"
            >
              {{ text }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row gx-5">
      <div class="col-6">
        <tmg-textbox
          id="dns1"
          placeholder="___.___.___.___"
          type="text"
          label="DNS 1"
          :disabled="!!network.dhcp"
          v-model="network.dns1"
          :showFocus="activeElementId === 'dns1'"
          :valid="!!network.dhcp || validateIPAddress(network.dns1)"
          validMessage="Invalid IP adress entered"
          @input="onInput($event)"
          @focus="onInputFocus($event)"
        ></tmg-textbox>
      </div>
      <div class="col-6">
        <tmg-textbox
          id="dns2"
          placeholder="___.___.___.___"
          type="text"
          label="DNS 2"
          :disabled="!!network.dhcp"
          v-model="network.dns2"
          :showFocus="activeElementId === 'dns2'"
          :valid="
            !!network.dhcp || !network.dns2 || validateIPAddress(network.dns2)
          "
          validMessage="Invalid IP adress entered"
          @input="onInput($event)"
          @focus="onInputFocus($event)"
        ></tmg-textbox>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <tmg-textbox
          id="password"
          type="password"
          label="Validate Password"
          minlength="4"
          maxlength="254"
          pattern="[a-zA-Z0-9!@#$%^\u0026*()\-=[\];',./_+{}|:\u0022?`~ ]{4,254}"
          v-model="password"
          :showFocus="activeElementId === 'password'"
          :valid="validPassword"
          validMessage="The password is incorrect"
          @input="onPasswordInput($event)"
          @focus="onInputFocus($event)"
        ></tmg-textbox>
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
import { getNetworkSettings, setNetworkSettings } from "@/api";

export default {
  name: "NetworkDialog",
  components: { TmgTextbox, TmgButton },
  mixins: [keyboard, validation],
  data() {
    return {
      password: "",
      network: {
        dhcp: false,
        address: "",
        port: "",
        subnetMask: "24",
        gateway: "",
        dns1: "",
        dns2: "",
      },
      cidrMasks: [
        { text: "/32 255.255.255.255", value: "32" },
        { text: "/31 255.255.255.254", value: "31" },
        { text: "/30 255.255.255.252", value: "30" },
        { text: "/29 255.255.255.248", value: "29" },
        { text: "/28 255.255.255.240", value: "28" },
        { text: "/27 255.255.255.224", value: "27" },
        { text: "/26 255.255.255.192", value: "26" },
        { text: "/25 255.255.255.128", value: "25" },
        { text: "/24 255.255.255.0", value: "24" },
        { text: "/23 255.255.254.0", value: "23" },
        { text: "/22 255.255.252.0", value: "22" },
        { text: "/21 255.255.248.0", value: "21" },
        { text: "/20 255.255.240.0", value: "20" },
        { text: "/19 255.255.224.0", value: "19" },
        { text: "/18 255.255.192.0", value: "18" },
        { text: "/17 255.255.128.0", value: "17" },
        { text: "/16 255.255.0.0", value: "16" },
        { text: "/15 255.254.0.0", value: "15" },
        { text: "/14 255.252.0.0", value: "14" },
        { text: "/13 255.248.0.0", value: "13" },
        { text: "/12 255.240.0.0", value: "12" },
        { text: "/11 255.224.0.0", value: "11" },
        { text: "/10 255.192.0.0", value: "10" },
        { text: "/9 255.128.0.0", value: "9" },
        { text: "/8 255.0.0.0", value: "8" },
        { text: "/7 254.0.0.0", value: "7" },
        { text: "/6 252.0.0.0", value: "6" },
        { text: "/5 248.0.0.0", value: "5" },
        { text: "/4 240.0.0.0", value: "4" },
        { text: "/3 224.0.0.0", value: "3" },
        { text: "/2 192.0.0.0", value: "2" },
        { text: "/1 128.0.0.0", value: "1" },
      ],
      loading: false,
      restoreDefaultData: true,
      rules: {
        validateSubnetMask: (m) => {
          if (!this.formSubmitted) {
            return true;
          }

          const num = parseInt(m, 10);
          return Number.isFinite(num) && num >= 1 && num <= 32;
        },
      },
    };
  },
  computed: {
    fullAddress() {
      const port = this.network.port ? `:${this.network.port}` : "";
      return `${this.network.address}${port}${
        this.network.subnetMask ? `/${this.network.subnetMask}` : ""
      }`;
    },
    isValid() {
      return (
        this.network.dhcp ||
        (this.validateIPAddress(this.network.address) &&
          this.rules.validateSubnetMask(this.network.subnetMask) &&
          this.validateIPAddress(this.network.gateway) &&
          this.validateIPAddress(this.network.dns1) &&
          (!this.network.dns2 || this.validateIPAddress(this.network.dns2)))
      );
    },
  },
  methods: {
    async saveNetworkSettings() {
      this.loading = true;
      this.formSubmitted = true;
      this.$emit("openKeyboard", false);

      if ((await this.validatePassword(this.password)) && this.isValid) {
        const settings = {
            dhcp: this.network.dhcp,
            address: this.fullAddress,
            gateway: this.network.gateway,
            dns1: this.network.dns1,
            dns2: this.network.dns2,
          },
          result = await setNetworkSettings(settings);

        if (result) {
          this.$store.commit("setNetworkSettings", settings);

          this.restoreDefaultData = false;
          this.formSubmitted = false;

          this.$emit("show", false);
        }
      }

      this.password = "";
      this.loading = false;
    },
    async initializeNetworkSettings() {
      const res = await getNetworkSettings();
      this.$store.commit("setNetworkSettings", res);

      this.fetchNetworkSettings();
    },
    fetchNetworkSettings() {
      this.network = Object.assign(this.network, this.$store.state.network);

      const [addressWithPort, subnetMask = "24"] = this.network.address.split(
          "/",
          2
        ),
        [address, port] = addressWithPort.split(":", 2);

      this.network.address = address;
      this.network.port = port;
      this.network.subnetMask = subnetMask;
      this.password = "";
      this.validPassword = true;
    },
    onPasswordInput(e) {
      this.validPassword = true;
      this.onInput(e);
    },
    onChange(input) {
      if (this.activeElementId) {
        if (this.activeElementId === "password") {
          this.password = input;
          this.validPassword = true;
        } else {
          this.network[this.activeElementId] = input;
        }
      }
    },
    onKeyPress(button) {
      if (button === "{enter}") {
        this.saveNetworkSettings();
      }
    },
    restoreDefaults() {
      if (this.restoreDefaultData) {
        this.fetchNetworkSettings();
      }

      this.restoreDefaultData = true;
      this.formSubmitted = false;
    },
  },
  created() {
    this.initializeNetworkSettings();
  },
};
</script>

<style lang="scss" scoped>
.form-select {
  &[disabled] {
    --bs-text-opacity: 0.54;
  }
}

.labeltextdisabled {
  --bs-text-opacity: 0.2;
}
</style>
