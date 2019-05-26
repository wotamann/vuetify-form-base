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
import update from '@/lib'

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
        name: { type: 'text', label: 'Name', flex: { xs: 6, sm: 4 }, order: { xs: 0, sm: 8 }, offset: { xs: 0, sm: 2 } },
        radio: { type: 'radio', label: '', row: !this.row, options: ['A', 'B', 'C'], flex: 6, order: 4 }
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
    update
  }
}
</script>
