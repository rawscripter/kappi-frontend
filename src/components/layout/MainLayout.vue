 <template>
  <div class="container">
    <Header />
    <div class="main-view">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.fullPath"></component>
        </keep-alive>
      </router-view>
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
import { useStore } from "vuex";
import { onMounted } from "vue";
export default {
  components: {
    Footer,
    Header,
    PasswordReset,
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("User/me");
    });
  },
};
</script>

<style>
</style>
 
