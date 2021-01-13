<style>
  #form-base-container { background-color: #fcadad56;; border: 1px solid #f71a1a56  }
  #form-base-box  { background-color: #1ba3fd4d; border: 1px dotted #78b5eb56; margin:1rem }
  #form-base-inbox  { background-color: #2cec4c34; border: 1px dotted #9dff4156; margin:1rem }
  .form-base-title { width: 100%; color: rgb(248, 247, 244); background-color: #7e7e7e; padding:6px }
</style>

<template>
  <v-container fluid>    
    <h4>Edit Multisource Data Slots with nested Formbase-Components</h4>
    
    <!-- FORM-BASE -->
    <v-form-base
      id="form-base-container"
      :model="myModel"
      :schema="mySchema"
      @input="log"
    >
      <!-- TOP SLOT Container  -->
      <template #slot-top-form-base-container >
        <span class="form-base-title">This is 'form-base-container' with data 'myModel'</span>
      </template>

      <!-- this SLOT replaces key 'slotplaceholder' ) -->
      <template #slot-item-key-form-base-container-slotplaceholder >
        <!-- FORM-BASE -->
        <v-form-base
          id="form-base-box"
          :model="myModelBox"
          :schema="mySchemaBox"
          @input="log"
        >
          <!-- TOP SLOT SlotPlaceholder -->
          <template #slot-top-form-base-box >
            <span class="form-base-title">This is 'form-base-box' with data 'myModelBox'</span>
          </template>

              <!-- this SLOT replaces key 'slotplaceholder' with another <v-form-base> component -->
          <template #slot-item-key-form-base-box-slotplaceholder >
            <!-- FORM-BASE -->
            <v-form-base
              id="form-base-inbox"
              :model="myModelInBox"
              :schema="mySchemaInBox"
              @input="log"
            >
              <!-- TOP SLOT SlotPlaceholder -->
              <template #slot-top-form-base-inbox >
                <span class="form-base-title">This is 'form-base-inbox' with data 'myModelInBox'</span>
              </template>
            </v-form-base>      
          </template>
          <!-- SLOT END 'SlotPlaceholder' -->


        </v-form-base>      
      </template>
      <!-- SLOT END 'SlotPlaceholder' -->

    </v-form-base>
    
    <!-- Stuff  -->    
    <v-layout>
      <v-flex xs12>
        <infoline :model="myModel" :schema="mySchema"/>
      </v-flex>
      <v-flex xs12>
        <infoline :model="myModelBox" :schema="mySchemaBox"/>
      </v-flex>
      <v-flex xs12>
        <infoline :model="myModelInBox" :schema="mySchemaInBox"/>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'

export default {
  components: { VFormBase, Infoline },
  data () {
    return {
      // Models
      myModel: {
        checkbox: true,
        switch:true
      },
      // Data for SLOT form-base-container-slotplaceholder
      myModelBox: {
        slot: [
          { check: true, switch:false},
          { check: false, switch:true},
        ]        
      },
      // Data for SLOT form-base-box-slotplaceholder
      myModelInBox: {
        slot: [
          { check: true, switch:false},
          { check: false, switch:false},
          { check: true, switch:false},
        ]        
      },
      // Schemas      
      mySchema: {
        checkbox: { type: 'checkbox', label: 'Base', color: 'red',class:'px-2' },
        switch: { type: 'switch', label: 'Base', color: 'red' },
        slotplaceholder: '-', // Placeholder for SLOT - string or numeric value but EMPTY OBJECT IS NOT ALLOWED (would try to generate model from that)
      },
      mySchemaBox: {
        slot: { 
          type:'array', 
          schema: {
            check: { type: 'checkbox', label: 'Box', color: 'blue', class:'px-2' },
            switch: { type: 'switch', label: 'Box', color: 'blue' },
          }     
        },
        slotplaceholder: '-', // Placeholder for SLOT - string or numeric value but EMPTY OBJECT IS NOT ALLOWED (would try to generate model from that)
      },
      mySchemaInBox: {
        slot: { 
          type:'array', 
          schema: {
            check: { type: 'checkbox', label: 'InBox', color: 'green', class:'px-2' },
            switch: { type: 'switch', label: 'InBox', color: 'green' }
          }     
        }
      }
    }
  },
  methods: {
    log
  }
}
</script>
