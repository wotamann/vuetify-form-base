<style>
  #list-demo .key-listing { border: 1px solid rgb(172, 172, 172)}
  #list-demo .key-listing .v-list__tile{ border-bottom: 1px dotted rgb(202, 202, 202)}
  .key-listing .active  { background-color: rgb(143, 203, 238)}
  .key-listing .active *  { color: rgb(255, 255, 255)}
  .key-listingStr .active  { background-color: rgb(135, 230, 122)}
  .key-listingStr .active *  { color: rgb(255, 255, 255)}
</style>

<template>
  <v-container fluid >

    <h4>Select Item from Data-Array(List) with Result in 'schema.prop.selected'</h4>

    <v-form-base id="list-demo" :value= "myValue" :schema= "mySchema" @update:list-demo= "update" />

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
        listing: [
          { done: true, title: 'finish refactoring' },
          { done: false, title: 'write documentation' },
          { done: true, title: 'remove logs' }
        ],
        listingStr: [
          'Jobs',
          'Taleb',
          'Harari'
        ]
      },
      mySchema: {
        listing: { type: 'list', item: 'title', color: 'blue', flex: 6, selected: null },
        listingStr: { type: 'list', selected: null, color: 'green', flex: 6 }
      }
    }
  },
  methods: {
    update
  }
}
</script>
