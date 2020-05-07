<template>
  <v-container fluid>
    <h4>Handling of undefined Properties in Model or in Schema</h4>
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base 
      :model="myModel" 
      :schema="mySchema"
      col=6 
      @change="log"
    />     

    <!-- Stuff   -->
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
        name: 'Defined in Model & Schema',
        // no definition in mySchema - property value remains untouched  
        undefinedSchema: 'Value keeps untouched',  
      },
      mySchema: {
       name: 'text', 
        // no definition in myModel - property will be added & edited
        undefinedModel: { type:'text', label: 'Undefined in Model' }  
      }
    }
  },
  methods: {
    log
  }
}
</script>
