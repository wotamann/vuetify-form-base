<template>
  <v-container fluid>
    <h4>Group Controls independent from Model-Structure with Type 'wrap' </h4>
    <p>Use 'group' if grouping is based on  model structure</p>
    
    <v-form class="border-frame">
      <!-- FORM-BASE-COMPONENT -->
      <!-- See for attribute 'row' handling <v-row></v-row> https://vuetifyjs.com/en/components/grids/ -->    
      <v-form-base 
        :model="myModel" 
        :schema="mySchema" 
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
          group1: { type:'wrap', color:'red lighten-4', elevation:0, col:6, class:'title pa-2 elevation-4', ripple:false, 
            schema:{
              name1,    
              check1,
              group2: { type:'wrap', color:'blue  lighten-4', title:'Nested Group', subtitle:'Names', ripple:false, tile:true, label:'Group 2',elevation:8, col:12, class:'title pa-2', 
                schema:{
                  name1,    
                  name2          
                }
              },          
            }
          },
          group2: { type:'wrap', col:6, class:'title pa-2 elevation-4', 
            schema:{
              name2,    
              check2
            }
          },
          names: { type:'wrap', label:'Names', col:6, class:'title pa-2  blue lighten-5', 
            schema:{
              name1,    
              name2,    
            }
          },
          checkboxes: { type:'wrap', label:'Checkboxes', col:6, class:'title pa-2 green lighten-5', 
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
