<template>
  <div
    class="modal fade"
    ref="powerOffModal"
    tabindex="-1"
    data-bs-backdrop="static"
    aria-labelledby="modalTitle"
    aria-describedby="modalBody"
    aria-hidden="true"
    role="alertdialog"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="text-danger text-center">
          <span class="bi bi-exclamation-octagon-fill fs-80"></span>
          <h4
            class="modal-title fw-bold mx-auto text-uppercase"
            id="modalTitle"
          >
            Test Breaker Trip
          </h4>
        </div>
        <div class="modal-body text-black text-center px-4" id="modalBody">
          <p class="m-0">
            This button is intended to test the trip functionality of the
            primary breaker. You must manually reset the breaker after
            performing this action. This will immediately disrupt power to the
            miners and equipment inside of the tank, while other controls
            equipment will continue to function.
          </p>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <tmg-button
            id="btn_trip"
            class="fs-5 text-uppercase"
            btn-style="danger"
            spinner-size="medium"
            :disabled="
              disabled ||
              $store.state.status.pduPowerState === 10 ||
              $store.state.status.pduPowerState === 2
            "
            :loading="disabled"
            @click="shutDown()"
          >
            Trip Breaker
          </tmg-button>
          <button
            ref="cancel_ref"
            type="button"
            class="btn btn-outline-secondary fs-5 text-uppercase"
            @click="hideModal()"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import TmgButton from "@/components/TmgButton.vue";
import { powerOff } from "@/api";

export default {
  name: "PowerOffDialog",
  components: { TmgButton },
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      modal: null,
      disabled: false,
    };
  },
  watch: {
    value: function (val) {
      val === true ? this.modal.show() : this.modal.hide();
      this.$emit("input", val);
    },
  },
  methods: {
    async shutDown() {
      this.disabled = true;
      await powerOff();
      this.disabled = false;
      this.hideModal();
    },
    hideModal() {
      this.$emit("input", false);
    },
    focusCancel() {
      this.$refs.cancel_ref.focus();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.powerOffModal);
    this.$refs.powerOffModal.addEventListener(
      "hidden.bs.modal",
      this.hideModal,
      {
        passive: true,
      }
    );
    this.$refs.powerOffModal.addEventListener(
      "shown.bs.modal",
      this.focusCancel,
      {
        passive: true,
      }
    );
  },
  beforeDestroy() {
    this.$refs.powerOffModal.removeEventListener(
      "hidden.bs.modal",
      this.hideModal,
      {
        passive: true,
      }
    );
    this.$refs.powerOffModal.removeEventListener(
      "shown.bs.modal",
      this.focusCancel,
      {
        passive: true,
      }
    );
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/globalvars.scss";

.fs-80 {
  font-size: 5rem;
}

.modal-content {
  border-top: 1rem solid $danger;
}

.btn {
  line-height: 1.8;
  padding: 0.375rem 2.25rem;
}

.btn-outline-secondary {
  border-color: rgb(109, 109, 109);
  color: rgb(109, 109, 109);
}
</style>
