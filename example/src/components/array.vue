<style>
  /* INFO-SCOPED: Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */
  .array-tasks { border: 1px solid #dddddd; padding:8px; margin-bottom: 8px; background-color: #98ccfd; box-shadow: 3px 3px #e9e9e9; }  
  .key-task { background-color: #c6e4ff; padding:8px; }  
</style>

<template>
  <v-container fluid>
    <h4>Add, Edit and Drag to Remove Items in dynamic nested Value-Array</h4>

    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      id="array"
      :model="myValue"
      :schema="mySchema"
      @change:array="log"
      @drop:array="log"
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
  name: 'Array',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        tasks: [
          {
            nr: 1,
            title: 'Item 1',
            task: [
              this.getTask(),
            ]
          },
          {
            nr: 2,
            title: 'Item 2',
            task: [
              this.getTask(),
              this.getTask(),
            ]
          }
        ]
      },
      mySchema: {
        tasks: {
          type: 'array',
          flex: 12,
          schema: {
            // Add Task Button in Schema only 
            add: { type: 'btn', iconLeft: 'add', label:'Task', dark: true, color: 'blue lighten-2' },
            delete: { type: 'btn', iconRight: 'remove', label:'Drop', dark: true, color: 'blue lighten-2', class:'mx-1', drop:true, tooltip:'Drop Task to remove' },
            nr: {
              type: 'text',
              disabled: true,
              color: 'blue',     
              offset:1         
            },
            title: {
              type: 'text',
              color: 'blue',
            },
            task: {
              type: 'array',
              offset:3,
              flex:9,              
              schema: {
                done: { type: 'checkbox', label: 'Done', color: 'red', offset: 1, flex: 2 },
                  title: { type: 'text', color: 'red', label:'Drag Title', drag:true },
              }
            }
          }
        },
        // Add Item Button in Schema only 
        add: { type: 'btn', iconCenter: 'add', label:'Item', dark: true, class:'mb-2', color: 'blue lighten-2' }        
      }
    }
  },
  methods: {  
    getTask(){ return { done: false, title: 'Task ' + Math.floor(Math.random() * 1000) } },
    addTask(index){ this.myValue.tasks[index[0]].task.push(this.getTask()) },
    removeTask(index){ this.myValue.tasks[index[0]].task.splice(index[1], 1) },

    addItem () {
      this.myValue.tasks.push({
        nr: this.myValue.tasks.length + 1,
        title: 'Item ' + (this.myValue.tasks.length + 1),
        task: [ this.getTask() ]
      })
    },
    
    log (val){
      let { on, id, index, key, value, obj } = log(val)
      // add item
      if (key === 'add' && id === 'array') {
        this.$nextTick( this.addItem() )
      }
      // add task
      if (key === 'add' && id.includes('array-tasks-') ) {
        setTimeout( () => this.addTask(index), 250)
      }
      // remove task with checkbox
      if (key === 'done' && value === true) {
        setTimeout(() => this.removeTask(index), 100)
      }
      // remove task with drop
      if (key === 'delete' && obj.dragEvent) {
        setTimeout(() => this.removeTask(obj.dragEvent.index), 100)
      }
    }
  }
}
</script>
