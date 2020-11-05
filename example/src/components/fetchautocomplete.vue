<template>
  <v-container fluid>
    <h4>Autocomplete|Combobox - Fetch Data on Search Input</h4>

      <!-- Inspired from Issue55
      https://github.com/wotamann/vuetify-form-base/issues/55 -->

      <v-form class="border-frame">

        <!-- FORM-BASE-COMPONENT -->    
        <v-form-base 
          :model="myModel"
          :schema="mySchema"
          :col=6
          @input="log"
        />
        
      </v-form>
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
    
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'

let autocomplete = null
let combobox = null

export default {
  name: 'fetch_autocomplete',
  components: { VFormBase, Infoline },
  data () {
    return {
      myModel: {
        combobox: 'yo',
        autocomplete: ''
      },
      mySchema: { 
        combobox: { 
          type:'combobox', 
          label:'ComboBox', 
          items: this.items,
          cacheItems:true,
          searchInput: '',
        },       
        autocomplete: { 
          type:'autocomplete', 
          label:'Autocomplete', 
          items: this.items,
          cacheItems:true,
          searchInput: '',
        }         
      },
      states: [
          'Alabama',
          'Alaska',
          'American Samoa',
          'Arizona',
          'Arkansas',
          'California',
          'Colorado',
          'Connecticut',
          'Delaware',
          'District of Columbia',
          'Federated States of Micronesia',
          'Florida',
          'Georgia',
          'Guam',
          'Hawaii',
          'Idaho',
          'Illinois',
          'Indiana',
          'Iowa',
          'Kansas',
          'Kentucky',
          'Louisiana',
          'Maine',
          'Marshall Islands',
          'Maryland',
          'Massachusetts',
          'Michigan',
          'Minnesota',
          'Mississippi',
          'Missouri',
          'Montana',
          'Nebraska',
          'Nevada',
          'New Hampshire',
          'New Jersey',
          'New Mexico',
          'New York',
          'North Carolina',
          'North Dakota',
          'Northern Mariana Islands',
          'Ohio',
          'Oklahoma',
          'Oregon',
          'Palau',
          'Pennsylvania',
          'Puerto Rico',
          'Rhode Island',
          'South Carolina',
          'South Dakota',
          'Tennessee',
          'Texas',
          'Utah',
          'Vermont',
          'Virgin Island',
          'Virginia',
          'Washington',
          'West Virginia',
          'Wisconsin',
          'Wyoming',
        ]      
    }
  },
  watch: {
    mySchema: {
      deep: true,
      async handler(val) {

        if (val.autocomplete.searchInput !== autocomplete) {
          val.autocomplete.items = await this.fetch(this.states.filter( i => i.includes(val.autocomplete.searchInput)));
          autocomplete = val.autocomplete.searchInput
        } 

        if (val.combobox.searchInput !== combobox) {
          val.combobox.items = await this.fetch(this.states.filter( i => i.includes(val.combobox.searchInput)));
          combobox = val.combobox.searchInput
        } 
      }
    }
  },
  methods: {
    log,    
    fetch(obj) { 
      return new Promise((resolve, reject) => setTimeout(() => resolve(obj), 500) )
    }
  }
}
</script>