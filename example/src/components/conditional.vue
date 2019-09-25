<template>
  <v-container fluid >

    <h4>Display conditional Controls on Form</h4>

    <v-form-base id="form-base-conditional" :value= "myValue" :schema= "mySchema" @update:form-base-conditional= "update" />

    <v-btn dark  color="blue lighten-3"  @click= "toggle">Click or Type 'Show'</v-btn>
    <v-btn dark  color="blue lighten-3"  @click= "add">Add Item</v-btn>

    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import update from '@/lib'

export default {
  name: 'conditional',
  components: { VFormBase, Infoline },

  data () {
    return {
      cole: 'green',
      hidden: true,

      myValue: {
        conditional: '',
        tasks: [
          { done: false, title: 'Task Nr ' + Math.floor(Math.random() * 1000) },
          { done: false, title: 'Task Nr ' + Math.floor(Math.random() * 1000) },
          { done: false, title: 'Task Nr ' + Math.floor(Math.random() * 1000) }
        ]
      }

    }
  },

  computed: {
    mySchema () {
      return {
        conditional: { type: 'text', placeholder: `Type 'show'`, hint: `Try typing 'show'`, flex: 12 },
        tasks: {
          type: 'array',
          hidden: this.hidden,
          flex: 12,
          schema: {
            done: { type: 'checkbox', label: 'Done', color: 'red', flex: 3 },
            title: { type: 'text', placeholder: '...', flex: 8 }
          }
        }
      }
    }
  },

  methods: {
    add () {
      this.myValue.tasks.unshift({ done: false, title: 'Task Nr ' + Math.floor(Math.random() * 1000) })
    },
    toggle () {
      this.hidden = !this.hidden
    },

    update (val) {
      update(val)

      let { index, key, value } = val

      if (key === 'conditional') this.hidden = value !== 'show'

      if (key === 'done' && value === true) {
        setTimeout(() => this.myValue.tasks.splice(index, 1), 333)
      }
    }
  }
}
</script>
