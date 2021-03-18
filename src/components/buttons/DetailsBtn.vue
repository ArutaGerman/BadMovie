<template>
  <div class="film__details col-12">
    <button class="custom-btn" @click="chooseFilm(index)">Подробнее</button>
  </div>
</template>

<script>
export default {
  props: ["index"],
  data() {
    return {};
  },
  methods: {
    chooseFilm(index) {
      this.$emit("select-index", index);
    }
  }
};
</script>

<style lang="scss">
.film__details {
  text-align: center;
}
</style>
