<style>
  .key-listing .active  { background-color: rgb(194, 194, 194)}
  .key-listing .active *  { color: rgb(248, 248, 247)}
</style>

<template>
  <v-container fluid >

    <h4>Display Arrays - Leftside: Schema from Template Object  - Rightside: Schema based on Array</h4>
    <v-form-base id="array-demo" :value= "myValue" :schema= "mySchema" @update:array-demo= "update" />

    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'

export default {
  name: 'arrays',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        tasksA: [
          {
            done: true,
            title: 'make refactoring'
          },
          {
            done: true,
            title: 'write documentation'
          },
          {
            done: true,
            title: 'remove logs'
          }
        ],
        tasksB: [
          {
            done: true,
            title: 'make refactoring'
          },
          {
            done: true,
            title: 'write documentation'
          },
          {
            done: true,
            title: 'remove logs'
          }
        ]
      },
      mySchema: {
        tasksA: {
          type: 'array',
          flex: 5,
          // Template Object
          schema: { done: { type: 'checkbox', label: 'Ok', flex: 3 }, title: { type: 'text' }, flex: 8 }
        },
        tasksB: {
          type: 'array',
          flex: 5,
          offset: 1,
          // Array with Schema-Objects
          schema: [
            { done: { type: 'checkbox', label: 'Ok 1', color: 'brown', flex: 3 }, title: { type: 'text' }, flex: 8 },
            { done: { type: 'checkbox', label: 'Ok 2', color: 'green', flex: 3 }, title: { type: 'text' }, flex: 8 },
            { done: { type: 'checkbox', label: 'Ok 3', color: 'blue', flex: 3 }, title: { type: 'text' }, flex: 8 }
          ]
        }
      }
    }
  },
  methods: {
    update ({ on, parentId, id, index, key, value, obj, event, params, data, schema }) {
      console.log('UPDATED: On', on, ' ID:', id, ' Obj:', obj, ' Key|Value|Params|Index:', key, value, params, index, ' Data|Schema:', data, schema, ' Parent:', parent)

      if (key === 'done') {
        data.title = Math.random()
        schema.title.disabled = !value
        schema.done.label = index + ' Done'
        schema.done.color = value ? 'green' : 'red'
      }
    }
  }
}
</script>
