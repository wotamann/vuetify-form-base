
<template>
  <div class="ma-3 pa-4 grey lighten-3 caption">
    <h4>{{obj.schema.label}}</h4>    
    <v-text-field v-model="value.a" @input="$emit('input', value)" label="A"></v-text-field>
    <v-text-field v-model="value.b" @input="$emit('input', value)" label="B"></v-text-field>
    <v-btn small color="green lighten-2" dark  @click="clear">Clear Component</v-btn>    
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
const url = 'https://github.com/wotamann/vuetify-form-base/blob/master/example/src/components/customcomponent-object.vue'

export default {
  props: ['type','value', 'obj'],  
  data () {
    return {
      url
    }
  },   
  methods:{
    clear(){
      this.value.a = null
      this.value.b = null
      this.$emit('input', this.value)
    }    
  }
}
</script>