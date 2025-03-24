<template>
  <button
    :id="id"
    :type="type"
    :disabled="disabled"
    :class="styleButton"
    class="btn position-relative"
    v-on="$listeners"
  >
    <span class="d-inline-flex align-items-center justify-content-center">
      <span
        v-if="icon !== ''"
        class="d-inline-block bi"
        :class="[
          icon,
          { invisible: loading },
          { 'float-start': isActiveInlineSpinner },
        ]"
        :style="isActiveInlineSpinner ? 'width: 0px' : ''"
      ></span>
      <div class="flex-shrink-0">
        <span
          v-show="loading"
          class="spinner-border"
          :class="[styleSpinnerSize, spinnerOverlayClasses]"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </span>
      </div>
    </span>
    <span :class="{ invisible: isActiveOverlaySpinner }">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "TmgButton",
  props: {
    id: String,
    type: {
      type: String,
      default: "button",
    },
    btnStyle: {
      type: String,
      default: "primary",
    },
    spinnerSize: {
      type: String,
      default: "large",
    },
    spinnerOverlay: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "",
    },
    buttonRef: String,
  },
  computed: {
    styleButton() {
      switch (this.btnStyle) {
        case "primary":
          return "btn-primary";
        case "danger":
          return "btn-danger";
        case "none":
          return "";
        default:
          return "btn-outline-secondary";
      }
    },
    styleSpinnerSize() {
      return this.spinnerSize === "small"
        ? "spinner-border-sm"
        : this.spinnerSize === "medium"
        ? "spinner-border-md"
        : "";
    },
    isActiveInlineSpinner() {
      return this.loading && !this.spinnerOverlay;
    },
    isActiveOverlaySpinner() {
      return this.loading && this.spinnerOverlay;
    },
    spinnerOverlayClasses() {
      if (this.spinnerOverlay) {
        return "position-absolute start-0 end-0 top-0 bottom-0 m-auto";
      }

      return "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
