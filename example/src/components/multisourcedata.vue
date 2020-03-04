<style>
  #form-base-container { background-color: #fdcfcf56;; border: 1px solid #f71a1a56  }
  #form-base-slot  { background-color: #cee4f756; border: 1px dotted #78b5eb56; margin:1rem }
  .form-base-title { width: 100%; color: rgb(248, 247, 244); background-color: rgb(236, 122, 122); padding:6px }
</style>

<template>
  <v-container fluid>    
    <h4>Edit Multisource Data in one Form binding other Formbase as Slot</h4>
    
    <!-- BASE -->
    <v-form-base
      id="form-base-container"
      :value="myValue"
      :schema="mySchema"
      @input:form-base-container="change"
    >
      <!-- TOP SLOT  -->
      <div slot="form-base-container-top" class="form-base-title">This is 'form-base-container' with data 'myValue'</div>

      <!-- SLOT (replaces key 'Slotted')  -->
      <v-form-base
        id="form-base-slot"
        slot="slot-item-key-Slotted"
        :value="myValueSlot"
        :schema="mySchemaSlot"
        @input:form-base-slot="changepartial"
      >
        <!-- TOP SLOT  -->
        <div slot="form-base-slot-top" class="form-base-title">This is 'Form-base-slot' with data 'myValueSlot'</div> 
      </v-form-base>
      <!-- END SLOT -->

    </v-form-base>
    
    <!-- Stuff  -->
    <h4 >
      See Console for Events and <a
        target="_blank"
        :href="`${url}${$options._componentTag}.vue`"
      >inspect the Code at '{{$options._componentTag}}.vue' in Directory Example</a>
    </h4>
    <v-layout>
      <v-flex xs6>
        <infoline
          :value="myValue"
          :schema="mySchema"

        />
      </v-flex>
      <v-flex xs6>
        <infoline
          :value="myValueSlot"
          :schema="mySchemaSlot"
        />
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import change from '@/lib'

const url = 'https://github.com/wotamann/vuetify-form-base/blob/master/example/src/components/'

export default {
  components: { VFormBase, Infoline },
  data () {
    return {
      url,

      // BASE
      myValue: {
        checkbox: true,
        switch:true
      },
      mySchema: {
        checkbox: { type: 'checkbox', label: 'Base', color: 'red' },
        Slotted: {}, // empty object as placeholder
        switch: { type: 'switch', label: 'Base', color: 'red' },
      },

      // SLOT 
      myValueSlot: {
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
