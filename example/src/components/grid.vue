<template>
  <v-container fluid >

    <h4>Resize Window to change Layout, Offset and Order of Components</h4>
    <v-form-base :class="layout"  :value= "myValue" :schema= "mySchema" @update= "update"/>

    <infoline :value= "myValue" :schema= "mySchema" ></infoline>

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
    // Dynamic Schema must be Computed
    mySchema () {
      return {
        name: { type: 'text', label: 'Name', flex: { xs: 12, sm: 6 }, order: { xs: 0, sm: 8 }, offset: { xs: 0, sm: 3, md: 0 } },
        radio: { type: 'radio', label: '', row: !this.row, options: ['A', 'B', 'C', 'D'], flex: 8, order: 4 }
      }
    },

    // Change Layout from Row to Column on resize and change Radio-Orientation
    row () {
      return this.$vuetify.breakpoint.mdAndUp
    },
    // Change Class on resize
    layout () {
      return this.$vuetify.breakpoint.mdAndUp ? 'grey lighten-3' : this.$vuetify.breakpoint.smAndUp ? 'blue lighten-4' : 'white'
    }
  },
  methods: {
    update
  }
}
</script>
