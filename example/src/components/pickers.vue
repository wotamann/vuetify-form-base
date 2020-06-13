<template>
  <v-container fluid>
    <h4>Date, Time and Color Menu and Pickers</h4>
    <v-form>
      <v-form-base
        id="form-base-pickers"
        :value="myValue"
        :schema="mySchema"
        :flex="6"
        @input:form-base-pickers="update"
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
        timeExt: '10:15',
        dateExt: '2019-03-10', 
        colorExt: '#F2f822',
        time: '10:15',
        date: '2019-03-10', 
        color: '#D22ADD',
               
      },
      mySchema: {
        // DATE / TIME / COLOR   Texfield linked to Date-Picker   - schema:{ type:'text, ext:'date', ...}       
        timeExt: { type:'text', ext:'time', color: 'blue', format: '24hr', flex: 4, locale:'de', prependIcon:'timer', label:'Time' },
        dateExt: { type:'text', ext:'date', color: 'green', flex: 4, locale:'de', prependIcon:'event', label:'Date' },
        colorExt: { type:'text', ext:'color', flex: 4, label:'Color' },

        divider:{ type:'sheet', class:'pa-4 my-4', color:'blue lighten-2', flex:12},

        // DATE / TIME / COLOR  Vuetify Date-Picker              - schema:{ type:'date', ...}     
        time: { type: 'time', color: 'blue', format: '24hr', flex: 4, locale:'de', prependIcon:'event', label:'Time' },
        date: { type: 'date', color: 'green', flex: 4, locale:'de', prependIcon:'event', label:'Date' },
        color: { type: 'color', flex: 4 },
      }
    }
  },
  methods: {
    update
  }
}
</script>
