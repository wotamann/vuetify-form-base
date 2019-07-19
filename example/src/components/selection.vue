
<template>
  <v-container fluid >
    <h4>Select Item(s) from Schema-Array</h4>

    <v-form-base id="form-base-complete" :value= "myValue" :schema= "mySchema" @update:form-base-complete= "update" />

    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import update from '@/lib'

const items = ['Musk', 'Jobs', 'Taleb', 'Harari']

export default {
  name: 'selection',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        select: 'Musk',
        selectMultiple: ['Musk', 'Taleb'],
        combobox: 'Harari',
        comboboxMultiple: ['Harari', 'Musk'],
        autocomplete: 'Taleb',
        autocompleteMultiple: ['Taleb', 'Jobs']
      },
      mySchema: {
        select: { type: 'select', label: 'Select', selected: 0, items, flex: { xs: 12, sm: 6, md: 4 } },
        selectMultiple: { type: 'select', label: 'Multi-Select', items, multiple: true, flex: { xs: 12, sm: 6, md: 4 } },
        combobox: { type: 'combobox', label: 'Combobox', items, flex: { xs: 12, sm: 6, md: 4 } },
        comboboxMultiple: { type: 'combobox', label: 'Multi-Combobox', items, multiple: true, flex: { xs: 12, sm: 6, md: 4 } },
        autocomplete: { type: 'autocomplete', label: 'AutoComplete', items, flex: { xs: 12, sm: 6, md: 4 } },
        autocompleteMultiple: { type: 'autocomplete', label: 'Multi-AutoComplete', multiple: true, items, flex: { xs: 12, sm: 6, md: 4 } }
      }
    }
  },
  methods: {
    update
  }
}
</script>
