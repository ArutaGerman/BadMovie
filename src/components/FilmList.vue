<template>
  <div class="container">
    <div
      v-for="(item, index) in computedArray"
      :key="index"
      class="film-wrapper row"
    >
      <div
        v-if="
          `http://image.tmdb.org/t/p/w500${item.poster_path}` !=
            `http://image.tmdb.org/t/p/w500null`
        "
        class="film__preview col-12 col-md-3"
      >
        <img
          :src="`http://image.tmdb.org/t/p/w500${item.poster_path}`"
          alt="Poster image"
        />
      </div>
      <div v-else class="film__preview col-12 col-md-3">
        <img
          src="../assets/images/1544115393_poster_none.png"
          alt="Poster image"
        />
      </div>
      <div class="film__data_wrap col-12 col-md-9">
        <div class="film__data-inner">
          <span> Название: </span>
          <span> {{ item.title }} </span>
        </div>
        <div class="film__data-inner">
          <span> Дата премьеры: </span>
          <span> {{ item.release_date }} </span>
        </div>
        <div class="film__data-inner">
          <span> Описание: </span>
          <span> {{ item.overview | cut() }} </span>
        </div>
      </div>
      <DetailsBtn @select-index="showMe(index)" />
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  props: ["films", "id", "computedArray"],
  data() {
    return {};
  },
  components: {
    DetailsBtn: () => import("./buttons/DetailsBtn")
  },
  filters: {
    //Обрезает текст и добавляет многоточие в конце в зависимости от разрешения
    cut: function(text, length, suffix) {
      suffix = "...";
      length = 200;
      if (text.length > length) {
        if (window.offsetwidth > 576) {
          return text.substring(0, length) + suffix;
        } else {
          return text.substring(0, 140) + suffix;
        }
      } else if (text.length == null || text.length == 0) {
        return "Sorry! We haven't a description, but you can write it yourself!";
      } else {
        return text;
      }
    }
  },
  methods: {
    //Передаем индекс выбранного фильма при нажатии на DetailsBtn
    showMe(index) {
      this.$emit("select-film", index);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/css/_mixins_style";
.film-wrapper {
  padding: 1rem 0;

  @include resolve(sm) {
    padding: 0;
  }

  .film__preview {
    height: 12rem;
    width: auto;
    text-align: center;
    @include resolve(lg) {
      height: 16rem;
    }

    img {
      height: 100%;
    }
  }

  .film__data_wrap {
    padding: 0.5rem 0;

    .film__data-inner {
      padding-top: 0.5rem;

      span:first-child {
        font-weight: bold;
        font-size: 0.875rem;
      }
    }
  }
  hr {
    width: 60%;
    margin: 1rem auto;
    @include resolve(sm) {
      width: 88%;
    }
  }
}
</style>
