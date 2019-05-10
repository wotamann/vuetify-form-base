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
  name:'simple',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        name: 'Base',
        password: '123456',
        email: 'base@mail.com',
        select: 'Jobs',
        listing: 'Tesla',
        checkbox: [true, false]
      },
      mySchema: {
        name: { type: 'text', label: 'Name', flex: { xs: 12, sm: 6, md: 4 } },
        password: { type: 'password', label: 'Password', flex: { xs: 12, sm: 6, md: 4 } },
        email: { type: 'email', label: 'Email', flex: { xs: 12, sm: 6, md: 4 } },
        checkbox: [{ type: 'checkbox', label: 'A' }, { type: 'checkbox', label: 'B' }],
        select: { type: 'select', label: 'Select', color: 'blue', box: true, items: ['Tesla', 'Jobs', 'Taleb'], flex: 6 },
        listing: { type: 'list', label: 'List', color: 'grey', dense: true, items: ['Tesla', 'Jobs', 'Taleb'], flex: 6 }
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
