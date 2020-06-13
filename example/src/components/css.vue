<style>
  /* INFO-SCOPED: Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */

  /* CSS Component --- Container */
  #form-base-css { background-color: #fff; }
  #form-base-css .slot { width: 100%; padding:2px; color:#947901; background-color: #fcf3d0; border: 1px dotted #e7c320}

  /* CSS Item --- set all items  */
  #form-base-css .item { padding:0.5rem; border-bottom: 1px dotted #7f82ad}

  /* CSS Type --- set all items of type ... */
  #form-base-css .type-checkbox { background-color: #f0d3d1}
  #form-base-css .type-slider { background-color: #46a7df73}
  #form-base-css .type-switch { background-color: #44c45a77}

  /* CSS Keys --- set item with key on focus' */
  #form-base-css .key-email input { background-color: #cad7f077; color:#1951bb77 }
  #form-base-css .key-email input:focus { background-color: #2761cc77; color:#FFF }
</style>

<template>
  <v-container fluid>
    <h4>Play around and resize with predefined CSS, Buttons, Icons, Slots and individual Tooltips</h4>
    <v-row>
      <v-col cols="auto">
        <v-slider :value=44 ></v-slider>
      </v-col>
    </v-row>
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      id="form-base-css"
      :value="myValue"
      :schema="mySchema"
      :col=12
      @change:form-base-css="log"
    >
      <!-- FORM SLOT -->
      <h4 slot="form-base-css-top" class="slot">
        Top Slot of 'Form'
      </h4>
      <h4 slot="form-base-css-bottom" class="slot">
        Bottom Slot of 'Form'
      </h4>  
      <!-- KEY SLOTS -->
      <h4 slot="slot-top-key-name" class="slot">
        Slot at Top of Key 'Name'
      </h4>
      <h4 slot="slot-item-key-password" class="slot">
        Slot replaces Key 'Password'
      </h4>
      <h4 slot="slot-bottom-key-email" class="slot">
        Slot at Bottom of Key 'Email'
      </h4>
      <!-- TYPE SLOTS -->
      <h4 slot="slot-top-type-btn-toggle" class="slot">
        Slot at Top of Type 'Btn-Toggle'
      </h4>
      <h4 slot="slot-bottom-type-btn" class="slot">
        Slot at Bottom of Type 'Btn'
      </h4>
      <h4 slot="slot-top-type-radio" class="slot">
        Slot at Top of Type 'Radio'
      </h4>
      <!-- TOOLTIP SLOTS -->
      <div
        slot="slot-tooltip"
        slot-scope="slotProps"
      >
        Tooltip-Slot: {{ slotProps.obj.schema.tooltip }} has value '{{ slotProps.obj.value || 'undefined' }}'
      </div>
      <!-- TOOLTIP SLOT -  New Syntax VUE 2.6.0 -->
      <!-- <template v-slot:slot-tooltip="slotProps">
         {{ slotProps.obj.schema.tooltip }} with Value: {{ slotProps.obj.value }}
      </template> -->
    </v-form-base>

    <!-- Stuff   -->
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
import log from '@/lib'

const options = ['A', 'B', 'C']
const optionsObj = [
  { icon: 'format_align_left', value: 1 }, 
  { icon: 'format_align_justify', value: 2 },
  { icon: 'format_align_right', value: 3 }
]

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
          btnToggleSingle: ['B'],
          btnToggleMulti: 1,          
          btn: 'A', // ident with schema { label:'A', ... }
          // iconLabel: 'ignored',
          iconValue: 'print',
          radio: 'A',
        }
      },
      mySchema: {
        name: { type: 'text', label: 'Name', col: 4, appendIcon: 'more_vert', tooltip: 'Name' },
        password: { type: 'password', label: 'Password', col: 4, tooltip: 'Password' },
        email: { type: 'email', label: 'Email', col: 4, spacer: true, tooltip: 'Email' },
        controls: {
          checkbox: { type: 'checkbox', label: 'CSS-Red', color: 'red', col: 4, tooltip: 'Checkbox' },
          switch: { type: 'switch', label: 'CSS-Green', color: 'green', col: 4, tooltip: 'Switch' },
          slider: { type: 'slider', label: 'CSS-Blue', color: 'blue', col: 4, tooltip: 'Slider' },

          btnToggleSingle: { type: 'btn-toggle', options, color:'red', multiple: true, tooltip: 'Multiple Button', col: 6 },
          btnToggleMulti: { type: 'btn-toggle', options: optionsObj, color: 'blue', tooltip: 'Button', col: 6 },

          btn: { type: 'btn', iconRight: 'print', color:'red', tooltip: 'Button', col: 5 },
          
          // icon try label 
          iconLabel: { type: 'icon', label:'print', large: true, color: 'blue', tooltip: 'Icon Label', col: 1 },
          // or if undefined use value
          iconValue: { type: 'icon', color: 'red', tooltip: 'Icon Value', col: 1 }, 
          
          radio: { type: 'radio', label: 'Radio', options, row:true,  col: 5 },
        }
      }
    }
  },
  methods: {
    log
  }
}
</script>
