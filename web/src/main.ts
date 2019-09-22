import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueAzureMaps, { AzureMap } from 'vue-azure-maps'
import 'vue-azure-maps/dist/vue-azure-maps.css'

Vue.use(VueAzureMaps, {
  key: 'HVvKrOsejfbC4EuqwU5Y110PQhwtcuvaXnZGWlZWK_k',
});

Vue.component('AzureMap', AzureMap)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
