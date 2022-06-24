<template>
  <div class="auth-page">
    <div class="fullscreen-bg">
      <video loop muted autoplay class="fullscreen-bg__video">
        <source src="/assets/home-bg-video.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="center-area">
      <div class="site-logo-area">
        <img class="logo" src="/assets/kappi.png" alt="KAPPI" />
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

  <div class="cookies js-cookie" v-if="!isCookiesAccepted">
    <p>
      KAPPI używa cookies, aby zapewnić najwyższą jakość usług. Korzystając ze
      strony bez zmiany przeglądarki, wyrażasz zgodę na otrzymywanie cookies
      zgodnie z Polityką Prywatności.
    </p>
    <div @click="acceptCookie" class="cookies__close js-cookieClose">
      <i class="visually-hidden">Close</i>
    </div>
  </div>
</template>
 <script>
import Login from "./Login.vue";
import Register from "./Register.vue";
import ForgotPassword from "./ForgotPassword.vue";
import PasswordReset from "./PasswordReset.vue";

import { useStore } from "vuex";
import { onMounted, ref } from "vue";
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
    let isCookiesAccepted = ref(localStorage.getItem("kappi_cookie") || 0);

    function acceptCookie() {
      isCookiesAccepted.value = true;
      localStorage.setItem("kappi_cookie", 1);
    }

    return {
      openLoginModal,
      acceptCookie,
      isCookiesAccepted,
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

.cookies {
  background: #30353abf;
  border-top: 1px solid #2a3339;
  bottom: 0;
  box-sizing: border-box;
  color: #fff;
  left: 0;
  min-height: 43px;
  position: fixed;
  text-align: center;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  width: 100%;
  z-index: 10;
}
.cookies p {
  font-size: 13px;
  line-height: 20px;
  margin: 0;
  padding: 12px 60px 8px;
  text-align: center;
}
.cookies__more {
  font-family: "europa", "Helvetica Neue", "Helvetica", "sans-serif";
  font-size: 10px;
  margin-left: 0.5em;
  text-decoration: none;
  text-transform: uppercase;
}
.cookies__close {
  -moz-appearance: none;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;
  height: 40px;
  position: absolute;
  right: 22px;
  top: 1px;
  width: 40px;
}
@media screen and (min-width: 1024px) {
  .cookies__close {
    bottom: 0;
    margin: auto 0;
    top: 0;
  }
}
.cookies__close:after,
.cookies__close:before {
  background: #fff;
  bottom: 0;
  content: "";
  height: 1px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  width: 14px;
}
.cookies__close:after {
  transform: rotate(45deg);
}
.cookies__close:before {
  transform: rotate(-45deg);
}
.cookies__close:focus {
  outline: none;
}
.cookies__close:focus:after,
.cookies__close:focus:before {
  height: 2px;
}
.state--cookies.state--cookies-hiding .cookies {
  transform: translate3d(0, 100%, 0);
}
.state--cookies.is-menu-open .cookies {
  transform: translate3d(240px, 0, 0);
}
@media screen and (max-width: 1023px) {
  .cookies {
    -webkit-backdrop-filter: blur(3px);
    backdrop-filter: blur(3px);
  }
  .cookies p {
    font-size: 12px;
    line-height: 18px;
    padding-bottom: 12px;
    padding-left: 20px;
    padding-right: 40px;
    padding-top: 14px;
    text-align: left;
  }
  .cookies__more {
    font-size: 9px;
    margin-left: 0;
    letter-spacing: 0.1em;
  }
  .cookies__close {
    right: 0;
  }
}
</style>
