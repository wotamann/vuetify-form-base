<style scoped>
  #form-base { background-color: #fdcfcf56;; border: 1px solid #f71a1a56  }
  #form-base-partial { width:50%; background-color: #d9ebfc; border: 1px solid #0f88f8; }
</style>

<template>
  <v-container fluid>
    <h4>Complete Formbase from 'myModel'</h4>
    <v-form-base
      :model="myModel"
      :schema="mySchema"
      col=3
      @input="change"
    />
    <h4>Partial Formbase from 'myModel.radios'</h4>
    <v-form-base
      id="form-base-partial"
      :model="myModel.radios"
      :schema="mySchema.radios"
      @input="changepartial"
    />
    
    <!-- Stuff  -->    
    <infoline
      :value="myModel"
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
      myModel: {
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
        slider: { type: 'slider', label: 'Slide', col: 4 },
      }
    }
  },
  methods: {

    change(v){ 
      console.log('--- CHANGED IN COMPLETE ---');
      change(v)
    },
    changepartial(v){ 
      console.log('--- CHANGED IN PARTIAL ---');
      change(v)
    }

  }
}
</script>
