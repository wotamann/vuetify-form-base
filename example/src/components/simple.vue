<template>
  <v-container fluid >

    <h4>Simple Responsive Form </h4>

    <v-form-base  :value= "myValue" :schema= "mySchema" @update= "update"/>

    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'

export default {
  name: 'simple',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        name: 'Base',
        password: '123456',
        checkbox: true
      },
      mySchema: {
        name: { type: 'text', label: 'Name', flex: 5 },
        password: { type: 'password', label: 'Password', flex: 5 },
        checkbox: { type: 'checkbox', label: 'Ok' }
      }
    }
  },
  methods: {
    update ({ on, id, key, value, obj, event, params, data, schema }) {
      console.log('Update [ on, id, key, value, params]', on, id, key, value, params)
    }
  }
}
</script>
