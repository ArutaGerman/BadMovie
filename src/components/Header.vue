<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-4 col-md-2">
          <a href="#" title="Киновтопку">
            <img
              src="../assets/free-icon-pie-chart-4215959.svg"
              alt="Киновтопку логотип"
            />
          </a>
        </div>
        <div class="header-title col-8 col-md-10 my-auto">
          <h1>Киновтопку</h1>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.header {
  > .container {
    border-bottom: 1px solid rgba(128, 128, 128, 1);
    > .row {
      padding: 1rem 0;
      font: 1.5rem/2 serif;

      a {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;

        img {
          max-width: 50px;
        }
      }

      .header-title {
        align-items: center;

        h1 {
          font-size: 2rem;
        }
      }
    }
  }
}
</style>
