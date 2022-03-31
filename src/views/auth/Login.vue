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
              <div class="form-group mt-4 mb-4">
                <div class="input-group custom-input-box">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon :icon="['fas', 'envelope']" />
                    </span>
                  </div>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="E-mail"
                    v-model="email"
                    required
                  />
                </div>

                <span v-if="errors.email" class="error-message"
                  >{{ errors.email ? errors.email[0] : "" }}
                </span>
              </div>
              <div class="form-group mt-4 mb-4">
                <div class="input-group custom-input-box">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon :icon="['fas', 'lock']" />
                    </span>
                  </div>
                  <input
                    required
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    placeholder="Haslo"
                  />
                  <div
                    class="input-group-append"
                    @click="showPassword = !showPassword"
                  >
                    <font-awesome-icon
                      v-if="!showPassword"
                      :icon="['far', 'eye']"
                      class="text-muted"
                    />
                    <font-awesome-icon
                      v-else
                      class="text-muted"
                      :icon="['far', 'eye-slash']"
                    />
                  </div>
                </div>
                <span v-if="errors.password" class="error-message"
                  >{{ errors.password ? errors.password[0] : "" }}
                </span>
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
                  <span v-if="isAuthReqLoading"
                    ><easy-spinner class="small-spinner" /> Przetwarzanie</span
                  >
                  <span v-else>Zaloguj</span>
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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default {
  setup(_, { root }) {
    const store = useStore();
    const showModal = computed(() => store.state.User.showLoginModal);
    const isAuthReqLoading = computed(() => store.state.User.isAuthReqLoading);
    const router = useRouter();
    function closeLoginModal() {
      store.dispatch("User/setLoginModal", false);
    }

    function openRegistrationModal() {
      closeLoginModal();
      store.dispatch("User/setRegistrationModal", true);
    }
    const email = ref("");
    const password = ref("");
    const errors = ref({});
    const toast = useToast();
    function login() {
      // push to home page
      const payload = { email: email.value, password: password.value };

      store
        .dispatch("User/login", payload)
        .then(() => {
          toast.success("Zalogowano pomyślnie");
          router.push("/home");
        })
        .catch((err) => {
          errors.value = err.response.data.errors;
        });
    }

    const showPassword = ref(false);

    return {
      showModal,
      closeLoginModal,
      openRegistrationModal,
      login,
      email,
      password,
      errors,
      showPassword,
      isAuthReqLoading,
    };
  },
};
</script>

<style scoped>
@import url("/src/styles/login.css");
</style>> 