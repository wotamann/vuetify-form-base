<template>
  <div>
    <v-form-base 
      :model="myModel"
      :schema="mySchema" 
      @change="map"
    />
    
    {{stringArray}}
  </div>      
</template>

<script>
import VFormBase from '@/components/vFormBase'

export default {
  components: { VFormBase },
  data () {
    return {  
      stringArray:[],    
      myModel: {
        values:[  
          { value:'value 2' }        
        ]        
      },
      mySchema: {
        values: {
          type: 'array',
          schema: {
            value: 'text'
            }          
          }
        }
      }    
  },  
  methods: {
    map ( ) {  
      this.stringArray = this.myModel.values.map( v => v.value)   
    }
  }

}
</script>
