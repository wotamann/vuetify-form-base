<style scoped>
  pre { font-size: 0.8rem}
</style>

<template>
  <v-layout wrap>
      <v-flex xs6>
        <h4>See your reactive Value-Data</h4>
        <pre>{{JSON.stringify(value, undefined, 4)}}</pre>
      </v-flex>
      <v-flex xs6>
        <h4>See your Schema-Definition' </h4>
        <pre>{{JSON.stringify(schema, undefined, 4)}}</pre>
      </v-flex>
      <h4>See logged 'Update' events at console </h4>
       </v-layout>
</template>

<script>
export default {
  props: ['value', 'schema']
}
</script>
