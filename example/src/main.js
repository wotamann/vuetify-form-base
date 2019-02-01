import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import App from '@/App.vue'

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#main',
  render: h => h(App)
})
