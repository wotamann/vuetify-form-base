<template>
  <v-container fluid>
    <h4>Dynamic Items in Select with computed Schema</h4>
    
    <v-form>
      <!-- FORM-BASE-COMPONENT -->    
      <v-form-base 
        :model="myModel"
        :schema="mySchema"
        :col=6
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
  name: 'DynamicItems',
  components: { VFormBase, Infoline },
  data () {
    return {
      items: [10,20,30],
      myModel: {
        select: null       
      }
    }
  },
  computed: {
    mySchema() { 
      return {
        select: {
          type:'select',
          items: this.items
        }
      }
    }
  },
  methods: {
    log(v){
      log(v)
      this.items.push( parseInt( Math.random()*100) )
    }
  }
}
</script>
