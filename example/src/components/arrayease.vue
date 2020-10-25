<template>
  <v-container fluid>
    <h4>Edit Data in nested Array by using one Schema for all Items. Scroll for Intersections in Log</h4>

    <!-- 
      If your model/value is an array you can wrap it into an Object like this. But this doesn't work with primitive datatypes 
      :model="{t: myValue.tasks}"
      :schema="{t: mySchema.tasks}"
    -->
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      id="array-ease"
      :model="myValue"
      :schema="mySchema" 
      @change:array-ease="log"
      @intersect:array-ease="intersect"
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
const getInnerTask= () => { return { in: getRandomBool(), title: 'Inner Task ' + Math.floor(Math.random() * 1000) } }
const getOuterTask= () => { return { out: getRandomBool(), title: 'Outer Task ' + Math.floor(Math.random() * 1000), tasks:[{...getInnerTask()}, {...getInnerTask()} ] } }

export default {
  name: 'arrayease',
  components: { VFormBase, Infoline },
  data () {
    return {      
      myValue: {
        tasks:[
          getOuterTask(),
          getOuterTask(),
          getOuterTask(),
        ]        
      },
      mySchema: {
        tasks: {
          type: 'array',
          flex: 8,
          schema: {
            out: { type: 'checkbox', label: 'Out', color: 'blue', flex: 2 },
            title: { type: 'text', color: 'blue', flex:6 },
            tasks: {
              type: 'array',
              flex: 12,
              schema: {
                in: { type: 'checkbox', label: 'In', color: 'red', flex: 2, offset:2 },
                title: { type: 'text', color: 'red', flex:4 }          
              }
            }          
          }
        }
      }
    }
  },  
  methods: {
    
    log,

    // log intersection
    intersect ({ id, key, value, index, params }) {  
      if (key === 'title') {
        console.log( `INTERSECTION: '${value}' ${params.isIntersecting ?  ' entry intersection':  ' leave intersection'} `);
      }      
    }
  }

}
</script>
