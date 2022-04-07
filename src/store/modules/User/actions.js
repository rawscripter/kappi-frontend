import axios from "axios";
const BASE_URL = "https://kappi.yarmobile.com.pl/api/v1/client";
export default {
  login({ commit }, user) {
    commit("set_isAuthReqLoading", true);
    return new Promise((resolve, reject) => {
      axios({
        url: `${BASE_URL}/login`,
        data: user,
        method: "POST",
      })
        .then((resp) => {
          console.log(resp);
          const token = resp.data.data.token;
          const user = resp.data.data.user;

          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          commit("auth_success", { token: token, user: user });
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error");
          localStorage.removeItem("token");
          reject(err);
        }).finally(() => {
          commit("set_isAuthReqLoading", false);
        });
    });
  },

  register({ commit }, user) {
    commit("set_isAuthReqLoading", true);
    return new Promise((resolve, reject) => {
      axios({
        url: `${BASE_URL}/register`,
        data: user,
        method: "POST",
      })
        .then((resp) => {
          const token = resp.data.data.token;
          const user = resp.data.data.user;

          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          commit("auth_success", { token: token, user: user });
          resolve(resp);
        })
        .catch((err) => {
          commit("auth_error", err);
          localStorage.removeItem("token");
          reject(err);
        })
        .finally(() => {
          commit("set_isAuthReqLoading", false);
        });
    });
  },

  changePassword({ commit }, payload) {
    commit("set_isAuthReqLoading", true);
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios({
        url: `${BASE_URL}/change-password`,
        data: payload,
        method: "POST",
      })
        .then((resp) => {
          const token = resp.data.data.token;
          const user = resp.data.data.user;

          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          commit("auth_success", { token: token, user: user });
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        }).finally(() => {
          commit("set_isAuthReqLoading", false);
        })
    });
  },

  resendVarificationMail({ commit }) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${BASE_URL}/api/resend-verification-mail`,
        method: "POST",
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  forgotPassword({ commit }, payload) {
    commit("set_isAuthReqLoading", true);
    return new Promise((resolve, reject) => {
      axios({
        url: `${BASE_URL}/forgot-password`,
        data: payload,
        method: "POST",
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        }).finally(() => {
          commit("set_isAuthReqLoading", false);
        })
    });
  },
  resetPassword({ commit }, payload) {
    commit("set_isAuthReqLoading", true);
    return new Promise((resolve, reject) => {
      axios({
        url: `${BASE_URL}/reset-password`,
        data: payload,
        method: "POST",
      })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        }).finally(() => {
          commit("set_isAuthReqLoading", false);
        })
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit("logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  },
  me({ commit }) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return axios
        .get(`${BASE_URL}/me`)
        .then((response) => {
          commit("set_user", response.data.data);
        })
        .catch(() => {
          commit("set_user", null);
          commit("logout");
        });
    });
  },
  setLoginModal({ commit }, payload) {
    commit("set_showLoginModal", payload);
  },
  setRegistrationModal({ commit }, payload) {
    commit("set_showRegistrationModal", payload);
  },
  setPasswordChangeModal({ commit }, payload) {
    commit("set_showPasswordChangeModal", payload);
  },
  setTermsModal({ commit }, payload) {
    commit("set_showTermsModal", payload);
  },
  setPrivacyModal({ commit }, payload) {
    commit("set_showPrivacyModal", payload);
  },
  setForgotPasswordModal({ commit }, payload) {
    commit("set_showForgotPasswordModal", payload);
  },
  setPasswordResetModal({ commit }, payload) {
    commit("set_showPasswordResetModal", payload);
  },
};
