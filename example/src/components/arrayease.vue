<template>
  <v-container fluid>
    <h4>Edit Data in nested Array by using one Schema for all Items</h4>

    <!-- 
      If your model/value is an array you can wrap it into an Object like this. But this doesn't work with primitive datatypes 
      :model="{t: myModel.tasks}"
      :schema="{t: mySchema.tasks}"
    -->
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      :model="myModel"
      :schema="mySchema" 
      @input="log"
      @click="log"
    />
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
    
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'

const getRandomBool = () => Math.random() >= 0.5
const getRandomInt = () => Math.floor(Math.random() * 1000)
const getInnerTask= () => { return { in: getRandomBool(), title: 'Inner Task ' + getRandomInt() } }
const getOuterTask= () => { return { out: getRandomBool(), title: 'Outer Task ' + getRandomInt(), tasksIn:[{...getInnerTask()}, {...getInnerTask()} ] } }

export default {
  name: 'arrayease',
  components: { VFormBase, Infoline },
  data () {
    return {      
      myModel: {
        tasks:[
          getOuterTask(),
          getOuterTask(),
        ]        
      },
      mySchema: {
        tasks: {
          type: 'array',
          col:12,
          schema: {
            out: { type: 'checkbox', label: 'Out', color: 'blue', col: 2 },
            title: { type: 'text', color: 'blue', col:4 },
            tasksIn: {
              type: 'array',
              col: 6,
              schema: {
                in: { type: 'checkbox', label: 'In', color: 'red', col: 2  },
                title: { type: 'text', color: 'red', col:4 }          
              }
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
