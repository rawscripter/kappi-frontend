<template>
  <div class="loginModal">
    <div
      class="modal"
      :class="showModal ? 'show' : ''"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content shadow-sm">
          <div @click="closeLoginModal()" class="modal-close-button shadow">
            <font-awesome-icon :icon="['fas', 'times']" />
          </div>
          <div class="modal-body">
            <div class="login-modal-title">
              <span class="text-blue">Witmy w </span> K A P P I
            </div>
            <div class="login-modal-description">
              <p class="m-0">Dziękujemy, że z nami jesteś.</p>
              <p>Zaloguj się na swoje konto</p>
            </div>

            <form @submit.prevent="login" class="login-form" action="">
              <div class="input-group custom-input-box">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <font-awesome-icon :icon="['fas', 'envelope']" />
                  </span>
                </div>
                <input type="text" class="form-control" placeholder="E-mail" />
              </div>
              <div class="input-group custom-input-box">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <font-awesome-icon :icon="['fas', 'lock']" />
                  </span>
                </div>
                <input type="text" class="form-control" placeholder="Haslo" />
                <div class="input-group-append">
                  <font-awesome-icon :icon="['far', 'eye']" />
                </div>
              </div>

              <div class="form-group">
                <div class="remember-me-area d-flex justify-content-between">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                    />
                    <label class="custom-control-label" for="customCheck1">
                      Zapamiętaj mnie
                    </label>
                  </div>
                  <div class="forgot-password-area">
                    <a href="#" class="text-dark">Nie pamiętasz hasła?</a>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <button class="btn btn-primary btn-block shadow login-btn">
                  Zaloguj
                </button>
              </div>

              <div class="form-bottom-content">
                <p class="m-0">Nie masz jeszcze konta?</p>
                <p @click="openRegistrationModal()" class="text-blue cp">
                  <u><strong>Zarejestruj się</strong></u>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup(_, { root }) {
    const store = useStore();
    const showModal = computed(() => store.state.User.showLoginModal);
    const router = useRouter();
    function closeLoginModal() {
      store.dispatch("User/setLoginModal", false);
    }

    function openRegistrationModal() {
      closeLoginModal();
      store.dispatch("User/setRegistrationModal", true);
    }
    function login() {
      // push to home page
      router.push("/home");
    }
    return {
      showModal,
      closeLoginModal,
      openRegistrationModal,
      login,
    };
  },
};
</script>

<style scoped>
@import url("/src/styles/login.css");
</style>> 