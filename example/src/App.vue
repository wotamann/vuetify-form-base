<style>
  .fixed {position: fixed; top:0; left:0; right:0; padding:1rem; margin:0; background-color: #efefef; z-index: 1000 }
  .pad {padding-top: 68px}
</style>

<template>
  <v-app class="pa-2">

    <v-select class="fixed" :items="items" v-model="view"></v-select>

    <div class="pad">
      <simple v-if="view === items[0]"></simple>
      <grid v-if="view === items[1]"></grid>
      <css v-if="view === items[2]"></css>
      <deep v-if="view === items[3]"></deep>
      <array v-if="view === items[4]"></array>
      <partial v-if="view === items[5]"></partial>
      <conditional v-if="view === items[6]"></conditional>
      <complex v-if="view === items[7]"></complex>
    </div>
  </v-app>
</template>

<script>
import simple from '@/components/simple.vue'
import grid from '@/components/grid.vue'
import css from '@/components/css.vue'
import deep from '@/components/deep.vue'
import partial from '@/components/partial.vue'
import complex from '@/components/complex.vue'
import array from '@/components/array.vue'
import conditional from '@/components/conditional.vue'

const items = ['Simple Form','Responsive Grid', 'CSS & Slots', 'Deep nested Object', 'Values with Arrays', 'Partial & Linked', 'Conditional', 'Complete Form']

export default {
  components: {
    simple, grid, css, deep, partial, complex, array, conditional
  },
  data () {
    return {
      items,
      view: items[0]
    }
  }
}
</script>
