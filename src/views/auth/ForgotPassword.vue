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
            @click="closeForgotPasswordModal()"
            class="modal-close-button shadow"
          >
            <font-awesome-icon :icon="['fas', 'times']" />
          </div>
          <div class="modal-body">
            <div class="forgot-password-modal-title">
              <span class="text-blue">Zresetuj hasło</span>
            </div>
            <div class="register-modal-description">
              <p class="m-0">
                Wprowadź adres e-mail, by otrzymać link do zresetowania hasła.
              </p>
            </div>

            <form
              class="register-form"
              @submit.prevent="forgotPassword()"
              action=""
            >
              <div class="form-group mt-4">
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

              <div class="form-group">
                <button class="btn btn-primary btn-block shadow register-btn">
                  <span v-if="isAuthReqLoading"
                    ><easy-spinner class="small-spinner" /> Przetwarzanie</span
                  >
                  <span v-else>Zatwierdź</span>
                </button>
              </div>

              <div class="form-bottom-content fs-15">
                <p class="m-0 text-muted">Wróć do logowania</p>
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
import { useToast } from "vue-toastification";

export default {
  setup() {
    const store = useStore();
    const showModal = computed(() => store.state.User.showForgotPasswordModal);
    const isAuthReqLoading = computed(() => store.state.User.isAuthReqLoading);

    function closeForgotPasswordModal() {
      store.dispatch("User/setForgotPasswordModal", false);
    }

    function openLoginModal() {
      closeForgotPasswordModal();
      store.dispatch("User/setLoginModal", true);
    }

    const email = ref("");
    const errors = ref({});
    const toast = useToast();
    function forgotPassword() {
      const payload = {
        email: email.value,
      };
      store
        .dispatch("User/forgotPassword", payload)
        .then(() => {
          toast.success(
            "Link do resetowania hasła został wysłany na Twoją pocztę"
          );
          email.value = "";
        })
        .catch((err) => {
          errors.value = err.response.data.errors;
        });
    }

    return {
      showModal,
      closeForgotPasswordModal,
      openLoginModal,
      forgotPassword,
      email,
      errors,
      isAuthReqLoading,
    };
  },
};
</script>
 
 <style>
@import url("/src/styles/register.css");
</style>