<template>
  <div class="racks-container d-flex flex-column justify-content-around h-100">
    <template v-for="rack of racksData">
      <div :key="rack.id" class="user-select-none">
        <ul class="nav nav-tabs border-bottom-0">
          <li class="nav-item">
            <span class="nav-link px-4 active pe-none">Rack {{ rack.id }}</span>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane rounded-bottom active">
            <div class="color-map row gx-2 mb-2">
              <div class="col-auto">
                <span class="bi bi-square-fill text-on"></span> On
              </div>
              <div class="col-auto">
                <span class="bi bi-square-fill text-primary"></span> Off
              </div>
              <div class="col-auto">
                <span class="bi bi-square-fill text-empty"></span> Empty
              </div>
            </div>
            <div class="row gx-2 flex-nowrap justify-content-between">
              <div v-for="(b, idx) of rack.blades" :key="idx" class="col">
                <div
                  :class="[
                    'rack-content',
                    'd-flex',
                    'flex-column',
                    'justify-content-between',
                    'rounded-2',
                    'py-1',
                    !b.hasBlade
                      ? 'bg-empty'
                      : !b.active
                      ? 'bg-primary'
                      : 'bg-on',
                  ]"
                >
                  <span class="fs-12 fw-bold px-1">{{ b.slot }}</span>
                  <p
                    v-if="b.hasBlade"
                    class="nodes fs-5 fw-bold lh-sm mb-0 text-center"
                  >
                    {{ b.nodes }}
                    <span class="d-block fw-normal text-uppercase">nodes</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Racks",
  props: {
    racksData: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/globalvars.scss";

$on-color: #07a717;

.tab-pane {
  background-color: $med-blue-lt;
  border-top-right-radius: 0.25rem;
  padding: 0.75rem;

  .rack-content {
    height: 4.5rem;

    .fs-12 {
      font-size: 0.75rem;
    }

    .nodes span {
      font-size: 0.5rem;
    }
  }
}

.color-map .col-auto {
  min-width: 58px;
}

.bg-on {
  background-color: $on-color;
}

.bg-empty {
  background-color: $dark-blue;
}

.text-on {
  color: $on-color;
}

.text-empty {
  color: $dark-blue;
}
</style>
