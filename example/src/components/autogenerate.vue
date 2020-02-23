<template>
  <v-container fluid>
    <h4>Missing Schema will autogenerate Form if Value is String, Number or Boolean.</h4>
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      :value="myValue"
      @input="log"
    />
   
    <!-- Stuff   -->
    <infoline
      :value="myValue"
      :path="$options._componentTag"
    />
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'

export default {
  name: 'Autogenerate',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        person: {
          name: {
            prename:'Samuel',         
            surname: 'Base'
          },
          email: 'base@web.com',          
          age:37         
        },  
        todo: [
          {done: true, name: 'Jobs'},
          {done: false, name: 'Taleb'},
        ]
      }
    }    
  },
  methods: {
    log
  }
}
</script>
