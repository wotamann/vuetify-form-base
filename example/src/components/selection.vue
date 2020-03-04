<template>
  <v-container fluid>
    <h4>Select Items defined in Schema-Array</h4>
    <v-form-base
      id="form-base-selection"
      :value="myValue"
      :schema="mySchema"
      @input:form-base-selection="update"
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
import update from '@/lib'

const items = ['Musk', 'Jobs', 'Taleb', 'Harari']

export default {
  name: 'Selection',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        selectSingle: 'Musk',
        selectMultiple: ['Musk', 'Taleb'],
        comboboxSingle: 'Harari',
        comboboxMultiple: ['Harari', 'Musk'],
        autocompleteSingle: 'Taleb',
        autocompleteMultiple: ['Taleb', 'Jobs']
      },
      mySchema: {
        selectSingle: { type: 'select', label: 'Select', selected: 0, items, flex: { xs: 12, sm: 6, md: 4 } },
        comboboxSingle: { type: 'combobox', label: 'Combobox', color: 'green', items, flex: { xs: 12, sm: 6, md: 4 } },
        autocompleteSingle: { type: 'autocomplete', label: 'AutoComplete', color: 'red', items, flex: { xs: 12, sm: 6, md: 4 } },
        selectMultiple: { type: 'select', label: 'Multi-Select', items, multiple: true, flex: { xs: 12, sm: 6, md: 4 } },
        comboboxMultiple: { type: 'combobox', label: 'Multi-Combobox', items, color: 'green', multiple: true, flex: { xs: 12, sm: 6, md: 4 } },
        autocompleteMultiple: { type: 'autocomplete', label: 'Multi-AutoComplete', multiple: true, color: 'red', items, flex: { xs: 12, sm: 6, md: 4 } }
      }
    }
  },
  methods: {
    update
  }
}
</script>
