<template>
  <v-container fluid>
    <h4>Textfields and Fileselector with Mask and Tooltips</h4>
    
    <v-form>
      <!-- FORM-BASE-COMPONENT -->    
      <v-form-base
        :value="myValue"
        :schema="mySchema"
        @input="log"
      />
      <!--
        compose listener to one or more of following events
        @click= "log"
        @input= "log"
        @change="log"    // input & click
        @watch= "log"    // focus & input & click &  blur
        @focus= "log"
        @blur=  "log"        
        @mouse= "log"    // mouseenter & mouseleave  
        @resize="log"
        @intersect="log" // https://vuetifyjs.com/en/directives/intersect
        @swipe= "log"    // touch events        
        @update="log"    // catch all events
     
        // If ID is set then add ID to event
        id="form-base-list"
        @change:form-base-list="log"        
      -->
    </v-form>
    
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
          clearable: true, 
          flex: 12 
        },
        creditcard: { 
          type: 'text', 
          label: 'Creditcard', 
          prependInnerIcon: 'credit_card', 
          hint: mask, 
          mask, 
          tooltip: 'Creditcard', 
          flex: 12 
        },
        file: { 
          type: 'file', 
          label: 'Files', 
          accept, 
          multiple: true, 
          tooltip: { color: 'green', label: 'File Selection', top: true }, 
          flex: 12 
        }
      }
    }
  },
  methods: {
    log
  }
}
</script>
