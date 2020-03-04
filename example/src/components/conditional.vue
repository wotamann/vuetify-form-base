<template>
  <v-container fluid>
    <h4>Display conditional Controls on Form</h4>
    
    <!-- FORM-BASE-COMPONENT -->
    <v-form-base
      id="form-base-conditional"
      :value="myValue"
      :schema="mySchema"
      @change:form-base-conditional="log"
    />
    
    <v-btn
      dark
      color="blue lighten-3"
      @click="toggle"
    >
      Click or Type 'Show'
    </v-btn>
  
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
import log from '@/lib'

const getTask = () => { return { done: false, title: 'Ticket added ' + Math.floor(Math.random() * 1000) } }
    
export default {
  name: 'Conditional',
  components: { VFormBase, Infoline },

  data () {
    return {
      hidden: true,
      myValue: {
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
        conditional: { type: 'text', placeholder: `Type 'show'`, hint: `Try typing 'show'`, flex: 12 },
        tasks: {
          type: 'array',
          hidden: this.hidden,
          flex: 12,
          schema: {
            done: { type: 'checkbox', label: 'Done', color: 'red', flex: 2 },
            title: { type: 'text', placeholder: '...', flex: 8 }
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
        setTimeout(() => this.myValue.tasks.splice(index, 1), 333)
      }      
    }
  }
}
</script>
