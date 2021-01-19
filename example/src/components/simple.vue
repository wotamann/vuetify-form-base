<template>
  <v-container fluid>
    <h4>Textfields with Attributes, Masked Input and Fileselector</h4>
    
    <v-form class="border-frame">
      <!-- FORM-BASE-COMPONENT -->    
      <v-form-base 
        :model="myModel"
        :schema="mySchema"
        :col=6
        @input="log"
        @click="log"
      />  
      <!--
        // compose listener to one or more of following Events:
        @focus= "log"
        @input= "log"
        @click= "log"
        @blur=  "log"        
        @resize= "log"
        @intersect="log"      // intersect - https://vuetifyjs.com/en/directives/intersect
        @clickOutside= "log"  // clickOutside - https://vuetifyjs.com/en/directives/click-outside/
        @swipe=  "log"        // touch events        
        @mouseleave="log"
        @mouseenter="log"
        @dragstart="dragstart"
        @dragover="dragover"
        @drop="drop"
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
  data: ()=>({
    myModel: {
      name: 'Base',
      creditcard: '12345678',
      password: 'abcdefgh',
      file: [], // array of File objects
    },     
    /*
      SCHEMA
      Order of Props in Schema defines Order of Controls in Form 
      Most controls are based on vuetify and therefore the properties of these controls can be used in 
      
      schema:{ type:'text', hint:'myHint', prependIcon:'print'... } 
      maps to <v-text-fields hint="myHint" prepend-icon="print" > 
      -> https://vuetifyjs.com/en/components/text-fields/   
    */
   mySchema: { 
      name: {   
        type: 'text', 
        label:'name',
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
  }),  
  methods: {
    log
  }
}
</script>
