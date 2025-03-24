<template>
  <div class="mb-3">
    <label
      :for="$attrs.id"
      class="form-label text-white"
      :class="{ labeltextdisabled: $attrs.disabled }"
    >
      {{ label }}
    </label>
    <span
      v-if="!valid"
      class="invalid-feedback"
      :class="getInvalidFeedbackClasses"
    >
      {{ validMessage }}
    </span>
    <input
      ref="input"
      v-bind="$attrs"
      v-on="$listeners"
      class="form-control form-control-lg w-100 text-white mb-1"
      :class="[
        { inputfieldlt: light },
        { 'is-invalid': !valid },
        { focus: showFocus },
      ]"
      :value="value"
      @input="$emit('update', $event.target.value)"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TmgTextbox",
  inheritAttrs: false,
  props: {
    label: String,
    light: Boolean,
    valid: {
      type: Boolean,
      default: true,
    },
    validMessage: String,
    value: [String, Number],
    invalidFeedbackStyle: String,
    showFocus: Boolean,
  },
  model: {
    prop: "value",
    event: "update",
  },
  computed: {
    getInvalidFeedbackClasses() {
      switch (this.invalidFeedbackStyle) {
        case "block":
          return "d-block mb-1 lh-1";
        default:
          return "d-inline ms-1";
      }
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/globalvars.scss";

.form-control {
  &[disabled] {
    --bs-text-opacity: 0.54;
  }
}

.inputfieldlt {
  background-color: $med-blue-lt;
  border-color: $med-blue-lt;

  &.focus,
  &:focus {
    background-color: $med-blue-lt;
  }
}

.labeltextdisabled {
  --bs-text-opacity: 0.2;
}
</style>
