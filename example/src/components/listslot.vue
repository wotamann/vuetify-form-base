<template>
  <v-container fluid>
    <h4>Add or Select Item from List (Array in Value) with Result '.model' in Schema and Event </h4>
    <v-form-base
      id="form-base-list"
      :model="myModel"
      :schema="mySchema"
      @input="log"
      @click="log"
    >
      
        <template #slot-top-key-form-base-list-listString>
          <v-toolbar dark color="red lighten-1" class="elevation-12 my-3"  >
            <v-toolbar-title>Top of List</v-toolbar-title>
          </v-toolbar>        
        </template>
        
        <template #slot-inject-label-key-form-base-list-listString="{ obj, idx, item}">
          <v-toolbar dark color="red lighten-3" >
            <v-toolbar-title>{{obj.schema.model.map( i => myModel.listObject[i].name)}}</v-toolbar-title>
          </v-toolbar>
        </template>
        
        <template #slot-item-array-form-base-list-listString="{ idx, item}">
          <div class="caption">{{idx}} - {{item}} </div>
        </template>
        
        <template #slot-bottom-key-form-base-list-listString>
          <v-toolbar dark color="red lighten-1" class="elevation-12 my-3"  >
            <v-toolbar-title>
              Bottom of List</span>
            </v-toolbar-title>
          </v-toolbar>        
        </template> 
        
    </v-form-base>
    
    <!-- Stuff  -->    
    <infoline :model="myModel" :schema="mySchema"/>
    
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import log from '@/lib'

export default {
  name: 'Lists',
  components: { VFormBase, Infoline },
  data () {
    return {
      myModel: {
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
          col: 5
        },
        listString: {
          type: 'list',
          label: 'List Multiple',
          multiple: true,
          model: [1, 2],
          color: 'red',
          offset: 1,
          col: 5
        },
        btn1: { type: 'btn', label:'Add', dark:true, color: 'blue', class:'mb-1',col: 2 },
        btn2: { type: 'btn', label:'Add', dark:true, color: 'red', class:'mb-1', col: 2, offset: 4 },
      }
    }
  },
  methods: {
    
    log (val) {
      log(val)

      let { key } = val

      if (key === 'btn1') this.myModel.listObject.push({ 
        line: this.myModel.listObject.length + 1, name: 'Musk ' + Math.floor(Math.random() * 1000)
      })
      
      if (key === 'btn2') this.myModel.listString.push( 'Musk ' + Math.floor(Math.random() * 1000))
    
    }
  }
}
</script>
