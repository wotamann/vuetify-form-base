<style>
  #form-base { border: 1px solid #8aa; }
  #form-base-partial { width:50%; background-color: #eff; border: 1px solid #8aa; }
</style>

<template>
  <v-container fluid >

    <h4>Complete Form based on 'myValue'</h4>
    <v-form-base :value= "myValue" :schema= "mySchema" @update= "update"/>
    <h4>Partial Form base on 'myValue.radios' synchronized with 'myValue'</h4>
    <v-form-base id= "form-base-partial" :value= "myValue.radios" :schema= "mySchema.radios" @update:form-base-partial= "updatepartial"/>
    <br/>
    <br/>
    <h4>See your reactive  Data in 'myValue' </h4>
    <p>{{myValue}}</p>

    <h4>See your Definition in 'mySchema' </h4>
    <p>{{mySchema}}</p>

    <h4>See logged 'update' events at console </h4>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'

const options = ['A', 'B']

export default {
  components: { VFormBase },
  data () {
    return {
      myValue: {
        checkbox: true,
        switch: true,
        radios: {
          radioA: 'A',
          radioB: 'B'
        },
        slider: 33
      },
      mySchema: {
        checkbox: { type: 'checkbox', label: 'Red', color: 'red' },
        switch: { type: 'switch', label: 'Switch1', color: 'blue' },
        radios: {
          radioA: { type: 'radio', label: 'RadioA', options, color: 'green', row: true },
          radioB: { type: 'radio', label: 'RadioB', options, color: 'indigo' }
        },
        slider: { type: 'slider', label: 'Slide', color: 'orange' }
      }
    }
  },
  methods: {
    update ({ on, id, key, value, obj, event, params, data, schema }) {
      console.log('Update [ on, key, value, params]', on, key, value, params)
    },
    updatepartial ({ on, id, key, value, obj, event, params, data, schema }) {
      console.log('Update - PARTIAL [ on, key, value, params]', on, key, value, params)
    }
  }
}
</script>
