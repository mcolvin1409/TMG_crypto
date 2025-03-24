<template>
  <div
    class="h-100 d-flex flex-column align-items-center justify-content-between position-relative"
    id="lock-screen"
  >
    <div
      class="lock-circle border border-white rounded-circle mt-4 w-100 text-center"
    >
      <div
        :class="[
          'img-container position-relative',
          hasAspectRatio ? 'pt-0' : '',
        ]"
      >
        <div
          :class="[
            hasAspectRatio
              ? 'square'
              : 'position-absolute bottom-0 end-0 start-0 top-0',
          ]"
        >
          <button
            v-show="timedout"
            class="lock-button btn bg-transparent h-auto w-auto p-0 m-0 border border-0"
            @click="lockTimer()"
          >
            <img
              src="@/assets/locked.svg"
              alt=""
              class="m-auto mh-100 mw-100 pe-none"
              width="110"
              height="176"
            />
          </button>
          <form
            v-show="!timedout"
            id="lockScreen"
            name="lockScreen"
            method="POST"
            class="h-100 flex-column align-items-center justify-content-center"
            @submit.prevent="confirmUnlock($event)"
            novalidate
          >
            <tmg-textbox
              ref="input"
              type="password"
              id="password"
              label="Password"
              minlength="4"
              maxlength="254"
              pattern="[a-zA-Z0-9!@#$%^\u0026*()\-=[\];',./_+{}|:\u0022?`~ ]{4,254}"
              :light="true"
              :disabled="checkingPassword"
              v-model="password"
              :showFocus="isKeyboardOpen"
              :valid="validPassword"
              validMessage="The password is incorrect"
              invalidFeedbackStyle="block"
              @input="inputListener()"
              @focus="onFocus($event)"
            ></tmg-textbox>
            <tmg-button
              id="lockSubmit"
              type="submit"
              class="fs-4"
              icon="bi-unlock-fill"
              btn-style="primary"
              spinner-size="medium"
              :disabled="checkingPassword"
              :loading="checkingPassword"
            ></tmg-button>
          </form>
        </div>
      </div>
    </div>
    <keyboard
      ref="keyboard"
      v-if="isKeyboardOpen"
      @onChange="onChange"
      @onKeyPress="onKeyPress"
      pageName="LockScreen"
    />
    <h3 class="h1 fw-bold text-primary mb-0">
      {{ $store.state.properties.version }}
    </h3>
    <div class="text-center pb-2">
      <p class="m-0">
        Software Version: {{ $store.state.properties.swversion }}<br />
        Hardware Revision: {{ $store.state.properties.revision }}
      </p>
      <p class="mt-3 mb-0">
        <span class="powered d-block">Powered by</span>
        <img
          class="h-auto"
          src="@/assets/tmgcore-logo-v2.svg"
          alt="TMGcore"
          width="921"
          height="231"
          loading="lazy"
        />
      </p>
    </div>
  </div>
</template>

<script>
import TmgTextbox from "@/components/TmgTextbox.vue";
import TmgButton from "@/components/TmgButton.vue";
import Keyboard from "@/components/keyboards/AlphaNumericKeyboard.vue";
import validation from "@/mixins/validationRules.js";

export default {
  name: "LockScreen",
  components: {
    TmgTextbox,
    TmgButton,
    Keyboard,
  },
  mixins: [validation],
  data() {
    return {
      checkingPassword: false,
      password: "",
      showToast: false,
      lockTimeout: -1,
      inputDelay: -1,
      timedout: true,
      isKeyboardOpen: false,
    };
  },
  watch: {
    isKeyboardOpen(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.keyboard.setKeyboardInput(this.password);
        });
      }
    },
  },
  methods: {
    hideKeyboard(e) {
      // If we click on something that isn't the lock button
      // or the password text box, or a virtual keyboard key,
      // then hide the keyboard.

      if (
        !e.target?.matches?.(".lock-button, input.form-control-lg, .hg-button")
      ) {
        this.isKeyboardOpen = false;
      }
    },
    clearTimeouts() {
      clearTimeout(this.lockTimeout);
      clearTimeout(this.inputDelay);
    },
    hasAspectRatio() {
      return CSS && CSS.supports("aspect-ratio", "1");
    },
    lockTimer() {
      this.timedout = false;
      this.isKeyboardOpen = true;

      this.resetTimeout();
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    onChange(input) {
      this.password = input;
      this.inputListener();
    },
    onKeyPress(button) {
      this.isKeyboardOpen = true;

      if (button === "{enter}") {
        this.confirmUnlock();
      }
    },
    onFocus() {
      this.isKeyboardOpen = true;
    },
    resetLock() {
      this.timedout = true;
      this.password = "";
      this.validPassword = true;
      this.isKeyboardOpen = false;

      const id = document.activeElement.id;
      if (id === "password" || id === "lockSubmit") {
        document.activeElement.blur();
      }
    },
    resetTimeout() {
      this.lockTimeout = setTimeout(this.resetLock, 40000);
    },
    async confirmUnlock() {
      this.clearTimeouts();

      this.checkingPassword = true;
      this.formSubmitted = true;
      this.isKeyboardOpen = false;

      if (await this.validatePassword(this.password)) {
        this.$store.commit("setLockScreen", false);
        this.formSubmitted = false;
        this.timedout = true;
      } else {
        this.resetTimeout();
      }

      this.password = "";
      this.checkingPassword = false;

      this.$nextTick(() => {
        if (this.$store.state.showLockScreen) {
          this.$refs.input.focus();
        }
      });
    },
    inputListener() {
      this.clearTimeouts();

      this.validPassword = true;
      this.$refs.keyboard.setKeyboardInput(this.password);
      this.inputDelay = setTimeout(this.resetTimeout, 400);
    },
  },
  created() {
    document.addEventListener("click", this.hideKeyboard, {
      passive: true,
    });
  },
  beforeDestroy() {
    this.clearTimeouts();
    document.removeEventListener("click", this.hideKeyboard, {
      passive: true,
    });
  },
};
</script>

<style lang="scss" scoped>
.lock-circle {
  border-width: 0.5rem !important;
  max-width: 16rem;
  padding: 2rem;

  > .img-container {
    padding-top: 100%;
  }
}

.lock-button {
  appearance: none;
}

#lockScreen {
  display: flex;
}

.powered {
  font-size: 0.875rem;

  + img {
    max-width: 120px;
  }
}

@supports (aspect-ratio: 1) {
  .square {
    aspect-ratio: 1;
  }
}
</style>
