<style>
  /* INFO-SCOPED: Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */


  /* CSS Component --- Container */
  #form-base-css { background-color: #fff; }
  #form-base-css .title { width: 100%; color: #fdfdfd; background-color: #1965b1; padding:6px }

  /* CSS Item --- set all items  */
  #form-base-css .item { border-left: 1px dashed #1965b1; padding:0.5rem; margin:1px }

  /* CSS Type --- set all items of type ... */
  #form-base-css .type-checkbox { background-color: #f0d3d1}
  #form-base-css .type-switch { background-color: #46a7df73}
  #form-base-css .type-slider { background-color: #44c45a77}

  /* CSS Keys --- set item with key on focus' */
  #form-base-css .key-email input:focus { background-color: #2175c9; color:#FFF }
</style>

<template>
  <v-container fluid>
    <h4>Play around and resize with predefined CSS, Buttons, Icons, Slots and individual Tooltips</h4>
    <v-form-base
      id="form-base-css"
      :value="myValue"
      :schema="mySchema"
      @change:form-base-css="change"
    >
      <!-- FORM SLOT -->
      <h4 slot="form-base-css-top" class="title">
        Top Slot of Form-Base
      </h4>
      <h4 slot="form-base-css-bottom" class="title">
        Bottom Slot of Form-Base
      </h4>  
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
      <!-- TOOLTIP SLOTS -->
      <div
        slot="slot-tooltip"
        slot-scope="slotProps"
      >
        {{ slotProps.obj.schema.tooltip }} has value '{{ slotProps.obj.value }}'
      </div>
      <!-- TOOLTIP SLOT -  New Syntax VUE 2.6.0 -->
      <!-- <template v-slot:slot-tooltip="slotProps">
         {{ slotProps.obj.schema.tooltip }} with Value: {{ slotProps.obj.value }}
      </template> -->
    </v-form-base>
    <infoline
      :value="myValue"
      :schema="mySchema"
      :path="$options._componentTag"
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
          btnToggleSingle: 'B',
          btnToggleMulti: [1, 2],
          icon: 'print',
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

          btnToggleSingle: { type: 'btn-toggle', options, color:'red', tooltip: 'Button', flex: 5 },
          btnToggleMulti: { type: 'btn-toggle', options: objectOptions, multiple: true, color: 'blue', tooltip: 'MultiButton', flex: 5 },

          icon: { type: 'icon', large: true, color: 'green', tooltip: 'Icon', flex: 1 },
          btn1: { type: 'btn', iconRight: 'print', 'x-large': true, tooltip: 'Button', flex: 3 },
          btn2: { type: 'btn', label: 'B', iconLeft: 'print', iconCenter: 'add', iconRight: 'mdi-format-italic', dark: true, color: 'blue', flex: 3 },

          radio1: { type: 'radio', label: 'Radio 1', options, spacer: true, flex: 3 },
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
