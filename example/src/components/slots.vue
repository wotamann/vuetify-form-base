<style>
  /* INFO-SCOPED: Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */
  /* CSS Item --- set all items  */
  #form-base .item { padding:0.5rem; border: 1px dotted #e7c320}
  #form-base .slot { width: 100%; padding:2px;font-size: 0.9rem;font-weight: 400; color:#9e7506; background-color: #fffacd; border: 1px dotted #e7c320}
  #form-base .slot-label { color:#064d9e; }
</style>

<template>
  <v-container fluid>
    <h4>Slots for Form, Keys, Items, Types and Tooltips</h4>
    
    <v-form class="border-frame" @submit.prevent>
     
      <!-- FORM-BASE-COMPONENT -->
      <v-form-base
        id="form-base"
        :model="myModel"
        :schema="mySchema"
        :col=6
        @change="log"
      >
      <!-- FORM SLOTS -->
        <template #form-base-top>
          <h4 class="slot">
            Top Slot of 'Form'
          </h4>
        </template>
        <template #form-base-bottom>
          <h4 class="slot">
            Bottom Slot of 'Form'
          </h4>  
        </template>
        
      <!-- KEY SLOTS -->
        <!-- TOP of KEY -->
        <template #slot-top-key-form-base-nameSlot="{obj}">
          <h4 class="slot">
            Slot at Top of Key '{{obj.key}}'
          </h4>
        </template>
        <!-- ITEM of KEY -->
        <template #slot-item-key-form-base-emailSlot="{obj, id, index}">
          <h4 class="slot">
            Slot replaces Item with Key '{{obj.key}}'
            <div>Formbase: {{id}}</div>
            <div>Index: {{index}}</div>
            <div>Obj:{{obj}}</div>
          </h4>
        </template>
        <!-- BOTTOM of KEY -->
        <template #slot-bottom-key-form-base-colorSlot="{obj}">
          <h4 class="slot">
            Slot replaces Bottom with Key '{{obj.key}}'
          </h4>
        </template>      
        
      <!-- TYPE SLOTS -->
        <template #slot-top-type-form-base-btn-toggle="{obj}">
          <h4 class="slot">
            Slot at Top of Type 'Btn-Toggle' - {{obj.value}}
          </h4>
        </template>
        <template #slot-bottom-type-form-base-btn-toggle="{obj}">
          <h4 class="slot">
            Slot at Bottom of Type 'Btn' - {{obj.value}}
          </h4>
        </template>
        
      <!-- INJECT SLOTS INTO KEY  -->  
        <!-- INJECT progress into key [component_id]-->
        <template #slot-inject-progress-key-form-base-nameSlot="">
          <v-progress-linear
            :value="progress"
            :color="color"
            absolute
            height="9"
          />
        </template>
        <!-- INJECT selection -->
        <template #slot-inject-selection-key-form-base-fileSlot="{text}">
          <v-chip small label color="blue">
            {{ text }}
          </v-chip>
        </template>
        <!-- INJECT append -->
        <template #slot-inject-append-key-form-base-colorSlot="{obj}" >
          <h4 class="slot"><v-icon :color="obj.value">palette</v-icon>Key-Slot</h4>
        </template>
        <!-- INJECT label -->
        <template #slot-inject-label-key-form-base-controls-switch="{obj}">
          <span class="slot-label">Label <b>Slot of Key</b> '{{obj.key}}'</span>
        </template>
        <!-- INJECT label -->
        <template #slot-inject-label-key-form-base-controls-radio="{option}">
           <v-chip small label color="blue">
             Slot-{{option}}
           </v-chip>
        </template>

        <!-- inject 3 SLOTS into key controls-slider -->
        <template #slot-inject-label-key-form-base-controls-slider>
          <strong class="blue--text">Slot</strong>
        </template> 
        <template #slot-inject-thumb-label-key-form-base-controls-slider= "{ value }">
            {{ satisfactionEmojis[Math.min(Math.floor(value / 10), 9)] }}
        </template>
        <template #slot-inject-prepend-key-form-base-controls-slider>
          <v-icon color="blue">menu</v-icon>
        </template> 

        <!-- TOOLTIP SLOT -->
        <template #slot-tooltip="{obj}">
          {{ obj.schema.tooltip }} with Value: {{ obj.value }}
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
      satisfactionEmojis: ['😭', '😢', '☹️', '🙁', '😐', '🙂', '😊', '😁', '😄', '😍'],
           
      myModel: {
        nameSlot: 'Base',
        fileSlot: null,
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
        nameSlot: { type: 'text', label: 'Name with Progress Slot', message:true, loading:true, appendIcon: 'more_vert', tooltip: 'Name' },
        fileSlot: { type: 'file', label: 'Name with Progress Slot', appendIcon: 'more_vert', tooltip: 'Name'  },
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
        console.warn('Colours changed!', v.value)
      }
    }
  }
}
</script>
