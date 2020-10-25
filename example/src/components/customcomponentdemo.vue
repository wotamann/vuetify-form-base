<template>
  <v-container fluid>
    <h4>Use Components as Custom Controls</h4>
    <p>For proper work register <a href="https://vuejs.org/v2/guide/components-registration.html#Global-Registration">Custom-Control Components</a> globally in 'main.js'Vue.component('custom-object'</p>
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      class="border-frame"
      id="form-base-cc"
      :value="myModel"
      :schema="mySchema"
      :col=4
      @input:form-base-cc="log"
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
  
  Vue.component('custom-basic', () => import('@/components/customcomponent-basic.vue') )
  Vue.component('custom-object', () => import('@/components/customcomponent-object.vue') )
  // customBasic splits to custom-basic 
  // Case-sensitive attribute names don't work with v-bind 
  // https://github.com/vuejs/vue/issues/4212
*/

export default {
  components: { VFormBase, Infoline },
  name:'CustomComponentDemo',
  data () {
    return {
      myModel: {
        // name: 'Base',
        custom1: 'Textfield',
        custom2: { a:'A-Textfield', b:'B-Textfield' },
        custom3: { a:'#FFBBBB', b:'#DDEEFF' }
      },
      mySchema: {
        // name: { type: 'text', label: 'Name' },
        custom1: { type: 'customBasic', label:'Basic - Component' },
        custom2: { type: 'custom-object', label:'Object - Component' },
        custom3: { type: 'custom-color', label:'Color - Component' },
      }
    }
  },
  methods: {
    log    
  }
}
</script>
