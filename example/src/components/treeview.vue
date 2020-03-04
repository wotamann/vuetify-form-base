<template>
  <v-container fluid>
    <h4>Expand/Select Treeview get Result '.open' and '.model' in Schema or in Event</h4>
    <v-form-base
      id="treeview-demo"
      :value="myValue"
      :schema="mySchema"
      @change:treeview-demo="change"
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

const treeview = [
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

export default {
  name: 'Treeview',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        treeview_1: treeview,
        treeview_2: treeview
      },
      mySchema: {
        treeview_1: {
          type: 'treeview',
          flex: 6,
          open: [],
          model: [],
          activatable: true,
          selectable: true,
          multipleActive: true,
          activeClass: 'blue lighten-3 blue--text',
          selectedColor: 'blue'
        },
        treeview_2: {
          type: 'treeview',
          flex: 6,
          open: [],
          model: [],
          activatable: true,
          activeClass: 'red lighten-4 red--text',
          selectedColor: 'red',
          openOnClick: true
          // onIcon: 'bookmark',
          // offIcon: 'bookmark_border'
          // https://vuetifyjs.com/en/components/treeview#treeview
        }
      }
    }
  },
  methods: {
    change
  }
}
</script>
