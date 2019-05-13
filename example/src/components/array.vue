<style>
  .key-listing .active  { background-color: rgb(194, 194, 194)}
  .key-listing .active *  { color: rgb(248, 248, 247)}
</style>

<template>
  <v-container fluid >

    <!-- Integrated Solution (recommended) -->
    <h4>Display Values containing Arrays - integrated Solution</h4>
    <v-form-base id="integrated" :value= "myValue" :schema= "mySchema" @update:integrated= "update" />

    <!-- Slot Solution  -->
    <!-- <h4>Slot based Solution</h4>
    <v-form-base :value= "myValue" :schema= "mySchema" @update= "update" >
      <template slot="slot-array-key-arrayOne" slot-scope="{item}">
        <v-form-base id="slot-based" :value= "item" :schema= "mySchema.arrayOne.schema" @update:slot-based= "update"/>
      </template>
    </v-form-base> -->

    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'

export default {
  name: 'arrays',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        name: 'Jumo',
        position: 'Coder',
        tasks: [
          { 
            done: true,
            title: 'make refactoring' 
          },
          { 
            done: false,
            title: 'write documentation'  
          },
          { 
            done: true,
            title: 'remove logs'  
          }        
        ]        
      },
      mySchema: {
        name: {type:'text', label:'Name', flex:{ xs:12, sm:6 } },
        position: {type:'text', label:'Position', flex:{ xs:12, sm:6 } },
        tasks: { type: 'array', flex:12, schema: { done:{ type:'checkbox', label:'done', flex:3}, title:{ type:'text'}, flex:9 } },
      }
    }
  },
  methods: {
    update ({ on, parentId, id, key, value, obj, event, params, data, schema }) {
      console.log('Update [ on, parentId, id, key, value, params, data, schema]', on, parentId, id, key, value, params, data, schema)
    }
  }
}
</script>
