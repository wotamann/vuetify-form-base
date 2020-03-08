<template>
  <v-container fluid>
    <h4>Missing Schema will autogenerate Form. Control Grid with Flex-Prop</h4>
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      :value="myValue"
      :flex="{xs:12,sm:6}"
      @input="log"
    />

    <!-- 
      FLEX default
      default: {xs:12,sm:6,md:4,lg:3}
      or
      :flex="{xs:12,sm:6,md:4,lg:3}" 
    -->


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
    log
  }
}
</script>
