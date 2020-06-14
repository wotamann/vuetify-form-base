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
        colorExt: '#a2f822',
        timeText: '10:15',
        dateText: '2019-03-10', 
        colorText: '#4242f8',
        time: '10:15',
        date: '2019-03-10', 
        color: '#D22A4D',
               
      },
      mySchema: {

        divider1:{ type:'sheet', textContent:'USE NATIVE HTML EXTENSION', class:'pa-4 my-4', color:'white--text blue lighten-2', flex:12},
        // DATE / TIME / COLOR  'ext' set native HTML <input> type Attribute - schema:{ type:'text, ext:'date', ...}    
        // see more at https://www.w3schools.com/tags/att_input_type.asp    
        timeExt: { type:'text', ext:'time', color: 'blue', format: '24hr', flex: 4, locale:'de', prependIcon:'timer', label:'Time' },
        dateExt: { type:'text', ext:'date', color: 'green', flex: 4, locale:'de', prependIcon:'event', label:'Date' },
        colorExt: { type:'text', ext:'color', flex: 4, label:'Color' },

        divider2:{ type:'sheet', textContent:'TEXTFIELDS WITH LINKED PICKERS', class:'pa-4 my-4', color:'white--text blue lighten-2', flex:12},
        // DATE / TIME / COLOR  use ext:'text' to bind Date-Picker to Textfield - schema:{ type:'date, ext:'text', ...}       
        timeText: { type:'time', ext:'text', color: 'blue', format: '24hr', flex: 4, locale:'de', prependIcon:'timer', label:'Time' },
        dateText: { type:'date', ext:'text', color: 'green', flex: 4, locale:'de', prependIcon:'event', label:'Date' },
        colorText: { type:'color', ext:'text', flex: 4, label:'Color' },

        divider3:{ type:'sheet', textContent:'PICKERS', class:'pa-4 my-4', color:'white--text blue lighten-2', flex:12},
        // DATE / TIME / COLOR  Vuetify Date-Picker - schema:{ type:'date', ...}     
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
