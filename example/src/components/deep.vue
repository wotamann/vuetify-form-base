<template>
  <v-container fluid >
    
    <h4>Deep nested Object</h4>

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
        base: true,
        controls: {
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
        base: { type: 'checkbox', label: 'Base' },
        controls: {
          // deep nested object with arrays
          switch: [
            { type: 'switch', label: 'Arr1' },
            { type: 'switch', label: 'Arr2' }
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
    
    blur(p){      
      let {value, schema } = p 
      this.myValue =value
      this.mySchema =schema
    }

  }
}
</script>
