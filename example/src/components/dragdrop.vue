<template>
  <v-container fluid>
    <h4>Try to Drag & Drop </h4>

       <v-form class="border-frame">
        <!-- FORM-BASE-COMPONENT -->    
        <v-form-base 
          :model="myModel"
          :schema="mySchema"
          col=6
          @input="log"
          @dragstart="dragstart"
          @drop="drop"
        />
       </v-form>
    
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
        name3: 'Drag & Drop with Copy',
        name4: 'Drop with Action',
        name5: 'Drop Only but no +Action',
        name6: 'No Drag, No Drop',
      },     

      // Schema-Order defines Order of Controls in Form    
      mySchema: {
        name1: {  type:'text', drag:true, class:'red lighten-5' },                 
        name2: {  type:'text', drop:({value}) => value, class:'green lighten-5' },                 
        name3: {  type:'text', drag:true, drop:({value}) => value,  class:'yellow lighten-5' },                 
        name4: {  type:'text', drag:false, drop:addDragValue,  class:'green lighten-5' },                 
        name6: {  type:'text', class:'grey lighten-3'  },                 
        name5: {  type:'text', drop:true, class:'green lighten-5'  },                 
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
