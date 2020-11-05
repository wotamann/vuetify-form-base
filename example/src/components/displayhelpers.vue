<template>
  <v-container fluid>
    <h4>Control   
      <a target="_blank" href="https://vuetifyjs.com/en/styles/display">display</a>, 
      <a target="_blank" href="https://vuetifyjs.com/en/styles/typography">typography</a>
      or
      <a target="_blank" href="https://vuetifyjs.com/en/styles/spacing">spacing</a>
      of Content with Vuetify Display Helpers
    </h4>

    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      :value="myModel"
      :schema="mySchema"
      :col="6"
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

export default {
  name: 'DisplayHelpers',
  components: { VFormBase, Infoline },
  data () {
    return {
      myModel: {
        name1: 'Float left & Margin-Top',
        name2: 'Typographie & Padding',
        name3: 'Visible on sm',
        name4: 'Visible on xs, Margin-Bottom',
      },
      mySchema: {
        name1: { type: 'text', label:'grey lighten-3 float-left mt-6', class:'grey lighten-3 float-left mt-6' },
        name2: { type: 'text', label:'title pa-6 blue lighten-5', class:'title pa-6 blue lighten-5' },
        name3: { type: 'text', label:'d-none d-sm-flex d-md-none red lighten-4', class:'d-none d-sm-flex d-md-none red lighten-4' },
        name4: { type: 'text', label:'caption d-flex d-sm-none green lighten-4 mb-2', class:'caption d-flex d-sm-none green lighten-4 mb-2' },
      }
    }
  },
  methods: {
    log
  }
}
</script>
