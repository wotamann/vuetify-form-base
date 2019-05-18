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

export default {
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        name: 'Grid',
        radio: 'A'
      }
    }
  },
  computed: {
    // Schema is Computed
    mySchema () {
      return {
        name: { type: 'text', label: 'Name', flex: { xs: 8, sm: 6 }, order: { xs: 0, sm: 8 }, offset: { xs: 0, sm: 3 } },
        radio: { type: 'radio', label: 'Radio', row: this.row, options: ['A', 'B', 'C'], flex: 6, order: 4 }
      }
    },

    // change Layout from Row to Column on resize and change Radio-Orientation
    row () {
      return this.$vuetify.breakpoint.mdAndUp
    },
    // change Class on resize
    layout () {
      return this.$vuetify.breakpoint.mdAndUp ? 'grey lighten-4' : this.$vuetify.breakpoint.smAndUp ? 'blue lighten-5' : 'white'
    }
  },
  methods: {
    update ({ on, id, key, value, obj, event, params, data, schema }) {
      console.log('Update [ on, key, value, params]', on, key, value, params)
    }
  }
}
</script>
