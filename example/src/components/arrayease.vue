<template>
  <v-container fluid>
    <h4>Edit Data by using a Schema for Items in Value-Array</h4>

    <v-form-base
      id="array-simple"
      :value="myValue"
      :schema="mySchema"
      @change:array-simple="change"
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
    change
  }
}
</script>
