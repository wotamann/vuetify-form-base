<template>
  <v-container fluid>
    <h4>Different Textfields and Fileselector with Tooltips</h4>
    <v-form>
      <v-form-base
        :value="myValue"
        :schema="mySchema"
        @change="change"
      />
      <!--
        Listen to one or more of following events
        @click= "change"
        @input= "change"
        @change="change" // input & click
        @watch= "change" // focus & input & click &  blur
        @focus= "change"
        @blur=  "change"
        @mouse= "change" // mouseenter & mouseleave
        @resize="change"
        @swipe= "change"
        @update="change" // catch all events
      -->
    </v-form>

    <infoline
      :value="myValue"
      :schema="mySchema"
    />
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import change from '@/lib'

export default {
  name: 'Textfields',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        name: 'Base',
        creditcard: '12345678',
        password: 'abcdefgh',
        file: [] // array of File objects
      },
      mySchema: {
        name: { type: 'text', tooltip: 'Name', flex: 3 },
        // Info Mask https://vuejs-tips.github.io/vue-the-mask/
        creditcard: { type: 'text', hint: '####-####-####-####', label: 'Creditcard', mask: '####-####-####-####', tooltip: { color: 'red', label: 'Creditcard', top: true }, prependIcon: 'place', flex: 3 },
        password: { type: 'password', label: 'Password', counter: 10, clearable: true, tooltip: { label: 'Password', color: 'blue', bottom: true }, flex: 3 },
        file: { type: 'file', label: 'Image-Files', accept: 'image/*', multiple: true, tooltip: { color: 'green', label: 'File Selection', left: true }, flex: 3 }
      }
    }
  },
  methods: {
    change
  }
}
</script>
