<template>
  <main class="main">
    <Search @ready-state="picFilms" @select-changed="picFilms" />
    <FilmList
      :films="films"
      @select-film="takeId"
      :computedArray="computedArray"
    />
  </main>
</template>

<script>
import { picFilms } from "./mixins/fetch";
import "whatwg-fetch";
export default {
  mixins: [picFilms],
  data() {
    return {
      id: null,
      films: [],
      picked: null,
    };
  },
  components: {
    Search: () => import("./Search"),
    FilmList: () => import("./FilmList"),
  },
  computed: {
    //Преобразуем полученные данные от API
    computedArray: function() {
      const changeKey = (array) => {
        //Оставляем только 10 фильмов/сериалов, т.к. сервис - топ 10
        array = array.splice(0, 10);
        for (let key of array) {
          //Если в массиве содержится ключ first_air_date, то это сериал и выполняем для него действия
          if ("first_air_date" in key) {
            //Переименовываем ключ даты релиза сериала
            key.release_date = key.first_air_date;
            //Если ключ названия сериала пустой, то присваиваем значение оригинального названия на родном языке
            if (key.name === null) {
              key.title = key.original_name;
            } else {
              key.title = key.name;
            }
            //удялем измененные ключи, т.к. вместо них теперь выборка идет по новым ключам
            delete key.name;
            delete key.original_name;
            delete key.first_air_date;
          }
        }
        this.films = array;
        return this.films;
      };
      return changeKey(this.films);
    },
  },
  methods: {
    takeId(index) {
      this.index = index.index;
      //Выбираем id фильма
      let choosenFilm = this.films[index].id;
      this.id = choosenFilm;
      //Передаем id, тип и адрес постера выбранного фильма в App.vue
      this.$emit("show-choosen", {
        id: this.id,
        picked: this.picked,
        image: this.films[index].poster_path,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.main {
  * {
    font-size: 16px;
  }
}
</style>
