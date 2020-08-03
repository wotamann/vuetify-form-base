
<template>
  <div class="ma-3 pa-4 grey lighten-3 caption">
    <h4>{{obj.schema.label}}</h4>    
    <v-text-field v-model="value.a" @input="$emit('input', value)" label="A"></v-text-field>
    <v-text-field v-model="value.b" @input="$emit('input', value)" label="B"></v-text-field>
    <v-btn small color="grey" dark  @click="clear">Clear both</v-btn>    
    <br>
    type: {{type}}
    <br>
    value: {{value}}    
  </div>
</template>

<script>

export default {
  props: ['type','value','obj'],    
  methods:{
    clear(){
      this.value.a = null
      this.value.b = null
      this.$emit('input', this.value)
    }    
  }
}
</script>