<style>
  /* INFO-SCOPED: don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */
  h4 { background-color: #eef; color: #44d; padding: 0.2rem}

  /* CSS Component --- Container */
  #form-base-css { background-color: #dde3f0; }

  @media only screen and (max-width: 800px) {
    #form-base-css { background-color: #e5f0e0; }
  }
  @media only screen and (max-width: 560px) {
    #form-base-css { background-color: #ddccac; }
  }

  /* CSS Item --- set all items  */
  #form-base-css .item { border: 1px dashed #848688; padding:0.5rem }

  /* CSS Type --- set all items of type ... */
  #form-base-css .type-checkbox { border-bottom: 3px solid #e22d23; background-color: #fcc}
  #form-base-css .type-switch { background-color: #2b8cc473}
  #form-base-css .type-slider { background-color: #289e3c77}

  /* CSS Keys --- set item with key on focus' */
  #form-base-css .key-email input:focus { background-color: #85a2e0 }

</style>

<template>
  <v-container fluid >
    <h4>Play around with predefined CSS-Classes, Slots and Buttons  </h4>

    <v-form-base id= "form-base-css" :value= "myValue" :schema= "mySchema" @change:form-base-css= "change">
      <!-- KEY -->
      <h4 slot="slot-top-key-name">Top Slot Key Name</h4>
      <h4 slot="slot-item-key-password">Slot replaces Key Password</h4>
      <h4 slot="slot-bottom-key-email">Bottom Slot Key Email</h4>
      <!-- TYPE -->
      <h4 slot="slot-top-type-btn-toggle">Top Slot Type Btn-Toggle</h4>
      <h4 slot="slot-bottom-type-btn">Bottom Slot Type Btn</h4>
      <h4 slot="slot-top-type-radio">Top Slot Type Radio</h4>
      <!-- <h4 slot="slot-bottom-type-radio">Top Bottom Type Radio</h4> -->
      <!-- <h4 slot="slot-bottom-type-radio">Top Bottom Type Radio</h4> -->
      <!-- <h4 slot="slot-item-type-radio">Slot replaces all Radio Types</h4> -->
    </v-form-base>

    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import change from '@/lib'

const options = ['A', 'B']
const objectOptions = [{ icon: 'format_align_justify', value: 1 }, { label: 'B', icon: 'format_align_justify', value: 2 }, { label: 'C', value: 3 }]

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
          btnToggle1: 'B',
          btnToggle2: [1, 2],
          btn1: 'A', // or use schema.label
          btn2: 'B', // or use schema.label
          radio1: 'A',
          radio2: 2
        }
      },
      mySchema: {
        name: { type: 'text', label: 'Name', flex: 4, appendIcon: 'more_vert' },
        password: { type: 'password', label: 'Password', flex: 4, spacer: true },
        email: { type: 'email', label: 'Email', flex: 4 },
        controls: {
          checkbox: { type: 'checkbox', label: 'Red', color: 'red', flex: 4 },
          switch: { type: 'switch', label: 'Blue', color: 'blue', flex: 4 },
          slider: { type: 'slider', label: 'Green', color: 'green', flex: 4 },

          btnToggle1: { type: 'btn-toggle', options, 'x-small': true, flex: 6 },
          btnToggle2: { type: 'btn-toggle', options: objectOptions, rounded: true, multiple: true, dark: true, color: 'blue', flex: 6 },

          btn1: { type: 'btn', iconRight: 'print', 'x-large': true, flex: 3 },
          btn2: { type: 'btn', label: 'B', iconLeft: 'print', iconCenter: 'add', iconRight: 'mdi-format-italic', dark: true, color: 'blue', flex: 3 },

          radio1: { type: 'radio', label: 'Radio 1', options, flex: 3 },
          radio2: { type: 'radio', label: 'Radio 2', options: objectOptions, color: 'green', row: true, flex: 3 }
        }
      }
    }
  },
  methods: {
    change
  }
}
</script>
