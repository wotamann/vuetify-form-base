<template>
  <v-container fluid>
    <h4>Textfields with Mask & Tooltips and Fileselector</h4>
    
    <v-form>
      <!-- FORM-BASE-COMPONENT -->    
      <v-form-base 
        :model="myModel"
        :schema="mySchema"
        :col=6
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
     
        // if 'id' available append 'id' at event -  
        id="form-base-list"
        @change:form-base-list="log"


        schema prop:'text' is shorthand for key: { type: 'text', label:key }

        Most controls are based on vuetify and therefore 
        the properties of these controls can be used in 
        schema:{ type:'text', hint:'myHint', ... } maps to <v-text-fields>
        -> https://vuetifyjs.com/en/components/text-fields/
      -->
    </v-form>
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
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
      myModel: {
        name: 'Base',
        creditcard: '12345678',
        password: 'abcdefgh',
        file: [] // array of File objects
      },     

      // Schema-Order defines Order of Controls in Form    
      mySchema: {
        name: { 
          type:'text', 
        },         
        password: { 
          type: 'password',
          clearable: true,
          solo:true,
          class:'mx-1 mt-1'
        },
        creditcard: { 
          type: 'text', 
          label: 'Creditcard', 
          prependInnerIcon: 'credit_card',         
          hint: mask, 
          mask          
        },        
        file: { 
          type: 'file', 
          label: 'Images', 
          showSize:true,
          counter:true,
          accept, 
          multiple: true,
        }
      }
    }
  },
  methods: {
    log
  }
}
</script>
