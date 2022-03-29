<template>
  <div class="registerModal">
    <div
      class="modal"
      :class="showModal ? 'show' : ''"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content shadow-sm">
          <div
            @click="closeRegistrationModal()"
            class="modal-close-button shadow"
          >
            <font-awesome-icon :icon="['fas', 'times']" />
          </div>
          <div class="modal-body">
            <div class="register-modal-title">
              <span class="text-blue">Zarejestruj się w </span> K A P P I
            </div>
            <div class="register-modal-description">
              <p class="m-0">
                Utwórz nowe konto i zdobądź wymarzoną nieruchomość
              </p>
            </div>

            <form
              class="register-form"
              @submit.prevent="registerUser()"
              action=""
            >
              <div class="form-group mb-4 mt-4">
                <div class="input-group custom-input-box">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon :icon="['fas', 'envelope']" />
                    </span>
                  </div>
                  <input
                    type="email"
                    class="form-control"
                    v-model="email"
                    placeholder="E-mail"
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
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    v-model="password"
                    placeholder="Haslo"
                    required
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
                      class="text-muted"
                      v-else
                      :icon="['far', 'eye-slash']"
                    />
                  </div>
                </div>
                <span v-if="errors.password" class="error-message"
                  >{{ errors.password ? errors.password[0] : "" }}
                </span>
              </div>
              <div class="form-group mb-4 mt-4">
                <div class="input-group custom-input-box">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon :icon="['fas', 'lock']" />
                    </span>
                  </div>
                  <input
                    :type="showConfirmationPassword ? 'text' : 'password'"
                    class="form-control"
                    placeholder="Potwierdz haslo"
                    v-model="confirm_password"
                    required
                  />
                  <div
                    class="input-group-append"
                    @click="
                      showConfirmationPassword = !showConfirmationPassword
                    "
                  >
                    <font-awesome-icon
                      class="text-muted"
                      v-if="!showConfirmationPassword"
                      :icon="['far', 'eye']"
                    />
                    <font-awesome-icon
                      class="text-muted"
                      v-else
                      :icon="['far', 'eye-slash']"
                    />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="remember-me-area d-flex justify-content-between">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                      required
                    />
                    <label class="custom-control-label" for="customCheck1">
                      Akceptuję
                      <span class="cp" @click="openTermsModal()">
                        <u>Regulamin</u></span
                      >
                      i
                      <span class="cp" @click="openPrivacyModal()">
                        <u>Politykę prywatności</u>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <button class="btn btn-primary btn-block shadow register-btn">
                  Zarejestruj się
                </button>
              </div>

              <div class="form-bottom-content">
                <p class="m-0">Masz już konto?</p>
                <p @click="openLoginModal" class="text-blue cp">
                  <u><strong>Zaloguj się</strong></u>
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
  setup() {
    const store = useStore();
    const showModal = computed(() => store.state.User.showRegistrationModal);
    const router = useRouter();
    function closeRegistrationModal() {
      store.dispatch("User/setRegistrationModal", false);
    }

    function openLoginModal() {
      closeRegistrationModal();
      store.dispatch("User/setLoginModal", true);
    }
    function openTermsModal() {
      store.dispatch("User/setTermsModal", true);
    }

    function openPrivacyModal() {
      store.dispatch("User/setPrivacyModal", true);
    }
    const email = ref("");
    const password = ref("");
    const confirm_password = ref("");
    const errors = ref({});
    const toast = useToast();
    function registerUser() {
      const payload = {
        email: email.value,
        password: password.value,
        password_confirmation: confirm_password.value,
      };
      store
        .dispatch("User/register", payload)
        .then(() => {
          toast.success("Rejestracja przebiegła pomyślnie");
          router.push("/home");
        })
        .catch((err) => {
          errors.value = err.response.data.errors;
        });
    }

    const showPassword = ref(false);
    const showConfirmationPassword = ref(false);

    return {
      showModal,
      closeRegistrationModal,
      openLoginModal,
      openTermsModal,
      openPrivacyModal,
      registerUser,
      email,
      password,
      confirm_password,
      errors,
      showPassword,
      showConfirmationPassword,
    };
  },
};
</script>
 
 <style>
@import url("/src/styles/register.css");
</style>