<template>
  <v-container fluid>
    <h4>Autogenerate Form from Model (No Schema)</h4>
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base :model="myModel" :flex="{xs:12,sm:6}" @input="log"/>

    <!-- Stuff   -->
    <infoline
      :value="myModel"
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
      myModel: {
        person: {
          name: {
            prename:'Samuel',         
            surname: 'Stoner'
          },          
          email: 'Stoner@mail.com',          
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
