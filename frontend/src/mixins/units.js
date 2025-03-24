import store from "@/store";

export default {
  computed: {
    isComputeCore() {
      return store.state.properties.unitType === 11;
    },
    isCryptoCore() {
      const allCryptoCoreUnits = [8, 9, 10]; // Check productList.json for complete list
      return allCryptoCoreUnits.includes(store.state.properties.unitType);
    },
  },
};
