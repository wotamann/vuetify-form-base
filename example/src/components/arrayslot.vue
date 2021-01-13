<style>
  .slotFORM { background-color: #90d47f; padding: 4px;}
  .slotOUT { background-color: #579df8; margin: 0 0 4px 0; padding: 4px;}
  .slotOUTARR { background-color: #a3c8f8; margin: 0 0 4px 8px; padding: 4px;}
  .slotIN { background-color: #f55066; margin: 0 0 4px 0px; padding: 4px;}
  .slotINARR { background-color: #fab0ba; margin: 0 0 4px 8px; padding: 4px;}
  .slotKEY { background-color: #e3dbff; margin: 0 0 4px 16px; padding: 4px;}
</style>
<template>
  <v-container fluid>
    <h4>Showcase for different Slots in nested Arrays</h4>

    <!-- 
      If 'myModel' is an array you can wrap it into an Object like this. 
      :model="{arr: myModelArray}"
    -->
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      :model="myModel"
      :schema="mySchema" 
      @input="log"
      @click="log"
    >

        <template #slot-top-form-base={id}>
          <h4 class="slotFORM">Slot at Top of Form '{{id}}'</h4>
        </template>        
        <template #slot-bottom-form-base={id}>
          <h4 class="slotFORM">Slot at Bottom of Form '{{id}}'</h4>
        </template>
        <!-- SLOT TASKS -->
        <template #slot-top-key-form-base-tasks="{obj}">
          <div class="slotOUT">Slot at Top of Key '{{obj.key}}'</div>
        </template>
        <template #slot-top-array-form-base-tasks="{obj, idx, item}">
          <div class="slotOUTARR">{{idx}} - Slot at Top of each Item in Array '{{obj.key}}'</div>
        </template>
        <template #slot-bottom-array-form-base-tasks="{obj}">
          <div class="slotOUTARR">Slot at Bottom of each Item in Array '{{obj.key}}'</div>
        </template>

        <!-- SLOT TASKS-IN -->
        <template #slot-top-key-form-base-tasks-0-tasksIn="{obj}">
          <div class="slotIN">Slot at Top of Key '{{obj.key}}'</div>
        </template>
        <template #slot-bottom-key-form-base-tasks-0-tasksIn="{obj}">
          <div class="slotIN">Slot at Bottom of Key '{{obj.key}}'</div>
        </template>
        <!-- SLOT ITEM in TASKS ARRAY-->
        <template #slot-top-array-form-base-tasks-0-tasksIn="{obj, idx, item}">
          <div class="slotINARR">{{idx}} - Slot at Top of each Item in Array '{{obj.key}}'</div>
        </template>
        <template #slot-bottom-array-form-base-tasks-0-tasksIn="{obj}">
          <div class="slotINARR">Slot at Bottom of each Item in Array '{{obj.key}}'</div>
        </template>

        <!-- SLOT ITEM IN TASKS-IN ARRAY-->
        <template #slot-top-key-form-base-tasks-0-tasksIn-1-in="{obj}">
          <div class="slotKEY caption">Slot at Top of Key '{{obj.key}}'</div>
        </template>

        <!-- INJECT SLOT IN COMPONENT <template #slot-inject-[verb]-key-[id]-[key]="{obj}"> -->
        <template #slot-inject-label-key-form-base-tasks-0-tasksIn-1-in="{obj, idx, id, index, item}">
          <div class="slotKEY caption">Inject 'Label' at Index {{idx}} into Key '{{obj.key}}'</div>
          <div class="slotKEY caption"> LongIndex {{index}}  ITEM '{{item}}'</div>
          <div class="slotKEY caption"> FORM ID'{{id}}'</div>
        </template>


        <template #slot-bottom-key-form-base-tasks-0-tasksIn-1-in="{obj}">
          <div class="slotKEY caption">Slot at Bottom of Key '{{obj.key}}'</div>
        </template>
    
    </v-form-base>

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
const getInnerTask= () => { return { label:'Label ITEM '+ getRandomInt(), in: getRandomBool(), title: 'Inner Task ' + getRandomInt() } }
const getOuterTask= () => { return { out: getRandomBool(), label: 'Label ' + getRandomInt(), title: 'Outer Task ' + getRandomInt(), tasksIn:[{...getInnerTask()}, {...getInnerTask()} ] } }

export default {
  name: 'arrayslot',
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
                in: { type: 'checkbox', label: 'In', color: 'red', col: 4 },
                title: { type: 'text', color: 'red', col:8 }          
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
