<template>
  <v-layout :id = "ref" class="wrap" v-resize.quiet= "onResize" >

    <template v-for="(obj, index) in flatCombinedArraySorted" >

      <v-flex
        v-if= "!obj.schema.hidden"
        :class= "getClassName(obj)"
        v-touch= "{ left: () => onSwipe('left', obj), right: () => onSwipe('right', obj), up: () => onSwipe('up', obj), down: () => onSwipe('down', obj) }"
        :key= "index"
      >

        <!-- slot on top of item  -> <div slot="top-slot-[key]> -->
        <slot :name= "getTypeTopSlot(obj)"></slot>
        <slot :name= "getKeyTopSlot(obj)"></slot>

          <!-- slot replaces complete item of defined type -> <div slot="item-slot-[key]>-->
          <slot :name= "getTypeItemSlot(obj)">
          <!-- slot replaces complete item of defined key -> <div slot="item-slot-[key]>-->
          <slot :name= "getKeyItemSlot(obj)">

          <!-- time -->
          <v-menu
            v-if= "obj.schema.type === 'time'"
            :close-on-content-click="false" :nudge-right="32" lazy transition="scale-transition" offset-y full-width min-width="290px"
          ><v-text-field
              slot="activator"
              v-bind = "obj.schema"
              :value= "setValue(obj)"
              @focus = "onFocus($event, obj)"
              @input= "onInput($event, obj)"
            ></v-text-field>
            <v-time-picker :value= "setValue(obj)" @focus = "onFocus($event, obj)" @input= "onInput($event, obj)"></v-time-picker>
          </v-menu>

          <!-- date -->
          <v-menu
            v-else-if= "obj.schema.type === 'date'"
            :close-on-content-click="false" :nudge-right="32" lazy transition="scale-transition"  offset-y full-width min-width="290px"
          ><v-text-field
              slot="activator"
              v-bind = "obj.schema"
              :value= "setValue(obj)"
              @focus = "onFocus($event, obj)"
              @input= "onInput($event, obj)"
            ></v-text-field>
            <v-date-picker :value= "setValue(obj)" @focus = "onFocus($event, obj)" @input= "onInput($event, obj)"></v-date-picker>
          </v-menu>

          <v-radio-group
            v-else-if= "obj.schema.type === 'radio'"
            v-bind = "obj.schema"
            :value= "setValue(obj)"
            @change= "onInput($event, obj)"
          >
            <v-radio
              v-for="(o,ix) in obj.schema.options"
              v-bind = "obj.schema"
              :key="ix"
              :label="o"
              :value="o"
            ></v-radio>
          </v-radio-group>

          <div
            v-else-if= "obj.schema.type === 'switch' || obj.schema.type === 'checkbox'"
            :is= "mapTypeToComponent(obj.schema.type)"
            v-bind = "obj.schema"
            @click:append = "onClick($event, obj, append)"
            @click:append-outer = "onClick($event, obj, appendOuter)"
            @click:prepend = "onClick($event, obj, prepend )"
            @click:prepend-inner = "onClick($event, obj, prependInner )"
            :input-value= "setValue(obj)"
            @change= "onInput($event, obj)"
          ></div>

          <div
            v-else
            :is= "mapTypeToComponent(obj.schema.type)"
            v-bind = "obj.schema"
            :value= "setValue(obj)"
            @focus = "onFocus($event, obj)"
            @click:append = "onClick($event, obj, append)"
            @click:append-outer = "onClick($event, obj, appendOuter)"
            @click:clear = "onClick($event, obj, clear )"
            @click:prepend = "onClick($event, obj, prepend )"
            @click:prepend-inner = "onClick($event, obj, prependInner )"
            @input= "onInput($event, obj)"
          ></div>

      </slot>
      </slot>

        <!-- slot at bottom of item  -> <div slot="slot-bottom-key-[deep-nested-key]> -->
        <slot :name= "getTypeBottomSlot(obj)"></slot>
        <slot :name= "getKeyBottomSlot(obj)"></slot>

      </v-flex>

      <!-- push next item to the right and fill space between items -->
      <v-spacer v-if= "obj.schema.spacer" :key= "`s-${index}`"></v-spacer>

    </template>

  </v-layout>
