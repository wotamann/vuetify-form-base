import Vue from 'vue'
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// Vue.use(Vuetify)
import vuetify from '@/plugins/vuetify'

import App from '@/App.vue'

Vue.config.warnHandler = function (err, vm, info) {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
  console.warn('WARNING:', err)
}

/* eslint-disable no-new */
new Vue({
  el: '#main',
  vuetify,
  render: h => h(App)
})
