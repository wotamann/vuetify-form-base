<style>
  h4 { background-color: #a9d3f5; padding: 0.25rem; margin: 0.1rem; font-weight: 300}
</style>

<template>
  <v-app light>
    <v-app-bar
      app
      dark
      color="blue"
    >
      <v-select
        v-model="view"
        :items="items"
        item-text="text"
        item-value="value"
        color="blue"
      />
    </v-app-bar>

    <v-content>
      <div :is="view">          
      </div>
    </v-content>
  </v-app>
</template>

<script>
import simple from '@/components/simple.vue'
import basic from '@/components/basic.vue'
import async from '@/components/async.vue'
import grid from '@/components/grid.vue'
import css from '@/components/css.vue'
import deep from '@/components/deep.vue'
import partial from '@/components/partial.vue'
import complex from '@/components/complex.vue'
import arrayease from '@/components/arrayease.vue'
import array from '@/components/array.vue'
import selection from '@/components/selection.vue'
import treeview from '@/components/treeview.vue'
import conditional from '@/components/conditional.vue'
import list from '@/components/list.vue'
import pickers from '@/components/pickers.vue'

const items = [
    { value: 'simple', text: 'Textfields' }, 
    { value: 'basic', text: 'Textfields with redundant Value & Schema'}, 
    { value: 'async', text: 'Lazy Loading of Component'}, 
    { value: 'css', text: 'CSS, Slots, Tooltips & Buttons'}, 
    { value: 'deep', text: 'Deep nested Data including Object & Arrays'}, 
    { value: 'selection', text: 'Selection, Combobox, Autocomplete from Schema-Array'}, 
    { value: 'list', text: 'List from Value-Array'}, 
    { value: 'treeview', text: 'Treeviews from Value-Array'}, 
    { value: 'arrayease', text: 'Edit Value-Array'}, 
    { value: 'array', text: 'Add, Remove and Edit Items in nested Value-Array'}, 
    { value: 'pickers', text: 'Date, Time, Color Pickers'},
    { value: 'grid', text: 'Responsive Grid using Flex, Order and Offset'}, 
    { value: 'partial', text: 'Partial & Linked'}, 
    { value: 'conditional', text: 'Conditional Form'}, 
    { value: 'complex', text: 'Complex Form with Validation'}, 
]

export default {
  components: {
    simple, basic, async, grid, css, deep, partial, complex, treeview, arrayease, array, selection, conditional, list, pickers
  },
  data () {
    return {
      items,
      view: items[0].value
    }
  },  
}
</script>
