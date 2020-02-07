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
    <h4>
      See Console for Events | <a
        target="_blank"
        :href="`${url}${path}.vue`"
      >Inspect the Code at {{path}}.vue in Directory Example</a>
    </h4>
  </v-layout>
</template>

<script>
const url = 'https://github.com/wotamann/vuetify-form-base/blob/master/example/src/components/'

export default {
  props: ['value', 'schema', 'editable', 'path'],
  data () {
    return {
      url,
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
