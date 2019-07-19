<template>
  <v-container fluid >

    <h4>Simple Form </h4>

    <v-form-base  :value= "myValue" :schema= "mySchema" @update= "update"/>

    <infoline editable="true" :value= "myValue" :schema= "mySchema" @blur= "blur" ></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import update from '@/lib'

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
    update,
    blur (p) {
      let { value, schema } = p
      this.myValue = value
      this.mySchema = schema
    }
  }
}
</script>