</template>

<script>
// import & declarations
import { get, isPlainObject, isFunction, orderBy } from 'lodash'

const typeToComponent = {
  // implemented in Vuetify
  text: 'v-text-field',
  password: 'v-text-field',
  email: 'v-text-field',
  // native Input Types - https://www.wufoo.com/html5/
  tel: 'v-text-field',
  url: 'v-text-field',
  color: 'v-text-field',
  search: 'v-text-field',
  number: 'v-text-field',
  file: 'v-text-field',

  range: 'v-slider'
}

const orderDirection = 'ASC'
const pathDelimiter = '.'
const classKeyDelimiter = '-'
const defaultID = 'form-base'

const itemClassAppendix = 'item'
const typeClassAppendix = 'type'
const keyClassAppendix = 'key'

const topSlotAppendix = 'slot-top'
const itemSlotAppendix = 'slot-item'
const bottomSlotAppendix = 'slot-bottom'

const clear = 'clear'
const append = 'append'
const appendOuter = 'append-outer'
const prepend = 'prepend'
const prependInner = 'prepend-inner'
//
export default {
  name: 'vue-form-base',

  props: {
    id: {
      type: String
    },
    value: {
      type: [Object, Array],
      required: true
    },
    schema: {
      type: [Object, Array],
      required: true
    }
  },

  data () {
    return {
      flatCombinedArray: [],
      clear,
      append,
      appendOuter,
      prepend,
      prependInner
    }
  },

  computed: {
    ref () { return this.id || defaultID },
    flatCombinedArraySorted () {
      return orderBy(this.flatCombinedArray, ['schema.sort'], [orderDirection])
    },
    storeStateData () {
      this.updateArrayFromState(this.value, this.schema)
      return this.value
    },
    storeStateSchema () {
      this.updateArrayFromState(this.value, this.schema)
      return this.schema
    }
  },

  methods: {

    mapTypeToComponent (type) {
      // map ie. schema:{ type:'password', ... } to vuetify control v-text-field'
      return typeToComponent[type] ? typeToComponent[type] : `v-${type}`
    },

    // KEY SLOTS
    getKeyItemSlot (obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-item'  -> 'slot-item-key-adress-city'
      return this.getKeyClassNameWithAppendix(obj, itemSlotAppendix + '-key')
    },
    getKeyTopSlot (obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-top'  -> 'slot-top-key-adress-city'
      return this.getKeyClassNameWithAppendix(obj, topSlotAppendix + '-key')
    },
    getKeyBottomSlot (obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-bottom'  -> 'slot-bottom-key-adress-city'
      return this.getKeyClassNameWithAppendix(obj, bottomSlotAppendix + '-key')
    },

    // KEY SLOTS
    getTypeItemSlot (obj) {
      // get Type specific slot name  -> 'slot-item-type-radio'
      return this.getTypeClassNameWithAppendix(obj, itemSlotAppendix + '-type')
    },
    getTypeTopSlot (obj) {
      // get Type specific slot name  -> 'slot-top-type-radio'
      return this.getTypeClassNameWithAppendix(obj, topSlotAppendix + '-type')
    },
    getTypeBottomSlot (obj) {
      // get Type specific slot name  -> 'slot-bottom-type-radio'
      return this.getTypeClassNameWithAppendix(obj, bottomSlotAppendix + '-type')
    },

    // CLASS Names
    getKeyClassNameWithAppendix (obj, appendix) {
      // get KEY specific name by app-/prepending 'appendix-' and replacing '.' with '-' in nested key path  -> 'top-slot-adress-city'
      return `${appendix ? appendix + classKeyDelimiter : ''}${obj.key.replace(/\./g, '-')}`
    },
    getKeyClassName (obj) {
      return this.getKeyClassNameWithAppendix(obj, keyClassAppendix)
    },
    getTypeClassNameWithAppendix (obj, appendix) {
      // get TYPE specific class name by prepending '-type' -> 'type-checkbox'
      return `${appendix + classKeyDelimiter}${obj.schema.type}`
    },
    getTypeClassName (obj) {
      return this.getTypeClassNameWithAppendix(obj, typeClassAppendix)
    },
    getFlexGridClassName (obj) {
      // get FLEX class from schema.flex ->  schema:{ flex:{ xs:12, md:4  } || flex: 4 } // flex: 4 -> is shorthand for -> flex:{ xs:4 }
      const keysToGridClassName = (key) => Object.keys(key).map(k => k + key[k]).join(' ') //  { xs:12, md:6, lg:4  } => 'xs12 md6 lg4'
      return obj.schema.flex ? isPlainObject(obj.schema.flex) ? keysToGridClassName(obj.schema.flex) : `xs${obj.schema.flex}` : ''
    },
    getOffsetGridClassName (obj) {
      // get OFFSET-FLEX class from schema.offset ->  schema:{ offset:{ xs:12, md:4  } || offset: 4 } // offset: 4 -> is shorthand for -> offset:{ xs:4 }
      const keysToOffsetClassName = (key) => Object.keys(key).map(k => `offset-${k}${key[k]}`).join(' ') //  { xs:12, md:6, lg:4  } => 'xs12 md6 lg4'
      return obj.schema.offset ? isPlainObject(obj.schema.offset) ? keysToOffsetClassName(obj.schema.offset) : `offset-xs${obj.schema.offset}` : ''
    },
    getOrderGridClassName (obj) {
      // get ORDER-FLEX class from schema.order ->  schema:{ order:{ xs:12, md:4  } || order: 4 } // order: 4 -> is shorthand for -> order:{ xs:4 }
      const keysToOrderClassName = (key) => Object.keys(key).map(k => `order-${k}${key[k]}`).join(' ') //  { xs:12, md:6, lg:4  } => 'xs12 md6 lg4'
      return obj.schema.order ? isPlainObject(obj.schema.order) ? keysToOrderClassName(obj.schema.order) : `order-xs${obj.schema.order}` : ''
    },
    getGridClassName (obj) {
      // combine Flex, Offset, Order into a classname
      return `${this.getFlexGridClassName(obj)} ${this.getOffsetGridClassName(obj)} ${this.getOrderGridClassName(obj)}`
    },

    getClassName (obj) {
      // combines all into a single classname
      // class => ie. 'item type-checkbox key-adress-zip xs12 md6 offset-xs0'
      // console.log(`getItemClassName `,`${itemClassAppendix} ${this.getTypeClassName(obj)} ${this.getKeyClassName(obj)} ${this.getGridClassName(obj)}`)
      return `${itemClassAppendix} ${this.getTypeClassName(obj)} ${this.getKeyClassName(obj)} ${this.getGridClassName(obj)}`
    },

    // Map Values coming FROM Control or going TO Control
    toCtrl (params) {
      // manipulate value going to control, toCtrl-function must return a (modified) value
      // schema:{ name: { type:'text', toCtrl: ( {value} ) value && value.toUpperCase, ... }, ... }
      return isFunction(params.obj.schema.toCtrl) ? params.obj.schema.toCtrl(params) : params.value
    },
    fromCtrl (params) {
      // manipulate updated value from control, fromCtrl-function must return a (modified) value
      // schema:{ name: { type:'text', fromCtrl: ( {value} ) value && value.toUpperCase, ... }, ... }
      return isFunction(params.obj.schema.fromCtrl) ? params.obj.schema.fromCtrl(params) : params.value
    },

    // Set Value
    setValue (obj) {
      // Control gets a Value
      return this.toCtrl({ value: obj.value, obj, data: this.storeStateData, schema: this.storeStateSchema })
    },
    // Get Value from Input & Events
    onInput (value, obj) {
      // Value after change in Control
      value = this.fromCtrl({ value, obj, data: this.storeStateData, schema: this.storeStateSchema })

      // harmonize all empty strings to null, because clearable resets to null and not to empty string !!!
      value = value === '' ? null : value

      // update deep nested prop(key) with value
      this.setObjectByPath(this.storeStateData, obj.key, value)

      this.emitValue('input', {
        on: 'input',
        id: this.ref,
        key: obj.key,
        value,
        obj,
        data: this.storeStateData,
        schema: this.storeStateSchema
      })
    },
    onClick (event, obj, pos) {
      this.emitValue('click', {
        on: 'click',
        id: this.ref,
        params: { icon: event.srcElement && event.srcElement.innerText, pos },
        key: obj.key,
        value: obj.value,
        obj,
        event,
        data: this.storeStateData,
        schema: this.storeStateSchema
      })
    },
    onFocus (event, obj) {
      this.emitValue('focus', { on: 'focus', id: this.ref, key: obj.key, value: obj.value, obj, event, data: this.storeStateData, schema: this.storeStateSchema })
    },
    onSwipe (pos, obj) {
      this.emitValue('swipe', { on: 'swipe', id: this.ref, key: obj.key, value: obj.value, obj, params: { pos }, data: this.storeStateData, schema: this.storeStateSchema })
    },
    onResize () {
      this.emitValue('resize', { on: 'resize', id: this.ref, params: { x: window.innerWidth, y: window.innerHeight }, data: this.storeStateData, schema: this.storeStateSchema })
    },
    // Event Base
    emitValue (emit, val) {
      this.$emit(this.getEventName(emit), val)
      this.$emit(this.getEventName('update'), val)
    },
    getEventName (eventName) {
      return this.ref !== defaultID ? `${eventName}:${this.ref}` : eventName
    },

    // PREPARE ARRAYS DATA & SCHEMA
    setObjectByPath (object, path, value) {
      // resolves chained keys (like 'user.adress.street') on an object and set the value
      let pathArray = path.split(pathDelimiter)
      pathArray.forEach((p, ix) => {
        if (ix === pathArray.length - 1) this.$set(object, p, value)
        object = object[p]
      })
    },
    updateArrayFromState (data, schema) {
      this.flatCombinedArray.forEach(obj => {
        obj.value = get(data, obj.key, null) // get - lodash
        obj.schema = get(schema, obj.key, null) // get - lodash
      })
    },
    flattenObjects (dat, sch) {
      let data = {}
      let schema = {}

      Object.keys(dat).forEach(i => {
        if ((!Array.isArray(dat[i]) && dat[i] && typeof dat[i] === 'object') || (Array.isArray(dat[i]) && Array.isArray(sch[i]))) {
        // if ( dat[i] && typeof dat[i] === 'object') {
          // if (!Array.isArray(dat[i]) && dat[i] && typeof dat[i] === 'object') {
          let { data: flatData, schema: flatSchema } = this.flattenObjects(dat[i], sch[i])
          Object.keys(flatData).forEach(ii => {
            data[i + pathDelimiter + ii] = flatData[ii]
            schema[i + pathDelimiter + ii] = flatSchema[ii]
          })
        } else {
          data[i] = dat[i]
          schema[i] = sch[i]
        }
      })
      return { data, schema }
    },
    combineObjectsToArray ({ data, schema }) {
      let arr = []
      Object.keys(data).forEach(key => {
        if (!schema[key]) {
          console.warn(`Property '${key}' in Data has no correspondingly Schema Property is not editable and keeps untouched!`)
          return
        }
        if (!isPlainObject(schema[key])) {
          console.warn(`Prop '${key}' must have a correspondingly Property in Schema with at least ${key}:{ type:'text'} as value.  Prop '${key}' is not editable and keeps untouched!`)
          return
        }
        arr.push({ key, value: data[key], schema: schema[key] })
      })
      return arr
    },
    flattenAndCombineToArray (data, schema) {
      // flatten nested structure of both objects 'data' & 'schema' ...
      let flattenedObjects = this.flattenObjects(data, schema)
      console.log('flattenedObjects',flattenedObjects);
      
      // ... and combine them to an array
      return this.combineObjectsToArray(flattenedObjects)
    }
  },

  created () {
    this.flatCombinedArray = this.flattenAndCombineToArray(this.storeStateData, this.storeStateSchema)
  }
}
</script>
