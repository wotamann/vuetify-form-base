<style>
  /* INFO-SCOPED: don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */
  h4 { background-color: #eef; color: #44d; padding: 0.5rem}

  /* CSS Component --- Container */
  #form-base-css { border: 1px solid #c2b82b; background-color: #f7f7ea; padding:2rem }

  @media only screen and (max-width: 800px) {
    #form-base-css { border: 1px solid rgb(74, 179, 14); background-color: #e5f0e0; padding:1rem }
    #form-base-css .key-controls-checkbox { background-color: #bae9af }
  }
  @media only screen and (max-width: 560px) {
    #form-base-css { border: 1px solid rgb(18, 93, 179); background-color: #e4ecf1; padding:0rem }
    #form-base-css .key-controls-checkbox { background-color: #faeeca }
  }

  /* CSS Item --- set all items  */
  #form-base-css .item { border: 1px dashed #888e91; padding:1rem }

  /* CSS Type --- set all items with type */
  #form-base-css .type-switch { border-bottom: 3px solid #e22d23}

  /* CSS Keys --- select key email and set CSS on focus' */
  #form-base-css .key-email input:focus { background-color: rgb(253, 217, 175) }

</style>

<template>
  <v-container fluid >
    <h4>Play around with predefined CSS-Classes and Slots  </h4>
    <v-form-base id= "form-base-css" :value= "myValue" :schema= "mySchema" @update:form-base-css= "update">
      <!-- KEY -->
      <h4 slot="slot-top-key-password">Top Slot Key Password</h4> -->
      <h4 slot="slot-bottom-key-name">Bottom Slot Key Name</h4>
      <h4 slot="slot-item-key-password">Slot replaces Key Password</h4>
      <!-- TYPE -->
      <h4 slot="slot-top-type-radio">Top Slot Type Radio</h4>
      <!-- <h4 slot="slot-bottom-type-radio">Top Bottom Type Radio</h4> -->
      <!-- <h4 slot="slot-item-type-radio">Slot replaces all Radio Types</h4> -->
    </v-form-base>

    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import update from '@/lib'

const options = ['A', 'B']

export default {
  components: { VFormBase, Infoline },
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
        password: { type: 'password', label: 'Password', flex: 4, spacer: true },
        email: { type: 'email', label: 'Email', flex: 4 },
        controls: {
          checkbox: { type: 'checkbox', label: 'Red', color: 'red', flex: 4 },
          switch: { type: 'switch', label: 'Switch', color: 'blue', flex: 4 },
          slider: { type: 'slider', label: 'Slider', color: 'orange', flex: 4 },
          radioA: { type: 'radio', label: 'Radio A', options, color: 'indigo', flex: 6 },
          radioB: { type: 'radio', label: 'Radio B', options, color: 'green', row: true, flex: 6 }
        }
      }
    }
  },
  methods: {
    update
  }
}
</script>
