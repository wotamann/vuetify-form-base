<template>
  <v-container fluid>
    <h4>Textfields using HTML <input> type Attribute with dynamic Schema (Color)</h4>
   
      <!-- FORM-BASE-COMPONENT -->    
      <v-form-base 
        :model="myModel"
        :schema="mySchema"
        :flex="6"
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
    // dynamic schema for changing color
    mySchema() { 
      return {
        password: { 
          type: 'text', 
          // ext: set HTML <input> type Attribute - https://www.w3schools.com/tags/att_input_type.asp
          ext:'password', 
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
          label:'Range'
        },        
        color:{ 
          type:'text', 
          ext:'color',
          color: this.myModel.color,
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
