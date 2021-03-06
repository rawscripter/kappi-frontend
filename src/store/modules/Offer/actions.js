import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/v1/client";
export default {
  getCategories({ commit, dispatch }) {
    commit('setIsCategoryLoading', true);
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      return axios
        .get(`${BASE_URL}/categories`)
        .then((response) => {
          commit("setCategories", response.data.data);
          if (response.data.data[0]) {
            // commit('setCurrentCategory', response.data.data[0]);
            dispatch('changeCategoryAndFetchOffers', {
              category: response.data.data[0],
              page: 1
            });
          }
          resolve(response);
        })
        .catch(() => {
          reject("error");
        })
        .finally(() => {
          commit('setIsCategoryLoading', false);
        }
        );
    });
  },
  changeCategoryAndFetchOffers({ commit }, payload) {

    console.log(payload)
    const { category, page } = payload;

    commit('setIsOffersLoading', true);
    commit('setCurrentCategory', category);

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
        .catch(() => {
          reject("error");
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
          commit("setCurrentOffer", response.data.data);
          resolve(response);
        })
        .catch(() => {
          reject("error");
        })
        .finally(() => {
          commit('setIsOffersLoading', false);
        }
        );
    });
  }

};
