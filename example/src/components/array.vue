<template>
  <v-container fluid >

    <h4>Edit Item(s) in Data-Array</h4>

    <v-form-base id="form-base-array" :value= "myValue" :schema= "mySchema" @update:form-base-array= "update" />
    <v-btn dark color="blue lighten-3"  @click= "add">ADD</v-btn>

    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import update from '@/lib'

export default {
  name: 'array',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        tasks: [
          { done: false, title: 'Task Nr ' + Math.floor(Math.random() * 1000) },
          { done: false, title: 'Task Nr ' + Math.floor(Math.random() * 1000) },
          { done: false, title: 'Task Nr ' + Math.floor(Math.random() * 1000) }
        ]
      },
      mySchema: {
        tasks: {
          type: 'array',
          flex: 12,
          schema: { done: { type: 'checkbox', label: 'Done', color: 'red', flex: 4 }, title: { type: 'text' }, flex: 8 }
        }
      }
    }
  },
  methods: {

    add () {
      this.myValue.tasks.unshift({ done: false, title: 'Task Nr ' + Math.floor(Math.random() * 1000) })
    },

    update (val) {
      let { index, key, value } = update(val)

      if (key === 'done' && value === true) {
        setTimeout(() => this.myValue.tasks.splice(index, 1), 333)
      }
    }
  }
}
</script>
