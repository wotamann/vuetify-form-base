<template>
  <v-container fluid >

    <v-form ref="form1" v-model= "formValid" lazy-validation>

      <v-form-base
        id="form-base-complex"
        :class= "layout"
        :value= "myValue"
        :schema= "mySchema"
        @update:form-base-complex= "update"
      >
       <!-- <h4 slot="slot-item-key-checkbox-0">Slot replaces first Checkbox</h4> -->
      </v-form-base>

    </v-form>

    <v-btn small @click="validate">Validate</v-btn>
    <v-btn small @click="resetValidation">Reset Validate</v-btn>
    <v-btn small @click="toggle">Hide/Show Checkbox 'C-1'</v-btn>
    <p>
      Value: {{myValue.checkbox[2].checkbox1[0]}} | Schema: {{mySchema.checkbox[2].checkbox1[0]}}
    </p>
    <v-divider></v-divider>

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
const options = ['A', 'B']

/* Helper Functions */
const toUpper = ({ value }) => value && value.toUpperCase() // destructuring value !!!
// const generateArray = (len, v) => Array.from(Array(len), () => (v))

/* Partial Functions */
const minLen = l => v => (v && v.length >= l) || `min. ${l} Characters`
const maxLen = l => v => (v && v.length <= l) || `max. ${l} Characters`
// const minVal = l => v => v >= l || `min. ${l}`
// const maxVal = l => v => v <= l || `max. ${l}`
const required = msg => v => !!v || msg
const rules = {
  requiredEmail: required('E-mail is required'),
  max12: maxLen(12),
  min6: minLen(6),
  validEmail: v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
}

export default {
  components: { VFormBase },
  data () {
    return {
      formValid: true,

      myValue: {
        name: 'Base',
        password: '123456',
        email: 'base@mail.com',
        selection: {
          select: 'Tesla',
          selectMultiple: ['Jobs']
        },
        combobox: null,
        autocomplete: null,
        checkbox: [
          true,
          false,
          { checkbox1: [true, false, true] }
        ],
        switch: true,
        radio: 'A',
        slider: 33,
        content: 'Lorem ipsum dolor sit amet... '
      },

      mySchema: {
        name: { type: 'text', label: 'Name', flex: 6, toCtrl: toUpper, fromCtrl: toUpper, hint: 'Converts to UpperCase' },
        password: { type: 'password', label: 'Password', hint: 'Between 6-12 Chars', appendIcon: 'visibility', counter: 12, rules: [rules.min6, rules.max12], clearable: true, flex: 6 },
        email: { type: 'email', label: 'Email', rules: [rules.validEmail, rules.requiredEmail], flex: 12 },
        selection: {
          select: { type: 'select', label: 'Select', items, flex: 3 },
          selectMultiple: { type: 'select', label: 'Select Multi', items, multiple: true, flex: 3 }
        },
        combobox: { type: 'combobox', label: 'Combobox', items, flex: 3 },
        autocomplete: { type: 'autocomplete', label: 'AutoComplete', items, flex: 3 },
        checkbox: [
          { type: 'checkbox', label: 'A',},
          { type: 'checkbox', label: 'B', },
          { checkbox1: [ { type: 'checkbox', color: 'red', label: 'C-1', hidden: false }, { type: 'checkbox', label: 'C-2' } ] }
        ],
        switch: { type: 'switch', label: 'Switch', hidden: false },
        radio: { type: 'radio', label: 'Radio', options, row: true, hidden: false },
        slider: { type: 'slider', label: 'Slider', rules: [ v => v > 50 ? 'Error >50 ' : false ] },
        content: { prependIcon: 'print', type: 'textarea', rules: [ required('Content required') ], label: 'Content', hint: 'autogrowing...', autoGrow: true, backgroundColor: 'blue lighten-5', flex: 12 }
      }
    }
  },
  computed: {
    layout () {
      // hide/show controls on resizing
      if (this.$vuetify.breakpoint.mdAndUp) {
        return [ false, false ]
      } else if (this.$vuetify.breakpoint.smAndUp) {
        return [ true, false ]
      } else {
        return [ true, true ]
      }
    }
  },
  methods: {
    validate () {
      this.$refs.form1.validate()
    },

    resetValidation () {
      this.$refs.form1.resetValidation()
    },
    hide () {
      [ this.mySchema.switch.hidden, this.mySchema.radio.hidden ] = this.layout
    },
    toggle () {
      this.mySchema.checkbox[2].checkbox1[0].hidden = !this.mySchema.checkbox[2].checkbox1[0].hidden
      console.log('this.mySchema.checkbox[2].checkbox1[0].hidden', this.mySchema.checkbox[2].checkbox1[0].hidden)
    },
    update ({ on, id, key, value, obj, event, params, data, schema }) {
      console.log('Update [ on, key, value, params]', on, key, value, params)

      // toggle visibility of password
      if (on === 'click' && key === 'password' && (params && params.pos) === 'append') { // check 'click' is from from appendIcon
        obj.schema.type === 'password' ? obj.schema.appendIcon = 'lock' : obj.schema.appendIcon = 'visibility'
        obj.schema.type = obj.schema.type === 'password' ? 'text' : 'password'
      }
    }
  }
}
</script>
