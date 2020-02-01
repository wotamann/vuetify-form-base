<style scoped>
  pre { font-size: 0.75rem}
</style>
<template>
  <v-layout wrap>
    <v-flex xs6>
      <h4>Value-Data (JSON)</h4>
      <pre
        v-text="JSON.stringify(value, replacer, 3)"
      />
    </v-flex>
    <v-flex xs6>
      <h4>Schema-Definition (JSON)</h4>
      <pre
        v-text="JSON.stringify(schema, undefined, 3)"
      />
    </v-flex>
    <h4>See Console for logged Events or inspect the Code at Example</h4>
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
    }
  }
}
</script>
