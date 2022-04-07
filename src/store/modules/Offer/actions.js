import axios from "axios";
const BASE_URL = "https://kappi.yarmobile.com.pl/api/v1/client";
export default {
  getCategories({ commit, dispatch, state }) {

    commit('setIsCategoryLoading', true);
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return axios
        .get(`${BASE_URL}/categories`)
        .then((response) => {
          commit("setCategories", response.data.data);
          if (response.data.data[0]) {
            commit('setCurrentCategory', response.data.data[0]);
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          commit('setIsCategoryLoading', false);
        }
        );
    });
  },
  fetchOffers({ commit, state }, page = 1) {
    let category = state.currentCategory;
    commit('setIsOffersLoading', true);
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return axios
        .get(`${BASE_URL}/offers?category=${category.id}&page=${page}`)
        .then((response) => {
          commit("setOffers", response.data.data.offers);
          commit("setOffersPagination", response.data.data.pagination);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          commit('setIsOffersLoading', false);
        }
        );
    });
  },
  fetchSpecialOffers({ commit, state }, payload) {
    let category = state.currentCategory;
    const { offer, page } = payload;
    commit('setIsOffersLoading', true);
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return axios
        .get(`${BASE_URL}/offers/${offer}/special-offers?category=${category.id}&page=${page}`)
        .then((response) => {
          commit("setOffers", response.data.data.offers);
          commit("setOffersPagination", response.data.data.pagination);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          commit('setIsOffersLoading', false);
        }
        );
    });
  },

  getOfferDetails({ commit }, offerId) {
    commit('setIsOffersLoading', true);
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return axios
        .get(`${BASE_URL}/offers/${offerId}`)
        .then((response) => {
          const { status } = response.data;
          if (status === "success") {
            commit("setCurrentOffer", response.data.data);
          }
          if (status === "error") {
            commit("setCurrentOffer", {});
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          commit('setIsOffersLoading', false);
        }
        );
    });
  },

  checkActionBid({ commit }, payload) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return axios
        .post(`${BASE_URL}/offers/bid/check`, payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  confrimAuctionBid({ commit }, payload) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return axios
        .post(`${BASE_URL}/offers/bid/confirm`, payload)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  setCurrentCategory({ commit }, payload) {

    return new Promise((resolve) => {
      commit("setCurrentCategory", payload);
      resolve(payload);
    });
  }

};
