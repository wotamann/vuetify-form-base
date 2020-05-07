<template>
  <v-container fluid>
    <h4>Resize Window to change Layout, Offset and Order of Controls. Use 'row' Attribute centering Controls</h4>
    <v-form-base
      :value="myValue"
      :schema="mySchema"
      :class="layout"      
      :row="rowAttribute"      
      @change="change"
    />
    <!--
      VUETIFY 2.0 NEW GRID SYSTEM - https://vuetifyjs.com/en/components/grids/
      Vuetify comes with a 12 point grid system built using flex-box. 
      The grid is used to create specific layouts within an application's content. 
      It contains 5 types of media breakpoints that are used for targeting specific 
      screen sizes or orientations, xs, sm, md, lg and xl. 
    -->
    
    <!-- Stuff   -->    
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
      rowAttribute:{align:'center', justify:'center', noGutters:true },
      
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
        name: { type: 'text', col: { cols: 12, sm: 6 }, order: this.order, offset: { sm: 1 } },
        radio: { type: 'radio', row: !this.row, options: ['A', 'B', 'C', 'D'], col: 6 }
      }
    },
    // Change Layout from Row to Column on resize and change Radio-Orientation
    row () {
      return !this.$vuetify.breakpoint.mdAndUp
    },
    // Change Order from Row to Column on resize and change Radio-Orientation
    order(){
      const { smAndDown } = this.$vuetify.breakpoint      
      return smAndDown ?  { order: 'last' } : { order: 'first' } 
    },
    // Change Class for Layout on resize
    layout () {
      const { lgAndUp, lg, md, sm } = this.$vuetify.breakpoint      
      return md ? 'blue lighten-3' : sm ? 'blue lighten-4' : lgAndUp ? 'blue lighten-5' : 'blue lighten-2'
    }
  },
  methods: {
    change
  }
}
</script>
