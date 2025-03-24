<template>
  <div
    class="modal fade"
    id="modal"
    ref="modal"
    tabindex="-1"
    data-bs-backdrop="static"
    aria-labelledby="modalTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" :style="getWidth">
      <div class="modal-content">
        <div class="modal-header border-bottom-0 text-white text-center w-100">
          <h5 class="modal-title fw-bold mx-auto" id="modalTitle">
            {{ title }}
          </h5>
          <button
            type="button"
            class="bi bi-x-square btn btn-link text-white text-decoration-none m-0 p-0"
            @click="hideModal()"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body py-3">
          <component
            ref="dialog"
            :is="component"
            @show="hideModal()"
            @openKeyboard="openKeyboard"
            @setKeyboardInput="setKeyboardInput"
            @scrollKeyboardIntoView="scrollKeyboardIntoView"
          >
            <template v-slot:keyboard>
              <component
                ref="keyboard"
                v-if="isKeyboardOpen"
                :is="getKeyboard"
                :pageName="component"
                @onChange="onChange"
                @onKeyPress="onKeyPress"
              ></component>
            </template>
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import NetworkDialog from "@/components/NetworkDialog.vue";
import SystemPropertiesDialog from "@/components/SystemPropertiesDialog.vue";
import LockScreenDialog from "@/components/LockScreenDialog.vue";
import SystemInfo from "@/components/SystemInfo.vue";
import AlarmSettingsDialog from "@/components/AlarmSettingsDialog.vue";
import AlphaNumericKeyboard from "@/components/keyboards/AlphaNumericKeyboard.vue";
import NumericKeyboard from "@/components/keyboards/NumericKeyboard.vue";

export default {
  name: "BaseModal",
  components: {
    NetworkDialog,
    SystemPropertiesDialog,
    LockScreenDialog,
    SystemInfo,
    AlarmSettingsDialog,
    AlphaNumericKeyboard,
    NumericKeyboard,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "The Modal",
    },
    component: {
      type: String,
      default: "NetworkDialog",
    },
    width: {
      type: String,
      default: "600px",
    },
  },
  data() {
    return {
      modal: null,
      isKeyboardOpen: false,
    };
  },
  computed: {
    getWidth() {
      return `max-width: ${this.width};`;
    },
    getKeyboard() {
      switch (this.component) {
        case "AlarmSettingsDialog":
          return "NumericKeyboard";
        case "NetworkDialog":
        case "SystemPropertiesDialog":
        case "LockScreenDialog":
          return "AlphaNumericKeyboard";
        default:
          return "";
      }
    },
  },
  watch: {
    value: function (val) {
      val === true ? this.modal.show() : this.modal.hide();
      this.$emit("input", val);
    },
  },
  methods: {
    hideModal() {
      this.$emit("input", false);
      this.$refs.dialog?.removeFocus?.();

      if (arguments.length === 0) {
        // Avoid potentially multiple network requests due to
        // the fact that this function gets called twice:
        // 1. When the show event gets emitted
        // 2. When the Bootstrap hidden.bs.modal event is dispatched
        this.$refs.dialog?.restoreDefaults?.();
      }
      this.isKeyboardOpen = false;
    },
    hideKeyboard(e) {
      if (e.target.closest(".modal-dialog, .simple-keyboard") === null) {
        this.$refs.dialog?.removeFocus?.();
        this.isKeyboardOpen = false;
      }
    },
    openKeyboard(open) {
      this.isKeyboardOpen = open;

      if (open) {
        this.scrollKeyboardIntoView();
      } else {
        this.$refs.dialog?.removeFocus();
      }
    },
    setKeyboardInput(input) {
      this.$nextTick(() => {
        this.$refs.keyboard?.setKeyboardInput?.(input);
      });
    },
    scrollKeyboardIntoView(smooth) {
      this.$nextTick(() => {
        requestAnimationFrame(() => {
          this.$refs.keyboard?.scrollIntoView?.(smooth);
        });
      });
    },
    onChange(input) {
      this.$refs.dialog?.onChange?.(input);
    },
    onKeyPress(button) {
      this.$refs.dialog?.onKeyPress?.(button);
    },
  },
  created() {
    document.addEventListener("focusin", this.hideKeyboard, {
      passive: true,
    });
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
    this.$refs.modal.addEventListener("hidden.bs.modal", this.hideModal, {
      passive: true,
    });
  },
  beforeDestroy() {
    this.$refs.modal.removeEventListener("hidden.bs.modal", this.hideModal, {
      passive: true,
    });
    document.removeEventListener("focusin", this.hideKeyboard, {
      passive: true,
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/globalvars.scss";
@import "@/assets/scss/app.scss";

.modal.show {
  display: flex !important;
}

.modal-header {
  background-color: $med-blue-lt;
  padding: 0.5rem 1.25rem;
}

.modal-content {
  background-color: $med-blue;
}

.modal-body,
.modal-footer {
  padding-left: 2rem;
  padding-right: 2rem;
}

.btn-link {
  font-size: 34px;
}

@include media-breakpoint-up(sm) {
  .modal-dialog {
    margin: auto;
    width: 100%;
  }
}
</style>
