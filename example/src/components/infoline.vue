<style scoped>
  #path { margin-bottom: 1px; }
  pre { font-size: 0.75rem}
</style>
<template>
  <v-layout wrap>
    <v-flex xs12>
      <h5 id="path" >
        Inspect Example-Code <a
          target="_blank"
          :href="`${url}${path}.vue`"
        >'{{path.replace('/','')}}.vue'</a>
        or watch logged Events at Console. 
      </h5>
    </v-flex>    
    <v-flex xs6 >
      <h5>Model</h5>
      <pre class="mr-1"
        v-text="JSON.stringify(modelValue, replacer, 3)"
      />
    </v-flex>
    <v-flex xs6>
      <h5>Schema</h5>
      <pre
        v-text="JSON.stringify(schema, replacer, 3)"
      />
    </v-flex>    
  </v-layout>
</template>

<script>
const url = 'https://github.com/wotamann/vuetify-form-base/blob/master/example/src/components'
const fileObjectToString = (val) => `${val.name} - (File Object)` 

export default {
  props: ['value', 'model', 'schema', 'editable'],
  data () {
    return {
      url,
      path:this.$router.currentRoute.path
    }
  },
  computed:{
    modelValue(){ return this.model || this.value}
  },
  methods: {
    replacer (key, value) {
      if (typeof value === 'function') {
        return 'Function' 
      }
      if (Array.isArray(value) && value[0] instanceof File) {
        // map Fileobject to Filename
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
