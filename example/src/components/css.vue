<style>
  /* INFO-SCOPED: Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */

  /* CSS Component --- Container */
  #form-base-css { background-color: #fff; }
  #form-base-css .title { width: 100%; }
  #form-base-css .slot { padding:2px; color:#b49403; background-color: #f7f2dc; border-bottom: 2px dotted #e9c837}

  /* CSS Item --- set all items  */
  #form-base-css .item { padding:0.5rem; border-bottom: 2px dotted #bbb}

  /* CSS Type --- set all items of type ... */
  #form-base-css .type-checkbox { background-color: #f0d3d1}
  #form-base-css .type-switch { background-color: #46a7df73}
  #form-base-css .type-slider { background-color: #44c45a77}

  /* CSS Keys --- set item with key on focus' */
  #form-base-css .key-email input { background-color: #cad7f077; color:#1951bb77 }
  #form-base-css .key-email input:focus { background-color: #2761cc77; color:#FFF }
</style>

<template>
  <v-container fluid>
    <h4>Play around and resize with predefined CSS, Buttons, Icons, Slots and individual Tooltips</h4>
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      id="form-base-css"
      :value="myValue"
      :schema="mySchema"
      @change:form-base-css="log"
    >
      <!-- FORM SLOT -->
      <h4 slot="form-base-css-top" class="title slot">
        Top Slot of 'Form'
      </h4>
      <h4 slot="form-base-css-bottom" class="title slot">
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
          icon: 'print',
          radio: 'A',
        }
      },
      mySchema: {
        name: { type: 'text', label: 'Name', flex: 4, appendIcon: 'more_vert', tooltip: 'Name' },
        password: { type: 'password', label: 'Password', flex: 4, tooltip: 'Password' },
        email: { type: 'email', label: 'Email', flex: 4, spacer: true, tooltip: 'Email' },
        controls: {
          checkbox: { type: 'checkbox', label: 'Red', color: 'red', flex: 4, tooltip: 'Checkbox' },
          switch: { type: 'switch', label: 'Blue', color: 'blue', flex: 4, tooltip: 'Switch' },
          slider: { type: 'slider', label: 'Green', color: 'green', flex: 4, tooltip: 'Slider' },

          btnToggleSingle: { type: 'btn-toggle', options, color:'red', multiple: true, tooltip: 'Multiple Button', flex: 6 },
          btnToggleMulti: { type: 'btn-toggle', options: optionsObj, color: 'blue', tooltip: 'Button', flex: 6 },

          btn: { type: 'btn', iconRight: 'print', color:'red', tooltip: 'Button', flex: 5 },
          icon: { type: 'icon', large: true, color: 'green', tooltip: 'Icon', flex: 1 },
          radio: { type: 'radio', label: 'Radio', options, row:true,  flex: 6 },
        }
      }
    }
  },
  methods: {
    log
  }
}
</script>
