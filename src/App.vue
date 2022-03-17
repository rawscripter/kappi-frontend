 <template>
  <div>
    <router-view></router-view>
    <TermsModal />
  </div>
</template>
 
 <script>
import TermsModal from "./views/terms/TermsModal.vue";
export default {
  components: {
    TermsModal,
  },
};
</script> 

 <style>
@import url("/src/styles/app.css");
</style>