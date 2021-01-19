<style>
  /* INFO-SCOPED: Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */
  /* CSS Item --- set all items  */
  #form-base-slot h4 { font-size: 0.75rem; font-weight:normal; display: inline-block; width:100%; color: #2970f5; background-color: #a2bdf062;}
  #form-base-slot .item { padding:0.5rem; border: 1px dotted #a2bdf062}
  #form--slot .slot { width: 100%; padding:2px;font-size: 0.9rem;font-weight: 400; color:#9e7506; background-color: #fffacd; border: 1px dotted #a2bdf062}
  #form--slot .slot-label { color:#1976d2; }
</style>

<template>
  <v-container fluid>
    <h4>Slots for Form, Keys, Items, Types and Tooltips</h4>
    
    <v-form class="border-frame" @submit.prevent>
     
      <!-- FORM-BASE-COMPONENT -->
      <v-form-base
        id="form-base-slot"
        :model="myModel"
        :schema="mySchema"
        :col=6
        @input="log"       
        @click="log"       
      >
      <!-- FORM SLOTS -->
        <template #slot-top-form-base-slot>   
          <h4 class="slot">
            Top Slot of 'Form'
          </h4>
        </template>
        <template #slot-bottom-form-base-slot>
          <h4 class="slot">
            Bottom Slot of 'Form'
          </h4>  
        </template>
        
      <!-- KEY SLOTS -->
        <!-- TOP of KEY -->
        <template #slot-top-key-form-base-slot-nameSlot="{obj}">
          <h4 class="slot">
            Slot at Top of Key '{{obj.key}}'
          </h4>
        </template>
        <!-- ITEM of KEY -->
        <template #slot-item-key-form-base-slot-emailSlot="{obj, id, index}">
          <h4 class="slot">
            Slot replaces Item with Key '{{obj.key}}'
            <div>Formbase: {{id}}</div>
            <div>Index: {{index}}</div>
            <div>Obj:{{obj}}</div>
          </h4>
        </template>
        <!-- BOTTOM of KEY -->
        <template #slot-bottom-key-form-base-slot-colorSlot="{obj, index, id}">
          <h4 class="slot">
            Slot replaces Bottom with Key '{{obj.key}}'  
            {{JSON.stringify(obj)}}
            ||
            {{index}}
            ||
            {{id}} id
          </h4>
        </template>      
        
      <!-- TYPE SLOTS -->
        <template #slot-top-type-form-base-slot-btn-toggle="{obj}">
          <h4 class="slot">
            Slot at Top of Type 'Btn-Toggle' - {{obj.value}}
          </h4>
        </template>
        <template #slot-bottom-type-form-base-slot-btn-toggle="{obj}">
          <h4 class="slot">
            Slot at Bottom of Type 'Btn' - {{obj.value}}
          </h4>
        </template>
        
      <!-- INJECT SLOTS INTO KEY  -->  
        <!-- INJECT progress into key [component_id]-->
        <template #slot-inject-progress-key-form-base-slot-nameSlot="">
          <v-progress-linear
            :value="progress"
            :color="color"
            absolute
            height="9"
          />
        </template>
        <!-- INJECT selection -->
        <template #slot-inject-selection-key-form-base-slot-fileSlot="{text}">
          <v-chip small label color="blue">
            {{ text }}
          </v-chip>
        </template>
        <!-- INJECT append -->
        <template #slot-inject-append-key-form-base-slot-colorSlot="{obj}" >
          <h4 class="slot"><v-icon :color="obj.value">palette</v-icon>Inject-Slot</h4>
        </template>
        <!-- INJECT label -->
        <template #slot-inject-label-key-form-base-slot-controls-switch="{obj}">
          <span class="slot-label">Label <b>Slot of Key</b> '{{obj.key}}'</span>
        </template>
        <!-- INJECT label -->
        <template #slot-inject-label-key-form-base-slot-controls-radio="{option}">
           <v-chip small label color="blue">
             Slot-{{option}}
           </v-chip>
        </template>

        <!-- inject 3 SLOTS into key controls-slider -->
        <template #slot-inject-label-key-form-base-slot-controls-slider>
          <strong class="blue--text">Slot</strong>
        </template>         
        <template #slot-inject-prepend-key-form-base-slot-controls-slider>
          <v-icon color="blue">menu</v-icon>
        </template> 

        <!-- TOOLTIP SLOT -->
        <!-- <template #slot-tooltip="{obj}">
          {{ obj.schema.tooltip }} with Value: {{ JSON.stringify(obj.value, replacer, 3) }}
        </template> -->
        <!-- TOOLTIP SLOT of KEY-->
        <!-- <template #slot-tooltip-key-form-base-slot-nameSlot="{obj}">
          <div class="green">
          KEY-TOOLTIP for '{{obj.key}}''
          </div>
        </template> -->

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

const fileObjectToString = (val) => `${val.name} - (File Object)` 
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
        nameSlot: 'Base',
        fileSlot: [],
        colorSlot: '#AA2244',
        emailSlot: 'base@mail.com',
        controls: {
          btnToggleSingle: ['B'],
          slider:33,                    
          radio: 'A',
          switch: true
        }
      }
    }
  },
  computed:{
    progress () {
      let len = this.myModel.nameSlot ? this.myModel.nameSlot.length : 0;
      return Math.min(100, ( len * 10) )
    },
    color () {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
    },
    mySchema() { 
      return {       
        nameSlot: { type: 'text', label: 'Name with Progress Slot', message:true, loading:true, appendIcon: 'more_vert', tooltip:'Name'},
        fileSlot: { type: 'file', label: 'File with Chips', appendIcon: 'more_vert', multiple:true, tooltip: 'File'  },
        colorSlot: { type: 'text', ext:'color', label: 'Color', tooltip:{ label: 'Color', color:this.myModel.colorSlot } },
        emailSlot: { type: 'email', label: 'Email', spacer: true, tooltip: 'Email' },
        controls: {
          btnToggleSingle: { type: 'btn-toggle', options, color:'red', multiple: true, tooltip: 'Multiple Button' },
           // v-slider doesn't work with col:{ cols='auto' }
          slider: { type: 'slider',  color: 'blue',  tooltip: 'Slider', thumbSize:32, thumbLabel:'always' },
          radio: { type: 'radio', label: 'Radio', options, row:true },
          switch: { type:'switch', label:'Switch'}
        }
      }
    }
  },
  methods: {
    log(v){
      log(v)
      if( v.key === 'colorSlot'){
        this.dynamicColor = v.value
      }
    },

    replacer (key, value) {
      if (typeof value === 'function') {
        return 'Function' 
      }
      if (Array.isArray(value) && value[0] instanceof File) {
        // map Fileobject to Filename
        return value.map(i => fileObjectToString(i) )
      }
      if (value instanceof File) {
        return fileObjectToString(value)
      }
      return value
    }
      
  }
}
</script>
