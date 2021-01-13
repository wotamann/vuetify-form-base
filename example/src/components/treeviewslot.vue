<template>
  <v-container fluid>
    <h4>Modify Treeview with injected Slots</h4>
    <v-form-base
      id="treeview-slot"
      :model="myModel"
      :schema="mySchema"
      @click="change"
    >
      <!-- // Inject SLOT 'prepend' into treeview component using 'key' with id:'treeview-slot' and key:'treeview_1'  -->
      <template #slot-inject-prepend-key-treeview-slot-treeview_1="{open}" >  
        <v-icon color="blue">
          {{open ? 'mdi-folder-open' : 'mdi-folder'}}
        </v-icon>
      </template>

      <!-- // Inject SLOT 'label' into treeview component using 'key' with id:'treeview-slot' and key:'treeview_1'  -->
      <template #slot-inject-label-key-treeview-slot-treeview_1="{item}" >  
        <span class="caption" >{{item.name.toUpperCase()}}</span>
      </template>

      <!-- // Inject SLOT 'prepend' into treeview component using 'key' with id:'treeview-slot' and key:'treeview_2'  -->
      <template #slot-inject-prepend-key-treeview-slot-treeview_2="{item}" >  
        <v-icon >
          {{item.children ? 'mdi-paperclip' : 'mdi-email-open-outline'}}
        </v-icon>      
      </template>

    </v-form-base>
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
   
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
          slot:['prepend','label']   // inject this named-slots into the treeview control - see vuetify treeview slots       
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
          // inject this named-slots into the treeview control - see vuetify treeview slots    
          // https://vuetifyjs.com/en/components/treeview#treeview
          slot:'prepend' 
        }
      }
    }
  },
  methods: {
    change
  }
}
</script>
