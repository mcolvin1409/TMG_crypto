<template>
  <div
    ref="keyboard"
    id="keyboard"
    :class="keyboardClass"
    :style="keyboardStyle"
    tabindex="-1"
  ></div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default {
  name: "SimpleKeyboard",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String,
    },
  },
  data() {
    return {
      keyboard: null,
      keyboardStyle: {
        color: "#212529",
        maxWidth: "16rem",
        transform: "translateY(75%)",
      },
    };
  },
  methods: {
    onChange(input) {
      this.$emit("onChange", input);
    },
    onKeyPress(button) {
      this.$emit("onKeyPress", button);
    },
    setKeyboardInput(val) {
      this.keyboard?.setInput?.(val);
    },
    scrollIntoView(smooth = true) {
      const el = this.$refs.keyboard;

      if (el) {
        this.$nextTick(() => {
          el.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
        });
      }
    },
  },
  mounted() {
    this.keyboard = new Keyboard(this.keyboardClass, {
      theme:
        "hg-theme-default hg-layout-numeric numeric-theme position-absolute bottom-0 start-0 end-0 mx-auto",
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      layout: {
        default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 {enter}"],
      },
      physicalKeyboardHighlight: true,
    });
  },
};
</script>

<style lang="scss" scoped></style>
