 <template>
  <footer class="app-footer">
    <div class="row">
      <div class="col-md-4">
        <img class="footer-logo" src="/assets/logo/logo.png" alt="" />
        <div class="footer-desc">
          KAPPI to nowatorska platforma umożliwiająca zawieranie transakcji na
          rynku nieruchomości.
        </div>
      </div>
      <div class="col-md-4">
        <ul class="middle-footer-content">
          <li for="">
            <div @click="openPasswordResetModal()" class="text-dark">
              Reset Password
            </div>
          </li>
          <li for="">
            <router-link
              :to="{
                name: 'terms',
              }"
              class="text-dark"
              >Regulamin</router-link
            >
          </li>
          <li for="">
            <router-link
              :to="{
                name: 'privacy-policy',
              }"
              class="text-dark"
              >Polityka prywatności</router-link
            >
          </li>
          <li>Informacje</li>
        </ul>
      </div>
      <div class="col-md-4">
        <p class="fw-bold">Masz pytania? Jesteśmy tu dla Ciebie!</p>
        <ul class="right-footer-content">
          <li><font-awesome-icon :icon="['fas', 'phone']" />+48 253 789 155</li>
          <li>
            <font-awesome-icon :icon="['fas', 'envelope']" />
            kappiofficial2255@gmail.com
          </li>
          <li>
            <font-awesome-icon :icon="['fas', 'location-pin']" /> 4517
            Washington Ave, Machester, Kentucky 39495
          </li>
        </ul>
      </div>
    </div>
  </footer>
  <div class="footer-bottom text-center fs-13 p-3">
    Copyright <strong>© KAPPI</strong>. All rights reserved.
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    function openTermsModal() {
      store.dispatch("User/setTermsModal", true);
    }
    function openPasswordResetModal() {
      store.dispatch("User/setPasswordResetModal", true);
    }

    return {
      openTermsModal,
      openPasswordResetModal,
    };
  },
};
</script>
 
