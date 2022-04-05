<template>
  <div class="pagination justify-content-center">
    <nav aria-label="Page navigation ">
      <ul class="pagination">
        <li
          v-for="(x, index) in offersPagination.last_page"
          :key="index"
          class="page-item"
          :class="x === offersPagination.current_page ? 'active' : ''"
          @click="changePage(x)"
        >
          <a class="page-link" href="javascript:void(0)">{{ x }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "Pagination",
  props: {
    offersPagination: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const route = useRoute();
    function changePage(page) {
      if (route.name == "special-offers") {
        store.dispatch("Offer/fetchSpecialOffers", {
          page: page,
          offer: route.params.offer,
        });
      } else {
        store.dispatch("Offer/fetchOffers", page);
      }

      window.scrollTo(0, 0);
    }

    const store = useStore();

    return {
      changePage,
    };
  },
};
</script>