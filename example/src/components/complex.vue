<style>
  /* scoped doesn't work in nested components */

  #form-base-complete .key-subgroups-content { border: 1px solid #919191; background-color: #e9e9e9; padding: 1rem }
  #form-base-complete .key-subgroups-tasks { border: 1px solid #4b8ad6; background-color: #e2eaf5; padding: 1rem}

  @media print {
    html * { position: fixed; visibility: hidden; }
    .key-subgroups-content textarea { visibility: visible; left: 0; top: 0; bottom: 0 }
    .key-subgroups-content textarea * { visibility: visible; }
  }
</style>

<template>
  <v-container fluid >
    <h4>Complete Form with validation</h4>
    <v-form ref="form1" v-model= "formValid" lazy-validation>
      <v-form-base id="form-base-complete" :value= "myValue" :schema= "mySchema" @update:form-base-complete= "update" />
    </v-form>

    <v-btn  dark color="blue lighten-3" @click="validate">Validate</v-btn>
    <v-btn  dark color="blue lighten-3" @click="resetValidation">Reset Validate</v-btn>

    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import updateLog from '@/lib'

const items = ['Tesla', 'Jobs', 'Taleb', 'Harari']

/* Helper & Partial Functions */
const minLen = l => v => (v && v.length >= l) || `min. ${l} Characters`
const maxLen = l => v => (v && v.length <= l) || `max. ${l} Characters`
const required = msg => v => !!v || msg
// const toUpper = ({ value }) => value && value.toUpperCase()
const rules = {
  requiredEmail: required('E-mail is required'),
  max12: maxLen(12),
  min6: minLen(6),
  validEmail: v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
}
//
export default {
  components: { VFormBase, Infoline },
  data () {
    return {
      formValid: true,

      myValue: {
        email: 'base@mail.com',
        password: '123456',
        subgroups: {
          select: 'Tesla',
          multiple: ['Jobs'],
          // combobox: null,
          // autocomplete: null,
          tasks: [
            { done: false, title: 'shopping' },
            { done: true, title: 'coding' },
            { done: false, title: 'walking' },
            { done: false, title: 'sleeping' }
          ],
          datePicker: '2019-8-1',
          content: `Design principles of Vuetify ...`
        }
      },

      mySchema: {
        email: { type: 'email', label: 'Email', rules: [rules.validEmail, rules.requiredEmail], flex: { xs: 12, sm: 6 } },
        password: { type: 'password', label: 'Password', hint: '6 to 12 Chars', appendIcon: 'visibility', counter: 12, rules: [rules.min6, rules.max12], clearable: true, flex: { xs: 12, sm: 6 } },
        subgroups: {
          select: { type: 'select', label: 'Select', items, flex: { xs: 12, sm: 6 } },
          multiple: { type: 'select', label: 'Multi-Select', items, multiple: true, flex: { xs: 12, sm: 6 } },
          // combobox: { type: 'combobox', label: 'Combobox', items, flex: { xs: 12, sm: 6, md: 3 } },
          // autocomplete: { type: 'autocomplete', label: 'AutoComplete', items, flex: { xs: 12, sm: 6, md: 3 } },
          tasks: { type: 'array', schema: { done: { type: 'checkbox', label: 'Ok', flex: 3 }, title: { type: 'text', placeholder: 'to do...', flex: 8 } }, flex: { xs: 12, sm: 4 } },
          datePicker: { type: 'date', color: 'green', flex: { xs: 12, sm: 5 } },
          content: { type: 'textarea', label: 'Content', hint: 'Auto-Growing...', autoGrow: true, prependInnerIcon: 'print', rules: [ required('Content required') ], flex: { xs: 12, sm: 3 } }
        }
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
    toggle () {
      this.mySchema.checkbox[2].checkbox1[0].hidden = !this.mySchema.checkbox[2].checkbox1[0].hidden
      console.log('this.mySchema.checkbox[2].checkbox1[0].hidden', this.mySchema.checkbox[2].checkbox1[0].hidden)
    },
    update (val) {
      updateLog(val)

      let { on, key, obj, params } = val
      // print content
      if (on === 'click' && key === 'subgroups.content' && (params && params.text) === 'print') {
        window.print()
      }
      // toggle visibility of password
      if (on === 'click' && key === 'password' && (params && params.pos) === 'append') { // check 'click' is from from appendIcon
        obj.schema.type === 'password' ? obj.schema.appendIcon = 'lock' : obj.schema.appendIcon = 'visibility'
        obj.schema.type = obj.schema.type === 'password' ? 'text' : 'password'
      }
    }
  }
}
</script>
