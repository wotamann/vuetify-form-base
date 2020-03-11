<template>
  <v-container fluid>
    <h4>Pickers and Image </h4>
    <v-form>
      <v-form-base
        id="form-base-pickers"
        :value="myValue"
        :schema="mySchema"
        :flex="6"
        @update:form-base-pickers="update"
      />
    </v-form>
    
    <!-- Stuff  -->
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
        colorPicker: '#2A2ACC',
        timePicker: '10:15',
        datePicker: '2019-03-16', 
        image:'random'
      },
      mySchema: {
        timePicker: { type: 'time', format: '24hr', flex: { xs: 12, sm: 6, md: 4 } },
        datePicker: { type: 'date', color: 'green', flex: { xs: 12, sm: 6, md: 4 } },
        colorPicker: { type: 'color', flex: { xs: 12, sm: 6, md: 4 } },
        image:{ type:'img', base:'https://picsum.photos/500/300?' },
        // image:{ type:'img', src:'https://picsum.photos/510/300?random',['aspect-ratio']:'1.5' },

      }
    }
  },
  methods: {
    update
  }
}
</script>
