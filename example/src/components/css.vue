<style>
  /* INFO-SCOPED: Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */

  /* CSS Component --- Container */
  #form-base-css { background-color: #fff9e6; }
  #form-base-css input { background-color: #f3dbe1b9; color:#920f30b9 }
  #form-base-css input:focus { background-color: #df446bb9; color:#FFF }

  /* CSS Item --- set all items  */
  #form-base-css .item { padding:0.5rem; border-bottom: 1px dotted #7f82ad}

  /* CSS Type --- set all items of type ... */
  #form-base-css .type-checkbox { background-color: #f0d3d1}
  #form-base-css .type-slider { background-color: #46a7df73}
  #form-base-css .type-switch { background-color: #44c45a77}

  /* CSS Keys --- set item with key on focus' */
  #form-base-css .key-name input { background-color: #cad7f077; color:#1951bb77 }
  #form-base-css .key-name input:focus { background-color: #1949a1b9; color:#FFF }

</style>

<template>
  <v-container fluid>
    <h4>Play around with predefined CSS, Buttons, Icons and Tooltips</h4>
    
     <v-form class="border-frame" @submit.prevent>
      <!-- FORM-BASE-COMPONENT -->
      <v-form-base
        id="form-base-css"
        :model="myModel"
        :schema="mySchema"
        @change:form-base-css="log"
      >
        <!-- TOOLTIP SLOT -->
        <template #slot-tooltip="{obj}">
          {{ obj.schema.tooltip }} has Value: {{ obj.value }}
        </template>    
      </v-form-base>
     </v-form> 
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
    
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
      myModel: {
        name: 'Base',
        password: '123456#',
        email: 'base@mail.com',
        controls: {
          checkbox: true,
          switch: true,
          slider: 33,
          btnToggleSingle: ['B'],
          btnToggleMulti: 1,          
          btn: 'A', // is ident to schema { label:'A', ... }
          iconValue: 'print',          
          radio: 'A',
        }
      },
      mySchema: {
        name: { type: 'text', label: 'Name', col: 4, appendIcon: 'more_vert', tooltip: 'Name' },
        password: { type: 'password', label: 'Password', col: 4, tooltip: 'Password' },
        email: { type: 'email', label: 'Email', col: 4, spacer: true, tooltip: 'Email' },
        controls: {
          checkbox: { type: 'checkbox', label: 'Red', color: 'red', col: 4, tooltip: 'Checkbox' },
          switch: { type: 'switch', label: 'Green', color: 'green', col: 4, tooltip: 'Switch' },
          
          // v-slider doesn't work with col:{ cols='auto' }
          slider: { type: 'slider', label: 'Blue', color: 'blue', col: 4, tooltip: 'Slider' },

          btnToggleSingle: { type: 'btn-toggle', options, color:'red', multiple: true, tooltip: 'Multiple Button', col: 6 },
          btnToggleMulti: { type: 'btn-toggle', options: optionsObj, color: 'blue', tooltip: 'Button', col: 6 },

          btn: { type: 'btn', iconRight: 'print', color:'green', tooltip: 'Button', col: 3 },          
          iconLabel: { type: 'icon', label:'print', large: true, color: 'blue', tooltip: 'Icon Label', col: 2 },
          // if label undefined use value
          iconValue: { type: 'icon', color: 'red', tooltip: 'Icon Value', col: 2 }, 
          
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
