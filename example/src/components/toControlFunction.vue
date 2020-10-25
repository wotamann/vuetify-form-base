<template>
  <v-container fluid>
    <h4>Modify in-/outgoing Data going to or coming from Control</h4>

    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      :model="myModel"
      :schema="mySchema"
      :col=4
      @input="log"
    />
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
   
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'

// ( { value, obj, data, schema } )  => value
const toUpper = ( {value} ) => typeof value === 'string' ? value.toUpperCase() : value 
const toLower = ( {value} ) => typeof value === 'string' ? value.toLowerCase() : value 

export default {
  name: 'DisplayHelpers',
  components: { VFormBase, Infoline },
  data () {
    return {
      myModel: {
        name1: 'UPPER',
        name2: 'lower',
        joined:''
      
      },
      mySchema: {
        name1: { type: 'text',  toCtrl: toUpper, fromCtrl: toUpper, label:'toUpper' },
        name2: { type: 'text', toCtrl: toLower, fromCtrl: toLower, label:'toLower' },
        joined: { type: 'text', toCtrl: ( {data} ) => {data.joined = data.name1 + ' | ' + data.name2; return data.joined}, disabled:true,  label:'Joined' },
      }
    }
  },
  methods: {
    log
  }
}
</script>
