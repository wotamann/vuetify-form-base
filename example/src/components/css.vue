<style>
  /* INFO-SCOPED: Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */

  /* CSS Component --- Container */
  #form-base-css { background-color: #fff9e6; }
  #form-base-css input { background-color: #f3dbe1b9; color:#920f30b9 }
  #form-base-css input:focus { background-color: #df446bb9; color:#FFF }

  /* CSS Item --- add CSS to every item in formbase  */
  #form-base-css .item { padding:0.5rem; border: 1px dotted #eedf9b}

  /* CSS Type --- type-component_id-[control-type] */
  #form-base-css .type-form-base-css-checkbox { border-radius: 16px; }
 
   /* CSS Props   prop-[(sub)prop of schema]  */
  #form-base-css .prop-bool { background-color: #f1ede0e0; border:1px solid #f0dc9a }
  #form-base-css .prop-radios { background-color: #e5eff7e0; border:1px solid #f0dc9a }

  /* CSS Keys     key-component_id-[key inclusive path to key] */
  /*             .key - form-base-css - controls-btn-btn-toggle-multi  */
  #form-base-css .key-form-base-css-controls-btn-btn-toggle-multi  { background-color: #c5e6fd;  }
  #form-base-css .key-form-base-css-name input { background-color: #cad7f077; color:#8f106577 }
  #form-base-css .key-form-base-css-name input:focus { background-color: #1949a1b9; color:#FFF }
  
  /* CSS Keys     set CSS to label on key */
  #form-base-css .key-form-base-css-controls-bool-switch .v-input__slot .v-label{ font-weight:bolder; font-size: 1.2rem; color: rgb(11, 167, 24)!important}

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
        @input="log"
        @click="log"
        @clickOutside="log"
      />    
    </v-form> 

    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
    
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'

// String
const options = ['A', 'B', 'C']
const optionsObject = [
  { icon: 'format_align_left', value: 1, color:'blue', small:true }, 
  { icon: 'format_align_justify', value: 2, color:'red', medium:true },
  { icon:  'format_align_right', value: 3, color:'green', xLarge:true,  elevation:4, class:'ml-4' }
]
const optionsRadio = [
  { value: 'B', color:'blue', label: 'Blue', offIcon:'add', onIcon:'check' }, 
  { value: 'R', color:'red', label:'Red' },
  { value: 'G', color:'green', label:'Green' },
]

export default {
  components: { VFormBase, Infoline },
  data () {
    return {
      myModel: {        
        name: 'Base',
        password: '123456',
        email: 'base@mail.com',
        controls: {
          bool:{
            checkbox: true,
            switch: true,
          },
          slider: 33,
          btn:{
            ['btn-toggle-single']: ['B'],
            ['btn-toggle-multi']: 1,          
            btn: 'A', // is ident to schema { label:'A', value:'A' }
          },
          iconLabel:null,
          iconValue: 'print',          
          radios: {
            radio1: 'B',
            radio2: ['G', 'R'],
          }
        }
      },
      mySchema: {
        name: { type: 'text', label: 'Name', col: 4, appendIcon: 'more_vert', tooltip: 'Name' },
        password: { type: 'password', label: 'Password', col: 4, tooltip: 'Password' },
        email: { type: 'email', label: 'Email', col: 4, spacer: true, tooltip: 'Email' },
        controls: {
          bool:{
            checkbox: { type: 'checkbox', label: 'Red', color: 'red', col: 4, tooltip: 'Checkbox' },
            switch: { type: 'switch', label: 'Green', color: 'green', col: 4, tooltip: 'Switch' },
            // v-slider doesn't work with col:{ cols='auto' }
            slider: { type: 'slider',  color: 'blue', col: 4, tooltip: 'Slider' }
          },
          // Buttons
          btn:{
            ['btn-toggle-single']: { type: 'btn-toggle', options, color:'red', multiple: true, tooltip: 'Multi Button', col: 6 },
            ['btn-toggle-multi']: { type: 'btn-toggle', options: optionsObject, backgroundColor: 'blue lighten-4', class:'pa-3', tooltip: 'Button', col: 6 },
            btn: { type: 'btn', iconRight: 'print', color:'white', block:true, tooltip: 'Block Button', col: 2, ripple:{ center:true, class: 'item blue--text' } },          
          },
          // Icons
          iconLabel: { type: 'icon', label:'print', large: true, color: 'blue', tooltip: 'Icon has Label but not', col: 2 },
          // if label undefined use value
          iconValue: { type: 'icon', color: 'red', tooltip: 'Icon with Value', col: 2 }, 
          // Radios
          radios:{
            radio1: { type: 'radio', label: 'Radio', options, row:false, tooltip: 'Radio', col: 2, clickOutside:true },
            radio2: { type: 'radio', label: 'Radio', options: optionsRadio, row:true, tooltip: 'Color & Multi Radio', col: 4, multiple:false, clickOutside:this.clickOutside },
          }
        }
      }
    }
  },  
  methods: {
    log,

    clickOutside(obj, event){ 
      this.myModel.controls.radio2=[]; 
      console.warn('handled click outside of colored radio', obj, event) 
    },
  }
}
</script>
