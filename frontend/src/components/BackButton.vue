<template>
  <div class="btn-back-wrapper d-inline-block position-relative">
    <a
      href="javascript:void(0)"
      class="btn d-flex p-0 m-0"
      @click="$router.back()"
    >
      <span class="bi bi-arrow-left-circle text-white btn-back"></span>
    </a>
  </div>
</template>

<script>
export default {
  name: "BackButton",
};
</script>

<style lang="scss" scoped>
.btn-back-wrapper {
  z-index: 1;

  .btn {
    line-height: 1;
  }

  .btn-back {
    font-size: 3rem;
  }
}
</style>
