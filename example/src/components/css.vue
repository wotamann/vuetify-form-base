<style>
  /* INFO-SCOPED: don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */
  h4 { background-color: #eef; color: #44d; padding: 0.5rem}
  /* CSS Component --- Container */
  #form-base-css { border: 1px solid #c2b82b; background-color: #f7f7ea; padding:2rem }
  @media only screen and (max-width: 800px) {
    #form-base-css { border: 1px solid rgb(74, 179, 14); background-color: #dff7d5; padding:1rem }
  }
  @media only screen and (max-width: 560px) {
    #form-base-css { border: 1px solid rgb(18, 93, 179); background-color: #c2e0f8; padding:0rem }
  }

  /* CSS Item --- set all items  */
  #form-base-css .item { border-left: 1px dashed #2b9bdb; border-top: 1px dashed rgb(43, 155, 219); padding:1rem }

  /* CSS Type --- set all items with type */
  #form-base-css .type-switch { border-bottom: 3px solid #e22d23}
  #form-base-css .type-checkbox { background-color: #fdd }

  /* CSS Keys --- select key in object 'myValue.password' */
  #form-base-css .key-password input:focus { background-color: rgb(248, 225, 245) }
  #form-base-css .key-controls-slider { background-color: #f3e9cc }

</style>

<template>
  <v-container fluid >

    <v-form-base id= "form-base-css" :value= "myValue" :schema= "mySchema" @update:form-base-css= "update">

      <h4 slot="slot-top-key-password">Top Slot Key Password</h4> -->
      <h4 slot="slot-top-type-radio">Top Slot Type Radio</h4>
      <h4 slot="slot-bottom-key-name">Bottom Slot Key Name</h4>

      <h4 slot="slot-item-key-password">Slot replaces Key Password</h4>
      <!-- <h4 slot="slot-item-type-radio">Slot replaces all Radio Types</h4> -->

    </v-form-base>

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
    }
  }
}
</script>
