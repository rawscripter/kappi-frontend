<template>
  <div class="home-page">
    <div class="category-filter-area">
      <div class="category-filter-area__title">
        <p><strong>Kategoria</strong></p>
      </div>
      <CustomCategoryDropdown />
    </div>

    <div class="item-list mt-5">
      <div class="item-list__items" v-if="!isOffersLoading">
        <SingleItem
          v-for="(offer, index) in offers"
          :key="index"
          :offer="offer"
        />
        <div v-if="offers.length == 0">
          <h5 class="text-center text-muted mt-5">
            Brak ofert w wybranej kategorii.
          </h5>
        </div>
      </div>
      <div class="spinner" v-else>
        <easy-spinner class="large-spinner" />
      </div>
      <div v-if="offersPagination.last_page > 1">
        <Pagination :offersPagination="offersPagination" />
      </div>
    </div>
  </div>
</template>
 <script>
import CustomCategoryDropdown from "./utility/CustomCategoryDropdown.vue";
import Pagination from "./utility/Pagination.vue";
import SingleItem from "./item/SingleItem.vue";
import { useStore } from "vuex";
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "Home",
  components: {
    CustomCategoryDropdown,
    SingleItem,
    Pagination,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    onMounted(() => {
      store.commit("Offer/setIsOffersLoading", true);
      if (route.name == "special-offers") {
        store.dispatch("Offer/getCategories").then(() => {
          let offerID = route.params.offer;
          store.dispatch("Offer/fetchSpecialOffers", {
            page: 1,
            offer: offerID,
          });
        });
      } else {
        store.dispatch("Offer/getCategories").then(() => {
          store.dispatch("Offer/fetchOffers");
        });
      }
    });

    // offers
    const isOffersLoading = computed(
      () => store.getters["Offer/isOffersLoading"]
    );
    const offers = computed(() => store.getters["Offer/offers"]);
    const offersPagination = computed(
      () => store.getters["Offer/offersPagination"]
    );

    return {
      offers,
      isOffersLoading,
      offersPagination,
    };
  },
};
</script>  

<style>
.home-page {
  padding: 50px 0;
  min-height: 50vh;
  text-align: left;
}
.large-spinner {
  font-size: 30px;
}
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
}
</style>