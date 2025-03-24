<template>
  <form
    id="lockSettings"
    name="lockSettings"
    method="POST"
    @submit.prevent="changePassword($event)"
    novalidate
  >
    <div class="row mb-2">
      <div class="col">
        <tmg-textbox
          type="password"
          id="currentPassword"
          label="Current Password"
          minlength="4"
          maxlength="254"
          pattern="[a-zA-Z0-9!@#$%^\u0026*()\-=[\];',./_+{}|:\u0022?`~ ]{4,254}"
          :disabled="checkingPassword"
          v-model="auth.currentPassword"
          :showFocus="activeElementId === 'currentPassword'"
          :valid="validPassword"
          validMessage="The password is incorrect"
          @input="onPasswordInput($event)"
          @focus="onInputFocus($event)"
        ></tmg-textbox>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col">
        <tmg-textbox
          type="password"
          id="newPassword"
          label="Change Password"
          minlength="4"
          maxlength="254"
          pattern="[a-zA-Z0-9!@#$%^\u0026*()\-=[\];',./_+{}|:\u0022?`~ ]{4,254}"
          :disabled="checkingPassword"
          v-model="auth.newPassword"
          :showFocus="activeElementId === 'newPassword'"
          :valid="validNewPassword.isValid"
          :validMessage="validNewPassword.message"
          @input="onInput($event)"
          @focus="onInputFocus($event)"
        >
          <span class="d-block help-text small lh-sm">
            The password must be between
            <span class="text-nowrap">4 and 254</span>
            characters in length, inclusive.
          </span>
        </tmg-textbox>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <tmg-textbox
          type="password"
          id="confirmPassword"
          label="Confirm Password"
          minlength="4"
          maxlength="254"
          pattern="[a-zA-Z0-9!@#$%^\u0026*()\-=[\];',./_+{}|:\u0022?`~ ]{4,254}"
          :disabled="checkingPassword"
          v-model="auth.confirmPassword"
          :showFocus="activeElementId === 'confirmPassword'"
          :valid="validConfirmPassword"
          validMessage="New Password and Confirm Password do not match"
          @input="onInput($event)"
          @focus="onInputFocus($event)"
        ></tmg-textbox>
      </div>
    </div>
    <div class="d-flex justify-content-between mt-3 mb-2">
      <tmg-button
        type="submit"
        btn-style="primary"
        spinner-size="small"
        :disabled="checkingPassword"
        :loading="checkingPassword"
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
import { updatePassword } from "@/api";

export default {
  name: "LockScreenDialog",
  components: {
    TmgTextbox,
    TmgButton,
  },
  mixins: [keyboard, validation],
  data() {
    return {
      auth: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      checkingPassword: false,
    };
  },
  computed: {
    validNewPassword() {
      const isValid = this.checkPassword(this.auth.newPassword);
      let message = "";

      if (!isValid) {
        if (this.auth.newPassword.length < 4) {
          message = "The password must have a minimum of 4 characters";
        } else if (this.auth.newPassword.length > 254) {
          message = "The password length cannot exceed 254 characters";
        } else {
          message = "The password is in the wrong format";
        }
      }

      return {
        isValid,
        message,
      };
    },
    validConfirmPassword() {
      return (
        !this.formSubmitted ||
        this.auth.newPassword === this.auth.confirmPassword
      );
    },
  },
  methods: {
    async changePassword() {
      this.checkingPassword = true;
      this.formSubmitted = true;
      this.$emit("openKeyboard", false);

      if (await this.validatePassword(this.auth.currentPassword, false)) {
        if (this.validConfirmPassword && this.validNewPassword.isValid) {
          const result = await updatePassword(
            this.auth.currentPassword,
            this.auth.newPassword
          );

          if (result) {
            this.$emit("show", false);

            this.auth.newPassword = "";
            this.auth.confirmPassword = "";
          }
        }
      }

      this.auth.currentPassword = "";
      this.checkingPassword = false;
    },
    onChange(input) {
      if (this.activeElementId) {
        this.auth[this.activeElementId] = input;

        if (this.activeElementId === "currentPassword") {
          this.validPassword = true;
        }
      }
    },
    onKeyPress(button) {
      if (button === "{enter}") {
        this.changePassword();
      }
    },
    onPasswordInput(e) {
      this.validPassword = true;
      this.onInput(e);
    },
    restoreDefaults() {
      this.formSubmitted = false;
      this.auth.currentPassword = "";
      this.auth.newPassword = "";
      this.auth.confirmPassword = "";
      this.validPassword = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.help-text {
  color: var(--bs-gray-500);
}
</style>
