<template>
  <v-container fluid >

    <!-- better integrated solution -->
    <h4>Display Values containing Arrays - integrated Solution</h4>
    <v-form-base id="integrated" :value= "myValue" :schema= "mySchema" @update:integrated= "update" />

    <!-- solution SLOT  -->
    <!-- <h4>Slot based Solution</h4>
    <v-form-base :value= "slotValue" :schema= "slotSchema" @update= "update" >
      <template slot="slot-array-key-test" slot-scope="{item}">
        <v-form-base id="form-base-partial" :value= "item" :schema= "slotSchema.testschema" @update:form-base-partial= "update"/>
      </template>
    </v-form-base> -->

    <infoline :value= "myValue" :schema= "mySchema"></infoline>

  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'

export default {
  name: 'arrays',
  components: { VFormBase, Infoline },
  data () {
    return {
      // INTEGRATED VERSION
      myValue: {
        arrayOne: [{ checkbox: true, name: 'Dog' }, { checkbox: false, name: 'Lion' }, { checkbox: true, name: 'Tiger' } ]
      },
      mySchema: {
        arrayOne: { type: 'array', flex: 12, schema: { name: { type: 'text', flex: 8 }, checkbox: { type: 'checkbox', label: 'Name', color: 'green', flex: 4 } } }
      }

      // // SLOT Version
      // slotValue: {
      //   test: [{ checkbox: true, name: 'Dog' }, { checkbox: false, name: 'Lion' }, { checkbox: true, name: 'Tiger' } ]
      // },
      // slotSchema: {
      //   testschema: { checkbox: { flex: 4, type: 'checkbox', label: 'Cats: ', color: 'blue' }, name: { flex: 8, type: 'text' } },
      //   test: { type: 'array', flex: 12 }
      // },
      
    }
  },
  methods: {
    update ({ on, parentId, id, key, value, obj, event, params, data, schema }) {
      console.log('Update [ on, parentId, id, key, value, params, data, schema]', on, parentId, id, key, value, params, data, schema)
    }
  }
}
</script>
