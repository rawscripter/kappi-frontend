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
                src="/public/assets/logo/logo.png"
                alt=""
              />
            </div>

            <div class="terms-contents mt-5">
              <h2 class="mb-4"><strong>Regulamin</strong></h2>
              <h5><strong>Introduction</strong></h5>
              <p class="text-muted">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Quaerat excepturi, sint beatae eligendi facilis reprehenderit?
                Maiores suscipit, nisi quidem mollitia nam delectus voluptates
                blanditiis asperiores neque? Tempora quos veniam voluptatibus?
              </p>

              <h5 class="mt-5"><strong>User Agreement</strong></h5>
              <p class="text-muted">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Quaerat excepturi, sint beatae eligendi facilis reprehenderit?
                Maiores suscipit,
              </p>
              <div>
                <ul class="text-muted">
                  <li class="mb-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                    dolores eaque ipsum minima eos, dolores eaque ipsum minima
                  </li>
                  <li class="mb-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
                    eos, dolores eaque ipsum minima
                  </li>
                  <li class="mb-3">
                    Lorem dolores eaque ipsum minima ipsum dolor sit amet
                    consectetur adipisicing elit. Id, eos, dolores eaque ipsum
                    minima
                  </li>
                </ul>
              </div>

              <div class="terms-buttons d-flex justify-content-start">
                <button
                  @click="closeLoginModal()"
                  type="button"
                  class="btn btn-outline-black mr-3"
                >
                  Rezygnuję z rejestracji
                </button>
                <button
                  @click="closeLoginModal()"
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
export default {
  setup() {
    const store = useStore();
    const showModal = computed(() => store.state.User.showTermsModal);
    function closeLoginModal() {
      store.dispatch("User/setTermsModal", false);
    }
    return {
      showModal,
      closeLoginModal,
    };
  },
};
</script>

 <style scoped>
@import url("/src/styles/terms.css");
</style>