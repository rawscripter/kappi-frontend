 <template>
  <div class="container">
    <Header />
    <div class="main-view">
      <router-view> </router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import Header from "./Header.vue";
import "../../styles/layout.css";

export default {
  components: {
    Footer,
    Header,
  },
};
</script>

<style>
</style>
 
