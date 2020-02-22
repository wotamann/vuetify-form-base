<template>
  <v-container fluid>
    <h4>Missing Schema will autogenerate Form if Value is String, Number or Boolean.</h4>
    
    <v-form-base
      :value="myValue"
      @input="change"
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
import change from '@/lib'

export default {
  name: 'Autogenerate',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        person: {
          name: {
            prename:'Samuel',         
            surname: 'Stoner'
          },
          email: 'Stoner@web.com',          
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
    change
  }
}
</script>
