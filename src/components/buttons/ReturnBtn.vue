<template>
  <div class="container">
    <div class="return_btn row">
      <button class="custom-btn" @click="filmsList">Назад</button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
    };
  },
  methods:{
      filmsList(){
          this.$emit("close-detals")
      }
  }
};
</script>

<style lang="scss">
.return_btn{
    padding: 1rem 0;
}
</style>
