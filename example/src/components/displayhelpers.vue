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
  name: 'DisplayHelpers',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        name2: 'typo title & padding left + right',
        name3: 'visible only on sm',
        name4: 'visible only on xs',
      },
      mySchema: {
        name2: { type: 'text', class:'title px-4 blue lighten-5' },
        name3: { type: 'text', class:'d-none d-sm-flex d-md-none red lighten-5' },
        name4: { type: 'text', class:'caption d-flex d-sm-none green lighten-5 ' },
      }
    }
  },
  methods: {
    log
  }
}
</script>
