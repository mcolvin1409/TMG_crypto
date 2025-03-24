<template>
  <div class="h-100 pt-2">
    <back-button class="float-start pe-4" />
    <servers />
  </div>
</template>

<script>
// @ is an alias to /src
import Servers from "@/components/Servers.vue";
import BackButton from "@/components/BackButton.vue";

export default {
  name: "VServers",
  components: {
    Servers,
    BackButton,
  },
};
</script>
