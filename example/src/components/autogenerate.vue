<template>
  <v-container fluid>
    <h4>Autogenerate Form from Model on missing Schema</h4>
    <p>Working only if Model-Data is Type of String, Number or Array</p>
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base :model="myModel" :col="{xs:12,sm:6, lg:4}" @input="log" class="border-frame"/>

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
