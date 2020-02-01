<template>
  <v-container fluid>
    <h4>Select Item from List (Array in Value) with Result in 'schema.prop.selected'</h4>

    <v-form-base
      id="form-base-list"
      :value="myValue"
      :schema="mySchema"
      @change:form-base-list="change"
    />

    <infoline
      :value="myValue"
      :schema="mySchema"
    />
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import change from '@/lib'

export default {
  name: 'Lists',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        listObject: [
          { line: 1, name: 'Jobs' },
          { line: 2, name: 'Taleb' },
          { line: 3, name: 'Harari' }
        ],
        listString: [
          'Jobs',
          'Taleb',
          'Harari'
        ]
      },
      mySchema: {
        listObject: {
          type: 'list',
          label: 'List Single',
          icon: 'mdi-wifi',
          item: 'name', // display name from object in array
          model: 2,
          color: 'blue',
          flex: 5
        },
        listString: {
          type: 'list',
          label: 'List Multiple',
          multiple: true,
          model: [1, 2],
          color: 'red',
          offset: 1,
          flex: 5
        }
      }
    }
  },
  methods: {
    change
  }
}
</script>
