<template>
  <v-container fluid>
    <h4>Try to Drag & Drop </h4>
    
      <!-- FORM-BASE-COMPONENT -->    
      <v-form-base 
        :model="myModel"
        :schema="mySchema"
        col=6
        @input="log"
        @dragstart="dragstart"
        @drop="drop"
      />
    
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
    
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'

// destruct value and must return a (modified) value
const addDragValue = ( {value, obj}) => `${obj.value} + ${value}`

export default {
  name: 'DragDrop',
  components: { VFormBase, Infoline },
  data () {
    return {
      myModel: {
        name1: 'Drag Only',
        name2: 'Drop Only with Copy',
        name3: 'Drag, Drop with FN',
        name4: 'Drop Only with no Action',
        name5: 'No Drag, No Drop',
      },     

      // Schema-Order defines Order of Controls in Form    
      mySchema: {
        name1: {  type:'text', drag:true },                 
        name2: {  type:'text', drop:({value}) => value },                 
        name3: {  type:'text', drag:true, drop:addDragValue },                 
        name4: {  type:'text', drop:true },                 
        name5: {  type:'text'  },                 
      }
    }
  },
  methods: {
    log,    
    dragstart( val ){
      console.log('DRAGSTART VALUE #', val.value);
      console.log('DRAGSTART EVENT #', val);
    },
    drop( val ){
      console.log('DROP VALUE #', val.value);
      console.log('DROP - DRAGSTART EVENT #', val.obj.dragEvent);
      console.log('DROP EVENT #', val);
    }    
  }
}
</script>
