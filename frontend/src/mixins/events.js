import EventsManager from "@/events";

export default {
  mounted() {
    EventsManager.reloadEvents();
  },
};
