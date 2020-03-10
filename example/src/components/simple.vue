<template>
  <v-container fluid>
    <h4>Textfields and Fileselector with Mask and Tooltips</h4>
    
    <v-form>
      <!-- FORM-BASE-COMPONENT -->    
      <v-form-base
        :value="myValue"
        :schema="mySchema"
        :flex="6"
        @input="log"
      />
      <!--
        // compose listener to one or more of following Events:
        @click= "log"
        @input= "log"
        @change="log"    // input|click
        @watch= "log"    // focus|input|click|blur
        @focus= "log"
        @blur=  "log"        
        @mouse= "log"    // mouseenter|mouseleave  
        @display= "log"  // resize|swipe|intersect 
        @intersect="log" // intersect - https://vuetifyjs.com/en/directives/intersect
        @resize= "log"
        @swipe=  "log"   // touch events        
        @update= "log"   // catch all events
     
        // if 'id' available append 'id' at Event: 
        id="form-base-list"
        @change:form-base-list="log"        
      -->
    
    </v-form>
    
    <!-- Stuff  -->    
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

// More Info to Mask https://vuejs-tips.github.io/vue-the-mask/
const mask = '####-####-####-####'

// Accept only Images Files
const accept = 'image/*'
   
export default {
  name: 'Textfields',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        name: 'Base',
        creditcard: '12345678',
        password: 'abcdefgh',
        file: [] // array of File objects
      },      
      mySchema: {
        // schema prop: string 'text' => shorthand for prop: { type: 'text' }        
        name: 'text',         
        // schema prop: object definition
        password: { 
          type: 'password', 
          clearable: true          
        },
        creditcard: { 
          type: 'text', 
          label: 'Creditcard', 
          prependInnerIcon: 'credit_card', 
          hint: mask, 
          mask, 
          tooltip: 'Creditcard'
        },
        file: { 
          type: 'file', 
          label: 'Files', 
          accept, 
          multiple: true
        }
      }
    }
  },
  methods: {
    log
  }
}
</script>
