<template>
  <v-container fluid>
    <h4>Textfields with Mask & Tooltips and Fileselector </h4>
    
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
    <infoline
      :value="myModel"
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
      myModel: {
        a:{},
         controls:{          
         }
      },
      mySchema: { 
        a:{
          type: "group",
          label: "Group",
          row:{ noGutters:false},
          schema: {
            a1: [ { 'a1-0':'text'}],
            a2: { type:'text', label:'a2-text' }
          },
        },
        
        b: {
          base: { type: 'checkbox', label: 'Base' },
          // array
          switch: [
            { type: 'switch', label: 'SW1' },
            { type: 'switch', label: 'SW2' }
          ],
          checkbox: [
            { type: 'checkbox', label: 'A' },
            { type: 'checkbox', label: 'B' },
            // nested array
            [
              { type: 'checkbox', label: 'C-A', color: 'teal' },
              { type: 'checkbox', label: 'C-B', color: 'teal' }
            ],
            { checkboxArray: [
              { type: 'checkbox', label: 'D-A', value: 'checked', color: 'red' },
              { type: 'checkbox', label: 'D-B', value: 'checked', color: 'red' }
            ]
            }
          ]
        }
      }
    }
  },
  methods: {
    log
  }
}
</script>
