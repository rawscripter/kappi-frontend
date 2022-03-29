export default {
  setCategories: (state, categories) => {
    state.categories = categories;
  },
  setCurrentCategory: (state, category) => {
    state.currentCategory = category;
  },
  setIsCategoryLoading: (state, isCategoryLoading) => {
    state.isCategoryLoading = isCategoryLoading;
  },

  setIsOffersLoading: (state, isLoading) => {
    state.isOffersLoading = isLoading;
  },
  setOffers: (state, offers) => {
    state.offers = offers;
  },
  setCurrentOffer: (state, offer) => {
    state.currentOffer = offer;
  },
  setOffersPagination: (state, pagination) => {
    state.offersPagination = pagination;
  }

};
