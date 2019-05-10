<template>
  <v-container fluid >

    <v-form-base  :value= "myValue" :schema= "mySchema" @update= "update">
    
      <!-- <template slot="slot-list-key-listing" slot-scope="{item}">
        <v-form-base id="form-base-partial" :value= "item" :schema= "partschema.test" @update:form-base-partial= "update"/>
      </template> -->

    </v-form-base>

    <h4>See your reactive  Data in 'myValue' </h4>
    <p>{{myValue}}</p>

    <h4>See your Definition in 'mySchema' </h4>
    <p>{{mySchema}}</p>

    <h4>See logged 'update' events at console </h4>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'

export default {
  name:'arrays',
  components: { VFormBase },
  data () {
    return {
      partschema:{
        test:{
          checkbox: { type: 'checkbox', label: 'A', color: 'red', },
          name: { type:'text'}
        } 
      },
      myValue: {
        name: 'Base',
        password: '123456',
        // listing: [test, test, test, test, test]         
        // listing: [[true, '111'], [false, true ], [false, false], [true, true],]         
        listing: [{name: 'Base1', checkbox: false}, {name: 'Base2', checkbox: true}, {name: 'Base3', checkbox: false}]         
      },
      mySchema: {
        name: { type: 'text', label: 'Name', flex: 4, appendIcon: 'more_vert' },
        password: { type: 'password', label: 'Password', flex: 4 },
         
        listing: {type: 'list' , schema:{ checkbox: { type: 'checkbox', label: 'A', color: 'red', flex:4 }, name: { type:'text', flex:4} }, }        
      }
    }
  },
  methods: {
    update ({ on, id, key, value, obj, event, params, data, schema }) {
      console.log('Update [ on, key, value, params, data, schema]', on, key, value, params, data, schema)
    }   
  }
}
</script>
