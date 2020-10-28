import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
import App from '@/App.vue'

Vue.config.warnHandler = function (err, vm, info) {
  // global error/warn handler
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
  console.error('WARNING:', err, info)  
}

// global component registration for use as custom component in schema
// schema: { custom1: { type: 'custom-basic' }, custom2: { type: 'custom-object' } }
Vue.component('customBasic', () => import('@/components/customcomponent-basic.vue') )
Vue.component('custom-object', () => import('@/components/customcomponent-object.vue') )
Vue.component('custom-extern', () => import('@/components/customcomponent-extern.vue') )
Vue.component('custom-color', () => import('@/components/customcomponent-color.vue') )


/* eslint-disable no-new */
new Vue({
  el: '#main',
  vuetify,
  router,
  render: h => h(App)
})
