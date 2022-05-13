export default {
  isLoggedIn: (state) => !!state.token,
  user: (state) => state.user,
  showLoginModal: (state) => state.showLoginModal,
  showRegistrationModal: (state) => state.showRegistrationModal,
  showPasswordChangeModal: (state) => state.showPasswordChangeModal,
  showForgotPasswordModal: (state) => state.showForgotPasswordModal,
  showTermsModal: (state) => state.showTermsModal,
  showPrivacyModal: (state) => state.showPrivacyModal,
  isAuthReqLoading: (state) => state.isAuthReqLoading,
  showPasswordResetModal: (state) => state.showPasswordResetModal,
  terms: (state) => state.terms,
  policy: (state) => state.policy,
};
