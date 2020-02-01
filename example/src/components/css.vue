<style>
  /* INFO-SCOPED: Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */

  /* CSS Component --- Container */
  #form-base-css { background-color: #f1f1f1; }

  @media only screen and (max-width: 800px) {
    #form-base-css { background-color: #cfebf8; }
  }
  @media only screen and (max-width: 560px) {
    #form-base-css { background-color: #fcd0c5; }
  }

  /* CSS Item --- set all items  */
  #form-base-css .item { border: 1px dashed #1965b1; padding:0.5rem; margin:0.4px }

  /* CSS Type --- set all items of type ... */
  #form-base-css .type-checkbox { background-color: #f0d3d1}
  #form-base-css .type-switch { background-color: #46a7df73}
  #form-base-css .type-slider { background-color: #44c45a77}

  /* CSS Keys --- set item with key on focus' */
  #form-base-css .key-email input:focus { background-color: #1965b1; color:#FFF }
</style>

<template>
  <v-container
    fluid
  >
    <h4>Play around and resize with predefined CSS-Classes, Slots, Buttons and individual Tooltips</h4>

    <v-form-base
      id="form-base-css"
      :value="myValue"
      :schema="mySchema"
      @change:form-base-css="change"
    >
      <!-- KEY SLOTS -->
      <h4 slot="slot-top-key-name">
        Slot at Top of Key Name
      </h4>
      <h4 slot="slot-item-key-password">
        Slot replaces Key Password
      </h4>
      <h4 slot="slot-bottom-key-email">
        Slot at Bottom of Key Email
      </h4>

      <!-- TYPE SLOTS -->
      <h4 slot="slot-top-type-btn-toggle">
        Slot at Top of Type Btn-Toggle
      </h4>
      <h4 slot="slot-bottom-type-btn">
        Slot at Bottom of Type Btn
      </h4>
      <h4 slot="slot-top-type-radio">
        Slot at Top of Type Radio
      </h4>
      <!-- <h4 slot="slot-bottom-type-radio">Top Bottom Type Radio</h4> -->

      <!-- TOOLTIP SLOTS -->
      <div
        slot="slot-tooltip"
        slot-scope="slotProps"
      >
        {{ slotProps.obj.schema.tooltip }} has value '{{ slotProps.obj.value }}'
      </div>
      <!-- New Syntax VUE 2.6.0 - TOOLTIP SLOT - -->
      <!-- <template v-slot:slot-tooltip="slotProps">
         {{ slotProps.obj.schema.tooltip }} with Value: {{ slotProps.obj.value }}
      </template> -->
    </v-form-base>

    <infoline
      :value="myValue"
      :schema="mySchema"
    />
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import change from '@/lib'

const options = ['A', 'B']
const objectOptions = [{ label: 'A', icon: 'format_align_justify', value: 1 }, { label: 'B', icon: 'format_align_justify', value: 2 }, { label: 'C', value: 3 }]

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
        name: { type: 'text', label: 'Name', flex: 4, appendIcon: 'more_vert', tooltip: 'Name' },
        password: { type: 'password', label: 'Password', flex: 4, tooltip: 'Password' },
        email: { type: 'email', label: 'Email', flex: 3, spacer: true, tooltip: 'Email' },
        controls: {
          checkbox: { type: 'checkbox', label: 'Red', color: 'red', flex: 4, tooltip: 'Checkbox' },
          switch: { type: 'switch', label: 'Blue', color: 'blue', flex: 4, tooltip: 'Switch' },
          slider: { type: 'slider', label: 'Green', color: 'green', flex: 3, tooltip: 'Slider' },

          btnToggle1: { type: 'btn-toggle', options, 'small': true, colorflex: 6 },
          btnToggle2: { type: 'btn-toggle', options: objectOptions, multiple: true, color: 'blue', flex: 5 },

          btn1: { type: 'btn', iconRight: 'print', 'x-large': true, flex: 3 },
          btn2: { type: 'btn', label: 'B', iconLeft: 'print', iconCenter: 'add', iconRight: 'mdi-format-italic', dark: true, color: 'blue', flex: 3 },

          radio1: { type: 'radio', label: 'Radio 1', options, flex: 3 },
          radio2: { type: 'radio', label: 'Radio 2', options: objectOptions, color: 'green', row: true }
        }
      }
    }
  },
  methods: {
    change
  }
}
</script>
