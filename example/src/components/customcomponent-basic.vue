
<template>
  <div class="ma-3 pa-4 grey lighten-3 caption">
    <h4>Custom Control Basic</h4>
    <v-text-field v-model="inp"  label="Basic"></v-text-field>
    <br>
      type: {{type}}
    <br>
    value: {{value}}
    <br>
    obj: {{obj}}
  </div>
</template>

<script>

export default {
  props: ['type','value', 'obj'],  
  computed:{
    inp:{
      get(){  return this.value},
      set(v){ this.$emit('input', v)}
    }
  }  
}
</script>

