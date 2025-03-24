<template>
  <div
    class="receptacle-container d-flex flex-column justify-content-center h-100"
  >
    <ul
      id="receptacle-tabs"
      class="nav nav-tabs border-bottom-0"
      role="tablist"
    >
      <li class="nav-item" role="presentation">
        <button
          id="rack1-tab"
          class="nav-link px-4 active"
          type="button"
          data-bs-toggle="tab"
          data-bs-target="#rack1"
          role="tab"
          aria-controls="rack1"
          aria-selected="true"
        >
          Rack 1
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          id="rack2-tab"
          class="nav-link px-4"
          type="button"
          data-bs-toggle="tab"
          data-bs-target="#rack2"
          role="tab"
          aria-controls="rack2"
          aria-selected="false"
        >
          Rack 2
        </button>
      </li>
    </ul>
    <div class="tab-content rounded-bottom">
      <div
        id="rack1"
        class="tab-pane px-3 py-2 active"
        role="tabpanel"
        aria-labelledby="rack1-tab"
      >
        <receptacle-layout />
      </div>
      <div
        id="rack2"
        class="tab-pane px-3 py-2"
        role="tabpanel"
        aria-labelledby="rack2-tab"
      >
        <receptacle-layout />
      </div>
    </div>
  </div>
</template>

<script>
import ReceptacleLayout from "@/components/ReceptacleLayout";

export default {
  name: "Receptacles",
  components: { ReceptacleLayout },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/globalvars.scss";

.tab-content {
  background-color: $med-blue-lt;
  border-top-right-radius: 0.25rem;
}
</style>
