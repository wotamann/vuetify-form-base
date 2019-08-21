<style>
  .key-listObject .active  {background-color: rgb(218, 221, 238)}
  .key-listObject .active *  {color: #3d3a3a}
  .key-listString .active  {background-color: #C5CAE9}
  .key-listString .active *  {color: #ffffff}
</style>

<template>
  <v-container fluid >

    <h4>Select Item from Data-Array(List) with Result in 'schema.prop.selected'</h4>

    <v-form-base id="form-base-list" :value= "myValue" :schema= "mySchema" @update:form-base-list= "update" />

    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import update from '@/lib'

export default {
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
        listObject: { type: 'list', item: 'name', selected: 2, color: '#C5CAE9', flex: 5 },
        listString: { type: 'list', label: 'Label', selected: null, offset: 1, flex: 5 }
      }
    }
  },
  methods: {
    update
  }
}
</script>
