<template>
  <v-container fluid>
    <h4>Handling of undefined Textfields.</h4>
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      :value="myValue"
      :schema="mySchema"
      @change="log"
    />     

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

export default {
  name: 'Textfields',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        name: 'Base',
        password: 'abcdefgh',
        // no definition in mySchema - property value remains untouched  
        undefinedSchema: 'Value keeps untouched',  
      },
      mySchema: {
        // prop: text => shorthand for prop: { type: 'text' }
        name: 'text', 
        password: 'password', 
        // no definition in myValue - property will be added & edited
        undefinedValue: { type:'text', label: 'undefined in Value' }  
      }
    }
  },
  methods: {
    log
  }
}
</script>
