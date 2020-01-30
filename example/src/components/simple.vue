<style>
  .v-tooltip__content { background-color: #1972c5; }
</style>
<template>
  <v-container fluid >

    <h4>Simple Form </h4>
    <v-form>
      <v-form-base :value= "myValue" :schema= "mySchema" @blur= "change" @input= "change"/>
    </v-form>

    <infoline :value= "myValue" :schema= "mySchema" ></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import change from '@/lib'

export default {
  name: 'simple',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        creditcard: '12345678',
        password: '123456',
        file: [], // contains a single or an array of File objects
        checkbox: true
      },
      mySchema: {
        // Info Mask https://vuejs-tips.github.io/vue-the-mask/
        creditcard: { type: 'text', hint: 'Masked Input for CC', label: '####-####-####-####', mask: '####-####-####-####', flex: 4, tooltip: 'Creditcard' },
        password: { type: 'password', label: 'Password', clearable: true, flex: 3, tooltip: 'Password' },
        file: { type: 'file', label: 'Image-Files', accept: 'image/*', multiple: true, flex: 4, tooltip: 'File Selection' },
        checkbox: { type: 'checkbox', label: 'Ok', flex: 1 }
      }
    }
  },
  methods: {
    change
  }
}
</script>
