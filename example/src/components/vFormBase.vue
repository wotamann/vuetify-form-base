<template>
  <v-row
    :id="ref"
    v-bind="getRow"
    v-resize.quiet="onResize"
  >   
    <!-- FORM-BASE TOP SLOT -->
    <slot :name="getFormTopSlot()"/>  

    <template v-for="(obj, index) in flatCombinedArraySorted">
      <!-- Tooltip Wrapper -->
      <v-tooltip
        :key="index"
        :disabled="!obj.schema.tooltip"
        v-bind="getShorthandTooltip(obj.schema.tooltip)"
      >
        <template v-slot:activator="{ on }" >
          <v-col
            v-show="!obj.schema.hidden"
            :key= "index"
            v-bind="getGridAttributes(obj)"
            v-intersect="(entries, observer) => onIntersect(entries, observer, obj)"
            v-touch="{ left: () => onSwipe('left', obj), right: () => onSwipe('right', obj), up: () => onSwipe('up', obj), down: () => onSwipe('down', obj) }"
            :class="getClassName(obj)"
            @mouseenter="onEvent($event, obj)"
            @mouseleave="onEvent($event, obj)"
            v-on="on"

            :draggable="obj.schema.drag" 
            @dragstart="dragstart($event, obj)"
            @dragover= "dragover($event, obj)"
            @drop= "drop($event, obj)"
          >           
            <!-- slot on top of type  -> <div slot="slot-bottom-type-[propertyName]"> -->
            <slot :name="getTypeTopSlot(obj)" />
            <!-- slot on top of key  -> <v-btn slot="slot-bottom-key-[propertyName]"> -->
            <slot :name="getKeyTopSlot(obj)" />
            <!-- slot replaces complete item of defined TYPE -> <v-btn slot="slot-item-type-[propertyName]">-->
            <slot :name="getTypeItemSlot(obj)">
              <!-- slot replaces complete item of defined KEY -> <div slot="slot-item-key-[propertyName]">-->
              <slot :name="getKeyItemSlot(obj)">
                
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

              <!-- DATE, TIME, COLOR MENU -->
                <v-menu
                  v-else-if="isDateTimeColorExtension(obj)"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  :nudge-right="32"
                  max-width="290px"
                  min-width="290px"
                >                  
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-on= "on"
                      v-bind="bindSchema(obj)"
                      type="text"
                      readonly
                      :value="setValue(obj)"
                    >
                      <!-- @input="onInput($event, obj)" -->
                    </v-text-field>
                  </template>
                  <div
                    :is="mapTypeToComponent( obj.schema.ext )" 
                    v-bind="bindSchema(obj)"
                    :type="checkExtensionType(obj)"
                    :value="setValue(obj)"
                    @input="onInput($event, obj)"
                  >
                  </div>
                </v-menu>
              <!-- END DATE, TIME, COLOR MENU -->

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
                        :value="item"
                        :schema="obj.schema.schema"
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
                  <div v-html="obj.schema.label" ></div>
                    <v-form-base
                      :id="`${id}-${obj.key}`"
                      :value="setValue(obj)"
                      :schema="obj.schema.schema"
                    />
                </div>
                </template>

              <!-- END GROUP -->
                
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
                  <v-toolbar
                    v-if="obj.schema.label"
                    v-bind="bindSchema(obj)"
                    dark
                  >
                    <v-toolbar-title>{{ obj.schema.label }}</v-toolbar-title>
                  </v-toolbar>
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
                  v-text ="getIconValue(obj)"
                  @click="onEvent($event, obj)"
                />
              <!-- END ICON -->

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
                  @focus="onEvent($event, obj)"
                  @blur="onEvent($event, obj)"
                  @click:append="onEvent($event, obj, append)"
                  @click:append-outer="onEvent($event, obj, appendOuter)"
                  @click:clear="onEvent($event, obj, clear )"
                  @click:prepend="onEvent($event, obj, prepend )"
                  @click:prepend-inner="onEvent($event, obj, prependInner )"
                  @input="onInput($event, obj)"
                />
              <!-- END DEFAULT -->

              </slot>
            </slot>

            <!-- slot at bottom of item  -> <div slot="slot-bottom-key-[deep-nested-key-name]"> -->
            <slot :name="getTypeBottomSlot(obj)" />
            <slot :name="getKeyBottomSlot(obj)" />
          </v-col>

          <!-- schema.spacer:true - push next item to the right and fill space between items -->
          <v-spacer
            v-if="obj.schema.spacer"
            :key="`s-${index}`"
          />
        </template>
        <!-- slot for TOOLTIP - inspect css.vue for details -->
        <slot
          name="slot-tooltip"
          :obj="obj"
        >
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
  import { get, isPlainObject, isFunction, isString, isEmpty, orderBy, delay } from 'lodash'
  import { mask } from 'vue-the-mask'
  
  const typeToComponent = {
    // map schema.type to type in v-text-field  - https://www.wufoo.com/html5/
    text: 'v-text-field',
    password: 'v-text-field',
    email: 'v-text-field',
    tel: 'v-text-field',
    url: 'v-text-field',
    search: 'v-text-field',
    number: 'v-text-field', 
    
    // For native <INPUT> type use alternative schema prop ext  -> schema:{ type:'text, ext:'date', ...} 
    // range: 'v-text-field',   //  { type:'text, ext:'range', ...}    
    // date: 'v-text-field',    //  { type:'text, ext:'date', ...}       
    // time: 'v-text-field',    //  { type:'text, ext:'time', ...}      
    // color: 'v-text-field',   //  { type:'text, ext:'color', ...}      
    
    // INFO: 2 Types of DATE / TIME / COLOR
    // Date-Input         - schema:{ type:'text, ext:'date', ...}       
    // Date-Picker        - schema:{ type:'date', ...}         

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
    card: 'v-card',

    }
  // Declaration
  const orderDirection = 'ASC'
  const pathDelimiter = '.'
  const classKeyDelimiter = '-'
  const defaultID = 'form-base'

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
  const bottomSlotAppendix = 'slot-bottom'

  const clear = 'clear'
  const button = 'button'
  const treeview = 'treeview'
  const list = 'list'
  const append = 'append'
  const appendOuter = 'append-outer'
  const prepend = 'prepend'
  const prependInner = 'prepend-inner'

  // name of Type wich will be used for grouping controls
  const groupingType ='group'
  // symbol on drop
  const dropEffect = 'move'  // 'copy, link, move      
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
      type: [Object],
    },
    col: {
      type: [Object, Number, String],
    },
    flex: {
      type: [Object, Number, String],
    },
    value: {
      type: [Object, Array],
      default: () => null,
    },    
    model: {
      type: [Object, Array],
      default: () => null,
    },    
    schema: {
      type: [Object, Array],
      default: () => ({}),
    },
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
  watch: { 
    schema: function(newSchema) { 
      this.rebuildArrays(this.valueIntern, newSchema)
      this.schema = newSchema 
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
      while (p.id.startsWith(p.$parent.$parent.id + '-')) {
        p = p.$parent.$parent
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
  methods: {     
    // MAP TYPE
    mapTypeToComponent(type) {
      // map ie. schema:{ type:'password', ... } to specific vuetify-control or default to v-text-field'
      return typeToComponent[type] ? typeToComponent[type] : `v-${type}`
    },
    // CHECK FOR DATE, TIME OR COLOR EXT
    isDateTimeColorExtension(obj){
      return 'date_time_color'.includes(obj.schema.ext)
    },
    // BIND SCHEMA FN
    bindSchema(obj) {     
      return obj.schema
    },      
    // EXT TYPE
    checkExtensionType(obj) {
      // For native <INPUT> type use ext 
      // { type:'text, ext:'date', ...} -> use native Input Type 'Date' instead of Date-Picker
      return obj.schema.ext || obj.schema.type
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
        return k ? Array.isArray(k) ? k.map(i => item[i] ).join('_') : item[k] : (!isNaN(index)) ? `${index}_${Date.now()}` : index 
    },
  //
  // GET IMG SOURCE
    getImageSource(obj) {
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
        ['sm', 'md', 'lg', 'xl' ].map( k => { 
          if(obj[k]) { obj[prepender + k] = obj[k]; delete obj[k] }
        })
    },
    gridReplaceXS(obj, replacer){
      // see vuetify Grid - replace Prop XS -V1.5 with COLS, ORDER, OFFSET - V2.0
      // xs must be replaced in new Vuetify 2.0 Grid with cols, offset, order
      if(obj && obj.xs) { obj[replacer] = obj.xs; delete obj.xs }
    },
    getGridAttributes(obj){ 
      // flex:{ cols|sm|md|lg|xl } - value:number|string
      // order:{ order|sm|md|lg|xl|order-sm|order-md|order-lg|order-xl } - value:number|string
      // offset:{ offset|sm|md|lg|xl|offset-sm|offset-md|offset-lg|offset-xl } - value:number|string

      const col = obj.schema.col || obj.schema.flex
      const colAttr= this.col || this.flex || colDefault
      let colObject = col ?
      // schema definition of cols
      ( isPlainObject(col) ? col : { cols: col} ) 
      // formbase attr definition of cols
      : colAttr ? ( isPlainObject(colAttr) ? colAttr : { cols: colAttr} ) 
        // no definition set to 'auto'
      : { cols:'auto'}
      this.gridReplaceXS(colObject, 'cols')

      // schema definition of offset
      const offset = obj.schema.offset
      let offsetObject = offset ? ( isPlainObject(offset) ? offset : { offset } ) : offset   
      this.gridMapper(offsetObject, 'offset-')
      this.gridReplaceXS(offsetObject, 'offset')

      // schema definition of offset
      const order = obj.schema.order
      let orderObject = order ? ( isPlainObject(order) ? order : { order} ) : order         
      this.gridMapper(orderObject, 'order-')
      this.gridReplaceXS(orderObject, 'order')
      
      return { ...colObject, ...offsetObject, ...orderObject  }
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
      return isFunction(params.obj.schema.toCtrl) ? params.obj.schema.toCtrl(params) : params.value
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
      event.dataTransfer.effectAllowed  = dropEffect

      const dragEvent = this.onEvent(event, obj)
      event.dataTransfer.setData("text", JSON.stringify( dragEvent ) )
    },

    dragover(event,obj){ return obj.schema.drop ? event.preventDefault() : null },
    
    drop(event, obj){
      if (!obj.schema.drop) return event.preventDefault()
      // get dragEvent and dragEvent.obj
      obj.dragEvent = JSON.parse(event.dataTransfer.getData("text") )
      
      // no drop on drag object
      if (obj.key === obj.dragEvent.obj.key && obj.id === obj.dragEvent.id) return event.preventDefault()      
      // handle schema.drop function
      if ( isFunction(obj.schema.drop) ) obj.value =  this.dropValue( obj, event )  
     
      this.onEvent(event, obj )
     
      event.preventDefault();
    },

    dropValue (obj, event) {
      return this.dropCtrl({ value: obj.dragEvent.value, obj, event, data: this.storeStateData, schema: this.storeStateSchema })
    },    
  //
  // Set Value
    setValue (obj) {
      // Control gets a Value
      return this.toCtrl({ value: obj.value, obj, data: this.storeStateData, schema: this.storeStateSchema })
    },
    //
  // EVENTS Get Value from Input & other Events
    onInput (value, obj, type = 'input' ) {
      // Value after change in Control
      value = this.fromCtrl({ value, obj, data: this.storeStateData, schema: this.storeStateSchema })
      // harmonize undefined or empty strings => null, because clearable resets to null and not to empty string!
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
    onEvent (event, obj, tag) {
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
      if (change.indexOf(emit) > -1) this.parent.$emit(this.getEventName('change'), val) // listen only to 'input|click'
      if (watch.indexOf(emit) > -1) this.parent.$emit(this.getEventName('watch'), val) // listen to 'focus|input|click|blur'
      if (mouse.indexOf(emit) > -1) this.parent.$emit(this.getEventName('mouse'), val) // listen to 'mouseenter|mouseleave  '
      if (display.indexOf(emit) > -1) this.parent.$emit(this.getEventName('display'), val) // listen to 'resize|swipe|intersect'
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
      // check if schema is typeof string ->  shorthand { type: obj } otherwise take original value
      return isString(schema) ? { type: schema, label:key } : schema
    },
    flattenObjects (dat, sch) {
      
      let data = {}
      let schema = {}
      
      // Organize Formular using Schema not Data 
      Object.keys(sch).forEach(key => {

        // convert string definition of name:'text' into object name:{type:'text'} 
        sch[key] = this.sanitizeShorthandType(key, sch[key])
  
        if ( (!Array.isArray(dat[key]) && dat[key] && typeof dat[key] === 'object' && !(dat[key] instanceof File) && sch[key] && (sch[key].type !== groupingType) ) || (Array.isArray(dat[key]) && Array.isArray(sch[key])) ) {
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
      // Object.keys(data).forEach(key => {        
      Object.keys(schema).forEach(key => {        
        if (!isPlainObject(schema[key])) {
          console.warn( `From Schema:`,schema,` the Prop '${key}' must be a string with value of type key:'value' or a plainobject with at least key:{ type:'text'} definition.  Schema Prop '${key}' will be ignored!`)
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
        if (val === null || val === undefined )  return defaultSchemaIfValueIsNullOrUndefined(key)
        if (typeof val === 'string')  return defaultSchemaIfValueIsString(key)
        if (typeof val === 'number')  return defaultSchemaIfValueIsNumber(key)
        if (typeof val === 'boolean') return defaultSchemaIfValueIsBoolean(key)
        return val
      })
      // assign root props to avoid manipulating prop: schema       
      Object.keys(schema).forEach( key => this.schema[key] = schema[key] )
    },
    rebuildArrays(model, schema){
      // break if no model found, but don't break if model is empty object (can filled by editing)
      if (!model) throw `No 'model' definition found. Use '<formbase :model="myData" />' `
      // no schema defined or empty -> autogenerate basic schema
      if (isEmpty(schema)) this.autogenerateSchema(model)
      // create flatted working array from schema and value    
      this.flatCombinedArray = this.flattenAndCombineToArray(this.storeStateData, this.storeStateSchema)
    },
  //  
  },
  created () {
    this.rebuildArrays(this.valueIntern, this.schema)
  }  
}
</script>