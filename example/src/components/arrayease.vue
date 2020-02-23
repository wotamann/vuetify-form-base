<template>
  <v-container fluid>
    <h4>Edit Data in Value-Array by using one Schema for all Items. Scroll for Intersections in Log</h4>

    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      id="array-ease"
      :value="myValue"
      :schema="mySchema"
      @change:array-ease="log"
      @intersect:array-ease="intersect"
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
import log from '@/lib'

const getTask= () => { return { done: false, title: 'Task ' + Math.floor(Math.random() * 1000) } }

export default {
  name: 'arrayease',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        tasks: [
          getTask(), 
          getTask(), 
          getTask(), 
          getTask(), 
          getTask(), 
        ]
      },
      mySchema: {
        tasks: {
          type: 'array',
          flex: 12,
          schema: {
            done: { type: 'checkbox', label: 'Done', color: 'blue', flex: 2 },
            title: { type: 'text', color: 'blue' }          
          }
        }
      }
    }
  },
  methods: {
    
    log,

    // log intersection
    intersect ({ id, key, value, index, params }) {  
      if (key === 'title') {
        console.log( `INTERSECTION: '${value}' ${params.isIntersecting ?  ' entry intersection':  ' leave intersection'} `);
      }      
    }
  }
}
</script>
