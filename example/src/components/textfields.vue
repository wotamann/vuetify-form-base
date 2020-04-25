<template>
  <v-container fluid>
    <h4>Textfields using native HTML-Input Type attribute with computed Schema (Color)</h4>
      <!-- 
        Most controls are based on vuetify and therefore 
        the properties of these controls can be used 
        
        schema:{ type:'text',hint:'ABC', persistentHint:true, ... } 
          maps to 
        <v-text-fields hint="ABC" persistent-hint> 
        see more -> https://vuetifyjs.com/en/components/text-fields/
        
        prop 'ext' in combination with schema:{ type:'text', ext:'color', ...} makes native Type of HTML INPUT-TAG available 
      
        property FLEX for global setting grid: 
          shorthand                     :flex:"6"  
          object to make it responsible :flex="{ xs:12, sm:6, md:4 }" 

        COMPUTED SCHEMA updates Layout (see color)    
      -->
   
      <!-- FORM-BASE-COMPONENT -->   
      <v-form-base 
        :model="myModel"
        :schema="mySchema"
        :flex="{ xs:12, sm:6, md:4 }"
        @input="log"
      />
    
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
   
export default {
  name: 'Textfields',
  components: { VFormBase, Infoline },
  data () {
    return {
      myModel: {
        password: 'abcdefgh',
        count:100,
        range:33,
        color:'#FF2AAB',
        time:'01:15',
        date:'2020-02-25',
      },  
     
    }
  },
  computed:{
    mySchema() { 
      return {
        password: { 
          type: 'text', 
          ext:'password', // ext: set HTML <input> type Attribute - https://www.w3schools.com/tags/att_input_type.asp 
          label: 'Password', 
          clearable: true 
        },      
        count:{ 
          type:'text',
          ext:'number',    // == type:'number'
          label:'Number', 
          tooltip: 'Counter'
        },        
        range:{ 
          type:'text', 
          ext:'range', 
          title: this.myModel.range,    // computed schema updates with range value
          label:'Range'
        },        
        color:{ 
          type:'text', 
          ext:'color',
          color: this.myModel.color,     // computed schema updates with changing color
          prependIcon: 'palette', 
          label:'Color'
        },
        date:{ 
          type:'text', 
          ext:'date', 
          label:'Date'
        },
        time:{ 
          type:'text', 
          ext:'time', 
          label:'Time'
        },
      }
    }
  },
  methods: {
    log
  }
}
</script>
