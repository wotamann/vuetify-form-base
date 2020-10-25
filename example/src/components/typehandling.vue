<template>
  <v-container fluid>
    <h4>Model-Data with special Schema-Key 'type'</h4>
    
      <!-- FORM-BASE-COMPONENT -->    
      <v-form-base 
        :model="myModel"
        :schema="mySchema"
        @input="log"
      />
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
   
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'
   
export default {
  name: 'TypeHandling',
  components: { VFormBase, Infoline },
  data () {
    return {
      myModel: {
        type: 'key-type',          
        base1: {
          type: 'base1'          
        },
        base2: {
          type: 'base2'     
        },
        base3: {
          type: {
            type: {
              type: 'base3'
            }
          }
        },
        base4: {
          type: {
            type: {
              type: 'base4'            
            }
          }
        }        
      },     
      mySchema: {
        type: { type:'text', label:'key type'},
        base1: {
          type: 'text'          
        },
        base2: {
          type: { 
            type: 'text', label:'base2 - type object' 
          }          
        },
        base3: {
          type: {
            type: {
              type: 'text'
            }
          }
        },
        base4: {
          type: {
            type: {
              type: { type: 'text', label:'base4 - type object' }
            }
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
