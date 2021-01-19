<template>
  <v-container fluid>
    <h4>Handling of undefined Properties in Model or in Schema</h4>
    
    <v-form class="border-frame">
      <!-- FORM-BASE-COMPONENT -->
      <v-form-base 
        :model="myModel" 
        :schema="mySchema"
        col=4 
        @input="log"
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
  name: 'undefinedProperties',
  components: { VFormBase, Infoline },
  data: () => ({
      myModel: {
        InModelAndSchema: 'Defined in Model & Schema',
        // no definition in mySchema - property value remains untouched  
        undefinedInSchema: 'Undefined in Schema - Value keeps untouched',  
      },
      mySchema: {
       InModelAndSchema: 'text', 
        // no definition in myModel - property will be displayed & edited
        undefinedInModel: { type:'text', label: 'Undefined in Model' }  
      }
  }),
  methods: {
    log
  }
}
</script>
