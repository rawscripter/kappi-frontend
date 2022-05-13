<template>
  <div class="terms-page">
    <h2 class="mb-4">
      <strong>{{ terms.name }}</strong>
    </h2>
    <div v-html="terms.description"></div>
  </div>
</template>
 <script>
import "/src/styles/privacy.css";

import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const terms = computed(() => store.state.User.terms);

    onMounted(() => {
      store.dispatch("User/terms");
    });

    return {
      terms,
    };
  },
};
</script>
