<template>
  <v-app>
    <v-main>
      <div style="width: 100%; margin: 0">
        <div class="page-back" :style="{ backgroundImage: `url(${backgroundUrl})` }">
          <div class="page-content">
            <Nuxt />
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
  import backgroundUrl from '~/assets/image/bg.jpg'

  export default {
    name: 'prime',
    data() {
      return {
        backgroundUrl
      }
    },

  }
</script>

<style scoped>
  .page-back {
    width: 100%;
    min-height: 100vh;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    z-index: 1;
  }

  .page-back::before {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background-color: rgba(255,255,255,0.8);
  }

  .page-content {
    width: 500px;
    border-radius: 20px;
    overflow: hidden;
    padding: 55px;

    background: #00796B;
    background: -webkit-linear-gradient(top, #00796B, #DCE775);
    background: -o-linear-gradient(top, #00897B, #DCE775);
    background: -moz-linear-gradient(top, #00897B, #DCE775);
    background: -moz-linear-gradient(to top, #00897B, #DCE775);
    background: linear-gradient(to top, #00897B, #DCE775);
  }
</style>
