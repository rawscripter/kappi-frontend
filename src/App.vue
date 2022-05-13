 <template>
  <div class="overflow-hidden">
    <router-view></router-view>
    <TermsModal />
    <PrivacyModal />
  </div>
</template>
 
 <script>
import TermsModal from "./views/terms/TermsModal.vue";
import PrivacyModal from "./views/privacy-policy/PrivacyModal.vue";
import { onMounted } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    TermsModal,
    PrivacyModal,
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("User/terms");
      store.dispatch("User/policy");
    });
  },
};
</script> 

 <style>
@import url("/src/styles/app.css");
</style>