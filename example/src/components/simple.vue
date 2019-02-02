<template>
  <v-container fluid >

    <v-form-base  :value= "myValue" :schema= "mySchema" @update= "update"/>

    <h4>See your reactive  Data in 'myValue' </h4>
    <p>{{myValue}}</p>

    <h4>See your Definition in 'mySchema' </h4>
    <p>{{mySchema}}</p>

    <h4>See logged 'update' events at console </h4>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'

export default {
  components: { VFormBase },
  data () {
    return {
      myValue: {
        name: 'Base',
        password: '123456',
        email: 'base@mail.com',
        checkbox: [true, false],
        select: 'Jobs'
      },
      mySchema: {
        name: { type: 'text', label: 'Name' },
        password: { type: 'password', label: 'Password' },
        email: { type: 'email', label: 'Email' },
        checkbox: [{ type: 'checkbox', label: 'A' }, { type: 'checkbox', label: 'B' }],
        select: { type: 'select', label: 'Select', items: ['Tesla', 'Jobs', 'Taleb'] }
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
