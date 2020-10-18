<template>
  <v-row
    :id="ref"
    v-bind="getRow"
    v-resize.quiet="onResize"
  >   
    <!-- FORM-BASE TOP SLOT -->
    <slot :name="getFormTopSlot()"/>  

    <!-- main loop over components/controls -->
    <template v-for="(obj, index) in flatCombinedArraySorted">
      
      <!-- Tooltip Wrapper -->
      <v-tooltip
        :key="index"
        :disabled="!obj.schema.tooltip"
        v-bind="getShorthandTooltip(obj.schema.tooltip)"
      >
        <template v-slot:activator="{ on }">
          <v-col
            v-show="!obj.schema.hidden"
            :key="index"
            v-bind="getGridAttributes(obj)"
            v-intersect="(entries, observer) => onIntersect(entries, observer, obj)"
            v-touch="{ left: () => onSwipe('left', obj), right: () => onSwipe('right', obj), up: () => onSwipe('up', obj), down: () => onSwipe('down', obj) }"
            :class="getClassName(obj)"
            :draggable="obj.schema.drag" 
            @mouseenter="onEvent($event, obj)"
            @mouseleave="onEvent($event, obj)"

            v-on="on"
            @dragstart="dragstart($event, obj)"
            @dragover="dragover($event, obj)"
            @drop="drop($event, obj)"
          >      

            <!-- slot on top of type  -> <div slot="slot-bottom-type-[propertyName]"> -->
            <slot :name="getTypeTopSlot(obj)" :obj= "obj"/>
            <!-- slot on top of key  -> <v-btn slot="slot-bottom-key-[propertyName]"> -->
            <slot :name="getKeyTopSlot(obj)" :obj= "obj"/>          
            <!-- slot replaces complete item of defined TYPE -> <v-btn slot="slot-item-type-[propertyName]">-->
            <slot :name="getTypeItemSlot(obj)" :obj= "obj">
              <!-- slot replaces complete item of defined KEY -> <div slot="slot-item-key-[propertyName]">-->
              <slot :name="getKeyItemSlot(obj)" :obj= "obj" >
              <!-- RADIO -->
                <v-radio-group
                  v-if="obj.schema.type === 'radio'"
                  v-bind="bindSchema(obj)"
                  :value="setValue(obj)"
                  @change="onInput($event, obj)"
                >
                  <v-radio
                    v-for="(o,idx) in obj.schema.options"
                    :key="idx"
                    v-bind="bindSchema(obj)"
                    :label="sanitizeOptions(o).label"
                    :value="sanitizeOptions(o).value"
                  />
                </v-radio-group>
              <!-- END RADIO -->

              <!-- DATE, TIME, COLOR TEXT-MENU -->   
                <v-menu
                  v-else-if="isDateTimeColorTypeAndExtensionText(obj)"
                  v-bind="bindPickerSchemaMenu(obj)"
                >                  
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-on="on"
                      v-bind="bindSchema(obj)"
                      type="text"
                      readonly
                      :value="setValue(obj)"
                    />
                  </template>
                  <div
                    :is="mapTypeToComponent( obj.schema.type )" 
                    v-bind="bindSchema(obj)"
                    :type="checkExtensionType(obj)"
                    :value="setValue(obj)"
                    @input="onInput($event, obj)"
                    @click:hour="onEvent({type:'click'}, obj, hour)"
                    @click:minute="onEvent({type:'click'}, obj, minute)"
                    @click:second="onEvent({type:'click'}, obj, second)"
                  />
                </v-menu>
              <!-- END DATE, TIME, COLOR TEXT-MENU -->

              <!-- ARRAY -->
                <template
                  v-else-if="obj.schema.type === 'array'"
                >
                  <div
                    v-for="(item, idx) in setValue(obj)"
                    :key="getKeyForArray(obj, item, idx)"
                    v-bind="bindSchema(obj)"
                    :value="setValue(obj)"
                  >
                    <slot
                      :name="getKeyArraySlot(obj)"
                      :item="item"
                    >
                      <v-form-base
                        :id="`${id}-${obj.key}-${idx}`"
                        :model="item"
                        :schema="obj.schema.schema"
                        :row="getRowGroupOrArray(obj)"
                        :col="getColGroupOrArray(obj)"
                        :class="`${id}-${obj.key}`"
                      />
                    </slot>
                  </div>
                </template>
              <!-- END ARRAY -->

              <!-- GROUP -->
                <template v-else-if="obj.schema.type === 'group'">
                  <div 
                    v-bind="bindSchema(obj)" 
                    @click="onEvent($event, obj)"
                  >
                    <slot :name="getKeyLabelSlot(obj)" :obj= "obj">
                      <span v-html="obj.schema.label" />
                    </slot>
                    <v-form-base
                      :id="`${id}-${obj.key}`"
                      :model="setValue(obj)"
                      :schema="obj.schema.schema"
                      :row="getRowGroupOrArray(obj)"
                      :col="getColGroupOrArray(obj)"
                      :class="`${id}-${obj.key}`"
                    />
                </div>
                </template>
              <!-- END GROUP -->
                
              <!-- WRAP -->
                <template v-else-if="obj.schema.type === 'wrap'">
                  <div
                    v-bind="bindSchema(obj)" 
                    @click="onEvent($event, obj)"
                  >
                  <slot :name="getKeyLabelSlot(obj)" :obj= "obj">
                    <span v-html="obj.schema.label" />
                  </slot>
                    <v-form-base
                      :id="`${id}-${obj.key}`"
                      :model="setValueWrap(obj)"
                      :schema="obj.schema.schema"
                      :row="getRowGroupOrArray(obj)"
                      :col="getColGroupOrArray(obj)"
                      :class="`${id}-${obj.key}`"
                    />
                  </div>
                </template>
              <!-- END WRAP -->

              <!-- TREEVIEW -->
                <v-treeview
                  v-else-if="obj.schema.type === treeview"
                  v-model="obj.schema.model"
                  :items="setValue(obj)"
                  :active.sync="obj.schema.model"
                  :open.sync="obj.schema.open"
                  v-bind="bindSchema(obj)"
                  @update:open="onEvent({type:'click'}, obj, 'open' )"
                  @update:active="onEvent({type:'click'}, obj, 'selected' )"
                />
              <!-- END TREEVIEW -->
              
              <!-- LIST -->
                <template
                  v-else-if="obj.schema.type === list"
                >
                  <slot :name="getKeyLabelSlot(obj)" :obj= "obj">
                    <v-toolbar
                      v-if="obj.schema.label"
                      v-bind="bindSchema(obj)"
                      dark
                    >
                      <v-toolbar-title>{{ obj.schema.label }}</v-toolbar-title>
                    </v-toolbar>
                  </slot>
                  <v-list>
                    <v-list-item-group
                      v-model="obj.schema.model"
                      v-bind="bindSchema(obj)"
                      light
                    >
                      <v-list-item
                        v-for="(item, idx) in setValue(obj)"
                        :key="idx"
                        @click="onEvent($event, obj, list )"
                      >
                        <v-list-item-icon>
                          <v-icon v-text="obj.schema.icon" />
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title v-text="obj.schema.item ? item[obj.schema.item] : item" />
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </template>
              <!-- END LIST -->
              
              <!-- CHECKBOX | SWITCH -->
                <div
                  :is="mapTypeToComponent(obj.schema.type)"
                  v-else-if="obj.schema.type === 'switch' || obj.schema.type === 'checkbox'"
                  :input-value="setValue(obj)"
                  v-bind="bindSchema(obj)"
                  @change="onInput($event, obj)"
                />
              <!-- END CHECKBOX | SWITCH -->

              <!-- FILE -->
                <v-file-input
                  v-else-if="obj.schema.type === 'file' "
                  :value="setValue(obj)"
                  v-bind="bindSchema(obj)"
                  @focus="onEvent($event, obj)"
                  @blur="onEvent($event, obj)"
                  @change="onInput($event, obj)"
                />
              <!-- END FILE -->

              <!-- ICON -->
                <v-icon
                  v-else-if="obj.schema.type === 'icon'"
                  v-bind="bindSchema(obj)"
                  v-text="getIconValue(obj)"
                  @click="onEvent($event, obj)"
                />
              <!-- END ICON -->
              
              <!-- SLIDER -->
                <v-slider
                  v-else-if="obj.schema.type === 'slider'"
                  v-bind="bindSchema(obj)"
                  @input="onInput($event, obj)"
                />
              <!-- END SLIDER -->

              <!-- IMG -->
                <v-img
                  v-else-if="obj.schema.type === 'img'"
                  :src="getImageSource(obj)"
                  v-bind="bindSchema(obj)"
                  @click="onEvent($event, obj)"
                />
              <!-- END IMG -->
                
              <!-- BTN-TOGGLE -->
                <v-btn-toggle
                  v-else-if="obj.schema.type === 'btn-toggle'"
                  v-bind="bindSchema(obj)"
                  color=""
                  :value="setValue(obj)"
                  @change="onInput($event, obj)"
                >
                  <v-btn
                    v-for="(b, idx) in obj.schema.options"
                    :key="idx"
                    v-bind="bindSchema(obj)"
                    :value="sanitizeOptions(b).value"
                  >
                    <v-icon :dark="obj.schema.dark">
                      {{ sanitizeOptions(b).icon }}
                    </v-icon>
                    {{ sanitizeOptions(b).label }}
                  </v-btn>
                </v-btn-toggle>
              <!-- END BTN-TOGGLE -->

              <!-- BTN -->
                <v-btn
                  v-else-if="obj.schema.type === 'btn'"
                  v-bind="bindSchema(obj)"
                  @click="onEvent($event, obj, button)"
                >
                  <v-icon
                    v-if="obj.schema.iconLeft"
                    left
                    :dark="obj.schema.dark"
                  >
                    {{ obj.schema.iconLeft }}
                  </v-icon>
                  {{ setValue(obj) }}
                  <v-icon
                    v-if="obj.schema.iconCenter"
                    :dark="obj.schema.dark"
                  >
                    {{ obj.schema.iconCenter }}
                  </v-icon>
                  {{ obj.schema.label }}
                  <v-icon
                    v-if="obj.schema.iconRight"
                    right
                    :dark="obj.schema.dark"
                  >
                    {{ obj.schema.iconRight }}
                  </v-icon>
                </v-btn>
              <!-- END BTN -->

              <!-- MASK v-text-field use this Section - https://vuejs-tips.github.io/vue-the-mask/  -->
                <v-text-field
                  v-else-if="obj.schema.mask"
                  v-mask="obj.schema.mask"
                  v-bind="bindSchema(obj)"
                  :value="setValue(obj)"
                  @focus="onEvent($event, obj)"
                  @blur="onEvent($event, obj)"
                  @click:append="onEvent($event, obj, append)"
                  @click:append-outer="onEvent($event, obj, appendOuter)"
                  @click:clear="onEvent($event, obj, clear )"
                  @click:prepend="onEvent($event, obj, prepend )"
                  @click:prepend-inner="onEvent($event, obj, prependInner)"
                  @input="onInput($event, obj)"
                />
              <!-- END MASK -->

              <!-- DEFAULT all other Types -> typeToComponent -->
                <div
                  :is="mapTypeToComponent(obj.schema.type)"
                  v-else
                  v-bind="bindSchema(obj)"
                  :type="checkExtensionType(obj)"                  
                  :value="setValue(obj)"
                  :obj="obj"
                  :search-input.sync="obj.schema.searchInput"       
                  @focus="onEvent($event, obj)"
                  @blur="onEvent($event, obj)"
                  @click:append="onEvent($event, obj, append)"
                  @click:append-outer="onEvent($event, obj, appendOuter)"
                  @click:clear="onEvent($event, obj, clear )"
                  @click:prepend="onEvent($event, obj, prepend )"
                  @click:prepend-inner="onEvent($event, obj, prependInner)"
                  @click:hour="onEvent({type:'click'}, obj, hour)"
                  @click:minute="onEvent({type:'click'}, obj, minute)"
                  @click:second="onEvent({type:'click'}, obj, second)"
                  @input="onInput($event, obj)"
                >
                  {{obj.schema.textContent}}
                </div>

              <!-- END DEFAULT -->
              </slot>
            </slot>

            <!-- slot at bottom of item  -> <div slot="slot-bottom-key-[deep-nested-key-name]"> -->
            <slot :name="getTypeBottomSlot(obj)" :obj="obj"/>
            <slot :name="getKeyBottomSlot(obj)" :obj="obj"/>
          </v-col>

          <!-- schema.spacer:true - push next item to the right and fill space between items -->
          <v-spacer
            v-if="obj.schema.spacer"
            :key="`s-${index}`"
          />
        </template>
        <!-- slot for TOOLTIP - inspect css.vue for details -->
        <slot name="slot-tooltip" :obj="obj">
          <span>{{getShorthandTooltipLabel(obj.schema.tooltip)}}</span>
        </slot>
      </v-tooltip>
    </template>
    <!-- FORM-BASE BOTTOM SLOT -->
    <slot :name="getFormBottomSlot()"/>   
  </v-row>
