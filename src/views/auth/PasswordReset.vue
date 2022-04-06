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
              <img class="logo" width="180" src="/assets/kappi.png" alt="" />
            </div>
            <div class="passwordReset-modal-title text-center mt-4">
              <strong>Zmień hasło</strong>
            </div>

            <form
              @submit.prevent="resetPassword"
              class="passwordReset-form"
              action=""
            >
              <div>
                <label for="">Obecne hasło</label>
                <div class="input-group custom-input-box">
                  <input
                    v-model="currentPassword"
                    :type="showPassword1 ? 'text' : 'password'"
                    class="form-control"
                    placeholder="Obecne hasło"
                    required
                  />
                  <div
                    class="input-group-append"
                    @click="showPassword1 = !showPassword1"
                  >
                    <font-awesome-icon
                      v-if="!showPassword1"
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
                <span v-if="errors.current_password" class="error-message"
                  >{{
                    errors.current_password ? errors.current_password[0] : ""
                  }}
                </span>
              </div>

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
                  Zapisz
                </button>
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

export default {
  setup() {
    const store = useStore();
    const showModal = computed(() => store.state.User.showPasswordResetModal);
    function closeRegistrationModal() {
      store.dispatch("User/setPasswordResetModal", false);
    }
    const showPassword1 = ref(false);
    const showPassword2 = ref(false);
    const showPassword3 = ref(false);

    const currentPassword = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const errors = ref({});
    const toast = useToast();

    function resetPassword() {
      const payload = {
        current_password: currentPassword.value,
        new_password: newPassword.value,
        password_confirmation: confirmPassword.value,
      };
      store
        .dispatch("User/resetPassword", payload)
        .then(() => {
          // show alert
          toast.success("Hasło zostało zmienione");
          closeRegistrationModal();
        })
        .catch((err) => {
          errors.value = err.response.data.errors;
        });
    }

    return {
      showModal,
      closeRegistrationModal,
      showPassword1,
      showPassword2,
      showPassword3,
      resetPassword,
      currentPassword,
      newPassword,
      confirmPassword,
      errors,
    };
  },
};
</script>

<style scoped>
@import url("/src/styles/password-reset.css");
</style>
 