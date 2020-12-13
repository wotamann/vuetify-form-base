<template>
  <v-container fluid>
    <h4>Use Components as Custom Controls</h4>
    <p>For proper work register <a href="https://vuejs.org/v2/guide/components-registration.html#Global-Registration">Custom-Control Components</a> globally in 'main.js'Vue.component('custom-object'</p>
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      class="border-frame"
      id="form-base-cc"
      :model="myModel"
      :schema="mySchema"
      :col=6
      @input="log"
    />
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
    
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'

/* IMPORTANT !!!

  // You have to register your Custom-Control Component globally in 'main.js'
  // See: https://vuejs.org/v2/guide/components-registration.html
  
  // main.js
  Vue.component('customBasic', () => import('@/components/customcomponent-basic.vue') )
  Vue.component('custom-object', () => import('@/components/customcomponent-object.vue') )
  Vue.component('custom-extern', () => import('@/components/customcomponent-extern.vue') )
  Vue.component('custom-color', () => import('@/components/customcomponent-color.vue') )
  
  // type:'customBasic' splits to custom-basic 
  // Case-sensitive attribute names don't work with v-bind 
  // https://github.com/vuejs/vue/issues/4212
*/

export default {
  components: { VFormBase, Infoline },
  name:'CustomComponents',
  data () {
    return {
      myModel: {
        // name: 'Base',
        custom1: 'Textfield',
        custom2: { a:'A-Textfield', b:'B-Textfield' },
        custom3: { a:'#FFBBBB', b:'#DDEEFF' },
        custom4: { date:'10/10/2019' },
      },
      mySchema: {
        // name: { type: 'text', label: 'Name' },
        custom1: { type: 'customBasic', label:'Basic - Component' },
        custom2: { type: 'custom-object', label:'Object - Component' },
        custom3: { type: 'custom-color', label:'Color - Component' },
        custom4: { type: 'custom-extern', label:'Extern - Component', class:'ma-3 pa-4 grey lighten-3 caption' },
      }
    }
  },
  methods: {
    log    
  }
}
</script>
