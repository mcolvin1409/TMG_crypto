<template>
  <div>
    <div class="color-map row gx-2">
      <div class="col-auto">
        <span class="bi bi-square-fill text-on"></span> On
      </div>
      <div class="col-auto">
        <span class="bi bi-square-fill text-off"></span> Off
      </div>
      <div class="col-auto">
        <span class="bi bi-square-fill text-black"></span> No Data
      </div>
      <div class="col-auto ms-2">
        <span class="bi bi-square-fill text-error"></span> Error
      </div>
    </div>
    <div class="receptacles-subcontainer row g-2">
      <div v-for="(r, idx) in rack1" :key="idx" class="col-1 text-center">
        <template v-if="r.receptacle === 'plugged-on'">
          <img
            src="@/assets/plug-plugged.svg"
            :alt="`Receptacle ${idx + 1}; State On`"
            width="64"
            height="44.3"
            loading="lazy"
          />
        </template>
        <template v-if="r.receptacle === 'off'">
          <img
            src="@/assets/plug-unplugged.svg"
            :alt="`Receptacle ${idx + 1}; State Off`"
            width="64"
            height="44.3"
            loading="lazy"
          />
        </template>
        <template v-if="r.receptacle === 'error'">
          <img
            src="@/assets/plug-error.svg"
            :alt="`Receptacle ${idx + 1}; State Error`"
            width="64"
            height="44.3"
            loading="lazy"
          />
        </template>
        <template v-if="r.receptacle === null">
          <img
            src="@/assets/plug-not-available.svg"
            :alt="`Receptacle ${idx + 1}; State Empty`"
            width="64"
            height="44.3"
            loading="lazy"
          />
        </template>
        <p class="receptacle-label mt-1 mb-0">R{{ idx + 1 }}.C13</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReceptacleLayout",
  data() {
    return {
      rack1: [
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: null },
        { receptacle: null },
        { receptacle: null },
        { receptacle: null },
        { receptacle: "off" },
        { receptacle: "off" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: null },
        { receptacle: null },
        { receptacle: null },
        { receptacle: null },
        { receptacle: "off" },
        { receptacle: "off" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: null },
        { receptacle: null },
        { receptacle: null },
        { receptacle: null },
        { receptacle: "off" },
        { receptacle: "off" },
        { receptacle: "error" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: "plugged-on" },
        { receptacle: null },
        { receptacle: null },
        { receptacle: null },
        { receptacle: null },
        { receptacle: "off" },
        { receptacle: "off" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.receptacle-label {
  font-size: 0.9375rem;
}

.color-map {
  margin-bottom: 0.75rem;

  .col-auto {
    min-width: 58px;

    &:first-child {
      margin-left: 0.1875rem;
    }
  }
}

.text-on {
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-image: linear-gradient(to bottom, #03bbec, #0387ec);
  color: transparent;
}

.text-off {
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-image: linear-gradient(to bottom, #576590, #293355);
  color: transparent;
}

.text-error {
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-image: linear-gradient(to bottom, #ff6f4b, #d1363c);
  color: transparent;
}
</style>
