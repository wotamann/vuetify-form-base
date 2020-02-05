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
        color="blue"
      />
    </v-app-bar>

    <v-content>
      <simple v-if="view === items[0]" />
      <async v-if="view === items[1]" />
      <css v-if="view === items[2]" />
      <deep v-if="view === items[3]" />
      <treeview v-if="view === items[4]" />
      <selection v-if="view === items[5]" />
      <list v-if="view === items[6]" />
      <arraysimple v-if="view === items[7]" />
      <array v-if="view === items[8]" />
      <pickers v-if="view === items[9]" />
      <partial v-if="view === items[10]" />
      <conditional v-if="view === items[11]" />
      <complex v-if="view === items[12]" />
      <grid v-if="view === items[13]" />
    </v-content>
  </v-app>
</template>

<script>
import async from '@/components/async.vue'
import simple from '@/components/simple.vue'
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

const items = ['Textfields', 'Lazy Loading of Component', 'CSS, Slots, Tooltips & Buttons', 'Deep nested Data including Object & Arrays', 'Treeviews',
  'Selection, Combobox, Autocomplete', 'List from Value Array', 'Edit Data-Array', 'Add, Remove, Edit Items in nested Data-Array', 'Pickers', 'Partial & Linked', 'Conditional Form', 'Complete Form', 'Use Responsive Grid']

export default {
  components: {
    simple, async, grid, css, deep, partial, complex, treeview, arrayease, array, selection, conditional, list, pickers
  },
  data () {
    return {
      items,
      view: items[0]
    }
  }
}
</script>
