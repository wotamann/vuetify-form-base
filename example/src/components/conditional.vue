<style> 
  /* scoped doesn't work in nested components */
 #form-base-complete .key-subgroups-tasks { border: 1px solid #4b8ad6; background-color: #e2eaf5; padding: 1rem} 
</style>

<template>
  <v-container fluid >
  
    <h4>Conditional on Value or Action</h4>
  
    <v-btn small @click="toggle">Toggle</v-btn>

    <v-form-base id="form-base-complete" :value= "myValue" :schema= "mySchema" @update:form-base-complete= "update" />
  
    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'

const items = ['Tesla', 'Jobs', 'Taleb', 'Harari']
const green = 'green lighten-4'
const red = 'red lighten-4'

export default {
  components: { VFormBase, Infoline },
  data () {
    return {
      hidden: true,
      color: red,
      myValue: {
        conditional: '',
        subgroups: {
          select: 'Tesla',
          multiple: ['Jobs'],
          combobox: null,
          autocomplete: null,
          tasks: [
            { done:false, title: 'shopping'},
            { done:true, title: 'coding'},
            { done:false, title: 'walking'},
          ],
        }     
      }
    }
  },
  computed:{
    // computed schema
    mySchema(){ return {
        conditional: { type:'text', label:'Conditional on Value ', hint:`try typing 'show'`,backgroundColor:this.color, flex: 12 },
        subgroups: { 
          select: { color:this.color, type: 'select', hidden:this.hidden , label: 'Select', items, flex: { xs: 12, sm:6,  md: 3 } },
          multiple: { type: 'select', label: 'Multi-Select', items, multiple: true, hidden: this.hidden, flex: { xs: 12, sm:6,  md: 3 } },
          combobox: { type: 'combobox', label: 'Combobox', items, hidden: this.hidden, flex: { xs: 12, sm:6, md: 3 } },
          autocomplete: { type: 'autocomplete', label: 'AutoComplete', items, hidden: this.hidden, flex: { xs: 12, sm:6,  md: 3 } },
          tasks: { 
            type:'array', 
            hidden: this.hidden, 
            flex:{ xs:12, sm:6 }, 
            schema:{ 
              done: { type: 'checkbox', label: 'Ok', flex:3 }, 
              title: { type:'text', placeholder:'to do...', flex:8 } 
            } 
          }
        }       
      }
    }       
  },

  methods: {
    toggle() {
      this.hidden =!this.hidden
      this.color =  this.color !== green ? green : red
    },

    update ({ on, id, key, value, obj, event, params, data, schema }) {
      console.log('Update [ on, id, key, value, params]', on, id, key, value, params)    
      if (key === 'conditional'){
        this.hidden = value === 'show' ? false : true
        this.color = value === 'show' ? green : red
      }  
    }
  }
}
</script>
