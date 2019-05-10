<template>
  <div>
    <h4>See your reactive Value-Data</h4>
    <p>{{value}}</p>
    <h4>See your Schema-Definition' </h4>
    <p>{{schema}}</p>
    <h4>See logged 'Update' events at console </h4>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Object, Array]
    },
    schema: {
      type: [Object, Array]
    }
  }
}
</script>
