<template>
  <form action="#" method="POST" name="rating" class="container">
    <div v-for="(item, idx) in films" :key="idx" class="main-film_wrapper row">
      <div class="main-film row">
        <div
          v-if="
            `http://image.tmdb.org/t/p/w500${item.poster_path}` !=
              `http://image.tmdb.org/t/p/w500null`
          "
          class="main-film__preview col-2"
        >
          <img
            :src="`http://image.tmdb.org/t/p/w500${item.poster_path}`"
            width="100%"
            alt=""
          />
        </div>
        <div v-else class="main-film__preview col-2">
          <img
            src="../assets/images/1544115393_poster_none.png"
            width="100%"
            alt=""
          />
        </div>
        <div class="main-film__data_wrap col-10">
          <div v-if="item.title" class="film__title">
            Название: {{ item.title }}
          </div>
          <div v-else class="film__title">
            Название: {{ item.original_name }}
          </div>
          <div class="film__date">Дата премьеры: {{ item.release_date }}</div>
          <div class="film__overview">
            Описание: {{ item.overview | cut() }}
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: ["films"],
  data() {
    return {};
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
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.main-film {
  width: 100%;
  margin: 1rem 0;
  cursor: pointer;

  .main-film__data_wrap div {
    margin-top: 0.5rem;

    .film__overview {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
