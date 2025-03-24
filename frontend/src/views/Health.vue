<template>
  <div class="d-flex mt-3">
    <back-button class="pe-4" />
    <health class="flex-grow-1" />
  </div>
</template>

<script>
// @ is an alias to /src
import Health from "@/components/Health.vue";
import BackButton from "@/components/BackButton.vue";
import events from "@/mixins/events.js";

export default {
  name: "VHealth",
  components: { Health, BackButton },
  mixins: [events],
};
</script>
