
<template>
  <div class="ma-3 pa-4 grey lighten-3 caption">
    <h4>{{obj.schema.label}}</h4>
    <v-text-field v-model="inp"  label="Basic"></v-text-field>
    <hr>
      <a target="_blank" :href="url">
        See Component Code
      </a>    
    <br>
      type: {{type}}
    <br>
    value: {{value}}
    <br>
    obj: {{obj}}
  </div>
</template>

<script>
const url = 'https://github.com/wotamann/vuetify-form-base/blob/master/example/src/components/customcomponent-basic.vue'

export default {
  props: ['type','value', 'obj'],  
  data () {
    return {
      url
    }
  },
  computed:{
    inp:{
      get(){  return this.value},
      set(v){ this.$emit('input', v)}
    }
  }  
}
</script>

