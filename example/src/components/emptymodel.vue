<template>
  <v-container fluid>
    <h4>Generate/complete Model-Structure from nested Schema, works only if Model is an empty Object</h4>

    <!-- FORM-BASE-COMPONENT -->    
    <v-form-base 
      :model="myModel" 
      :schema="mySchema" 
       col=6 
       @input="log"
    />
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
    
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'

export default {
  name: 'EmptyModel',
  components: { VFormBase, Infoline },
  data () {
    return {
      
      myModel: {
        // myModel must be at least an empty Object. It doesn't work with 'null', 'undefined' or any 'primitive value' 
        // autogeneration from Schema works only if myModel is an empty Object 
        // if myModel is NOT an empty Object, no action is applied, to preserve data in model
      },
      
      mySchema: {
        name: 'text', // schema prop:'text' is shorthand for prop: { type: 'text', label:'prop' }
        slider: 'slider',
        obj: {
          check: 'checkbox',
          switch: 'switch',
          group:{
            type: "group",
            label: "Group",
            class:'grey lighten-4 pa-2 ma-2',
            row:{ noGutters:false},
            schema: {
              arr: [ { 'a1-0':{ type:'text', label:'a1-0 array' } }, { 'a1-1':{ type:'text', label:'a1-1 array' } }],  // 
              txt: { type:'text', label:'a2 text' }
            },
          },
        },
        arr: { 
          type:'array', 
          schema: { todo:'checkbox', task:'text', obj: { innerObj: 'text' }}
        }
      }   
    }
  },
  methods: {
    log    
  }
}
</script>
