<template>
  <v-container fluid>
    <h4>Async loading of Schema, Model and at last Grid-Layout</h4>

    <v-form class="border-frame">
    
    <!-- FORM-BASE-COMPONENT -->    
    <v-form-base 
      :model= "myModel"
      :schema= "mySchema"
      :col= "col"
      @input="log"
    />
    <p class="title">{{msg}}</p>
    </v-form>
    

    
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
      msg:'',
      showFormbase: false,
      myModel: {},
      mySchema: {},
      col: {}
    }
  },

  async mounted () {
    // # STEP 2) Async Loading of Schema
    this.msg ="Loading Schema..."
    this.mySchema = await this.delay({
      // prop: text => shorthand for prop: { type: 'text', label:'prop' }
      name: 'text',
      password: 'password',
      checkbox: 'checkbox'      
    }),
    // # STEP 3) Async Loading of Value
    this.msg ="Loading Model..."
    this.myModel = await this.delay({
      name: 'Base',
      password: '12345678',
      checkbox: true      
    })
    // # STEP 4) Async Loading of Grid
    this.msg ="Loading Grid..."
    this.col = await this.delay({
      cols:12, 
    })
    this.msg =""
  },

  methods: {
    log,
    delay (obj) { 
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(obj), 1500)
      })
    }
  }
}
</script>
