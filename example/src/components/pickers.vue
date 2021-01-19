<template>
  <v-container fluid>
    <h4>Date, Time and Color Menu and Pickers</h4>
    <v-form>
      <v-form-base
        id="form-base-pickers"
        :value="myModel"
        :schema="mySchema"
        :col="4"
        @input="update"
        @click="update"
      />
    </v-form>
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
   
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import update from '@/lib'

const allowedDates = val => ['2020-03','2020-04','2020-07','2020-10'].indexOf(val) !== -1 

export default {
  name: 'Pickers',
  components: { VFormBase, Infoline },
  data () {
    return {
      myModel: {
        timeExt: '10:15',
        dateExt: '2020-03-10', 
        colorExt: '#a2f822',
        timeText: '10:15',
        monthText: '2020-08', 
        colorText: '#4242f8',
        time: '10:15',
        date: ['2020-03-13','2020-03-07', '2020-03-01'], 
        color: '#D22A4D'               
      },
      mySchema: {
        divider1: { type: 'sheet', textContent: 'USE NATIVE HTML IMPLEMENTATION', class: 'pa-4 my-4', color: 'white--text blue lighten-2', col: 12 },
        // DATE / TIME / COLOR  'ext' set native HTML <input> type Attribute - schema:{ type:'text, ext:'date', ...}
        // see more at https://www.w3schools.com/tags/att_input_type.asp
        timeExt: { type: 'text', ext: 'time', color: 'blue', format: '24hr',  locale: 'de', prependIcon: 'timer', label: 'Time' },
        dateExt: { type: 'text', ext: 'date', color: 'green', locale: 'de', prependIcon: 'event', label: 'Date' },
        colorExt: { type: 'text', ext: 'color', label: 'Color' },
        
        divider2: { type: 'sheet', textContent: 'TEXTFIELDS WITH LINKED PICKERS', class: 'pa-4 my-4', color: 'white--text blue lighten-2', col: 12 },
        // DATE / TIME / COLOR  use ext:'text' to bind Date-Picker to Textfield - schema:{ type:'date, ext:'text', ...}
        timeText: { type: 'time', ext: 'text', color: 'blue', format: '24hr', locale: 'de', text:{ label:'Time', hint:'Select Time', clearable:true, prependIcon: 'timer'}},
        // use typeInt: 'month'   -> https://vuetifyjs.com/en/components/date-pickers/
        monthText: { type: 'date', ext: 'text', typeInt: 'month', color: 'green', allowedDates, menu:{ closeOnContentClick:true, nudgeRight:200 }, locale: 'de', prependIcon: 'event', label: 'Month' },
        colorText: { type: 'color', ext: 'text', label: 'Color', text:{ label:'Color', hint:'Select Color', clearable:true, prependIcon: 'palette'} },
        
        divider3: { type: 'sheet', textContent: 'PICKERS', class: 'pa-4 my-4', color: 'white--text blue lighten-2', col: 12 },
        // DATE / TIME / COLOR  Vuetify Date-Picker - schema:{ type:'date', ...}
        time: { type: 'time', color: 'blue', format: '24hr', locale: 'de', prependIcon: 'event', label: 'Time' },
        date: { type: 'date', color: 'green', locale: 'de', prependIcon: 'event', multiple:true, label: 'Date' },
        color: { type: 'color' }
      }
    }
  },
  methods: {
    update
  }
}
</script>
