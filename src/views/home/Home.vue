<template>
  <div class="home-page">
    <div class="category-filter-area">
      <div class="category-filter-area__title">
        <p><strong>Kategoria</strong></p>
      </div>
      <CustomCategoryDropdown />
    </div>

    <div class="item-list mt-5">
      <div class="item-list__items">
        <SingleItem v-for="(item, index) in 5" :key="index" :item="item" />
      </div>

      <Pagination />
    </div>
  </div>
</template>
 <script>
import CustomCategoryDropdown from "./utility/CustomCategoryDropdown.vue";
import Pagination from "./utility/Pagination.vue";
import SingleItem from "./item/SingleItem.vue";
export default {
  components: {
    CustomCategoryDropdown,
    SingleItem,
    Pagination,
  },
};
</script>  

<style>
.home-page {
  padding: 50px 0;
  min-height: 50vh;
  text-align: left;
}
</style>