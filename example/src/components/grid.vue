<template>
  <v-container fluid>
    <h4>Resize Window to change Layout, Offset and Order of Controls</h4>
    <v-form-base
      :class="layout"
      :value="myValue"
      :schema="mySchema"
      @change="change"
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
import change from '@/lib'

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
        name: { type: 'text', flex: { xs: 12, sm: 6 }, order: { xs: 0, sm: 8 }, offset: { xs: 0, sm: 3, md: 0 } },
        radio: { type: 'radio', row: !this.row, options: ['A', 'B', 'C', 'D'], flex: 8, order: 4 }
      }
    },
    // Change Layout from Row to Column on resize and change Radio-Orientation
    row () {
      return this.$vuetify.breakpoint.mdAndUp
    },
    // Change Class on resize
    layout () {
      return this.$vuetify.breakpoint.mdAndUp ? 'blue lighten-3' : this.$vuetify.breakpoint.smAndUp ? 'blue lighten-4' : 'blue lighten-5'
    }
  },
  methods: {
    change
  }
}
</script>
