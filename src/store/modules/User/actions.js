import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/v1/client";
export default {
  login({ commit }, user) {
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
        });
    });
  },

  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios({
        url: `${BASE_URL}/create-account`,
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
        });
    });
  },

  resetPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios({
        url: `${BASE_URL}/reset-password`,
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
        });
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
    return new Promise((resolve, reject) => {
      axios({
        url: `${BASE_URL}/api/forgot-password`,
        data: payload,
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
  setPasswordResetModal({ commit }, payload) {
    commit("set_showPasswordResetModal", payload);
  },
  setTermsModal({ commit }, payload) {
    commit("set_showTermsModal", payload);
  },
  setPrivacyModal({ commit }, payload) {
    commit("set_showPrivacyModal", payload);
  }

};
