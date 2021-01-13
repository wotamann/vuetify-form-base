<style>
  /* scoped doesn't work in nested components */
  #form-base-complete .key-subgroups-content { background-color: #faf3e9; padding: 1rem }
  #form-base-complete .key-subgroups-tasks { background-color: #e2eaf5; padding: 1rem}
  @media print {
    html * { position: fixed; top:0; bottom:0;  visibility: hidden; }
    .key-subgroups-content textarea {  visibility: visible; left: 0; top: 0; bottom: 0 }
    .key-subgroups-content textarea * { visibility: visible; }
  }
</style>

<template>
  <v-container fluid>
    <h4>Rules in Schema with Form Validation</h4>
    <v-form
      ref="myForm"
      v-model="formValid"
      lazy-validation
    >
      <!-- FORM-BASE-COMPONENT -->
      <v-form-base
        id="form-base-complete"
        :model="myModel"
        :schema="mySchema"
        @input="log"
        @click="log"
      />
    </v-form>

    <v-btn color="red lighten-3" @click= "validate">
      Validate
    </v-btn>

    <v-btn dark color="green lighten-3" @click= "resetValidation">
      Reset Validate
    </v-btn>
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
   
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'

const items = ['Tesla', 'Jobs', 'Taleb', 'Harari']

// Helper & Partial Functions
const minLen = l => v => (v && v.length >= l) || `min. ${l} Characters`
const maxLen = l => v => (v && v.length <= l) || `max. ${l} Characters`
const required = msg => v => !!v || msg
const requiredArray = msg => v => (Array.isArray(v) && v.length>1) || msg

// Rules
const rules = {
  requiredEmail: required('E-mail is required'),
  requiredSel: required('Selection is required'),
  requiredSelMult: requiredArray('2 Selections are required'),
  max12: maxLen(12),
  min6: minLen(6),
  validEmail: v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
}

export default {
  components: { VFormBase, Infoline },
  data () {
    return {
      formValid: true,
      myModel: {
        email: 'base@',
        password: 'abc',
        subgroups: {
          select: null,
          multiple: ['Taleb'],
          content: ``
        }
      },
      mySchema: {
        email: { type: 'email', label: 'Email', rules: [rules.requiredEmail, rules.validEmail], col: { xs: 12, sm: 6 } },
        password: { type: 'password', label: 'Password', hint: '6 to 12 Chars', appendIcon: 'visibility', counter: 12, rules: [rules.min6, rules.max12], clearable: true, col: { xs: 12, sm: 6 } },
        subgroups: {
          select: { type: 'select', label: 'Select', items, rules: [rules.requiredSel], col: { xs: 12, sm: 6 } },
          multiple: { type: 'select', label: 'Multi-Select', clearable:true, items, rules: [rules.requiredSelMult], multiple: true, col: { xs: 12, sm: 6 } },
          content: { type: 'textarea', label: 'Textarea', hint: 'Auto-Growing...', autoGrow: true, prependInnerIcon: 'print', rules: [ required('Content required') ], col: { xs: 12, sm: 6 } },
        }
      }
    }
  },
  methods: {

    validate () {
      this.$refs.myForm.validate()
    },

    resetValidation () {
      this.$refs.myForm.resetValidation()
    },
    log (val) {
      log(val)

      let { on, key, obj, params } = val
      // check 'click' is from prependInner Icon (Print) at key 'subgroups.content'  
      if (on === 'click' && key === 'subgroups.content' && (params && params.tag) === 'prepend-inner') {
        window.print()      
      }
      // check 'click' is from from appendIcon at key password
      if (on === 'click' && key === 'password' && (params && params.tag) === 'append') { 
        // toggle visibility of password control
        obj.schema.type === 'password' ? obj.schema.appendIcon = 'lock' : obj.schema.appendIcon = 'visibility'
        obj.schema.type = obj.schema.type === 'password' ? 'text' : 'password'
      }
    }
  }
}
</script>
