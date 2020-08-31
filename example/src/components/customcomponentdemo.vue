<template>
  <v-container fluid>
    <h4>Use Components as Custom Controls</h4>
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      id="form-base-cc"
      :value="myValue"
      :schema="mySchema"
      :col=4
      @input:form-base-cc="log"
    />
    
    <h4>For proper work register Custom-Control Components globally in 'main.js'</h4>
    <!-- Stuff   -->
    <infoline
      :value="myValue"
      :schema="mySchema"
      :path="$options._componentTag"
    />
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
      myValue: {
        name: 'Base',
        custom1: 'Textfield',
        custom2: { a:'A-Textfield', b:'B-Textfield' }
      },
      mySchema: {
        name: { type: 'text', label: 'Name' },
        custom1: { type: 'customBasic', label:'Component - Basic' },
        custom2: { type: 'custom-object', label:'Component - Object' },
      }
    }
  },
  methods: {
    log    
  }
}
</script>
