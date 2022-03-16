export default {
  isLoggedIn: (state) => !!state.token,
  user: (state) => state.user,
  showLoginModal: (state) => state.showLoginModal,
  showRegistrationModal: (state) => state.showRegistrationModal,
};
