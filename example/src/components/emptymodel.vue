<template>
  <v-container fluid>
    <h4>Schema updates Model, even if it is only an empty Object</h4>
    
    <!-- FORM-BASE-COMPONENT -->    
    <v-form-base :model="myModel" :schema="mySchema" col=6 @input="log"/>
    
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
  name: 'EmptyModel',
  components: { VFormBase, Infoline },
  data () {
    return {
      myModel: {
        // updates input here
      },      
      mySchema: {
        name: 'text',         // schema prop:'text' is shorthand for prop: { type: 'text', label:'prop' }
        password: 'password', 
        file: 'file',         
        number: 'number'
      }
    }
  },
  methods: {
    log
  }
}
</script>
