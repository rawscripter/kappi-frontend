 <template>
  <div class="container">
    <Header />
    <div class="main-view">
      <router-view> </router-view>
    </div>
    <Footer />
    <PasswordReset />
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import Header from "./Header.vue";
import "../../styles/layout.css";
import PasswordReset from "../../views/auth/PasswordReset.vue";
export default {
  components: {
    Footer,
    Header,
    PasswordReset,
  },
};
</script>

<style>
</style>
 
