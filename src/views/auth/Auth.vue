<template>
  <div class="auth-page">
    <div class="fullscreen-bg">
      <video loop muted autoplay class="fullscreen-bg__video">
        <source src="/assets/home-bg-video.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="center-area">
      <div class="site-logo-area">
        <img class="logo" src="/assets/kappi.png" alt="" />
      </div>
      <div @click="openLoginModal()" class="site-button text-center">
        WEJDZ NA STRONĘ
      </div>
    </div>
  </div>
  <Login></Login>
  <Register></Register>
  <ForgotPassword></ForgotPassword>
  <PasswordReset></PasswordReset>
</template>
 <script>
import Login from "./Login.vue";
import Register from "./Register.vue";
import ForgotPassword from "./ForgotPassword.vue";
import PasswordReset from "./PasswordReset.vue";

import { useStore } from "vuex";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    function openLoginModal() {
      store.dispatch("User/setLoginModal", true);
    }
    onMounted(() => {
      if (route.query.token && route.query.token != "") {
        store.dispatch("User/setPasswordResetModal", true);
      }
    });
    return {
      openLoginModal,
    };
  },
  components: {
    Login,
    Register,
    ForgotPassword,
    PasswordReset,
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
</style>