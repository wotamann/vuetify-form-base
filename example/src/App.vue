<style>
  .fixed {position: fixed; top:0; left:0; right:0; padding:1rem; margin:0; background-color: #efefef; z-index: 1000 }
  .pad {padding-top: 68px}
</style>

<template>
  <v-app class="pa-2">
      <v-select class="fixed" :items="['Simple Form','Responsive Grid', 'CSS & Slots', 'Deep nested Object', 'Values with Arrays', 'Partial & Linked', 'Complex Form']" v-model="view"></v-select>

    <div class="pad">
      <simple v-if="view === 'Simple Form'"></simple>
      <grid v-if="view === 'Responsive Grid'"></grid>
      <css v-if="view === 'CSS & Slots'"></css>
      <deep v-if="view === 'Deep nested Object'"></deep>
      <partial v-if="view === 'Partial & Linked'"></partial>
       <complex v-if="view === 'Complex Form'"></complex>
       <array v-if="view === 'Values with Arrays'"></array>
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

export default {
  components: {
    simple, grid, css, deep, partial, complex, array
  },
  data () {
    return {
      // view: 'Simple Form'
      view: 'Values with Arrays'
    }
  }
}
</script>
