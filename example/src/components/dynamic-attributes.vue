<template>
  <v-container fluid>
    <h4>Change Attributes Model, Schema or Grid of 'vuetify-form-base'</h4>
    
      <!-- FORM-BASE-COMPONENT -->    
      <v-form-base 
        :model="myModel[modelIndex]"
        :schema="mySchema[schemaIndex]"
        :col="col"
        @input="log"
      />
    <v-btn class="ma-2" @click="modelIndex--; modelIndex = Math.max(modelIndex, 0)">-</v-btn> 
     Model-{{modelIndex}}       
    <v-btn class="ma-2" @click="modelIndex++; modelIndex = Math.min(modelIndex, 3)">+</v-btn>  
    <v-btn class="ma-2" @click="schemaIndex--; schemaIndex = Math.max(schemaIndex, 0)">-</v-btn> 
     Schema-{{schemaIndex}}       
    <v-btn class="ma-2" @click="schemaIndex++; schemaIndex = Math.min(schemaIndex, 3)">+</v-btn>  
    <v-btn @click="col--; col = Math.max(col, 0)">-</v-btn> 
     Grid-{{col}}/12       
    <v-btn class="ma-2" @click="col++; col = Math.min(col, 12)">+</v-btn>  
    
    <!-- Stuff  -->    
    <infoline
      :value="myModel[modelIndex]"
      :schema="mySchema[schemaIndex]"
      :path="$options._componentTag"
    />
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'

   
export default {
  name: 'dynamic-attributes',
  components: { VFormBase, Infoline },
  data () {
    return {
      col:3,
      modelIndex:0,
      schemaIndex:0,
      myModel: [
        {},
        {
          name: 'A',
          password: 'abcdefgh',
          check: true
        },     
        {
          name: 'B',
          password: '1234',
          check: false
        },     
        {
          name: 'C',
          file: null,
          switch: false
        }
      ],     

      mySchema: [
        { 
          name:'text'
        },
        {
          name: 'text',
          check: { type: 'switch', label:'Switch1' },
          password: { type: 'password', label:'password'}
        },
        {
          check: { type: 'checkbox' },
          switch:{type:'switch', label:'Switch2'},      
          name: 'text',
          file: { type:'file', label:'Single'},
        },
        {
          check: { type: 'checkbox' },
          switch:{type:'switch', label:'Switch2'},      
          file: { type:'file', label:'Multi', multiple:true},
        }
      ]
    }
  },
  methods: {
    log
  }
}
</script>
