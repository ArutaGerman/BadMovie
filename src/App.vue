<template>
  <div id="app">
    <Header />
    <MainContent v-show="this.visible" @show-choosen="openDetails" />
    <ReturnBtn v-if="!this.visible" @close-detals="closeDetails" />
    <Details
      v-if="!this.visible"
      :id="id"
      :picked="picked"
      :image="image"
      :visible="this.visible"
    />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      visible: true,
      id: null,
      picked: null,
      baseFilms: [],
      image: ""
    };
  },
  components: {
    Header: () => import("./components/Header"),
    MainContent: () => import("./components/MainContent"),
    Details: () => import("./components/Details"),
    ReturnBtn: () => import("./components/buttons/ReturnBtn")
  },
  methods: {
    openDetails(param) {
      //принимаем id выбранного фильма/сериала из mainContent
      this.id = param.id;
      //принимаем тип кино или сериал из mainContent
      this.picked = param.picked;
      //принимаем адрес постера из mainContent
      this.image = param.image;
      //скрываем MainContent и показываем Details
      this.visible = !this.visible;
    },
    closeDetails() {
      this.visible = !this.visible;
    }
  }
};
</script>

<style lang="scss">
@import "./assets/css/style.scss";
.wrapper {
  & > div {
    padding: 0 0.5rem;
    width: 100%;
  }
}
</style>
