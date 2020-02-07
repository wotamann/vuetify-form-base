<style scoped>
  #form-base { background-color: #fdcfcf56;; border: 1px solid #f71a1a56  }
  #form-base-partial { width:50%; background-color: #d9ebfc; border: 1px solid #0f88f8; }
</style>

<template>
  <v-container fluid>
    <h4>Complete Formbase from 'myValue'</h4>
    <v-form-base
      :value="myValue"
      :schema="mySchema"
      @change="change"
    />
    <h4>Partial Formbase from 'myValue.radios' synchronized with 'myValue'</h4>
    <v-form-base
      id="form-base-partial"
      :value="myValue.radios"
      :schema="mySchema.radios"
      @change:form-base-partial="changepartial"
    />
    <infoline
      :value="myValue"
      :schema="mySchema"
      :path="$options._componentTag"
    />
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import change from '@/lib'

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
          radioA: { type: 'radio', label: 'RadioA', options, row: true },
          radioB: { type: 'radio', label: 'RadioB', options }
        },
        slider: { type: 'slider', label: 'Slide' }
      }
    }
  },
  methods: {

    change,

    changepartial: change

  }
}
</script>
