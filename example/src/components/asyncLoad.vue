<template>
  <v-container fluid >

    <h4>Lazy Loading of 'VFormBase' Component after loading Async-Data</h4>

    <v-form v-if="showFormbase">
      <v-form-base :value= "myValue" :schema= "mySchema" @change= "change"/>
    </v-form>

    <infoline :value= "myValue" :schema= "mySchema" ></infoline>
  </v-container>
</template>

<script>
import Infoline from '@/components/infoline'
import change from '@/lib'

export default {
  name: 'async',
  components: {
    // LAZY LOADING 'VFormBase' COMPONENT HERE
    'VFormBase': () => import('@/components/vFormBase'),
    Infoline
  },
  data () {
    return {
      showFormbase: false,
      myValue: {},
      mySchema: {}
    }
  },

  methods: {
    change,

    delay (obj) {
      return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(obj) }, 1000)
      })
    }
  },

  async mounted () {
    // 1) ASYNC LOADING VALUE & SCHEMA
    this.myValue = await this.delay({
      name: 'Base',
      password: '123456',
      file: [], // contains a single or an array of File objects
      checkbox: true
    })
    this.mySchema = await this.delay({
      name: { type: 'text', label: 'Name', flex: 4 },
      password: { type: 'password', label: 'Password', clearable: true, flex: 3 },
      file: { type: 'file', label: 'Image-Files', accept: 'image/*', multiple: true, flex: 4 },
      checkbox: { type: 'checkbox', label: 'Ok', flex: 1 }
    })

    // 2) LAZY LOADING 'VFormbase' after making visible
    this.showFormbase = true
  }
}
</script>
