 <template>
  <div>
    <router-view></router-view>
    <TermsModal />
    <PrivacyModal />
  </div>
</template>
 
 <script>
import TermsModal from "./views/terms/TermsModal.vue";
import PrivacyModal from "./views/privacy-policy/PrivacyModal.vue";
export default {
  components: {
    TermsModal,
    PrivacyModal,
  },
};
</script> 

 <style>
@import url("/src/styles/app.css");
</style>