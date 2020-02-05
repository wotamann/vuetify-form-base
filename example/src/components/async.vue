<template>
  <v-container fluid>
    <h4>Lazy Loading of Component handling async Value or Schema</h4>

    <v-form v-if="showFormbase">
      <v-form-base
        :value="myValue"
        :schema="mySchema"
        @change="change"
      />
    </v-form>

    <infoline
      :value="myValue"
      :schema="mySchema"
      :path="$options._componentTag"
    />
  </v-container>
</template>

<script>
import Infoline from '@/components/infoline'
import change from '@/lib'

export default {
  name: 'AsyncLoad',
  components: {
    // 1) LAZY LOADING 'VFormBase' COMPONENT HERE
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

  async mounted () {
    // 2) ASYNC LOADING VALUE & SCHEMA
    this.myValue = await this.delay({
      name: 'Base',
      password: 'abcdefgh',
      checkbox: true
    })
    this.mySchema = await this.delay({
      name: { type: 'text', label: 'Name', flex: 5 },
      password: { type: 'password', label: 'Password', clearable: true, flex: 5 },
      checkbox: { type: 'checkbox', label: 'Okay' }
    })

    // 3) LAZY LOADING 'VFormbase' after making visible
    this.showFormbase = true
  },

  methods: {
    change,

    delay (obj) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(obj), 500)
      })
    }
  }
}
</script>
