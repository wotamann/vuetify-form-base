<template>
  <v-container fluid>
    <h4>Select Model-Data in Treeview and get Result in 'schema.open' and 'schema.model'</h4>
    <v-form-base
      id="treeview-demo"
      :model="myModel"
      :schema="mySchema"
      @input="log"
      @click="log"
    />
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
   
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'

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
      myModel: {
        treeview_1: treeview,
        treeview_2: treeview
      },
      mySchema: {
        treeview_1: {
          type: 'treeview',
          col: 6,
          open: [], // get result here
          model: [], // and here
          activatable: true,
          selectable: true,
          multipleActive: true,
          activeClass: 'blue lighten-3 blue--text',
          selectedColor: 'blue',
        },
        treeview_2: {
          type: 'treeview',
          col: 6,
          open: [], // get result here
          model: [], // and here
          activatable: true,
          activeClass: 'red lighten-4 red--text',
          selectedColor: 'red',
          openOnClick: true,
          onIcon: 'bookmark',
          offIcon: 'bookmark_border'
        }
      }
    }
  },
  methods: {
    log
  }
}
</script>
