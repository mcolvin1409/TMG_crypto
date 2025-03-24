import { comparePassword } from "@/api";

export default {
  data() {
    return {
      formSubmitted: false,
      validPassword: true,
    };
  },
  methods: {
    checkPassword(password) {
      if (!this.formSubmitted) {
        return (this.validPassword = true);
      }

      const passwordRegex =
        /^[a-zA-Z0-9!@#$%^&*()\-=[\];',./_+{}|:"?`~ ]{4,254}$/iu;
      return passwordRegex.test(password);
    },
    async validatePassword(password, showToast = true) {
      let result = false;

      try {
        if (!this.checkPassword(password)) {
          return (this.validPassword = false);
        }

        result = await comparePassword(password, showToast);
      } catch (e) {
        // Not used
      }

      return (this.validPassword = result);
    },
    validateIPAddress(ipAddr) {
      if (!this.formSubmitted) {
        return true;
      }

      const ipRegex =
        /^(?:(?:25[0-5]|(?:2[0-4]|1\d|[1-9]|)\d)(?:\.(?!$)|$)){4}$/iu;
      return ipRegex.test(ipAddr);
    },
  },
};
