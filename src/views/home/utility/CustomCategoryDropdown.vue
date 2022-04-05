<template>
  <div class="select-box">
    <div class="select-box__current" tabindex="1">
      <div class="select-box__value">
        <input
          class="select-box__input"
          type="radio"
          value="1"
          name="Ben"
          checked="checked"
        />
        <p class="select-box__input-text">
          {{ isCategoryLoading ? "Kategoria" : currentCategory.name }}
        </p>
      </div>

      <font-awesome-icon
        class="select-box__icon"
        :icon="['fas', 'angle-down']"
      />
    </div>
    <ul class="select-box__list">
      <li v-for="(category, index) in categories" :key="index">
        <label
          @click="setCurrentCategory(category)"
          class="select-box__option"
          :for="category.id"
          aria-hidden="aria-hidden"
          >{{ category.name }}</label
        >
      </li>
    </ul>
  </div>
</template>


<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const categories = computed(() => store.getters["Offer/categories"]);
    const currentCategory = computed(
      () => store.getters["Offer/currentCategory"]
    );
    const isCategoryLoading = computed(
      () => store.getters["Offer/isCategoryLoading"]
    );
    function setCurrentCategory(category) {
      store.dispatch("Offer/setCurrentCategory", category).then(() => {
        if (route.name == "special-offers") {
          store.dispatch("Offer/fetchSpecialOffers", {
            page: 1,
            offer: route.params.offer,
          });
        } else {
          store.dispatch("Offer/fetchOffers");
        }
      });
    }

    return {
      categories,
      currentCategory,
      isCategoryLoading,
      setCurrentCategory,
    };
  },
};
</script>

<style>
@import url("/src/styles/categoryDropdown.css");
</style>