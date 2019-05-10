<style>
.text-area {height: 32rem; font-size: 0.8rem}
</style>

<template>
  <v-container fluid >
    <h4>Try editing Value or Schema (valid JSON necessary) and see updated nested Object</h4>
    <v-form-base id="form-base-nested" :value= "myValue" :schema= "mySchema" @update:form-base-nested= "update"/>

    <v-divider></v-divider>
    <v-layout wrap>
      <v-flex xs6>
        <h4 >Value</h4>
        <v-textarea :class="stateV" class="text-area" auto-grow v-model= "txtValue"></v-textarea>
      </v-flex>
      <v-flex xs6>
      <h4>Schema</h4>
      <v-textarea :class="stateS" class="text-area" auto-grow v-model= "txtSchema"></v-textarea>
      </v-flex>
    </v-layout>

    <!-- <infoline :value= "myValue" :schema= "mySchema"></infoline> -->

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'

export default {
  components: { VFormBase, Infoline },
  data () {
    return {
      stateV: 'white',
      stateS: 'white',

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
  computed: {
    txtValue: {
      get () { return JSON.stringify(this.myValue, undefined, 6) },
      set (v) {
        try {
          this.myValue = JSON.parse(v)
          this.stateV = 'white'
        } catch (error) {
          this.stateV = 'orange lighten-4'
          console.warn('myValue contains invalid JSON - ')
        }
      }
    },
    txtSchema: {
      get () { return JSON.stringify(this.mySchema, undefined, 6) },
      set (v) {
        try {
          this.mySchema = JSON.parse(v)
          this.stateS = 'white'
        } catch (error) {
          this.stateS = 'orange lighten-4'
          console.warn('mySchema contains invalid JSON')
        }
      }
    }
  },
  methods: {
    update ({ on, id, key, value, obj, event, params, data, schema }) {
      console.log('Update [ on, key, value, params]', on, key, value, params)
    }
  }
}
</script>
