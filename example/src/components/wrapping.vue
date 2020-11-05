<template>
  <v-container fluid>
    <h4>Group Controls independent from Model-Structure with Type 'wrap' </h4>
    
    <v-form class="border-frame">
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
          <span class="blue--text">{{obj.schema.label}} (Slot-Label)</span>
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

  
  const name1 = { type: 'text', label:'Name 1' }
  const check1 = { type: 'checkbox', label: 'Checkbox 1'  }
  const name2 = { type: 'text', label:'Name 2', color: 'red' }
  const check2 = { type: 'checkbox', label: 'Checkbox 2', color: 'red' }
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
              name1,    
              check1          
            }
          },
          group2: { type:'wrap', label:'Group 2', col:6, class:'title pa-2 elevation-4', 
            schema:{
              name2,    
              check2
            }
          },
          names: { type:'wrap', label:'Names', col:6, class:'title pa-2 elevation-4 blue lighten-5', 
            schema:{
              name1,    
              name2,    
            }
          },
          checkboxes: { type:'wrap', label:'Checkboxes', col:6, class:'title pa-2 elevation-4 green lighten-5', 
            schema:{
              check1,          
              check2              
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
