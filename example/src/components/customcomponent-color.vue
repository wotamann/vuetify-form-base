
<template>
  <div class="ma-3 pa-4 grey lighten-3 caption">
    <h4>{{obj.schema.label}}</h4>
    <div :style="{ backgroundColor:value.a}">
      <v-text-field type="color" v-model="value.a" @input="$emit('input', value)"/> 
    </div>
    <hr>
    <div :style="{ backgroundColor:value.b}">
      <v-text-field type="color" v-model="value.b" @input="$emit('input', value)"/> 
    </div>
    <hr>
    <a target="_blank" :href="url">
      See Component Code
    </a>
    <br>
    type: {{type}}
    <br>
    value: {{value}}    
  </div>
</template>

<script>
const url = 'https://github.com/wotamann/vuetify-form-base/blob/master/example/src/components/customcomponent-color.vue'

export default {
  props: ['type','value', 'obj'],  
  data () {
    return {
      url
    }
  },
}
</script>