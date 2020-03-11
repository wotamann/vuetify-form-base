<style scoped>
  pre { font-size: 0.75rem}
</style>
<template>
  <v-layout wrap>
    <v-flex xs12>
      <h4 v-if="path">
        See Console for Events and <a
          target="_blank"
          :href="`${url}${path}.vue`"
        >inspect the Code at '{{path}}.vue' in Directory Example</a>
      </h4>
    </v-flex>    
    <v-flex xs6>
      <h4>Model</h4>
      <pre
        v-text="JSON.stringify(value, replacer, 3)"
      />
    </v-flex>
    <v-flex xs6>
      <h4>Schema</h4>
      <pre
        v-text="JSON.stringify(schema, replacer, 3)"
      />
    </v-flex>    
  </v-layout>
</template>

<script>
const url = 'https://github.com/wotamann/vuetify-form-base/blob/master/example/src/components/'
const fileObjectToString = (val) => `${val.name} - (File Object)` 

export default {
  props: ['value', 'schema', 'editable', 'path'],
  data () {
    return {
      url,
    }
  },
  methods: {
    replacer (key, value) {
      if (typeof value === 'function') {
        return 'Function' // value.toString() 
      }
      if (Array.isArray(value) && value[0] instanceof File) {
        return value.map(i => fileObjectToString(i) )
      }
      if (value instanceof File) {
        return fileObjectToString(value)
      }
      return value
    }
  }
}
</script>
