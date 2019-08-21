<style>
  /* INFO-SCOPED: don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */

  /* CSS Props --- style property from myValue object */
  #form-base-nested .prop-controls  { border: dotted 2px #838383 }
  #form-base-nested .prop-switch  { border: dashed 2px #17419c }
  #form-base-nested .prop-checkbox  { border: dashed 2px #cf0d27 }
  #form-base-nested .prop-checkboxArray  { border: dashed 2px #0f9130 }

</style>

<template>
  <v-container fluid >

    <h4>Deep nested Object with Arrays & CSS</h4>

    <v-form-base id="form-base-nested" :value= "myValue" :schema= "mySchema" @update:form-base-nested= "update"/>

    <infoline editable="false" :value= "myValue" :schema= "mySchema" @blur= "blur" ></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import update from '@/lib'

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
              true,
              false
            ] }
          ]
        }
      },
      mySchema: {
        controls: {
          base: { type: 'checkbox', label: 'Base' },
          // deep nested object with arrays
          switch: [
            { type: 'switch', label: 'SW1' },
            { type: 'switch', label: 'SW2' }
          ],
          checkbox: [
            // nesteds array of objects
            { type: 'checkbox', label: 'A' },
            { type: 'checkbox', label: 'B' },
            [{ type: 'checkbox', label: 'C-A', color: 'teal' }, { type: 'checkbox', label: 'C-B', color: 'teal' }],
            { checkboxArray: [{ type: 'checkbox', label: 'D-A', color: 'red' }, { type: 'checkbox', label: 'D-B', color: 'red' }] }
          ]
        }
      }
    }
  },

  methods: {

    update,

    blur (p) {
      let { value, schema } = p
      this.myValue = value
      this.mySchema = schema
    }

  }
}
</script>
