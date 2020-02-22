<template>
  <v-container fluid>
    <h4>Edit Data in Value-Array by using one Schema for all Items. Scroll and see Intersections in Log</h4>

    <v-form-base
      id="array-ease"
      :value="myValue"
      :schema="mySchema"
      @change:array-ease="change"
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
import change from '@/lib'

export default {
  name: 'arrayease',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        tasks: [
          { done: false, title: 'Ticket ' + Math.floor(Math.random() * 1000) },
          { done: false, title: 'Ticket ' + Math.floor(Math.random() * 1000) },
          { done: false, title: 'Ticket ' + Math.floor(Math.random() * 1000) },
          { done: false, title: 'Ticket ' + Math.floor(Math.random() * 1000) },
          { done: false, title: 'Ticket ' + Math.floor(Math.random() * 1000) },
          { done: false, title: 'Ticket ' + Math.floor(Math.random() * 1000) }
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
    change,

     intersect ({ id, key, value, index, params }) {   
      // log intersection  
      if (key === 'title') {
        console.log( `INTERSECTION: '${value}' ${params.isIntersecting ?  ' entry intersection':  ' leave intersection'} `);
      }      
    },
  }
}
</script>
