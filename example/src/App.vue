<style>
  .fixed {position: fixed; top:0; left:0; right:0; padding:0.75rem; margin:0; background-color: #efefef; z-index: 1000 }
  .pad {padding-top: 72px}
</style>

<template>
  <v-app class="pa-2" light>

    <v-select class="fixed" :items="items" v-model="view"></v-select>

    <div class="pad">

      <simple v-if="view === items[0]"></simple>
      <async v-if="view === items[1]"></async>
      <css v-if="view === items[2]"></css>
      <deep v-if="view === items[3]"></deep>
      <treeview v-if="view === items[4]"></treeview>
      <selection v-if="view === items[5]"></selection>
      <list v-if="view === items[6]"></list>
      <array v-if="view === items[7]"></array>
      <pickers v-if="view === items[8]"></pickers>
      <partial v-if="view === items[9]"></partial>
      <conditional v-if="view === items[10]"></conditional>
      <complex v-if="view === items[11]"></complex>
      <grid v-if="view === items[12]"></grid>
    </div>
  </v-app>
</template>

<script>
import async from '@/components/asyncLoad.vue'
import simple from '@/components/simple.vue'
import grid from '@/components/grid.vue'
import css from '@/components/css.vue'
import deep from '@/components/deep.vue'
import partial from '@/components/partial.vue'
import complex from '@/components/complex.vue'
import array from '@/components/array.vue'
import selection from '@/components/selection.vue'
import treeview from '@/components/treeview.vue'
import conditional from '@/components/conditional.vue'
import list from '@/components/list.vue'
import pickers from '@/components/pickers.vue'

const items = ['Simple Form', 'Lazy Loading Component for Async-Data', 'CSS, Slots & Buttons', 'Deep nested Data with Arrays & CSS', 'Treeviews',
  'Select Item(s) from Schema-Array', 'Select Item from Data-Array(List)', 'Edit Item(s) in Data-Array', 'Pickers', 'Partial & Linked', 'Conditional Form', 'Complete Form', 'Use Responsive Grid']

export default {
  components: {
    simple, async, grid, css, deep, partial, complex, treeview, array, selection, conditional, list, pickers
  },
  data () {
    return {
      items,
      view: items[0]
    }
  }
}
</script>
