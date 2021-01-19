<template>
  <v-container fluid>
    <h4>Textfields Extension for native HTML-Input Type</h4>
      <!-- 
        1) Most controls are based on vuetify and therefore 
          the properties of these controls can be used 
          
          schema:{ type:'text',hint:'ABC', persistentHint:true, ... } 
          
          maps to 
          
          <v-text-fields hint="ABC" persistent-hint > 
          see more -> https://vuetifyjs.com/en/components/text-fields/
        
        2)  Use Native HTML Input Type with Prop 'ext'
          Prop 'ext' in schema:{ type:'text', ext:'color', ...} makes native HTML-INPUT Type available 
      
        3) Use <v-form-base> attribute 'col' for global GRID-Setting: 
          string   :col:"6"  
          object   :col="{ cols:12, sm:6, md:4 }" 

        4) COMPUTED SCHEMA updates Layout (see color, range)    
      -->
      <v-form class="border-frame">
        <!-- FORM-BASE-COMPONENT -->   
        <v-form-base 
          :model="myModel"
          :schema="mySchema"
          :col="{ cols:12, sm:6, md:4 }"
          @input="log"
          @click="log"
        />
      </v-form>
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
    
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
        range:50,
        color:'#6666FF',
        time:'01:15',
        date:'2020-02-25'
      }
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
          label: 'Range:' + this.myModel.range,    // this works only with computed schema 
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
          locale:'en',
          prependIcon: 'event', 
          label:'Date'
        },
        time:{ 
          type:'text', 
          ext:'time', 
          prependIcon: 'timer', 
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
