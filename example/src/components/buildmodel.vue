<template>
  <v-container fluid>
    <h4>Build Model-Structure from nested & grouped Schema, based on empty Model-Object</h4>
      
      <v-form class="border-frame">
        <!-- FORM-BASE-COMPONENT -->    
        <v-form-base 
          :model="myModel"
          :schema="mySchema"
          :col=4
          @input="log"
        />
      </v-form>
    
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
import log from '@/lib'
const items = [1,2,3]
export default {
  name: 'Textfields',
  components: { VFormBase, Infoline },
  data () {
    return {
      myModel: {
        // myModel must be at least an empty Object. It doesn't work with 'null', 'undefined' or any 'primitive value' 
        // autogeneration from Schema works only if myModel is an empty Object 
        // Warning: it could work with a NON empty 'myModel', but the behavior cannot be predicted and should be avoided
      },
      mySchema: { 
        a:{
          type: "group",
          label: "Group",
          row:{ noGutters:false},
          col:12,
          class: 'blue lighten-5',
          schema: {
            a1: [ { type:'checkbox', label:'A-1', col:4}],
            a2: { type:'switch', label:'A-2', col:4 },
            a3: { type:'select', label:'A-3', items, col:4 }
          },
        },
        
        b: {
          outerArray: [
            { type: 'checkbox', label: 'B-A-A' },
            { type: 'switch', label: 'B-A-B' },
            { type: 'select', label: 'B-A-C',  items },
            // nested array as item
            [
              { type: 'checkbox', label: 'B-C-A', color: 'green' },
              { type: 'switch', label: 'B-C-B', color: 'green' },
              { type: 'select', label: 'B-C-C', color: 'green', items },
            ],
            { innerArray: [
              { type: 'checkbox', label: 'B-D-A', value: 'checked', color: 'red' },
              { type: 'switch', label: 'B-D-B', value: 'checked', color: 'red' },
              { type: 'select', label: 'B-D-C', color: 'red', items },
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
