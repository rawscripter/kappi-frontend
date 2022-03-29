<template>
  <div class="auth-page">
    <div class="fullscreen-bg">
      <video loop muted autoplay class="fullscreen-bg__video">
        <source src="/assets/home-bg-video.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="center-area">
      <div class="site-logo-area">
        <img class="logo" src="/assets/logo/logo.png" alt="" />
      </div>
      <div @click="openLoginModal()" class="site-button text-center">
        WEJDZ NA STRONĘ
      </div>
    </div>
  </div>
  <Login></Login>
  <Register></Register>
</template>
 <script>
import Login from "./Login.vue";
import Register from "./Register.vue";

import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    function openLoginModal() {
      store.dispatch("User/setLoginModal", true);
    }
    return {
      openLoginModal,
    };
  },
  components: {
    Login,
    Register,
  },
  mounted() {
    if (this.$store.state.User.token) {
      this.$router.push("/home");
    }
  },
};
</script> 

<style scoped>
@import url("/src/styles/auth.css");
.logo {
  filter: invert(1);
}
</style>