<template>
  <div class="container">
    <div class="row search">
      <div
        v-for="(item, idx) in genre"
        :key="idx"
        class="search-params_type col-6  col-sm-4"
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
      <div class="search-date_wrap col-12  col-sm-4">
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
      currentYear: null,
      genre: [
        {
          genreType: "movie",
          inputName: "film",
          value: "Кино",
        },
        {
          genreType: "tv",
          inputName: "film",
          value: "Сериал",
        },
      ],
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
        currentYear: this.currentYear,
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
          currentYear: this.currentYear,
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/css/_mixins_style";
.search {
  font-size: 1.25rem;
  padding: 1.5rem 0;

  &-params_type,
  &-date_inner {
    text-align: center;
    @include resolve(xs) {
      text-align: left;
    }
    @include resolve(md) {
      text-align: center;
    }

    label {
      padding-right: 0.5rem;
    }
  }
  &-params_type {
    margin-top: 1rem;
    order: 1;
    @include resolve(xs) {
      order: 0;
      margin-top: 0;
    }
  }
  &-params_type > label {
    padding-left: 1rem;
  }
}
</style>
