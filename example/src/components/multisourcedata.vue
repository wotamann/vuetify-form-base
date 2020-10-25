<style>
  #form-base-container { background-color: #fdcfcf56;; border: 1px solid #f71a1a56  }
  #form-base-box  { background-color: #d5e8f856; border: 1px dotted #78b5eb56; margin:1rem }
  .form-base-title { width: 100%; color: rgb(248, 247, 244); background-color: rgb(236, 122, 122); padding:6px }
</style>

<template>
  <v-container fluid>    
    <h4>Edit Multisource Data in one Form binding other Formbase as Slot</h4>
    
    <!-- BASE -->
    <v-form-base
      id="form-base-container"
      :model="myModel"
      :schema="mySchema"
      @input:form-base-container="change"
    >
      <!-- TOP SLOT Container  -->
      <template #form-base-container-top >
        <span class="form-base-title">This is 'form-base-container' with data 'myModel'</span>
      </template>

      <!-- this SLOT replaces key 'SlotPlaceholder' ) -->
      <template #slot-item-key-SlotPlaceholder >
        <v-form-base
          id="form-base-box"
          :model="myModelSlot"
          :schema="mySchemaSlot"
          @input:form-base-box="changepartial"
        >
          <!-- TOP SLOT SlotPlaceholder -->
          <template #form-base-box-top >
            <span class="form-base-title">This is 'Form-base-box' with data 'myModelSlot'</span>
          </template>
        </v-form-base>      
      </template>
      <!-- SLOT END 'SlotPlaceholder' -->

    </v-form-base>
    
    <!-- Stuff  -->    
    <v-layout>
      <v-flex xs6>
        <infoline :model="myModel" :schema="mySchema"/>
      </v-flex>
      <v-flex xs6>
        <infoline :model="myModelSlot" :schema="mySchemaSlot"/>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import change from '@/lib'

export default {
  components: { VFormBase, Infoline },
  data () {
    return {
      // CONTAINER
      myModel: {
        checkbox: true,
        switch:true
      },
      mySchema: {
        checkbox: { type: 'checkbox', label: 'Base', color: 'red' },
        SlotPlaceholder: 'placeholder', // take any string or numeric value but EMPTY OBJECT IS NOT ALLOWED (would try to generate model from that)
        switch: { type: 'switch', label: 'Base', color: 'red' },
      },

      // SLOT 
      myModelSlot: {
        slot: [
          { check: false, switch:true},
          { check: true, switch:false},
        ]        
      },
      mySchemaSlot: {
          slot: { 
            type:'array', 
            schema: {
              check: { type: 'checkbox', label: 'Slot', color: 'blue' },
              switch: { type: 'switch', label: 'Slot', color: 'blue' },
            }          
        }
      }
    }
  },
  methods: {

    change,

    changepartial: change

  }
}
</script>
