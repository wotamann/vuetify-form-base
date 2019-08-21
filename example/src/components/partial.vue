<style scoped>
  #form-base { border: 1px solid #C5CAE9  }
  #form-base-partial { width:50%; background-color: #c5cae956; border: 1px solid #C5CAE9; }
</style>

<template>
  <v-container fluid >

    <h4>Complete Formbase from 'myValue'</h4>
    <v-form-base :value= "myValue" :schema= "mySchema" @update= "update"/>

    <h4>Partial Formbase from 'myValue.radios' synchronized with 'myValue'</h4>
    <v-form-base id= "form-base-partial" :value= "myValue.radios" :schema= "mySchema.radios" @update:form-base-partial= "updatepartial"/>

    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import update from '@/lib'

const options = ['A', 'B']

export default {
  components: { VFormBase, Infoline },
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
        switch: { type: 'switch', label: 'Blue', color: 'blue' },
        radios: {
          radioA: { type: 'radio', label: 'RadioA', options, color: 'green', row: true },
          radioB: { type: 'radio', label: 'RadioB', options, color: 'indigo' }
        },
        slider: { type: 'slider', label: 'Slide', color: 'orange' }
      }
    }
  },
  methods: {

    update,

    updatepartial: update

  }
}
</script>
