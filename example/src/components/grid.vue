<template>
  <v-container fluid>
    <h4>Computed Schema for responsible Layout and dynamic 'row' Attribute</h4>
    <p>Resize Window to change Layout, Offset and Order of Controls. </p>
    
    <v-form class="border-frame">
      <v-form-base
        :model="myModel"
        :schema="mySchema"
        :class="layout + ' lighten-5'"    
        :col=12  
        :row="rowAttribute"      
        @input="change"
        @click="change"
      />
      <!--
        VUETIFY 2.0 NEW GRID SYSTEM - https://vuetifyjs.com/en/components/grids/
        Vuetify comes with a 12 point grid system built using flex-box. 
        The grid is used to create specific layouts within an application's content. 
        It contains 5 types of media breakpoints that are used for targeting specific 
        screen sizes or orientations, xs, sm, md, lg and xl. 
      -->
    </v-form>
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
    
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
        name: 'Responsive Grid',
      }
    }
  },
  computed: {
    // Dynamic Schema 
    mySchema () {
      return {
        name: { type: 'text', col: { cols: 12, sm: 8, md:6, lg:4 }, order: this.order, offset: { sm: 4, md:6, lg:8 } },
        group: {
          type:'group',
          label:'Group with dynamic row-attributes',
          class:this.layout + ' lighten-2 pa-3',
          row: this.rowGutter, 
          col: { cols: 12, sm: 8, md:6, lg:4 },
          schema: {      
            radio1: { type: 'radio', row: !this.row, options: ['A', 'B'],order: this.order },
            radio2: { type: 'radio', row: !this.row, options: ['1', '2'] }
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
    layout() {
      const { lgAndUp, lg, md, sm } = this.$vuetify.breakpoint      
      return md ? 'red' : sm ? 'green' : lgAndUp ? 'blue' : 'darkgrey'
    }
  },
  methods: {
    change
  }
}
</script>
