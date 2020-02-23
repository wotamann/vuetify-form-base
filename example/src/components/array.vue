<style>
  /* INFO-SCOPED: Don't use '<style scoped>' because scoped CSS is inside a child-component not accessable */
  .array-tasks { border: 1px solid #dddddd; padding:8px; margin-bottom: 8px; background-color: #e6f0ff; box-shadow: 3px 3px #e9e9e9; }  
  .key-task { background-color: #f4f8ff; padding:8px; }  
</style>

<template>
  <v-container fluid>
    <h4>Add, Remove and Edit Items in nested Value-Array. </h4>

    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      id="array"
      :value="myValue"
      :schema="mySchema"
      @change:array="log"
    />

    <infoline
      :value="myValue"
      :schema="mySchema"
      :path="$options._componentTag"
    />

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import update from '@/lib'

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
            add: { type: 'btn', 'small': true, iconCenter: 'add', label:'Task', dark: true, color: 'red', flex: 2 },
            nr: {
              type: 'text',
              disabled: true,
              color: 'blue',
              flex: 1
            },
            title: {
              type: 'text',
              color: 'blue',
              flex: 9
            },
            task: {
              type: 'array',
              schema: {
                done: {
                  type: 'checkbox', label: 'Done', color: 'red', offset: 1, flex: 2 },
                  title: { type: 'text', color: 'red' },
              }
            }
          }
        },
        // Add Item Button in Schema only 
        add: { type: 'btn', 'small': true, iconCenter: 'add', label:'Item', dark: true, color: 'blue', flex: 1 }        
      }
    }
  },
  methods: {

    getTask(){ return { done: false, title: 'Task ' + Math.floor(Math.random() * 1000) } },

    addItem () {
      this.myValue.tasks.push({
        nr: this.myValue.tasks.length + 1,
        title: 'Item ' + (this.myValue.tasks.length + 1),
        task: [ this.getTask() ]
      })
    },
    addTask(index){
      this.myValue.tasks[index[0]].task.push(this.getTask())
    },
    removeTask(index){
      this.myValue.tasks[index[0]].task.splice(index[1], 1) 
    },
    log (val) {
      let { on, id, index, key, value } = update(val)
      // add item
      if (key === 'add' && id === 'array') {
        this.$nextTick( this.addItem() )
      }
      // add task
      if (key === 'add' && id.includes('array-tasks-') ) {
        setTimeout( () => this.addTask(index), 250)
      }
      // remove task
      if (key === 'done' && value === true) {
        setTimeout(() => this.removeTask(index), 250)
      }
    }
  }
}
</script>
