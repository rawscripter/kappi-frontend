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
                src="/assets/logo/logo.png"
                alt=""
              />
            </div>
            <div class="passwordReset-modal-title text-center mt-4">
              <strong>Zmień hasło</strong>
            </div>

            <form class="passwordReset-form" action="">
              <div>
                <label for="">Obecne hasło</label>
                <div class="input-group custom-input-box">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon :icon="['fas', 'lock']" />
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Obecne hasło"
                  />
                  <div class="input-group-append">
                    <font-awesome-icon :icon="['far', 'eye']" />
                  </div>
                </div>
              </div>

              <div class="mt-4">
                <label for="">Nowe hasło</label>
                <div class="input-group custom-input-box">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon :icon="['fas', 'lock']" />
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nowe hasło"
                  />
                  <div class="input-group-append">
                    <font-awesome-icon :icon="['far', 'eye']" />
                  </div>
                </div>
              </div>

              <div class="mt-4">
                <label for="">Powtórz nowe hasło</label>
                <div class="input-group custom-input-box">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <font-awesome-icon :icon="['fas', 'lock']" />
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Powtórz nowe hasło"
                  />
                  <div class="input-group-append">
                    <font-awesome-icon :icon="['far', 'eye']" />
                  </div>
                </div>
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
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const showModal = computed(() => store.state.User.showPasswordResetModal);
    function closeRegistrationModal() {
      store.dispatch("User/setPasswordResetModal", false);
    }
    return {
      showModal,
      closeRegistrationModal,
    };
  },
};
</script>

<style scoped>
@import url("/src/styles/password-reset.css");
</style>
 