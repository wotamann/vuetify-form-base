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
        select: 'Jobs',
        selectM: ['Harari'],        
        listing: 'Taleb',
        arrayOne: [{ checkbox: true, name: 'Jobs' }, { checkbox: false, name: 'Taleb' }, { checkbox: true, name: 'Harari' } ]        
      },
      mySchema: {
        select: { type: 'select',  label: 'Select', color: 'blue', box: true, items: [ 'Jobs', 'Taleb', 'Harari'], flex: 6 },
        selectM: { type: 'select', multiple:true, label: 'Select', color: 'blue', box: true, items: [ 'Jobs', 'Taleb', 'Harari'], flex: 6 },        
        listing: { type: 'list', label: false, color: 'blue', ripple: true, items: [ 'Jobs', 'Taleb', 'Harari'], flex: 6 },        
        arrayOne: { type: 'array', flex: 6, schema: { name: { type: 'text', label:'Name', placeholder:'Author',flex: 9 }, checkbox: { type: 'checkbox', label: 'Book', color: 'green', flex: 3 } } }
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
