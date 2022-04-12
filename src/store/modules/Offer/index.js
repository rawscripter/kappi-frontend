import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
const state = {
  categories: [],
  currentCategory: {},
  isOffersLoading: false,
  isCategoryLoading: false,
  offers: [],
  currentOffer: {},
  offersPagination: {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  },
  lastRefreshedTime: new Date()
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
