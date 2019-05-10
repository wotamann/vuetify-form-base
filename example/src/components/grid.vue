<style scoped>
  .row {background-color: rgb(227, 241, 223)}
  .column {background-color: rgb(243, 225, 214)}
</style>

<template>
  <v-container fluid >

    <h4>Resize Window to change Layout, Offset and Order of Components</h4>
    <v-form-base :class="layout"  :value= "myValue" :schema= "mySchema" @update= "update"/>

    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'

const options = ['A', 'B']

export default {
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        name: 'Base',
        password: '123456',
        // email: 'base@mail.com',
        controls: {
          // checkbox: true,
          // switch: true,
          // radio: 'A',
          slider: 33
        }
      }
    }
  },
  computed: {
    mySchema () {
      return {
        name: { type: 'text', label: 'Name', flex: { sm: 8 }, order: { xs: 7, sm: 1 } },
        password: { type: 'password', label: 'Password', offset: { xs: 0, sm: 4 }, flex: 3, order: { xs: 6, sm: 2 } },
        // email: { type: 'email', label: 'Email', flex: 4, order: { xs: 5, sm: 3 } },
        controls: {
          // checkbox: { type: 'checkbox', label: 'Checkbox', offset: 0, flex: 2, order: { xs: 4, sm: 4 } },
          // switch: { type: 'switch', label: 'Switch', offset: 0, flex: 2, order: { xs: 3, sm: 5 } },
          // radio: { type: 'radio', label: 'Radio', row: this.row, options, flex: 2, order: { xs: 2, sm: 6 } },
          slider: { type: 'slider', label: 'Slider', color: 'red', flex: 12, order: { xs: 1, sm: 7 } }
        }
      }
    },
    // change Grid-Layout from Row to Column on resize and change Radio-Orientation
    row () {
      return this.$vuetify.breakpoint.mdAndUp
    },
    layout () {
      return this.$vuetify.breakpoint.mdAndUp ? 'row' : 'column'
    }
  },
  methods: {
    update ({ on, id, key, value, obj, event, params, data, schema }) {
      console.log('Update [ on, key, value, params]', on, key, value, params)
    }
  }
}
</script>
