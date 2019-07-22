import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import "./registerServiceWorker";
import VueCurrencyInput from 'vue-currency-input';

const pluginOptions = { /* see config reference */ };
Vue.use(VueCurrencyInput, pluginOptions);
Vue.config.productionTip = false;


new Vue({
  render: h => h(App)
}).$mount("#app");
