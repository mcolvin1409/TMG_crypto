export default {
  data() {
    return {
      activeElementId: "",
    };
  },
  methods: {
    onInputFocus(e) {
      this.activeElementId = e.target.id;
      this.$emit("openKeyboard", true);
      this.$emit("setKeyboardInput", e.target.value);
    },
    onInput(e) {
      this.$emit("setKeyboardInput", e.target.value);
    },
    removeFocus() {
      for (const el of document.querySelectorAll(".focus")) {
        el.classList.remove("focus");
      }

      this.activeElementId = "";
    },
  },
};
