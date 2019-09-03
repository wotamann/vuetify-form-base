<style scoped>
  pre { font-size: 0.8rem}
  .failed { background-color: rgb(253, 228, 228)}
  .passed { background-color: white}
</style>

<template>
  <v-layout wrap>
      <v-flex xs6>
        <h4>Value-Data (JSON)</h4>
        <pre :contenteditable="editable" :class= "valueClass" @blur= "blur($event)" v-text= "JSON.stringify(value, replacer, 3)"></pre>
      </v-flex>
      <v-flex xs6>
        <h4>Schema-Definition (JSON)</h4>
        <pre :contenteditable="editable" :class= "schemaClass" @blur= "blur($event, true)" v-text= "JSON.stringify(schema, undefined, 3)"></pre>
      </v-flex>
      <h4>See logged 'Update' Events at Console</h4>
       </v-layout>
</template>

<script>
export default {
  props: ['value', 'schema', 'editable'],
  data () {
    return {
      valueClass: 'passed',
      schemaClass: 'passed'
    }
  },
  methods: {
    replacer (key, value) {
      if (Array.isArray(value) && value[0] instanceof File) {
        return value.map(i => i.name + ' - (File Object)')
      }
      return value
    },
    blur (p, schemaMode) {
      // try {
      //   let text = JSON.parse(p.target.innerText)
      //   console.log('INFOLINE BLUR:', text);

      //   let value = schemaMode ? this.value: text
      //   let schema = schemaMode ? text : this.schema
      //   this.$emit('blur', { value, schema } )
      //   schemaMode ? this.schemaClass = 'passed' : this.valueClass = 'passed'
      // } catch (error) {
      //   console.error( 'VALUE: No valid JSON ');
      //   schemaMode ? this.schemaClass = 'failed' : this.valueClass = 'failed'
      // }
    }
  }
}
</script>
