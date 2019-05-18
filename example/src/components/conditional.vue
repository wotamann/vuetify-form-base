<style>
  /* scoped doesn't work in nested components */
 #form-base-complete .key-subgroups-tasks { border: 1px solid #4b8ad6; background-color: #e2eaf5; padding: 1rem}
</style>

<template>
  <v-container fluid >

    <h4>Conditional Display</h4>

    <v-form-base id="form-base-complete" :value= "myValue" :schema= "mySchema" @update:form-base-complete= "update" />

    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import { cloneDeep } from 'lodash'
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'

const items = ['Tesla', 'Jobs', 'Taleb', 'Harari']
const task = { done: true, title: 'New...' }

export default {
  components: { VFormBase, Infoline },

  data () {
    return {
      hidden: true,
      color: 'blue lighten-4',
      myValue: {
        button: null,
        add: null,
        conditional: '',
        tasks: [
          { done: true, title: 'shopping' },
          { done: true, title: 'coding' },
          { done: true, title: 'walking' }
        ]
      }
    }
  },

  computed: {
    mySchema () {
      return {
        button: { type: 'button', block: true, label: `Click or Type 'Show'`, dark: true, color: 'blue', iconLeft: 'edit', iconRight: 'toggle' },
        add: { type: 'button', block: true, label: `Add ToDo`, dark: true, color: 'blue', iconRight: 'add' },
        conditional: { type: 'text', label: 'Conditional on Value ', hint: `try typing 'show'`, backgroundColor: this.color, flex: 12 },
        tasks: {
          type: 'array',
          hidden: this.hidden,
          flex: { xs: 12, sm: 6 }, 

          // OPTION A: Schema as Object: Is Template for all Items in Array (Schema-Objects are NOT independent )  
          // schema: { 
          //   done: { type: 'checkbox', label: 'Ok', disabled: false, color:'green', flex: 3 },
          //   title: { type: 'text', placeholder: 'to do...', disabled: false, flex: 8 }
          // },

          // OPTION B: Schema as Array: define independent Schema for each Item
          template: { 
            done: { type: 'checkbox', label: 'Ok', disabled: false, color:'brown', flex: 3 },
            title: { type: 'text', placeholder: 'to do...', disabled: false, flex: 8 }
          },
          schema: [
            { 
              done: { type: 'checkbox', label: 'Ok', disabled: false, color:'green', flex: 3 },
              title: { type: 'text', placeholder: 'to do...', disabled: false, flex: 8 }
            },{ 
              done: { type: 'checkbox', label: 'No', disabled: false, color:'red', flex: 3 },
              title: { type: 'text', placeholder: 'to do...', disabled: false, flex: 8 }
            },{ 
              done: { type: 'checkbox', label: 'Ok', disabled: false, color:'blue', flex: 3 },
              title: { type: 'text', placeholder: 'to do...', disabled: false, flex: 8 }
            }
          ]

        }
      }
    }
  },

  methods: {
    update (updated) {
      let { on, id, index, parentId, key, value, obj, event, params, data, schema, parent } = updated
      
      this.log(updated)

      if (key === 'button') this.toggle()

      if (key === 'conditional') this.hidden = value !== 'show'

      if (key === 'add') {
        // MODIFY Value & Schema Array
        this.myValue.tasks.unshift({...task})
        let insert = cloneDeep(this.mySchema.tasks.template)
        this.mySchema.tasks.schema.unshift(insert)
      }

      if (key === 'done' && value === true) {             
        // MODIFY Value & Schema Array
        this.myValue.tasks.splice(index, 1)
        this.mySchema.tasks.schema.splice(index, 1)
      }
    },

    toggle () {
      this.hidden = !this.hidden
    },

    log ({ on, id, index, parentId, key, value, obj, event, params, data, schema, parent } = {}) {
      console.log( 'UPDATED: On', on, ' ID:', id, ' Obj:', obj, ' Key|Value|Params|Index:', key, value, params, index, ' Data|Schema:', data, schema, ' Parent:', parent)
    }
  }
}
</script>
