export default {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, payload) {
    state.status = "success";
    state.token = payload.token;
    state.user = payload.user;
  },
  auth_error(state) {
    state.status = "error";
  },
  logout(state) {
    state.status = "";
    state.token = "";
    localStorage.removeItem("token");
    window.location.href = "/";
  },

  set_user(state, payload) {
    state.user = payload;
  },
  set_showLoginModal(state, payload) {
    state.showLoginModal = payload;
  },
  set_showRegistrationModal(state, payload) {
    state.showRegistrationModal = payload;
  },
  set_showPasswordChangeModal(state, payload) {
    state.showPasswordChangeModal = payload;
  },
  set_showTermsModal(state, payload) {
    state.showTermsModal = payload;
  },
  set_showPrivacyModal(state, payload) {
    state.showPrivacyModal = payload;
  },
  set_isAuthReqLoading(state, payload) {
    state.isAuthReqLoading = payload;
  },
  set_showForgotPasswordModal(state, payload) {
    state.showForgotPasswordModal = payload;
  },

  set_showPasswordResetModal(state, payload) {
    state.showPasswordResetModal = payload;
  },
  set_terms(state, payload) {
    state.terms = payload;
  },
  set_policy(state, payload) {
    state.policy = payload;
  }


};
