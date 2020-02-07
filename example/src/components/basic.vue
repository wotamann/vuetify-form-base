<template>
  <v-container fluid>
    <h4>Redundant Textfields</h4>
    <v-form>
      <v-form-base
        :value="myValue"
        :schema="mySchema"
        @change="change"
      />     
    </v-form>
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
import change from '@/lib'

export default {
  name: 'Textfields',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        name: 'Base',
        password: 'abcdefgh',
        // no definition in mySchema - property remains untouched  
        undefinedSchema: 'untouched value',  
      },
      mySchema: {
        // prop: text => shorthand for prop: { type: 'text' }
        name: 'text', 
        password: 'password', 
        // no definition in myValue - property will be added & edited
        undefinedValue: { type:'text', label: 'undefinedValue ' }  
      }
    }
  },
  methods: {
    change
  }
}
</script>
