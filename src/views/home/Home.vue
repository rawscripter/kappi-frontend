<template>
  <div class="home-page">
    <div class="fullscreen-bg">
      <video loop muted autoplay class="fullscreen-bg__video">
        <source src="/assets/home-bg-video.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="center-area">
      <div class="site-logo-area">
        <img class="logo" src="/assets/logo/logo.png" alt="" />
      </div>
      <div class="site-button">WEJDZ NA STRONĘ</div>
    </div>
  </div>
  <Login></Login>
</template>
 <script>
import "/src/styles/home.css";
import Login from "../auth/Login.vue";

export default {
  setup() {
    return {};
  },
  components: {
    Login,
  },
  mounted() {},
};
</script> 