</template>

<script>
// import & declarations
  import Vue from 'vue'
  import { get, isPlainObject, isFunction, isString, isNumber, isEmpty, orderBy, delay } from 'lodash'
  import { mask } from 'vue-the-mask'
  
  const typeToComponent = {
    text: 'v-text-field',
    password: 'v-text-field',
    email: 'v-text-field',
    tel: 'v-text-field',
    url: 'v-text-field',
    search: 'v-text-field',
    number: 'v-text-field', 
    
    // map schema.type to type in v-text-field  - https://www.wufoo.com/html5/
    // For native <INPUT> type use alternative schema prop ext  -> schema:{ type:'text, ext:'date', ...} 
    // range: 'v-text-field',   //  { type:'text, ext:'range', ...}    
    // date: 'v-text-field',    //  { type:'text, ext:'date', ...}       
    // time: 'v-text-field',    //  { type:'text, ext:'time', ...}      
    // color: 'v-text-field',   //  { type:'text, ext:'color', ...}      
    
    // INFO: 3 Types of DATE / TIME / COLOR
    // Date-Input           - schema:{ type:'text, ext:'date', ...}       
    // Date-Picker          - schema:{ type:'date', ...}         
    // Date-Picker-Text     - schema:{ type:'date', ext:'text'...}         

    // map schema.type to vuetify-control (vuetify 2.0)
    date: 'v-date-picker',   
    time: 'v-time-picker',
    color: 'v-color-picker',
    img: 'v-img',
    textarea: 'v-textarea',
    range: 'v-slider',
    file: 'v-file-input',
    switch: 'v-switch',
    checkbox: 'v-checkbox',
    card: 'v-card'
    /*
      HOW TO USE CUSTOM Components
      1)  
        Name and Register your Custom-Control Component globally in 'main.js' 
        but avoid collision with registered names of Vuetify - Controls 
        See: https://vuejs.org/v2/guide/components-registration.html
   
        Vue.component('custom-component', () => import('@/components/custom-component.vue') )
    
      2)  
        use it in Schema 

        mySchema: { myCustom: { type: 'custom-component' }

      3) // custom-component.vue 
        <template>
          <v-text-field v-model="inp"  label="Basic"></v-text-field>
        </template>
        <script>
          export default {
            props: ['type','value', 'obj'],  
            computed:{
              inp:{
                get(){  return this.value},
                set(v){ this.$emit('input', v)}
              }
            }  
          }
        < /script>    
    */
    
    }
  // Declaration
  const orderDirection = 'ASC'
  const pathDelimiter = '.'
  const classKeyDelimiter = '-'
  const defaultID = 'form-base'
  const isPicker = 'date|time|color'
  const onEventDelay = 1 // ms

  const mouse = 'mouseenter|mouseleave'
  const change = 'input|click'              // event change collects events 'input|click'
  const watch = 'focus|input|click|blur'    // event watch collects events 'focus|input|click|blur'
  const display = 'resize|swipe|intersect'  // event watch collects events 'resize|swipe|intersect'

  const itemClassAppendix = 'item'
  const typeClassAppendix = 'type'
  const keyClassAppendix = 'key'
  const propertyClassAppendix = 'prop'

  const arraySlotAppendix = 'slot-array'
  const topSlotAppendix = 'slot-top'
  const itemSlotAppendix = 'slot-item'
  const labelSlotAppendix = 'slot-label'
  const bottomSlotAppendix = 'slot-bottom'

  const clear = 'clear'
  const button = 'button'
  const treeview = 'treeview'
  const list = 'list'
  const append = 'append'
  const appendOuter = 'append-outer'
  const prepend = 'prepend'
  const prependInner = 'prepend-inner'
  
  const hour = 'hour'
  const minute = 'minute'
  const second = 'second'

  // symbol on drop
  const dropEffect = 'move' // 'copy, link, move      
  // Default row setting if no row-attribute defined  
  const rowDefault = { noGutters:true } // { noGutters:true, justify:'center', align:'center' } 

  // Default col setting, overrideable by prop col or by schema.col definition   
  // Default col setting, overrideable by prop flex or by schema.flex definition (flex is DEPRECATED use col instead)  
  const colDefault = { cols:'auto' } // { cols:12, sm: 6, md:4, lg:3, xl:2}

  // Mapper for Autogeneration of Schema from Value
  const defaultSchemaIfValueIsNullOrUndefined = key => ({ type:'text', label: key })
  const defaultSchemaIfValueIsString = key => ({ type:'text', label: key })
  const defaultSchemaIfValueIsNumber = key => ({ type:'number', label: key })
  const defaultSchemaIfValueIsBoolean = key => ({ type:'checkbox', label: key })
  // Menu triggered DateTimePicker Default 
  const defaultPickerMenu = { closeOnContentClick:false, transition:"scale-transition", nudgeRight:32, maxWidth:'290px', minWidth:'290px' }
