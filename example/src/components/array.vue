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
const items = ['Tesla', 'Jobs', 'Taleb']
export default {
  components: { VFormBase },
  data () {
    return {      
      myValue: {
        checkboxObject: { a:{ c: true }, b:{ d:false} },
        checkbox: [true,false, [true,false]],
        select: ['Jobs','Tesla', true]
      },
      mySchema: {
        checkboxObject: { a:{ c: {type: 'checkbox', label: 'Ao' } }, b: { d: { type: 'checkbox', label: 'Bo' } } },
        checkbox: [{ type: 'checkbox', label: 'A' },{ type: 'checkbox', label: 'B' }, [{ type: 'checkbox', label: 'C' },{ type: 'checkbox', label: 'D' }]],
        select: { type: 'select', multiple:true, items: ['Tesla', 'Jobs', 'Taleb'] }
      }
      // myValue: {
      //   name: 'Base',
      //   password: '123456',
      //   email: 'base@mail.com',
      //   checkbox: [true,false],
      //   select: 'Jobs'
      // },
      // mySchema: {
      //   name: { type: 'text', label: 'Name' },
      //   password: { type: 'password', label: 'Password' },
      //   email: { type: 'email', label: 'Email' },
      //   checkbox: [{ type: 'checkbox', label: 'A' },{ type: 'checkbox', label: 'B' }],
      //   select: { type: 'select', label: 'Select', items: ['Tesla', 'Jobs', 'Taleb'] }
      // }
    }
  },
  methods: {
    update ({ on, id, key, value, obj, event, params, data, schema }) {
      console.log('Update [ on, key, value, params]', on, key, value, params)
    }
  }
}
</script>
