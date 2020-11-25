<style>
  /* INFO-SCOPED: Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */
  /* CSS Item --- set all items  */
  #form-base-slot .item { padding:0.5rem; border: 1px dotted #e7c320}
  #form-base-slot .slot { width: 100%; padding:2px;font-size: 0.9rem;font-weight: 400; color:#aa8d09; background-color: #fffacd; border: 1px dotted #e7c320}
  #form-base-slot .slot-label { color:#1976d2; }
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
        @change:form-base-slot="log"
      >
      <!-- FORM SLOTS -->
        <template #form-base-slot-top>
          <h4 class="slot">
            Top Slot of 'Form'
          </h4>
        </template>
        <template #form-base-slot-bottom>
          <h4 class="slot">
            Bottom Slot of 'Form'
          </h4>  
        </template>
        
      <!-- KEY SLOTS -->
        <!-- TOP of KEY -->
        <template #slot-top-key-nameSlot="{obj}">
          <h4 class="slot">
            Slot at Top of Key - {{obj.key}}
          </h4>
        </template>
        <!-- ITEM of KEY -->
        <template #slot-item-key-emailSlot="{obj}">
          <h4 class="slot">
            Slot replaces Item with Key - {{obj.key}}
          </h4>
        </template>
        <!-- BOTTOM of KEY -->
        <template #slot-bottom-key-colorSlot="{obj}">
          <h4 class="slot">
            Slot replaces Bottom with Key - {{obj.key}}
          </h4>
        </template>      
        <!-- SLOT of KEY  prepend|append|message ->schema: { color:{ type: 'color', slot:'prepend' }  see https://vuetifyjs.com/en/api/v-input/#slots    -->      
        <template #slot-key-colorSlot="{obj}" >
          <h4 class="slot"><v-icon :color="obj.value">palette</v-icon>Key-Slot</h4>
        </template>
        
      <!-- TYPE SLOTS -->
        <template #slot-top-type-btn-toggle="{obj}">
          <h4 class="slot">
            Slot at Top of Type 'Btn-Toggle' - {{obj.value}}
          </h4>
        </template>
        <template #slot-bottom-type-btn="{obj}">
          <h4 class="slot">
            Slot at Bottom of Type 'Btn' - {{obj.value}}
          </h4>
        </template>
        <template #slot-top-type-radio="{obj}">
          <h4 class="slot">
            Slot at Top of Type 'Radio' - {{obj.value}}
          </h4>
        </template>

      <!-- 
        USE AVAILABEL VUETIFY SLOT of KEY  
        schema:{ switch: { type:'switch', slot:'label'}  use Vuetify Label-Slot 
        schema:{ text: { type:'text', slot:'progress'}  use Vuetify Label-Slot  https://vuetifyjs.com/en/components/text-fields/#slots
      -->
        <template #slot-key-controls-switch="{obj}">
          <span class="slot-label">Label <b>Slot of Key</b> - {{obj.key}}</span>
        </template>
        <template #slot-key-nameSlot="{obj}">
          <v-progress-linear
            :value="progress"
            :color="color"
            absolute
            height="7"
          />
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
      ddd:'#aad',  
      myModel: {
        nameSlot: 'Base',
        colorSlot: '#A22',
        emailSlot: 'base@mail.com',
        controls: {
          btnToggleSingle: ['B'],
          btnToggleMulti: 1,                    
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
        nameSlot: { type: 'text', label: 'Name with Progress Slot', col: 4, message:true, loading:true, slot:'progress', appendIcon: 'more_vert', tooltip: 'Name' },
        colorSlot: { type: 'text', ext:'color', label: 'Color', slot:'append', col: 4, tooltip:{ label: 'Color', color:this.myModel.colorSlot } },
        emailSlot: { type: 'email', label: 'Email', col: 4, spacer: true, tooltip: 'Email' },
        controls: {
          btnToggleSingle: { type: 'btn-toggle', options, color:'red', multiple: true, tooltip: 'Multiple Button', col: 6 },
          btnToggleMulti: { type: 'btn-toggle', options: optionsObj, color: 'blue', tooltip: 'Button', col: 6 },          
          radio: { type: 'radio', label: 'Radio', options, row:true,  col: 6 },
          switch: { type:'switch', label:'Switch',slot:'label', col:6}
        }
      }
    }
  },
  methods: {
    log(v){
      log(v)
      if( v.key === 'colorSlot'){
        this.dynamicColor = v.value
        console.warn('The list of colours has changed!', v.value)

      }
    }
  }
}
</script>
