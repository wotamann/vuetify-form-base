<style>
  .type-wrap  { color: rgb(92, 92, 92);}
</style>

<template>
  <v-container fluid>
    <h4>'wrap' groups a plain model without intrinsic Structure. 'group' takes the model structure for grouping</h4>
    
    <!-- FORM-BASE-COMPONENT -->
    <!-- See for attribute 'row' handling <v-row></v-row> https://vuetifyjs.com/en/components/grids/ -->    
    <v-form-base 
      :model="myModel" 
      :schema="mySchema" 
      :row="{align:'center', justify:'center', noGutters:false}" 
      @input="log"
    >
      <!-- Label Slot for Group1-->
      <template #slot-label-key-group1="{obj}">
        Slot-Label '{{obj.key}}'
      </template>
    </v-form-base>
    
    <!-- Stuff  -->    
    <infoline :value="myModel" :schema="mySchema" :path="$options._componentTag"/>
  </v-container>
</template>

<script>
  import VFormBase from '@/components/vFormBase'
  import Infoline from '@/components/infoline'
  import log from '@/lib'

  export default {
    name: 'Wrapper',
    components: { VFormBase, Infoline },
    data () {
      return {

        myModel: {
          name1:'Taleb', 
          check1:true,        
          name2:'Musk', 
          check2:false, 
        },  
         
        mySchema: {
          group1: { type:'wrap', label:'Group 1', col:6, class:'title pa-2 elevation-4', 
            schema:{
              name1: { type: 'text', label:'Name 1' },    
              check1: { type: 'checkbox', label: 'Checkbox 1', color: 'red' },          
            }
          },
          group2: { type:'wrap', label:'Group 2', col:6, class:'title pa-2 elevation-4', 
            schema:{
              name2: { type: 'text', label:'Name 2' },    
              check2: { type: 'checkbox', label: 'Checkbox 2', color: 'blue'  }
            }
          },
          names: { type:'wrap', label:'Names', col:6, class:'title pa-2 elevation-4 blue lighten-4', 
            schema:{
              name1: { type: 'text', label:'Name 1', col:6 },    
              name2: { type: 'text', label:'Name 2', col:6 },    
            }
          },
          checkboxes: { type:'wrap', label:'Checkboxes', col:6, class:'title pa-2 elevation-4 green lighten-4', 
            schema:{
              check1: { type: 'checkbox', label: 'Checkbox 1', color: 'red', col:6 },          
              check2: { type: 'checkbox', label: 'Checkbox 2', color: 'blue', col:6  }              
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
