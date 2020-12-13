<template>
  <v-container fluid>
    <h4>Select Items defined in Schema-Array</h4>
    <v-form-base
      id="form-base-selection"
      :model="myModel"
      :schema="mySchema"
      @input="update"
    />
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
   
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import update from '@/lib'

const items = ['Musk', 'Jobs', 'Taleb', 'Harari']
const itemsObj = [{name:'This is A', val:'A'}, {name:'This is B', val:'B'}, {name:'This is C', val:'C'}]
export default {
  name: 'Selection',
  components: { VFormBase, Infoline },
  data () {
    return {
      myModel: {
        selectSingle: 'Musk',
        selectObject: itemsObj[2],
        selectMultiple: ['Musk', 'Taleb'],
        selectMultipleObject:[itemsObj[1], itemsObj[2]],
        comboboxSingle: 'Harari',
        comboboxMultiple: ['Harari', 'Musk'],
        autocompleteSingle: 'Taleb',
        autocompleteMultiple: ['Taleb', 'Jobs']
      },
      mySchema: {
        selectSingle: { type: 'select', label: 'Select', items, flex: { xs: 12, sm: 6, md: 3 } },
        selectObject: { type: 'select', label: 'Select-Object', returnObject:true, itemText:'name', items:itemsObj, flex: { xs: 12, sm: 6, md: 3 } },
        comboboxSingle: { type: 'combobox', label: 'Combobox', color: 'green', items, flex: { xs: 12, sm: 6, md: 3 } },
        autocompleteSingle: { type: 'autocomplete', label: 'AutoComplete', color: 'red', items, flex: { xs: 12, sm: 6, md: 3 } },
        selectMultiple: { type: 'select', label: 'Multi-Select', items, multiple: true, flex: { xs: 12, sm: 6, md: 3 } },
        selectMultipleObject: { type: 'select', label: 'Multi-Select-Object', multiple: true, returnObject:true, itemText:'name', items:itemsObj, flex: { xs: 12, sm: 6, md: 3 } },
        comboboxMultiple: { type: 'combobox', label: 'Multi-Combobox', items, color: 'green', multiple: true, flex: { xs: 12, sm: 6, md: 3 } },
        autocompleteMultiple: { type: 'autocomplete', label: 'Multi-AutoComplete', multiple: true, color: 'red', items, flex: { xs: 12, sm: 6, md: 3 } }
      }
    }
  },
  methods: {
    update
  }
}
</script>
