<template>
  <v-container fluid >

    <h4>Resize Window to change Layout, Offset and Order of Components</h4>
    <v-form-base :class="layout"  :value= "myValue" :schema= "mySchema" @update= "update"/>

    <h4>See your reactive  Data in 'myValue' </h4>
    <p>{{myValue}}</p>

    <h4>See your Definition in 'mySchema' </h4>
    <p>{{mySchema}}</p>

    <h4>See logged 'update' events at console </h4>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'

const options = ['A', 'B']

export default {
  components: { VFormBase },
  data () {
    return {
      row: true,
      myValue: {
        name: 'Base',
        password: '123456',
        email: 'base@mail.com',
        controls: {
          checkbox: true,
          switch: true,
          radio: 'A',
          slider: 33
        }
      }
    }
  },
  computed: {
    mySchema () {
      return {
        name: { type: 'text', label: 'Name', flex: { sm: 4 }, order: { xs: 7, sm: 1 } },
        password: { type: 'password', label: 'Password', offset: { xs: 0, sm: 1 }, flex: 3, order: { xs: 6, sm: 2 } },
        email: { type: 'email', label: 'Email', flex: 4, order: { xs: 5, sm: 3 } },
        controls: {
          checkbox: { type: 'checkbox', label: 'Checkbox', offset: 0, flex: 3, order: { xs: 4, sm: 4 } },
          switch: { type: 'switch', label: 'Switch', offset: 0, flex: 3, order: { xs: 3, sm: 5 } },
          radio: { type: 'radio', label: 'Radio', row: this.row, options, flex: 3, order: { xs: 2, sm: 6 } },
          slider: { type: 'slider', label: 'Slider', spacer: true, flex: 3, order: { xs: 1, sm: 7 } }
        }
      }
    },

    layout () {
      // change Grid-Layout from Row to Column on resize and change Radio-Orientation
      this.row = this.$vuetify.breakpoint.mdAndUp
      return this.row ? 'row' : 'column'
    }
  },
  methods: {
    update ({ on, id, key, value, obj, event, params, data, schema }) {
      console.log('Update [ on, key, value, params]', on, key, value, params)
    }
  }
}
</script>
