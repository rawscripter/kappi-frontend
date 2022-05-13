<template>
  <div class="privacy-policy-page">
    <div class="page-headline mt-5 mb-5 text-center">
      <h2>
        <u>{{ policy.name }}</u>
      </h2>
    </div>

    <div class="page-contents text-left">
      <div v-html="policy.description"></div>
    </div>
  </div>
</template>
 <script>
import "/src/styles/privacy.css";

import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const policy = computed(() => store.state.User.policy);

    onMounted(() => {
      store.dispatch("User/policy");
    });

    return {
      policy,
    };
  },
};
</script> 