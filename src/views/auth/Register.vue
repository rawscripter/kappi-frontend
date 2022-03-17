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

            <form class="register-form" action="">
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
              <div class="input-group custom-input-box">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <font-awesome-icon :icon="['fas', 'lock']" />
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Potwierdz haslo"
                />
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
                      Akceptuję
                      <span class="cp" @click="openTermsModal()">
                        <u>Regulamin</u></span
                      >
                      i
                      <span class="cp" @click="gotoPrivacyPage()">
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
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
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

    function gotoPrivacyPage() {
      router.push({ name: "privacy-policy" });
    }

    return {
      showModal,
      closeRegistrationModal,
      openLoginModal,
      openTermsModal,
      gotoPrivacyPage,
    };
  },
};
</script>
 
 <style>
@import url("/src/styles/register.css");
</style>