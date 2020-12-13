<template>
  <v-container fluid>
    <h4>Select Items in Base and then select Item of Base Selection</h4>
    <v-form-base
      id="form-base-selection"
      :model="myModel"
      :schema="mySchema"
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

const items = ['Musk', 'Jobs', 'Taleb', 'Harari']

export default {
  name: 'CascadingSelection',
  components: { VFormBase, Infoline },
  data () {
    return {
      myModel: {
        selection1: ['Musk', 'Taleb'],
        selection2: 'Taleb',
      },
      
    }
  },
  computed: {
    mySchema() {
      return {
        selection1: { type: 'select', label: 'Base', items, multiple: true },
        selection2: { type: 'select', label: 'Select Item of Base Selection', items: this.myModel.selection1, clearable:true, noDataText:'First select Base Items' },
      }
    }
  },
  methods: {
    log (val) {

      log(val)
      
      // set null or delete selection2 if its value doesn't match with new Base Selection
      if ( this.myModel.selection1.indexOf(this.myModel.selection2) === -1 ) {        
        // this.myModel.selection2 = null
        delete this.myModel.selection2
      }        
    }
  }
}
</script>
