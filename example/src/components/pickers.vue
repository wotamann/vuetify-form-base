<template>
  <v-container fluid>
    <h4>Pickers </h4>
    <v-form>
      <v-form-base
        id="form-base-pickers"
        :value="myValue"
        :schema="mySchema"
        @update:form-base-pickers="update"
      />
    </v-form>
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
import update from '@/lib'

export default {
  name: 'Pickers',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        colorPicker: '#88000080',
        timePicker: '10:15',
        datePicker: '2019-03-16'
      },
      mySchema: {
        colorPicker: { type: 'color', flex: { xs: 12, sm: 6, md: 4 } },
        timePicker: { type: 'time', format: '24hr', flex: { xs: 12, sm: 6, md: 4 } },
        datePicker: { type: 'date', color: 'green', flex: { xs: 12, sm: 6, md: 4 } }
      }
    }
  },
  methods: {
    update
  }
}
</script>
