<template>
  <div class="container search">
    <span class="search-description"
      >Выберите тип фильма, потом год премьеры</span
    >
    <div class="row search-row">
      <div></div>
      <div
        v-for="(item, idx) in genre"
        :key="idx"
        class="search-params col-6  col-md-4"
      >
        <input
          :id="item.genreType"
          v-model="picked"
          type="radio"
          :name="item.inputName"
          :value="item.genreType"
          @change="picFilms"
        />
        <label :for="item.genreType">{{ item.value }}</label>
      </div>
      <div class="search-params col-12  col-md-4">
        <div class="search-date_inner">
          <label for="year">Премьера: </label>
          <select
            id="year"
            v-model="currentYear"
            @change="picFilms"
            :disabled="disabled"
          >
            <option value="" disabled>Дата премьеры</option>
            <option v-for="item in baseYear" :key="item"> {{ item }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: true,
      date: 1900,
      baseYear: [],
      picked: null,
      currentYear: "",
      genre: [
        {
          genreType: "movie",
          inputName: "film",
          value: "Кино"
        },
        {
          genreType: "tv",
          inputName: "film",
          value: "Сериал"
        }
      ]
    };
  },
  mounted() {
    for (let i = 0; i < new Date().getFullYear() - this.date + 1; i++) {
      this.baseYear.unshift(this.date + i);
    }
    if (this.currentYear != null && this.picked != null) {
      this.$emit("ready-state", {
        picked: this.picked,
        date: this.date,
        currentYear: this.currentYear
      });
    }
  },
  methods: {
    picFilms() {
      if (this.picked ?? "movie" ?? "tv") {
        this.disabled = false;
        this.$emit("select-changed", {
          picked: this.picked,
          date: this.date,
          currentYear: this.currentYear
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/css/_mixins_style";
.search {
  text-align: center;
  &-description {
    font-size: 0.75rem;
    @include resolve(md) {
      font-size: 1rem;
    }
  }

  &-row {
    font-size: 1.25rem;
    padding: 0.5rem 0 0 0;
    @include resolve(md) {
      padding: 1.5rem 0;
    }

    .search-date_inner {
      label {
        padding-right: 0.25rem;
        @include resolve(md) {
          padding-right: 0.5rem;
        }
      }
    }
    .search-params {
      @include resolve(md) {
        margin-top: 1rem;
      }

      > label {
        padding-left: 0.25rem;
        @include resolve(md) {
          padding-left: 1rem;
        }
      }
    }
  }
}
</style>
