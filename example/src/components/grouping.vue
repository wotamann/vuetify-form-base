<template>
  <v-container fluid>
    <h4>Use Type 'group' for wrapping content into Groups and control Display with 'row' Attribute</h4>
    <p>With 'group' model structure is used for grouping. For grouping without model structure use 'wrap' </p>
    <v-form class="border-frame">
      <!-- FORM-BASE-COMPONENT -->    
      <!-- See for attribute 'row' handling <v-row></v-row> https://vuetifyjs.com/en/components/grids/ -->
      <v-form-base 
        id="group"  
        :model="myModel" 
        :schema="mySchema" 
        :col=4
        :row="{align:'center', justify:'center', noGutters:false}" 
        @input="log"       
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

  export default {
    name: 'Groups',
    components: { VFormBase, Infoline },
    data () {
      return {
         myModel: {
          group1:{ 
            name1:'Taleb', 
            check1:true
          },        
          group2:{ 
            name2:'Musk', 
            check2:false
          } 
        },  
        mySchema: {
          group1: { type:'group', label:'Group 1', col:6, class:'title pa-2 rounded elevation-4', 
            schema:{
              name1: { type: 'text', label:'Name 1' },    
              check1: { type: 'checkbox', label: 'Checkbox 1', color: 'red' },          
            }
          },
          group2: { type:'group', label:'Group 2', col:6, class:'title pa-2 rounded elevation-4', 
            schema:{
              name2: { type: 'text', label:'Name 2' },    
              check2: { type: 'checkbox', label: 'Checkbox 2', color: 'blue'  }
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
