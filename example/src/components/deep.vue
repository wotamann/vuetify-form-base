<style>
  /* INFO-SCOPED: don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */

  /* CSS for property from myValue object */
  #form-base-nested .prop-controls  { background-color: #e1f5f8;  border: solid 2px #06a0bb }
  #form-base-nested .prop-switch  { margin:3px; border: solid 2px #cf0520 }
  #form-base-nested .prop-checkbox  {  margin:6px; border: solid 2px #1a54d1 }
  #form-base-nested .prop-checkboxArray  {  margin:9px; border: solid 2px #0c972f }
</style>

<template>
  <v-container fluid>
    <h4>Deep nested Data including Arrays and Objects mapped to Form</h4>

    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      id="form-base-nested"
      :value="myValue"
      :schema="mySchema"
      @change:form-base-nested="change"
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

export default {
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
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
    change
  }
}
</script>
