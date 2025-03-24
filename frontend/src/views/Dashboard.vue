<template>
  <div class="home h-100">
    <dashboard />
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from "@/components/Dashboard.vue";
import events from "@/mixins/events.js";

export default {
  name: "VDashboard",
  components: { Dashboard },
  mixins: [events],
};
</script>
