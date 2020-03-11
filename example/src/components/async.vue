<template>
  <v-container fluid>
    <h4>Lazy Component loading for handling async Value or Schema</h4>

    <!-- FORM-BASE-COMPONENT -->
    <v-form-base 
      v-if="showFormbase"
      :model="myModel"
      :schema="mySchema"
      @change="log"
    />
    
    <!-- Stuff   -->
    <infoline
      :value="myModel"
      :schema="mySchema"
      :path="$options._componentTag"
    />
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
      mySchema: {}
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
    })
    // # STEP 3) Important: lazy Loading before displaying  'v-form-base'   
    this.showFormbase = true
  },

  methods: {
    log,
    delay (obj) { 
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(obj), 1000)
      })
    }
  }
}
</script>
