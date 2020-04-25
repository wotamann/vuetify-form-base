<template>
  <v-container fluid>
    <h4>Vuetify display helpers, allow to control the  
      <a target="_blank" href="https://vuetifyjs.com/en/styles/display">display</a>
      or 
      <a target="_blank" href="https://vuetifyjs.com/en/styles/typography">typography</a>
      or
      <a target="_blank" href="https://vuetifyjs.com/en/styles/spacing">spacing</a>
      of content
    </h4>

    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      :value="myValue"
      :schema="mySchema"
      @input="log"
    />
    
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

const toUpper = ( {value} ) => typeof value === 'string' ? value.toUpperCase() : value 
const toReverse = ( {value} ) => typeof value === 'string' ? value.split("").reverse().join("") : value 

export default {
  name: 'DisplayHelpers',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        name1: 'manipulate value and display',
        name2: 'manipulate input to value',
      
      },
      mySchema: {
        name1: { type: 'text', toCtrl: toUpper, fromCtrl: toUpper, label:'Value To Control' },
        name2: { type: 'text', fromCtrl: toReverse, label:'Control To Value' },
      }
    }
  },
  methods: {
    log
  }
}
</script>
