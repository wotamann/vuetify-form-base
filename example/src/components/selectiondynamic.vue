<template>
  <v-container fluid>
    <h4>Select Items in Base and then select Item of Base Selection</h4>
    <v-form-base
      id="form-base-selection"
      :value="myValue"
      :schema="mySchema"
      @input:form-base-selection="change"
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
import change from '@/lib'

const items = ['Musk', 'Jobs', 'Taleb', 'Harari']

export default {
  name: 'SelectionDynamic',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        selection1: ['Musk', 'Taleb'],
        selection2: 'Taleb',
      },
      
    }
  },
  computed: {
    mySchema() {
      return {
        selection1: { type: 'select', label: 'Base', items, multiple: true },
        selection2: { type: 'select', label: 'Select Item of Base Selection', items: this.myValue.selection1, clearable:true, noDataText:'First select Base Items' },
      }
    }
  },
  methods: {
    change (val) {

      change(val)
      
      // delete selection2 if its value doesn't match with new Base Selection
      if ( this.myValue.selection1.indexOf(this.myValue.selection2) === -1 ) {
        delete this.myValue.selection2
      }        
    }
  }
}
</script>