//
export default {
  name: 'VFormBase',
  // Info Mask https://vuejs-tips.github.io/vue-the-mask/
  directives: { mask },
  props: {    
    id: {
      type: String,
      default: defaultID
    },
    row: {
      type: [Object]
    },
    col: {
      type: [Object, Number, String]
    },
    flex: {
      type: [Object, Number, String]
    },
    value: {
      type: [Object, Array],
      default: () => null
    },    
    model: {
      type: [Object, Array],
      default: () => null
    },    
    schema: {
      type: [Object, Array],
      default: () => ({})
    }
  },
  data () {
    return {    
      flatCombinedArray: [],
      clear,
      button,
      treeview,
      list,
      append,
      appendOuter,
      prepend,
      prependInner
    }
  },
  computed: {    
    valueIntern() { 
      // use <formbase :model="myData" />  ->  legacy code <formbase :value="myData" />  
      let model = this.model || this.value 
      this.updateArrayFromState(model, this.schema)
      return model 
    },
    ref () {
      return this.id
    },
    parent () {
      let p = this
      if (p.$parent && p.$parent.$parent) {
        while (p.id.startsWith(p.$parent.$parent.id + '-')) {
          p = p.$parent.$parent
        }
       }
      return p
    },
    index () {
      const m = this.ref && this.ref.match(/\d+/g)
      return m ? m.map(Number) : []
    },
    getRow(){
      return this.row || rowDefault
    },   
    flatCombinedArraySorted () {
      return orderBy(this.flatCombinedArray, ['schema.sort'], [orderDirection])
    },
    storeStateData () {
      this.updateArrayFromState(this.valueIntern, this.schema)
      return this.valueIntern
    },
    storeStateSchema () {
      this.updateArrayFromState(this.valueIntern, this.schema)
      return this.schema
    }    
  },
  watch: { 
    schema: function(newSchema) { 
      this.rebuildArrays(this.valueIntern, newSchema)
      this.schema = newSchema 
    }
  }, 
  methods: {
    // MAP TYPE
    mapTypeToComponent(type) {
      // merge global registered components into typeToComponent Object
      const allTypeComponents = { ...typeToComponent, ...Vue.options.components}
      // const typeToComponent -> maps type to according v-component 
      // ie. schema:{ type:'password', ... } to specific vuetify-control or default to v-text-field'
      return allTypeComponents[type] ? allTypeComponents[type] : `v-${type}`
    },
    // CHECK FOR TYPE: DATE, TIME OR COLOR and EXT: TEXT
    isDateTimeColorTypeAndExtensionText(obj){
      return isPicker.includes(obj.schema.type) && obj.schema.ext === 'text' 
    },
    // CHECK FOR DATE, TIME OR COLOR EXT
    isDateTimeColorExtension (obj){
      return isPicker.includes(obj.schema.ext)
    },
    // BIND SCHEMA FN
    bindPickerSchemaMenu(obj, schemaProp ) {           
      return { ...defaultPickerMenu, ...obj.schema.menu}
    },      
    bindSchema(obj) {     
      return obj.schema
    },      
    // EXT TYPE
    checkExtensionType(obj) {
      // For native <INPUT> type use ext or typeInt
      // { type:'date', ext:'text', typeInt:'month' ...} -> use native Input Type 'Date' instead of Date-Picker
      return obj.schema.typeInt || obj.schema.ext || obj.schema.type
    },
  // GET ITERATION KEY FOR TYPE ARRAY
    getKeyForArray(obj, item, index){
      // IMPORTANT if you want to add or remove items in type:'array' 
      // more Info -> 
      // https://forum.vuejs.org/t/after-splicing-an-object-wrong-item-disappears-from-view/9247/4
      // https://stackoverflow.com/questions/45655090/vue-array-splice-removing-wrong-item-from-list
      
      // create for iteration v-for an uniqe key from each object in array using index and time.hash 
      // or define your key index by defining a key property
      // MODEL
      // arrayTasks: { trace:'100', label:'A', ... }
      // SCHEMA
      // arrayTasks: { type:'array', schema:{ ... } }                           -> KEY index_time.hash  0_1587498241149
      // arrayTasks: { type:'array', key:'trace', schema:{ ... } }              -> KEY trace            100
      // arrayTasks: { type:'array', key:['trace','label'], schema:{ ... } }    -> KEY trace_label      100_A
      
      // IMPORTANT! Key should not contain an editable prop, because of new iteration on any change

        const k= obj.schema.key 
        return k ? Array.isArray(k) ? k.map(i => item[i]).join('_') : item[k] : (!isNaN(index)) ? `${index}_${Date.now()}` : index 
    },
  //
  // GET IMG SOURCE
    getImageSource(obj){
      // if exist get source from src otherwise join schema.base & value & schema.tail
      return obj.schema.src ? obj.schema.src : `${obj.schema.base}${obj.value}${obj.schema.tail}`
    },
  //    
  // ICON  
    getIconValue(obj){
      // icon: try schema.label or if undefined use value  
      return obj.schema.label ? obj.schema.label: this.setValue(obj) 
    },
  //  
  // TOOLTIP 
    getShorthandTooltip(schemaTooltip){
      // check if tooltip is typeof string ->  shorthand { bottom:true, label: obj.schema.tooltip} otherwise take original object
      return isString(schemaTooltip) ? { bottom:true, label:schemaTooltip} : schemaTooltip
    },
    getShorthandTooltipLabel(schemaTooltip){
      // check if tooltip is typeof string ->  return Label 
      return isString(schemaTooltip) ? schemaTooltip : schemaTooltip && schemaTooltip.label
    },
  //
  // FORM SLOT
    getFormTopSlot () {
      return this.id + '-top'
    },
    getFormBottomSlot () {
      return this.id + '-bottom'
    },
  //
  // KEY SLOTS
    getKeyArraySlot (obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-item'  -> 'slot-ARRAY-key-address-city'
      return this.getKeyClassNameWithAppendix(obj, arraySlotAppendix + '-key')
    },
    getKeyItemSlot (obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-item'  -> 'slot-item-key-address-city'
      return this.getKeyClassNameWithAppendix(obj, itemSlotAppendix + '-key')
    },
    getKeyLabelSlot (obj) {
      // used from GROUP, WRAP
      // get Key specific name by replacing '.' with '-' and prepending 'slot-label'  -> 'slot-label-key-address-city'
      return this.getKeyClassNameWithAppendix(obj, labelSlotAppendix + '-key')
    },
    getKeyTopSlot (obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-top'  -> 'slot-top-key-address-city'
      return this.getKeyClassNameWithAppendix(obj, topSlotAppendix + '-key')
    },
    getKeyBottomSlot (obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-bottom'  -> 'slot-bottom-key-address-city'
      return this.getKeyClassNameWithAppendix(obj, bottomSlotAppendix + '-key')
    },
  //
  // TYPE SLOTS
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
  //
  // CLASS Names
    getPropertyClassNameWithAppendix (obj, appendix) {
      // get PROP specific name by app-/prepending 'appendix-' and replacing '.' with '-' in nested key path  -> 'controls switch'
      return obj.key ? obj.key.split(pathDelimiter).map(s => `${appendix ? appendix + classKeyDelimiter : ''}${s}`).join(' ') : ''
    },
    getPropertyClassName (obj) {
      return this.getPropertyClassNameWithAppendix(obj, propertyClassAppendix)
    },
    getKeyClassNameWithAppendix (obj, appendix) {
      // get KEY specific name by app-/prepending 'appendix-' and replacing '.' with '-' in nested key path  -> 'top-slot-address-city'
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
    getClassName (obj) {
      // combines all into a single classname
      // class => ie. 'item type-checkbox key-address-zip prop-adress prop-zip'
      return `${itemClassAppendix} ${this.getTypeClassName(obj)} ${this.getKeyClassName(obj)} ${this.getPropertyClassName(obj)}` 
    },
  //
  // GRID
    gridMapper(obj, prepender){ 
      if(obj)  
        ['sm', 'md', 'lg', 'xl' ].map(k => { 
          if(obj[k]) { obj[prepender + k] = obj[k]; delete obj[k] }
        })
    },
    gridReplaceXS(obj, replacer){
      // see vuetify Grid - replace Prop XS -V1.5 with COLS, ORDER, OFFSET - V2.0
      // xs must be replaced in new Vuetify 2.0 Grid with cols, offset, order
      if(obj && obj.xs) { obj[replacer] = obj.xs; delete obj.xs }
    },
    getGridAttributes(obj){ 
      // FLEX DEPRECATED use COL instead of FLEX
      // flex:{ xs|sm|md|lg } - value:number|string
       
      // col:{ cols|sm|md|lg|xl } - value:number|string      
      // order:{ order|sm|md|lg|xl|order-sm|order-md|order-lg|order-xl } - value:number|string
      // offset:{ offset|sm|md|lg|xl|offset-sm|offset-md|offset-lg|offset-xl } - value:number|string

      const colSchema = obj.schema.col || obj.schema.flex

      const colAttr = this.col || this.flex || colDefault
   
      let colObject = colSchema
      // if available use schema definition of cols
      ? (isPlainObject(colSchema) ? colSchema : isNumber(colSchema) || isString(colSchema) ? { cols: colSchema} : { cols: 'auto' }) 
      // else use formbase attribute definition of cols
      : colAttr ? (isPlainObject(colAttr) ? colAttr : isNumber(colAttr) || isString(colAttr) ? { cols: colAttr} : { cols: 'auto' }) 
      // if no definition set cols to 'auto'
      : { cols:'auto'}

      this.gridReplaceXS(colObject, 'cols')  
      
      // schema definition of offset
      const offset = obj.schema.offset
      let offsetObject = offset ? (isPlainObject(offset) ? offset : { offset }) : offset   
      this.gridMapper(offsetObject, 'offset-')
      this.gridReplaceXS(offsetObject, 'offset')

      // schema definition of offset
      const order = obj.schema.order
      let orderObject = order ? (isPlainObject(order) ? order : { order}) : order         
      this.gridMapper(orderObject, 'order-')
      this.gridReplaceXS(orderObject, 'order')
      
      return { ...colObject, ...offsetObject, ...orderObject }
    },
    getRowGroupOrArray(obj) {
      return obj.schema.row || this.row || rowDefault
    },
    getColGroupOrArray(obj) {
      return obj.schema.col || this.col || colDefault
    },   
  //
  // SANITIZE BUTTON - Toggle sanitize item from array schema.options
    sanitizeOptions (b) {
      return isString(b) ? { value: b, label: b } : b
    },
  //
  // Map Values coming FROM Control, TO Control or DROP on Control
    toCtrl (params) {
      // signature params { value, obj, data, schema }
      //
      // manipulate value going to control, function must return a (modified) value
      // schema:{ name: { type:'text', toCtrl: ( {value} ) => value && value.toUpperCase, ... }, ... }
      return isFunction(params.obj.schema && params.obj.schema.toCtrl) ? params.obj.schema.toCtrl(params) : params.value
    },
    fromCtrl (params) {
      // signature params { value, obj, data, schema }
      //
      // manipulate updated value from control, function must return a (modified) value
      // schema:{ name: { type:'text', fromCtrl: ( {value} ) => value && value.toUpperCase, ... }, ... }
      return isFunction(params.obj.schema.fromCtrl) ? params.obj.schema.fromCtrl(params) : params.value
    },
    dropCtrl (params) {
      // signature params { value, obj, dragObject, dragEvent, event,data, schema }
      //
      // manipulate dropped value from control, function must return a (modified) value
      // schema:{ name: { type:'text', drop: ( {value} ) => value && value.toUpperCase, ... }, ... }
      return isFunction(params.obj.schema.drop) ? params.obj.schema.drop(params) : params.value
    },
  // 
  // Drag / Drop / DropValue
    dragstart(event, obj){
      if (!obj.schema.drag) return
     
      event.dataTransfer.dropEffect = dropEffect
      event.dataTransfer.effectAllowed = dropEffect

      const dragEvent = this.onEvent(event, obj)
      event.dataTransfer.setData('text', JSON.stringify(dragEvent))
    },

    dragover(event,obj){ return obj.schema.drop ? event.preventDefault() : null },
    
    drop(event, obj){
      if (!obj.schema.drop) return event.preventDefault()
      // get dragEvent and dragEvent.obj
      obj.dragEvent = JSON.parse(event.dataTransfer.getData('text'))
      
      // no drop on drag object
      if (obj.key === obj.dragEvent.obj.key && obj.id === obj.dragEvent.id) return event.preventDefault()      
      // handle schema.drop function
      if (isFunction(obj.schema.drop)) obj.value = this.dropValue(obj, event)  
     
      this.onEvent(event, obj)
     
      event.preventDefault()
    },

    dropValue (obj, event) {
      return this.dropCtrl({ value: obj.dragEvent.value, obj, event, data: this.storeStateData, schema: this.storeStateSchema })
    },    
  //
  // Set Value
    setValue (obj) {
      // Use 'schema.toCtrl' Function for setting a modified Value  
      return this.toCtrl({ value: obj.value, obj, data: this.storeStateData, schema: this.storeStateSchema })
    },
    setValueWrap (obj) {
      // Use 'schema.toCtrl' Function for setting a modified Value  
      return this.toCtrl({ value: this.storeStateData, obj, data: this.storeStateData, schema: this.storeStateSchema })
    },
  //
  // EVENTS Get Value from Input & other Events
    onInput (value, obj, type = 'input') {
     
      // Value after change in Control
      value = this.fromCtrl({ value, obj, data: this.storeStateData, schema: this.storeStateSchema })
      // harmonize undefined or empty strings => null, because 'clearable' in vuetify controls resets to null and not to empty string!
      value = !value || value === '' ? null : value
      // if schema type is number convert to number 
      value = obj.schema.type === 'number' ? Number(value) : value
      // update deep nested prop(key) with value
      this.setObjectByPath(this.storeStateData, obj.key, value)

      const emitObj = {
        on: type,
        id: this.ref,
        index: this.index, 
        params: { index: this.index, lastValue:obj.value },
        key: obj.key,
        value,
        obj,
        data: this.storeStateData,
        schema: this.storeStateSchema
      }
      this.emitValue(type, emitObj)
      return emitObj
    },      
    onEvent (event={}, obj, tag) {       
      
      const text = event && event.srcElement && event.srcElement.innerText
      const model = obj.schema.model
      const open = obj.schema.open
      const index = this.index
      // avoid circular JSON in dragstart
      const parent = event.type !== 'dragstart' ? this.parent : undefined
      
      const emitObj = {
        on: event.type,
        id: this.ref,
        index,
        params: { text, tag, model, open, index },
        key: obj.key,
        value: obj.value,
        obj,
        event,
        data: this.storeStateData,
        schema: this.storeStateSchema,
        parent
      }
      
      delay(() => { this.emitValue(event.type, emitObj), onEventDelay })  

      return emitObj
    },
    onIntersect (entries, observer, obj) {
      const isIntersecting = entries[0].isIntersecting
      const index = this.index
      this.emitValue('intersect', { on: 'intersect', id: this.ref, index, key: obj.key, value: obj.value, obj, params: { isIntersecting, entries, observer }, data: this.storeStateData, schema: this.storeStateSchema })
    },
    onSwipe (tag, obj) {
      this.emitValue('swipe', { on: 'swipe', id: this.ref, key: obj.key, value: obj.value, obj, params: { tag }, data: this.storeStateData, schema: this.storeStateSchema })
    },
    onResize (event) {
      this.emitValue('resize', { on: 'resize', id: this.ref, params: { x: window.innerWidth, y: window.innerHeight }, event, data: this.storeStateData, schema: this.storeStateSchema })
    },
  //
  // Emit Event Base
    emitValue (emit, val) {
     
      this.parent.$emit(this.getEventName(emit), val) // listen to specific event only
      if (change.indexOf(emit) > -1) this.parent.$emit(this.getEventName('change'), val)    // listen to 'input|click'
      if (watch.indexOf(emit) > -1) this.parent.$emit(this.getEventName('watch'), val)      // listen to 'focus|input|click|blur'
      if (mouse.indexOf(emit) > -1) this.parent.$emit(this.getEventName('mouse'), val)      // listen to 'mouseenter|mouseleave  '
      if (display.indexOf(emit) > -1) this.parent.$emit(this.getEventName('display'), val)  // listen to 'resize|swipe|intersect'
      this.parent.$emit(this.getEventName('update'), val) // listen to all events
    },
    getEventName (eventName) {
      return this.parent.id !== defaultID ? `${eventName}:${this.parent.id}` : eventName
    },
  //
  // PREPARE ARRAYS DATA & SCHEMA
    setObjectByPath (object, path, value) {
      // resolves chained keys (like 'user.address.street') on an object and set the value
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
    sanitizeShorthandType(key, schema){
      // if key in schema is string only, then handle shorthand definition
      // schema:{ name:'text' }  => schema:{ name: { type:'text', label: 'name' }
      return isString(schema) ? { type: schema, label:key } : schema
    },
    flattenObjects (dat = {}, sch) {
      let data = {}
      let schema = {}      
      // Organize Formular using Schema not Data 
      Object.keys(sch).forEach(key => {
        // convert string definition of name:'text' into object name:{type:'text'} 
        sch[key] = this.sanitizeShorthandType(key, sch[key])

        const bothArray = Array.isArray(dat[key]) && Array.isArray(sch[key])
        const datObjectWithoutSchemaType = isPlainObject(dat[key]) && !sch[key].type
        const datObjectContainsTypeKey = (dat[key] && dat[key].type && (sch[key] && sch[key].type))
        const notInstanceOfFileObject = !(dat[key] instanceof File)

        if (bothArray || datObjectWithoutSchemaType || (datObjectContainsTypeKey && notInstanceOfFileObject)) {
          let { data: flatData, schema: flatSchema } = this.flattenObjects(dat[key], sch[key])
          Object.keys(flatData).forEach(ii => {
            data[key + pathDelimiter + ii] = flatData[ii]
            schema[key + pathDelimiter + ii] = flatSchema[ii]
          })
        } else {
          data[key] = dat[key]
          schema[key] = sch[key]
        }
      }) 
      return { data, schema }
    },
    combineObjectsToArray ({ data, schema }) {
      let arr = []
      Object.keys(schema).forEach(key => {    
        if (!isPlainObject(schema[key])) {
          console.warn(`Schema '${JSON.stringify(schema)}' of Prop '${key}' must be a string with value of type key:'text' or a plainobject with at least key:{ type:'text'} definition.  Prop '${key}' will be ignored!`)
          return
        }
        arr.push({ key, value: data[key], schema: schema[key] })
      })
      return arr
    },
    flattenAndCombineToArray (data, schema) {
      // flatten nested structure of both objects 'data' & 'schema' ...
      let flattenedObjects = this.flattenObjects(data, schema)
      // ... and combine them to an array
      return this.combineObjectsToArray(flattenedObjects)
    },
    autogenerateSchema(value){
      // generate a minimal default schema from value   
      let schema = JSON.stringify(value, (key, val) => val === undefined ? null : val)      
      schema = JSON.parse(schema, (key, val) => {    
        if (val === null || val === undefined) return defaultSchemaIfValueIsNullOrUndefined(key)
        if (typeof val === 'string') return defaultSchemaIfValueIsString(key)
        if (typeof val === 'number') return defaultSchemaIfValueIsNumber(key)
        if (typeof val === 'boolean') return defaultSchemaIfValueIsBoolean(key)
        return val
      })
      // assign root props to avoid manipulating prop: schema       
      Object.keys(schema).forEach(key => this.schema[key] = schema[key])
    },

    tryAutogenerateModelStructure (model, schema) {
      // generate or complete an empty model based on schema structure
      
      Object.keys(schema).forEach(key => {
        
        // model must be at least an empty Object. It doesn't work with 'null', 'undefined' or any 'primitive value' 
        // Autogeneration from Schema works only if model is an empty Object 
        // if model is NOT an empty Object, no action is applied, otherwise data in model could be changed or modified
        if ( !isEmpty(model[key]) ) return
       
        let val = schema[key]
        if (val.type === 'group') {
          this.$set(model, key, {})
          this.tryAutogenerateModelStructure(model[key], val.schema)
        } else
        if (val.type === 'array') {
          this.$set(model, key, [])
          this.tryAutogenerateModelStructure(model[key], val.schema)
        } else
        if (val.type === 'list') {
          this.$set(model, key, [])
        } else
        if ( isPlainObject(val) && !val.type ) {
          this.$set(model, key, {})
          this.tryAutogenerateModelStructure(model[key], val)
        }
        if ( Array.isArray(val) && !val.type) {
          this.$set(model, key, [])
          this.tryAutogenerateModelStructure(model[key], val)
        }
      })
    },
    rebuildArrays (model, schema) {
      // undefined, null or primitive value for model can't work because you need reference to object for working on 
      if (!model) throw `Property 'model' is null or undefined. Use '<v-form-base :model="myModel" :schema="mySchema" />'. myModel must be at least an empty Object.`

      // noise if async loading
      if (isEmpty(schema) && isEmpty(model)) {
        console.warn(`At least one of the properties 'model' or 'schema' in <v-form-base /> must be at least an empty Object. Ignore this Warning on async loading 'model' or 'schema' `)
        // return
      }
      // generate/complete structure of model
      this.tryAutogenerateModelStructure(model, schema)
      
      // no schema defined or empty -> autogenerate basic schema
      if (isEmpty(schema)) this.autogenerateSchema(model)

      // create flatted working array from schema and value
      this.flatCombinedArray = this.flattenAndCombineToArray(this.storeStateData, this.storeStateSchema)
    }
  //  
  },
  created () {
    this.rebuildArrays(this.valueIntern, this.schema)
  }  
}
</script>