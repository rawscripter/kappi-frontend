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
              <Terms />
              <div class="terms-buttons d-flex justify-content-start">
                <button
                  @click="closeModal()"
                  type="button"
                  class="btn btn-outline-black mr-3"
                >
                  Rezygnuję z rejestracji
                </button>
                <button
                  @click="closeModal()"
                  type="button"
                  class="btn btn-primary shadow"
                >
                  Akceptuję regulamin
                </button>
              </div>
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
import Terms from "./Terms.vue";
export default {
  components: {
    Terms,
  },
  setup() {
    const store = useStore();
    const showModal = computed(() => store.state.User.showTermsModal);
    function closeModal() {
      store.dispatch("User/setTermsModal", false);
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