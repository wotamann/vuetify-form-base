<style>
  /* INFO-SCOPED: don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */

  #form-base-partial { width:50%; background-color: #ddf3f0; padding: 0.5rem }
  
</style>

<template>
  <v-container fluid >


    <v-form-base :value= "myValue" :schema= "mySchema" @update= "update"/>
 
    <br/>   
    <h3>Linked and Partial Form of 'controls' from 'myValue'</h3>

    <v-form-base id= "form-base-partial" :value= "myValue.controls" :schema= "mySchema.controls" @update:form-base-partial= "updatepartial"/>
    <br/>   
    <br/>   
    <h4>See your reactive  Data in 'myValue' </h4>
    <p>{{myValue}}</p>

    <h4>See your Definition in 'mySchema' </h4>
    <p>{{mySchema}}</p>

    <h4>See logged 'update' events at console </h4>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'

const options = ['A', 'B']

export default {
  components: { VFormBase },
  data () {
    return {
      myValue: {
        name: 'Base',
        password: '123456',
        email: 'base@mail.com',
        controls: {
          checkbox: true,
          switch: true,
          slider: 33,
          radioA: 'A',
          radioB: 'B'
        }
      },
      mySchema: {
        name: { type: 'text', label: 'Name', flex: 4, appendIcon: 'more_vert' },
        password: { type: 'password', label: 'Password', flex: 4 },
        email: { type: 'email', label: 'Email', spacer: true, flex: 4 },
        controls: {
          checkbox: { type: 'checkbox', label: 'Red', color: 'red', flex: 4 },
          switch: { type: 'switch', label: 'Switch', color: 'blue', flex: 4 },
          slider: { type: 'slider', label: 'Slider', color: 'orange', flex: 4 },
          radioA: { type: 'radio', label: 'RadioA', options, color: 'indigo', flex: 6 },
          radioB: { type: 'radio', label: 'RadioB', options, color: 'green', row: true, flex: 6 }
        }
      }
    }
  },
  methods: {
    update ({ on, id, key, value, obj, event, params, data, schema }) {
      console.log('Update [ on, key, value, params]', on, key, value, params)
    },
    updatepartial ({ on, id, key, value, obj, event, params, data, schema }) {
      console.log('Update - PARTIAL [ on, key, value, params]', on, key, value, params)
    }
  }
}
</script>
