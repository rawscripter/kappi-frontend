import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
const state = {
  status: "",
  token: localStorage.getItem("token") || "",
  user: {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    is_admin: false,
    is_verified: false,
  },
  showLoginModal: false,
  showRegistrationModal: false,
  showPasswordChangeModal: false,
  showPasswordResetModal: false,
  showForgotPasswordModal: false,
  showPrivacyModal: false,
  showTermsModal: false,
  isAuthReqLoading: false,
  terms: {},
  policy: {},
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
