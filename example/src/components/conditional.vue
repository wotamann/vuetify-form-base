<template>
  <v-container fluid>
    <h4>Display conditional Controls by using computed Schema</h4>
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      id="form-base-conditional"
      :value="myModel"
      :schema="mySchema"
      @input="log"
      @click="log"
    />
    
    <v-btn
      dark
      color="blue lighten-3"
      @click="toggle"
    >
      Click or Type 'Show'
    </v-btn>
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
    
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'

const getTask = () => { return { done: false, title: 'Ticket added ' + Math.floor(Math.random() * 1000) } }
    
export default {
  name: 'Conditional',
  components: { VFormBase, Infoline },

  data () {
    return {
      hidden: true,
      myModel: {
        conditional: '',
        tasks: [
          getTask(),
          getTask(),
          getTask()
        ]
      }
    }
  },
  computed: {
    mySchema () {
      return {
        conditional: { type: 'text', placeholder: `Type 'show'`, hint: `Try typing 'show'`, col: 12 },
        tasks: {
          type: 'array',
          hidden: this.hidden,
          col: 12,
          schema: {
            done: { type: 'checkbox', label: 'Done', color: 'red', col: 2 },
            title: { type: 'text', placeholder: '...', col: 8 }
          }
        }
      }
    }
  },
  methods: {
        
    toggle () {
      this.hidden = !this.hidden
    },

    log(val) {
      log(val)

      const { index, key, value } = val

      if (key === 'conditional') this.hidden = value !== 'show'
      // add  
      if (key === 'done' && value === true) {
        setTimeout(() => this.myModel.tasks.splice(index, 1), 333)
      }      
    }
  }
}
</script>
