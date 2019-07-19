<style>
  .key-listing .active  { background-color: rgb(194, 194, 194)}
  .key-listing .active *  { color: rgb(248, 248, 247)}
</style>

<template>
  <v-container fluid >

    <h4>Expand/Select Treeview with Result in 'schema.prop.open' and 'schema.prop.model'</h4>

    <v-form-base id="array-demo" :value= "myValue" :schema= "mySchema" @update:array-demo= "update" />

    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import update from '@/lib'

export default {
  name: 'treeview',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        treeview: [
          {
            id: 1,
            name: 'Philosoph :',
            children: [
              { id: 2, name: 'Yuval Harari' },
              { id: 3,
                name: 'Nicholas Taleb',
                children: [
                  { id: 4, name: 'Black Swan' },
                  { id: 5, name: 'Skin in the Game' }
                ] }
            ]
          },
          {
            id: 6,
            name: 'Visionaire :',
            children: [
              { id: 7, name: 'Yuval Harari' },
              { id: 8, name: 'Steve Jobs' },
              {
                id: 9,
                name: 'Elon Musk',
                children: [
                  { id: 10, name: 'Tesla' }
                ]
              }
            ]
          }
        ]
      },
      mySchema: {
        treeview: {
          type: 'treeview',
          flex: 12,
          open: [],
          model: [],
          activatable: true,
          activeClass: 'grey lighten-4 blue--text',
          selectedColor: 'blue',
          openOnClick: true,
          selectable: true,
          expandIcon: 'add',
          onIcon: 'bookmark',
          offIcon: 'bookmark_border'
        }
      }
    }
  },
  methods: {
    update
  }
}
</script>
