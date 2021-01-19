<template>
  <v-container fluid>
    <h4>Autogenerate Form using pure Model-Data on missing Schema</h4>
    <p>Model-Data must be of Type of 'string', 'number', 'bool' or 'array'</p>
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base 
      :model="myModel" 
      :col="{xs:12,sm:6}" 
      @input="log" 
      class="border-frame"
    />

    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="{}"/>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'

export default {
  name: 'AutogenerateSchema',
  components: { VFormBase, Infoline },
  data () {
    return {
      myModel: {
        person: {
          name: {
            prename:'Samuel',         
            surname: 'Stoner'
          },          
          email: 'stoner@mail.com',          
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
