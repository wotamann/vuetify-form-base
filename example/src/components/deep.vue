<style>
  /* INFO-SCOPED: don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */

  /* CSS for property from myModel object */
  #form-base-nested .prop-controls  { margin: 0 0  -2px -2px;  background-color: #f0f0f0;  border: solid 2px #636363 }
  #form-base-nested .prop-switch  { padding:3px; border: solid 2px #cf0520 }
  #form-base-nested .prop-checkbox  { padding:6px; border: solid 2px #1a54d1 }
  #form-base-nested .prop-checkboxArray  { padding:9px; border: solid 2px #0c972f }
</style>

<template>
  <v-container fluid>
    <h4>Deep nested Model including Arrays and Objects mapped to Form</h4>

    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      id="form-base-nested"
      :model="myModel"
      :schema="mySchema"
      :col="{ cols:6, sm:4, md:3, lg:2,xl:1 }"
      @input="log"
      @click="log"
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
  components: { VFormBase, Infoline },
  data () {
    return {
      myModel: {
        controls: {
          base: true,
          switch: [
            true,
            false
          ],
          checkbox: [
            false,
            true,
            [
              true,
              false
            ],
            { checkboxArray: [
              'checked',
              null
            ] }
          ]
        }
      },
      mySchema: {
        controls: {
          base: { type: 'checkbox', label: 'Base' },
          // array
          switch: [
            { type: 'switch', label: 'SW1' },
            { type: 'switch', label: 'SW2' }
          ],
          checkbox: [
            { type: 'checkbox', label: 'A' },
            { type: 'checkbox', label: 'B' },
            // nested array
            [
              { type: 'checkbox', label: 'C-A', color: 'teal' },
              { type: 'checkbox', label: 'C-B', color: 'teal' }
            ],
            { checkboxArray: [
              { type: 'checkbox', label: 'D-A', value: 'checked', color: 'red' },
              { type: 'checkbox', label: 'D-B', value: 'checked', color: 'red' }
            ]
            }
          ]
        }
      }
    }
  },
  methods: {
    log
  }
}
</script>
