import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import App from '@/App.vue'


Vue.config.warnHandler = function (err, vm, info) {
  // global error/warn handler
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
  console.warn('WARNING:', err, info)
}

Vue.component('custom-basic', () => import('@/components/customcomponent-basic.vue') )
Vue.component('custom-object', () => import('@/components/customcomponent-object.vue') )

/* eslint-disable no-new */
new Vue({
  el: '#main',
  vuetify,
  render: h => h(App)
})
