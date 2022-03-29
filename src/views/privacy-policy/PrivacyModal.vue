<template>
  <div>
    <div
      id="termsModal"
      class="modal"
      :class="showModal ? 'show' : ''"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content shadow-sm">
          <div @click="closeModal()" class="modal-close-button shadow">
            <font-awesome-icon :icon="['fas', 'times']" />
          </div>
          <div class="modal-body">
            <div class="logo text-center">
              <img
                class="logo"
                width="250"
                src="/assets/logo/logo.png"
                alt=""
              />
            </div>

            <div class="terms-contents mt-5">
              <PrivacyPolicy />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PrivacyPolicy from "./PrivacyPolicy.vue";
export default {
  components: {
    PrivacyPolicy,
  },
  setup() {
    const store = useStore();
    const showModal = computed(() => store.state.User.showPrivacyModal);
    function closeModal() {
      store.dispatch("User/setPrivacyModal", false);
    }
    return {
      showModal,
      closeModal,
    };
  },
};
</script>

 <style scoped>
@import url("/src/styles/terms.css");
</style>