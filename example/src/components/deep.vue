<style>
.text-area {padding:1rem; width: 50%; height: 32rem; font-size: 0.8rem}
</style>

<template>
  <v-container fluid >

    <v-form-base id="form-base-nested" :value= "myValue" :schema= "mySchema" @update:form-base-nested= "update"/>

    <v-divider></v-divider>

    <textarea class="text-area" v-text= "'myValue: ' + JSON.stringify(myValue, undefined, 6)"></textarea>
    <textarea class="text-area" v-text= "'mySchema: ' + JSON.stringify(mySchema, undefined, 6)"></textarea>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'

const items = ['Tesla', 'Jobs', 'Taleb']

export default {
  components: { VFormBase },
  data () {
    return {
      myValue: {
        name: 'Base',
        controls: {
          selection: {
            select: 'Tesla',
            selectM: ['Jobs']
          },
          boolControls: {
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
        }
      },
      mySchema: {
        name: { type: 'text', label: 'Name', flex: 12 },
        controls: {
          // nested object
          selection: {
            select: { type: 'select', label: 'Select', items, flex: 6 },
            selectM: { type: 'select', label: 'SelectM', items, multiple: true, flex: 6 }
          },
          // deep nested object with arrays
          boolControls: {
            switch: [
              { type: 'switch', label: '1', hidden: false },
              { type: 'switch', label: '2' }
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
    }
  },

  methods: {
    update ({ on, id, key, value, obj, event, params, data, schema }) {
      console.log('Update [ on, key, value, params]', on, key, value, params)
    }
  }
}
</script>
