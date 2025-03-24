<template>
  <div class="container-fluid">
    <div class="row gx-2 align-items-center mb-3">
      <div class="col-auto ms-n2">
        <img
          src="@/assets/TMGcore-logo-v1-01.png"
          alt="TMGcore"
          width="88"
          height="88"
          loading="lazy"
        />
      </div>
      <div class="col">
        <p class="fw-bold m-0">TMGcore, Inc.</p>
        <address class="small m-0">
          {{ $store.state.properties.address.street }}
          <br />
          {{
            `${$store.state.properties.address.city}, ${$store.state.properties.address.state} ${$store.state.properties.address.zip}`
          }}
          <br />
          United States of America
        </address>
      </div>
      <div class="company-info col-auto small">
        <div class="row gx-1 align-items-center">
          <div class="col-auto">
            <p class="m-0 fw-bold text-uppercase">Email:</p>
          </div>
          <div class="col">
            <p class="m-0">{{ $store.state.properties.email }}</p>
          </div>
        </div>
        <div class="row gx-1 align-items-center">
          <div class="col-auto">
            <p class="m-0 fw-bold text-uppercase">Phone:</p>
          </div>
          <div class="col">
            <p class="m-0">{{ $store.state.properties.phone }}</p>
          </div>
        </div>
        <div class="row gx-1 align-items-center">
          <div class="col-auto">
            <p class="m-0 fw-bold text-uppercase">Fax:</p>
          </div>
          <div class="col">
            <p class="m-0">{{ $store.state.properties.fax }}</p>
          </div>
        </div>
        <div class="row gx-1 align-items-center">
          <div class="col-auto">
            <p class="m-0 fw-bold text-uppercase">Web:</p>
          </div>
          <div class="col">
            <p class="m-0">{{ $store.state.properties.web }}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="row justify-content-evenly border-top border-bottom border-secondary mb-3 py-3"
    >
      <div class="col col-6">
        <div class="row gx-2 py-1">
          <div class="col col-auto">
            <p class="m-0 text-secondary">Product:</p>
          </div>
          <div class="col">
            <p class="m-0">{{ $store.state.properties.product }}</p>
          </div>
        </div>
        <div class="row gx-2 py-1">
          <div class="col col-auto">
            <p class="m-0 text-secondary">Version:</p>
          </div>
          <div class="col">
            <p class="m-0">{{ $store.state.properties.version }}</p>
          </div>
        </div>
        <div class="row gx-2 py-1">
          <div class="col col-auto">
            <p class="m-0 text-secondary">Revision:</p>
          </div>
          <div class="col">
            <p class="m-0">{{ $store.state.properties.revision }}</p>
          </div>
        </div>
        <div class="row gx-2 py-1">
          <div class="col col-auto">
            <p class="m-0 text-secondary">Electrical:</p>
          </div>
          <div class="col">
            <p class="m-0">{{ $store.state.properties.electrical }}</p>
          </div>
        </div>
        <div class="row gx-2 py-1">
          <div class="col col-auto">
            <p class="m-0 text-secondary">Dielectric Fluid:</p>
          </div>
          <div class="col">
            <p class="m-0">
              {{ $store.state.fluids[$store.state.properties.fluid] }}
            </p>
          </div>
        </div>
      </div>
      <div class="col col-6">
        <div class="row gx-2 py-1">
          <div class="col col-auto">
            <p class="m-0 text-secondary">Serial:</p>
          </div>
          <div class="col">
            <p class="m-0">{{ $store.state.properties.unitId }}</p>
          </div>
        </div>
        <div class="row gx-2 py-1">
          <div class="col col-auto">
            <p class="m-0 text-secondary">Factory:</p>
          </div>
          <div class="col">
            <p class="m-0">{{ $store.state.properties.factory }}</p>
          </div>
        </div>
        <div class="row gx-2 py-1">
          <div class="col col-auto">
            <p class="m-0 text-secondary">Date:</p>
          </div>
          <div class="col">
            <p class="m-0">{{ $store.state.properties.manufactured }}</p>
          </div>
        </div>
        <div class="row gx-2 py-1">
          <div class="col col-auto">
            <p class="m-0 text-secondary">Water:</p>
          </div>
          <div class="col">
            <p class="m-0">{{ $store.state.properties.water }}</p>
          </div>
        </div>
      </div>
    </div>
    <p class="disclaimer" v-html="$store.state.properties.disclaimer"></p>
  </div>
</template>

<script>
export default {
  name: "SystemInfo",
};
</script>

<style lang="scss" scoped>
.col-auto p {
  min-width: 70px;

  .col-6:first-child & {
    min-width: 110px;
  }

  .company-info & {
    min-width: 60px;
  }
}

.disclaimer {
  font-size: 0.625rem;
}
</style>
