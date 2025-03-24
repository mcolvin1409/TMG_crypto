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
    pageName: {
      type: String,
    },
  },
  data() {
    return {
      focusedElementId: "",
      keyboard: null,
    };
  },
  computed: {
    keyboardStyle() {
      let style = "color: #212529; max-width: 700px;";

      switch (this.pageName) {
        case "NetworkDialog":
          if (
            this.focusedElementId === "dns1" ||
            this.focusedElementId === "dns2" ||
            this.focusedElementId === "password"
          ) {
            style += " transform: translateY(100%);";
          }
          break;
        case "SystemPropertiesDialog":
          style += " transform: translateY(100%);";
          break;
        case "LockScreenDialog":
          if (
            this.focusedElementId === "newPassword" ||
            this.focusedElementId === "confirmPassword"
          ) {
            style += " transform: translateY(100%);";
          }
          break;
        default:
          break;
      }

      return style;
    },
  },
  methods: {
    onChange(input) {
      this.$emit("onChange", input);
    },
    onKeyPress(button) {
      this.$emit("onKeyPress", button);

      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === "{shift}" || button === "{lock}") {
        this.handleShift();
      }
    },
    handleShift() {
      const shiftToggle =
        this.keyboard.options.layoutName === "default" ? "shift" : "default";

      this.keyboard.setOptions({
        layoutName: shiftToggle,
      });
    },
    setFocusedElement(e) {
      if (e.target.closest(".btn, .simple-keyboard") === null) {
        this.focusedElementId = e.target.id;
      }
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
  created() {
    document.addEventListener("focusin", this.setFocusedElement, {
      passive: true,
    });
  },
  mounted() {
    this.keyboard = new Keyboard(this.keyboardClass, {
      theme:
        "hg-theme-default position-absolute start-0 end-0 bottom-0 mx-auto",
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      layout: {
        default: [
          "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
          "{bksp} q w e r t y u i o p [ ] \\",
          "{lock} a s d f g h j k l ; ' {enter}",
          "{shift} z x c v b n m , . / {shift}",
        ],
        shift: [
          "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
          "{bksp} Q W E R T Y U I O P { } |",
          '{lock} A S D F G H J K L : " {enter}',
          "{shift} Z X C V B N M < > ? {shift}",
        ],
      },
      physicalKeyboardHighlight: true,
    });
  },
  beforeDestroy() {
    document.removeEventListener("focusin", this.setFocusedElement, {
      passive: true,
    });
  },
};
</script>

<style lang="scss" scoped></style>
