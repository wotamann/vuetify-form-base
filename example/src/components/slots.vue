<style>
  /* INFO-SCOPED: Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */
  /* CSS Item --- set all items  */
  #form-base-css .item { padding:0.5rem; border: 1px dotted #838383}

</style>

<template>
  <v-container fluid>
    <h4>Play around with Slots</h4>
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      id="form-base-css"
      :model="myModel"
      :schema="mySchema"
      @change:form-base-css="log"
    >
      <!-- FORM SLOT -->
      <template #form-base-css-top>
        <h4 class="slot">
          Top Slot of 'Form'
        </h4>
      </template>
      <template #form-base-css-bottom>
        <h4 class="slot">
          Bottom Slot of 'Form'
        </h4>  
      </template>
      
      <!-- KEY SLOTS -->
      <template #slot-top-key-nameSlot="{obj}">
        <h4 class="slot">
          Slot at Top of Key 'Name' - {{obj.value}}
        </h4>
      </template>
      <template #slot-item-key-passwordSlot="{obj}">
        <div class="slot caption">
          Slot replaces Key 'Password'<hr/>Object:<br/>{{obj}}
        </div>
      </template>
      <template #slot-bottom-key-emailSlot="{obj}">
        <h4 class="slot">
          Slot at Bottom of Key 'Email' - {{obj.value}}
        </h4>
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
     
      <!-- TOOLTIP SLOT -  New Syntax VUE 2.6.0 -->
      <template #slot-tooltip="{obj}">
         {{ obj.schema.tooltip }} with Value: {{ obj.value }}
      </template>
    </v-form-base>

    <!-- Stuff   -->
    <infoline
      :value="myModel"
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
      myModel: {
        nameSlot: 'Base',
        passwordSlot: '123456',
        emailSlot: 'base@mail.com',
        controlSlot: {
          btnToggleSingle: ['B'],
          btnToggleMulti: 1,                    
          radio: 'A',
        }
      },
      mySchema: {
        nameSlot: { type: 'text', label: 'Name', col: 4, appendIcon: 'more_vert', tooltip: 'Name' },
        passwordSlot: { type: 'password', label: 'Password', col: 4, tooltip: 'Password' },
        emailSlot: { type: 'email', label: 'Email', col: 4, spacer: true, tooltip: 'Email' },
        controlSlot: {
          btnToggleSingle: { type: 'btn-toggle', options, color:'red', multiple: true, tooltip: 'Multiple Button', col: 6 },
          btnToggleMulti: { type: 'btn-toggle', options: optionsObj, color: 'blue', tooltip: 'Button', col: 6 },          
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
