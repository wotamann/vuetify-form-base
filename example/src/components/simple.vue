<template>
  <v-container fluid >

    <h4>Simple Form </h4>
    <v-form>
      <v-form-base :value= "myValue" :schema= "mySchema" @change= "change"/>
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
        creditcard: { type: 'text', hint: 'Masked Input for CC', label: '####-####-####-####', mask: '####-####-####-####', flex: 4 },
        password: { type: 'password', label: 'Password', clearable: true, flex: 3 },
        file: { type: 'file', label: 'Image-Files', accept: 'image/*', multiple: true, flex: 4 },
        checkbox: { type: 'checkbox', label: 'Ok', flex: 1 }
      }
    }
  },
  methods: {
    change
  }
}
</script>
