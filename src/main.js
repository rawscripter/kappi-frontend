import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import App from './App.vue'
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
// css scripts
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import easySpinner from 'vue-easy-spinner';
import VueImg from 'v-img';

const options = {
    // You can set your default options here
};

createApp(App)
    .use(BootstrapVue3)
    .use(store)
    .use(router)
     .component("font-awesome-icon", FontAwesomeIcon)
    .use(VueAxios, axios)
    .use(Toast, options)
    .use(easySpinner, {
        /*options*/
        prefix: 'easy',
    })
    .mount('#app')
