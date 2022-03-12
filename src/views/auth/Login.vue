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
          <div class="modal-close-button shadow">
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

            <form class="login-form" action="">
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
                <p class="text-blue">
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
export default {
  data() {
    return {
      showModal: false,
      icons: {
        email: "",
      },
    };
  },

  methods: {
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
  },
  mounted() {
    this.openModal();
  },
};
</script>

<style scoped>
/* Override default value of 'none' */
.show {
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-dialog {
  position: relative;
}
.modal-content {
  border: none;
  padding: 2.5rem;
  border-radius: 15px;
  width: 450px;
}
.modal-close-button {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 25px;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  cursor: pointer;
}

.modal-body {
  text-align: left;
  padding: 0;
}

.text-blue {
  color: #0d6efd;
}
.login-modal-title {
  font-size: 2rem;
  margin-bottom: 1.25rem;
}
.login-modal-description {
  color: #606060;
  font-weight: 400;
  font-size: 0.9rem;
}
.login-form {
  margin: 50px 0 0px 0;
}

.input-group-text {
  background: #fff;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.input-group-prepend,
.input-group-append {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  z-index: 99;
}
.input-group-append {
  padding-right: 10px;
  font-size: 14px;
}
.form-control {
  border: none;
}

.form-control {
  outline: none;
  height: 45px;
}
.form-control:focus {
  box-shadow: none;
}
.form-control::placeholder {
  font-size: 16px;
}
.custom-input-box {
  box-shadow: 0px 0rem 1rem 1px rgb(0 0 0 / 15%) !important;
  border-radius: 10px;
  overflow: hidden;
  margin: 30px 0;
}
.btn-block {
  width: 100%;
}
.login-btn {
  margin-top: 50px;
  box-shadow: 0px 0rem 1rem 1px rgb(13 110 253 / 54%) !important;
  height: 45px;
  border-radius: 12px;
  font-weight: 600;
}

.remember-me-area.d-flex.justify-content-between {
  font-size: 14px;
}
input#customCheck1 {
  margin-right: 10px;
}

.text-dark {
  color: #000;
  font-weight: 600;
}

.form-bottom-content {
  margin-top: 80px;
  font-size: 15px;
}

@media (max-width: 768px) {
  .modal-content {
    width: 98%;
    margin: 0 auto;
  }
  .login-modal-title {
    font-size: 1.7rem;
  }

  .remember-me-area.d-flex.justify-content-between {
    font-size: 12px;
  }
}
</style>