<template>
  <v-container fluid>
    <h4>Async loading of Model, Schema and at last Grid-Layout</h4>

    <!-- FORM-BASE-COMPONENT -->    
    <v-form-base 
      :model= "myModel"
      :schema= "mySchema"
      :col= "col"
      @change="log"
    />
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
    
  </v-container>
</template>

<script>
import Infoline from '@/components/infoline'
import log from '@/lib'

export default {
  name: 'AsyncLoad',
  components: {
    // # STEP 1) Lazy Loading of 'vFormBase' component here
    'VFormBase': () => import('@/components/vFormBase'),
    Infoline
  },
  data () {
    return {
      showFormbase: false,
      myModel: {},
      mySchema: {},
      col: {}
    }
  },

  async mounted () {
    // # STEP 2a) Async Loading of Value
    this.myModel = await this.delay({
      name: 'Base',
      password: '12345678',
      checkbox: true      
    })
    // # STEP 2b) Async Loading of Schema
    this.mySchema = await this.delay({
      // prop: text => shorthand for prop: { type: 'text', label:'prop' }
      name: 'text',
      password: 'password',
      checkbox: 'checkbox'      
    }),
    // # STEP 2c) Async Loading of Grid
    this.col = await this.delay({
      cols:12, 
    })
  },

  methods: {
    log,
    delay (obj) { 
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(obj), 1200)
      })
    }
  }
}
</script>
