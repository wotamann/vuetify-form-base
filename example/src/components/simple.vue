<template>
  <v-container fluid>
    <h4>Textfields, Password and Fileselector with Mask and Tooltips</h4>
    <v-form>
      <v-form-base
        :value="myValue"
        :schema="mySchema"
        @change="change"
      />
      <!--
        You can compose listener to one or more of following events
        @click= "change"
        @input= "change"
        @change="change" // input & click
        @watch= "change" // focus & input & click &  blur
        @focus= "change"
        @blur=  "change"
        @mouse= "change" // mouseenter & mouseleave
        @resize="change"
        @swipe= "change" // touch events
        @update="change" // catch all events

        // Modify listener with ID
        <v-form-base
          id="form-base-list"
          @change:form-base-list="change"
        />

      -->
    </v-form>
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

// More Info to Mask https://vuejs-tips.github.io/vue-the-mask/
const mask = '####-####-####-####'
// Accept only Images Files
const accept = 'image/*'

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
        // SCHEMA Order defines Formular ORDER
        name: { type: 'text', flex: 3 },
        password: { type: 'password', label: 'Password', counter: 10, clearable: true, tooltip: { label: 'Password', color: 'blue', bottom: true }, flex: 3 },
        creditcard: { type: 'text', label: 'Creditcard', prependInnerIcon: 'credit_card', hint: mask, mask, tooltip: 'Creditcard', flex: 3 },
        file: { type: 'file', label: 'Files', accept, multiple: true, tooltip: { color: 'green', label: 'File Selection', top: true }, flex: 3 }
      }
    }
  },
  methods: {
    change
  }
}
</script>
