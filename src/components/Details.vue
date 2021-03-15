<template>
  <div class="container">
    <div class="film-wrapper row">
      <div
        v-if="
          `http://image.tmdb.org/t/p/w500${this.image}` !=
            `http://image.tmdb.org/t/p/w500null`
        "
        class="film__preview col-12 col-md-3"
      >
        <img
          :src="`http://image.tmdb.org/t/p/w500${this.image}`"
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
          <span> {{ this.filmData.title }} </span>
        </div>
        <div class="film__data-inner">
          <span> Дата премьеры: </span>
          <span> {{ this.filmData.release_date }} </span>
        </div>
        <div class="film__data-inner row">
          <div class="film__data-inner col-12 col-md-6">
            <span> Команда: </span>
            <p v-for="(item, index) in filmDataCrew" :key="index">
              {{ item.job }} : {{ item.name }}
            </p>
          </div>
          <div class="film__data-inner col-12 col-md-6">
            <span> Актеры: </span>
            <p v-for="(item, index) in filmDataCast" :key="index">
              {{ item.name }}
            </p>
          </div>
        </div>
        <div class="film__data-inner">
          <span> Описание: </span>
          <span> {{ this.filmData.overview }} </span>
        </div>
        <!-- Slider -->
        <v-sheet class="mx-auto slider-wrapper" elevation="8" max-width="100%">
          <v-slide-group v-model="model" class="pa-4" show-arrows>
            <v-slide-item
              v-for="(item, index) in filmDataImg"
              :key="index"
              v-slot="{ active, toggle }"
            >
              <v-card class="ma-4 card-wrapper" height="100" @click="toggle">
                <img :src="`http://image.tmdb.org/t/p/w500${item}`" />
                <v-row
                  class="fill-height close-cross"
                  align="center"
                  justify="center"
                >
                  <v-scale-transition>
                    <v-icon
                      v-if="active"
                      color="white"
                      size="48"
                      v-text="'mdi-close-circle-outline'"
                    ></v-icon>
                  </v-scale-transition>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
          <v-expand-transition>
            <v-sheet v-if="model != null" class="container zoom__container" tile>
              <v-row class="fill-height zoom__row">
                <img
                  :src="`http://image.tmdb.org/t/p/w500${filmDataImg[model]}`"
                  class="zoom__img"
                  alt="image"
                />
              </v-row>
            </v-sheet>
          </v-expand-transition>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "picked", "image", "visible"],

  data() {
    return {
      apiKey: "8089a6eb2db7e1328d6cacafa1b57a70",
      filmData: {},
      filmDataCrew: [],
      filmDataCast: [],
      filmDataImg: [],
      urlFilmData: null,
      urlCrewData: null,
      urlImages: null,
      model: null,
    };
  },

  mounted() {
    //разные url для получения данных картинок, фильмов и сериалов
    this.urlFilmData = `https://api.themoviedb.org/3/${this.picked}/${this.id}?api_key=${this.apiKey}`;
    this.urlCrewData = `https://api.themoviedb.org/3/${this.picked}/${this.id}/credits?api_key=${this.apiKey}`;
    this.urlImages = `https://api.themoviedb.org/3/${this.picked}/${this.id}/images?api_key=${this.apiKey}`;

    //получаем данные фильмов
    fetch(this.urlFilmData)
      .then((response) => response.json())
      .then((answer) => {
        this.filmData = { ...answer };
        //меняем имена ключей названия и даты релиза у сериалов на имена ключей фильмов, т.к. они отличаются,
        //чтобы не было в шаблоне if-else конструкции
        //delete object.original_name - удаляем измененные ключи
        const changeKey = (object) => {
          if ("first_air_date" in object) {
            object.release_date = object.first_air_date;
            if (object.name === null) {
              object.title = object.original_name;
              delete object.original_name;
            } else {
              object.title = object.name;
              delete object.name;
            }
            delete object.first_air_date;
          }
        };
        changeKey(this.filmData);
      });

    //запрос данных создателей и актеров
    fetch(this.urlCrewData)
      .then((response) => response.json())
      .then((answer) => {
        // this.filmDataCrew.push(answer.сast);
        this.filmDataCrew.push(...answer.crew);
        this.filmDataCast.push(...answer.cast);
        //сортировка должностей создателей по алфавиту
        this.filmDataCrew = this.filmDataCrew.sort((prev, current) =>
          prev.job > current.job ? 1 : -1
        );
      });

    //запрос картинок для слайдера
    fetch(this.urlImages)
      .then((response) => response.json())
      .then((answer) => {
        for (let i in answer) {
          for (let j in answer[i]) {
            this.filmDataImg.push(answer[i][j].file_path);
          }
        }
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/css/_mixins_style";
.container {
  padding-top: 1rem;

  .film__preview {
    img {
      height: 100%;
    }
  }
}

.slider-wrapper {
  .v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: none;
  }
  .card-wrapper {
    position: relative;
    width: 200px;
    height: 100px;
    max-width: 100%;
    text-align: center;

    > img {
      height: 100%;
    }

    .close-cross {
      position: absolute;
      left: 45%;
      top: 12%;
    }
  }

  > .zoom__container {
    
     .zoom__row {
      height: 320px;
      @include resolve(md) {
        height: 500px;
      }
      justify-content: center;
      padding: 12px 15px;
      
      .zoom__img {
        height: 100%;
      }
    }
  }
}
</style>
