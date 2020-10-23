<template>
  <v-container fluid>
    <h4>Use computed Schema for responsible Layout with dynamic 'row' Attribute</h4>
    <p>Resize Window to change Layout, Offset and Order of Controls. </p>
    <v-form-base
      :model="myModel"
      :schema="mySchema"
      :class="layout"    
      :col=12  
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
      :value="myModel"
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
      
      myModel: {
        name: 'Grid',
        radio1: 'A',
        radio2: '1'
      }
    }
  },
  computed: {
    // Dynamic Schema must be Computed
    mySchema () {
      return {
        name: { type: 'text', col: { cols: 12, sm: 6 }, order: this.order, offset: { sm: 1 } },
        group: {
          type:'group',
          label:'Group with dynamic row-attributes',
          class:'grey lighten-3 pa-3',
          row: this.rowGutter, 
          col: 6,
          schema: {      
            text1:'text',      
            text2:'text',      
            radio1: { type: 'radio', row: !this.row, options: ['A', 'B', 'C'] },
            radio2: { type: 'radio', row: !this.row, options: ['1', '2', '3'] }
          }  
        }
      }
    },
    rowGutter(){
      return this.$vuetify.breakpoint.mdAndUp ? {noGutters:false} : {noGutters:true}
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
      return md ? 'blue lighten-4' : sm ? 'blue lighten-3' : lgAndUp ? 'blue lighten-5' : 'blue lighten-2'
    }
  },
  methods: {
    change
  }
}
</script>
