<template>
  <div class="container-fluid px-0 h-100">
    <ul id="pills-tab" class="nav nav-pills nav-justified mb-3" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          id="pills-racks-tab"
          class="nav-link fs-5 fw-bold px-4 active"
          type="button"
          data-bs-toggle="pill"
          data-bs-target="#pills-racks"
          role="tab"
          aria-controls="pills-racks"
          aria-selected="true"
        >
          Racks
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          id="pills-receptacles-tab"
          class="nav-link fs-5 fw-bold px-4"
          type="button"
          data-bs-toggle="pill"
          data-bs-target="#pills-receptacles"
          role="tab"
          aria-controls="pills-receptacles"
          aria-selected="false"
        >
          Receptacles
        </button>
      </li>
    </ul>
    <div id="pills-tabContent" class="tab-content">
      <div
        id="pills-racks"
        class="tab-pane h-100 active"
        role="tabpanel"
        aria-labelledby="pills-racks-tab"
      >
        <racks :racks-data="racksData" />
      </div>
      <div
        id="pills-receptacles"
        class="tab-pane h-100"
        role="tabpanel"
        aria-labelledby="pills-receptacles-tab"
      >
        <receptacles />
      </div>
    </div>
  </div>
</template>

<script>
import Racks from "@/components/Racks.vue";
import Receptacles from "@/components/Receptacles";

export default {
  name: "Servers",
  components: { Racks, Receptacles },
  computed: {
    racksData() {
      const temp = new Array(2);

      for (let i = 0; i < temp.length; i++) {
        const blades = new Array(24);

        for (let j = 0; j < blades.length; j++) {
          blades[j] = {
            slot: j + 1,
            nodes: j === 1 || j === 7 || j === 9 ? 4 : 8,
            hasBlade: j < 20,
            active: j < 12,
          };
        }

        temp[i] = {
          id: i + 1,
          blades,
        };
      }

      return temp;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/globalvars.scss";

.nav-item {
  border-bottom: 1px solid $med-blue-lt;
  border-top: 1px solid $med-blue-lt;

  .nav-link {
    border-radius: 0;
  }

  &:first-child {
    border-left: 1px solid $med-blue-lt;

    &,
    & .nav-link {
      border-radius: 0.25rem 0 0 0.25rem;
    }
  }

  &:last-child {
    border-right: 1px solid $med-blue-lt;

    &,
    & .nav-link {
      border-radius: 0 0.25rem 0.25rem 0;
    }
  }
}

.tab-content {
  clear: both;
  height: calc(100% - 64px);
}
</style>
