<template>
  <v-container fluid>
    <h4>Add or Select Item from List (Array in Value) with Result '.model' in Schema and Event </h4>
    <v-form-base
      id="form-base-list"
      :value="myValue"
      :schema="mySchema"
      @change:form-base-list="change"
    />
    
    <!-- <v-btn
      v-if ="myValue.listObject.length < 4"
      dark
      color="blue"
      @click="add"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn> -->

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
import change from '@/lib'

export default {
  name: 'Lists',
  components: { VFormBase, Infoline },
  data () {
    return {
      myValue: {
        listObject: [
          { line: 1, name: 'Jobs' },
          { line: 2, name: 'Taleb' },
          { line: 3, name: 'Harari' }
        ],
        listString: [
          'Jobs',
          'Taleb',
          'Harari'
        ]
      },
      mySchema: {
        
        listObject: {
          type: 'list',
          label: 'List Single',
          icon: 'mdi-wifi',
          item: 'name', // display name from object in array
          model: 2,
          color: 'blue',
          flex: 5
        },
        listString: {
          type: 'list',
          label: 'List Multiple',
          multiple: true,
          model: [1, 2],
          color: 'red',
          offset: 1,
          flex: 5
        },
        btn1: { type: 'btn', label:'Add', color: 'blue', flex: 2 },
        btn2: { type: 'btn', label:'Add', color: 'red', flex: 2, offset: 4 },
      }
    }
  },
  methods: {
    
    change (val) {

      change(val)

      let { key } = val

      if (key === 'btn1') this.myValue.listObject.push({ 
        line: this.myValue.listObject.length + 1, name: 'Musk ' + Math.floor(Math.random() * 1000)
      })
      
      if (key === 'btn2') this.myValue.listString.push( 'Musk ' + Math.floor(Math.random() * 1000))
    
    }
  }
}
</script>
