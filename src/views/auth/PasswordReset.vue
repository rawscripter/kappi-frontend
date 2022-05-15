<template>
  <div class="passwordResetModal">
    <div
      class="modal"
      :class="showModal ? 'show' : ''"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content shadow-sm">
          <div class="modal-body">
            <div class="logo text-center">
              <img
                class="logo"
                width="180"
                src="/assets/kappi.png"
                alt="KAPPI"
              />
            </div>
            <div class="passwordReset-modal-title text-center mt-4">
              <strong>Zmień hasło</strong>
            </div>

            <form
              @submit.prevent="changePassword"
              class="passwordReset-form"
              action=""
            >
              <div class="mt-4">
                <label for="">Nowe hasło</label>
                <div class="input-group custom-input-box">
                  <input
                    v-model="newPassword"
                    :type="showPassword2 ? 'text' : 'password'"
                    class="form-control"
                    placeholder="Nowe hasło"
                    required
                  />
                  <div
                    class="input-group-append"
                    @click="showPassword2 = !showPassword2"
                  >
                    <font-awesome-icon
                      v-if="!showPassword2"
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

              <div class="mt-4">
                <label for="">Powtórz nowe hasło</label>
                <div class="input-group custom-input-box">
                  <input
                    v-model="confirmPassword"
                    required
                    :type="showPassword3 ? 'text' : 'password'"
                    class="form-control"
                    placeholder="Powtórz nowe hasło"
                  />
                  <div
                    class="input-group-append"
                    @click="showPassword3 = !showPassword3"
                  >
                    <font-awesome-icon
                      v-if="!showPassword3"
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
                <span v-if="errors.confirm_password" class="error-message"
                  >{{
                    errors.confirm_password ? errors.confirm_password[0] : ""
                  }}
                </span>
              </div>

              <div class="form-group">
                <button
                  class="btn btn-primary btn-block shadow passwordReset-btn"
                >
                  <span v-if="isAuthReqLoading"
                    ><easy-spinner class="small-spinner" /> Przetwarzanie</span
                  >
                  <span v-else>Zapisz</span>
                </button>
              </div>

              <div v-if="errors.token" class="error-message mt-3 text-red">
                <small>{{ errors.token ? errors.token[0] : "" }}</small>
              </div>

              <div class="form-bottom-content text-center">
                <p
                  @click="closeRegistrationModal()"
                  class="m-0 cursor-pointer text-muted"
                >
                  <font-awesome-icon :icon="['fas', 'arrow-left']" />
                  <span class="pl-3">Powrót</span>
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
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const isAuthReqLoading = computed(() => store.state.User.isAuthReqLoading);

    const showModal = computed(() => store.state.User.showPasswordResetModal);
    function closeRegistrationModal() {
      store.dispatch("User/setPasswordResetModal", false);
    }
    const showPassword1 = ref(false);
    const showPassword2 = ref(false);
    const showPassword3 = ref(false);

    const newPassword = ref("");
    const confirmPassword = ref("");
    const errors = ref({});
    const toast = useToast();

    function changePassword() {
      const payload = {
        token: route.query.token,
        email: route.query.email,
        password: newPassword.value,
        password_confirmation: confirmPassword.value,
      };
      store
        .dispatch("User/resetPassword", payload)
        .then(() => {
          toast.success("Hasło zostało zmienione");
          router.push("/");
          closeRegistrationModal();
          store.dispatch("User/setLoginModal", true);
        })
        .catch((err) => {
          errors.value = err.response.data.errors || {};
          if (!errors.value.password) {
            if (err.response.data.message) {
              toast.error(err.response.data.message);
            }
          }
        });
    }

    return {
      showModal,
      closeRegistrationModal,
      showPassword1,
      showPassword2,
      showPassword3,
      changePassword,
      newPassword,
      confirmPassword,
      errors,
      isAuthReqLoading,
    };
  },
};
</script>

<style scoped>
@import url("/src/styles/password-reset.css");
</style>
 