<template>
  <div
    class="toast text-white border-0"
    :class="setColor"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex align-items-center">
      <div class="toast-body">
        <p class="d-flex align-items-center m-0">
          <i class="bi fs-4 me-2" :class="setIcon"></i>
          {{ message }}
        </p>
      </div>
      <button
        type="button"
        class="btn-close btn-close-white me-2 ms-auto"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TmgToast",
  props: {
    type: {
      type: String,
      default: "Info", // Info, Success, Error
    },
    message: { type: String },
  },
  computed: {
    setColor() {
      switch (this.type) {
        case "Success":
          return "bg-success";
        case "Error":
          return "bg-danger";
        default:
          return "bg-primary";
      }
    },
    setIcon() {
      switch (this.type) {
        case "Success":
          return "bi-check-circle";
        case "Error":
          return "bi-exclamation-circle";
        default:
          return "bi-info-circle";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
