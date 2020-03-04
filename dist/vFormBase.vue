<template>
  <v-layout :id="ref" class="wrap" v-resize.quiet="onResize">
    <template v-for="(obj, index) in flatCombinedArraySorted">
      <v-flex
        v-show="!obj.schema.hidden"
        :class="getClassName(obj)"
        v-touch="{ left: () => onSwipe('left', obj), right: () => onSwipe('right', obj), up: () => onSwipe('up', obj), down: () => onSwipe('down', obj) }"
        :key="index"
      >
        <!-- slot on top of item  -> <v-btn slot="top-slot-[key]> -->
        <slot :name="getTypeTopSlot(obj)"></slot>
        <slot :name="getKeyTopSlot(obj)"></slot>

        <!-- slot replaces complete item of defined type -> <div slot="item-slot-[type]>-->
        <slot :name="getTypeItemSlot(obj)">
          <!-- slot replaces complete item of defined key -> <div slot="item-slot-[key]>-->
          <slot :name="getKeyItemSlot(obj)">
            <!-- radio -->
            <v-radio-group
              v-if="obj.schema.type === 'radio'"
              v-bind="obj.schema"
              :value="setValue(obj)"
              @change="onInput($event, obj)"
            >
              <v-radio
                v-for="(o,ix) in obj.schema.options"
                v-bind="obj.schema"
                :key="ix"
                :label="sanitizeOptions(o).label"
                :value="sanitizeOptions(o).value"
              ></v-radio>
            </v-radio-group>

            <!-- array -->
            <template v-else-if="obj.schema.type === 'array'">
              <div
                v-bind="obj.schema"
                :value="setValue(obj)"
                v-for="(item, idx) in setValue(obj)"
                :key="idx"
              >
                <slot :name="getKeyArraySlot(obj)" v-bind:item="item">
                  <v-form-base
                    :id="`${id}-${obj.key}-${idx}`"
                    :value="item"
                    :schema="obj.schema.schema"
                  />
                </slot>
              </div>
            </template>

            <!-- treeview -->
            <v-treeview
              v-else-if="obj.schema.type === 'treeview'"
              :items="setValue(obj)"
              v-model="obj.schema.model"
              :open.sync="obj.schema.open"
              v-bind="obj.schema"
              @input="onClick($event, obj, treeview)"
            ></v-treeview>

            <!-- list -->
            <template v-else-if="obj.schema.type === 'list'">
              <v-toolbar v-if="obj.schema.label" v-bind="obj.schema" dark>
                <v-toolbar-title>{{obj.schema.label}}</v-toolbar-title>
              </v-toolbar>
              <v-list v-bind="obj.schema">
                <v-list-item
                  v-for="(item, ix) in setValue(obj)"
                  :key="ix"
                  :class="obj.schema.selected === ix ? 'active' : 'inactive'"
                  @click="obj.schema.selected = ix; onClick($event, obj, 'list', ix)"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="obj.schema.item ? item[obj.schema.item] : item"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </template>

            <!-- checkbox || switch -->
            <div
              v-else-if="obj.schema.type === 'switch' || obj.schema.type === 'checkbox'"
              :is="mapTypeToComponent(obj.schema.type)"
              :input-value="setValue(obj)"
              v-bind="obj.schema"
              @change="onInput($event, obj)"
            ></div>

            <!-- file -->
            <v-file-input
              v-else-if="obj.schema.type === 'file' "
              :value="setValue(obj)"
              v-bind="obj.schema"
              @focus="onFocus($event, obj)"
              @change="onInput($event, obj)"
            ></v-file-input>

            <!-- Calendar -->
            <v-menu
              v-else-if="obj.schema.type === 'calendar' "
              v-model="menu"
              :close-on-content-click="false"
              offset-y
              full-width
              ref="menu1"
              max-width="290px"
              min-width="290px"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="obj.value"
                  v-on="on"
                  v-mask="obj.schema.mask"
                  v-bind="obj.schema"
                  @input="setDate(obj.value);"
                  @change="onInput($event, obj)"
                  id="required"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="datePic"
                @input="menu = false"
                @focus="onFocus($event, obj)"
                @change="onInput($event, obj)"
                :required="true"
                :max="new Date().toISOString().substr(0, 10)"
              ></v-date-picker>
            </v-menu>

            <!-- btn-toggle  :value="`${obj.value} ? ${obj.value} : ${datePic}`"-->
            <v-btn-toggle
              v-else-if="obj.schema.type === 'btn-toggle'"
              v-bind="obj.schema"
              color
              :value="setValue(obj)"
              @change="onInput($event, obj)"
            >
              <v-btn
                v-for="(b,ix) in obj.schema.options"
                v-bind="obj.schema"
                :key="ix"
                :value="sanitizeOptions(b).value"
              >
                <v-icon :dark="obj.schema.dark">{{sanitizeOptions(b).icon}}</v-icon>
                {{sanitizeOptions(b).label}}
              </v-btn>
            </v-btn-toggle>

            <!-- btn   -->
            <v-btn
              v-else-if="obj.schema.type === 'btn'"
              v-bind="obj.schema"
              @click="onClick($event, obj, button)"
            >
              <v-icon
                v-if="obj.schema.iconLeft"
                left
                :dark="obj.schema.dark"
              >{{obj.schema.iconLeft}}</v-icon>
              {{setValue(obj)}}
              <v-icon v-if="obj.schema.iconCenter" :dark="obj.schema.dark">{{obj.schema.iconCenter}}</v-icon>
              {{obj.schema.label}}
              <v-icon
                v-if="obj.schema.iconRight"
                right
                :dark="obj.schema.dark"
              >{{obj.schema.iconRight}}</v-icon>
            </v-btn>

            <!-- if masked use this v-text-field section - https://vuejs-tips.github.io/vue-the-mask/  -->
            <v-text-field
              v-else-if="obj.schema.mask"
              v-bind="obj.schema"
              v-mask="obj.schema.mask"
              :value="setValue(obj)"
              @focus="onFocus($event, obj)"
              @click:append="onClick($event, obj, append)"
              @click:append-outer="onClick($event, obj, appendOuter)"
              @click:clear="onClick($event, obj, clear )"
              @click:prepend="onClick($event, obj, prepend )"
              @click:prepend-inner="onClick($event, obj, prependInner )"
              @input="onInput($event, obj)"
            ></v-text-field>

            <!-- all other Types -> see typeToComponent -->
            <div
              v-else
              :is="mapTypeToComponent(obj.schema.type)"
              v-bind="obj.schema"
              :value="setValue(obj)"
              @focus="onFocus($event, obj)"
              @click:append="onClick($event, obj, append)"
              @click:append-outer="onClick($event, obj, appendOuter)"
              @click:clear="onClick($event, obj, clear )"
              @click:prepend="onClick($event, obj, prepend )"
              @click:prepend-inner="onClick($event, obj, prependInner )"
              @input="onInput($event, obj)"
              @blur="onBlur($event, obj)"
            ></div>
          </slot>
        </slot>

        <!-- slot at bottom of item  -> <div slot="slot-bottom-key-[deep-nested-key-name]> -->
        <slot :name="getTypeBottomSlot(obj)"></slot>
        <slot :name="getKeyBottomSlot(obj)"></slot>
      </v-flex>

      <!-- push next item to the right and fill space between items -->
      <v-spacer v-if="obj.schema.spacer" :key="`s-${index}`"></v-spacer>
    </template>
  </v-layout>
</template>

<script>
// import & declarations
import { get, isPlainObject, isFunction, isString, orderBy } from "lodash";
import { mask } from "vue-the-mask";

const typeToComponent = {
  // use native HTML5 Input Types - https://www.wufoo.com/html5/
  text: "v-text-field",
  password: "v-text-field",
  email: "v-text-field",
  tel: "v-text-field",
  url: "v-text-field",
  search: "v-text-field",
  number: "v-text-field",

  // map schema.type to vuetify-control (vuetify 2.0)
  range: "v-slider",
  file: "v-file-input",
  switch: "v-switch",
  checkbox: "v-checkbox",
  color: "v-color-picker",
  date: "v-date-picker",
  time: "v-time-picker",
  textarea: "v-textarea"
};
// Declaration
const orderDirection = "ASC";
const pathDelimiter = ".";
const classKeyDelimiter = "-";
const defaultID = "form-base";

const itemClassAppendix = "item";
const typeClassAppendix = "type";
const keyClassAppendix = "key";
const propertyClassAppendix = "prop";

const arraySlotAppendix = "slot-array";
const topSlotAppendix = "slot-top";
const itemSlotAppendix = "slot-item";
const bottomSlotAppendix = "slot-bottom";

const clear = "clear";
const button = "button";
const treeview = "treeview";
const append = "append";
const appendOuter = "append-outer";
const prepend = "prepend";
const prependInner = "prepend-inner";
//
export default {
  name: "v-form-base",

  // Info Mask https://vuejs-tips.github.io/vue-the-mask/
  directives: { mask },

  props: {
    id: {
      type: String,
      default: defaultID
    },
    value: {
      type: [Object, Array, String],
      required: true
    },
    schema: {
      type: [Object, Array],
      required: true
    }
  },

  data() {
    return {
      flatCombinedArray: [],
      clear,
      button,
      treeview,
      append,
      appendOuter,
      prepend,
      prependInner,
      menu: false,
      date: "",
      datePic: ""
    };
  },

  computed: {
    ref() {
      return this.id;
    },
    flatCombinedArraySorted() {
      return orderBy(this.flatCombinedArray, ["schema.sort"], [orderDirection]);
    },
    storeStateData() {
      this.updateArrayFromState(this.value, this.schema);
      return this.value;
    },
    storeStateSchema() {
      this.updateArrayFromState(this.value, this.schema);
      return this.schema;
    }
  },

  methods: {
    setDate(enteredDate) {
      const date = new Date(enteredDate);

      if (date.toString() !== "Invalid Date" && enteredDate.length > 9) {
        this.datePic = enteredDate;
      }
    },

    mapTypeToComponent(type) {
      // map ie. schema:{ type:'password', ... } to vuetify control v-text-field'
      return typeToComponent[type] ? typeToComponent[type] : `v-${type}`;
    },

    // KEY SLOTS
    getKeyArraySlot(obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-item'  -> 'slot-ARRAY-key-address-city'
      return this.getKeyClassNameWithAppendix(obj, arraySlotAppendix + "-key");
    },
    getKeyItemSlot(obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-item'  -> 'slot-item-key-address-city'
      return this.getKeyClassNameWithAppendix(obj, itemSlotAppendix + "-key");
    },
    getKeyTopSlot(obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-top'  -> 'slot-top-key-address-city'
      return this.getKeyClassNameWithAppendix(obj, topSlotAppendix + "-key");
    },
    getKeyBottomSlot(obj) {
      // get Key specific name by replacing '.' with '-' and prepending 'slot-bottom'  -> 'slot-bottom-key-address-city'
      return this.getKeyClassNameWithAppendix(obj, bottomSlotAppendix + "-key");
    },
    //
    // TYPE SLOTS
    getTypeItemSlot(obj) {
      // get Type specific slot name  -> 'slot-item-type-radio'
      return this.getTypeClassNameWithAppendix(obj, itemSlotAppendix + "-type");
    },
    getTypeTopSlot(obj) {
      // get Type specific slot name  -> 'slot-top-type-radio'
      return this.getTypeClassNameWithAppendix(obj, topSlotAppendix + "-type");
    },
    getTypeBottomSlot(obj) {
      // get Type specific slot name  -> 'slot-bottom-type-radio'
      return this.getTypeClassNameWithAppendix(
        obj,
        bottomSlotAppendix + "-type"
      );
    },
    //
    // CLASS Names
    getPropertyClassNameWithAppendix(obj, appendix) {
      // get PROP specific name by app-/prepending 'appendix-' and replacing '.' with '-' in nested key path  -> 'controls switch'
      return obj.key
        ? obj.key
            .split(pathDelimiter)
            .map(s => `${appendix ? appendix + classKeyDelimiter : ""}${s}`)
            .join(" ")
        : "";
    },
    getPropertyClassName(obj) {
      return this.getPropertyClassNameWithAppendix(obj, propertyClassAppendix);
    },
    getKeyClassNameWithAppendix(obj, appendix) {
      // get KEY specific name by app-/prepending 'appendix-' and replacing '.' with '-' in nested key path  -> 'top-slot-address-city'
      return `${appendix ? appendix + classKeyDelimiter : ""}${obj.key.replace(
        /\./g,
        "-"
      )}`;
    },
    getKeyClassName(obj) {
      return this.getKeyClassNameWithAppendix(obj, keyClassAppendix);
    },
    getTypeClassNameWithAppendix(obj, appendix) {
      // get TYPE specific class name by prepending '-type' -> 'type-checkbox'
      return `${appendix + classKeyDelimiter}${obj.schema.type}`;
    },
    getTypeClassName(obj) {
      return this.getTypeClassNameWithAppendix(obj, typeClassAppendix);
    },
    getFlexGridClassName(obj) {
      // get FLEX class from schema.flex ->  schema:{ flex:{ xs:12, md:4  } || flex: 4 } // flex: 4 -> is shorthand for -> flex:{ xs:4 }
      const keysToGridClassName = key =>
        Object.keys(key)
          .map(k => k + key[k])
          .join(" "); //  { xs:12, md:6, lg:4  } => 'xs12 md6 lg4'
      return obj.schema.flex
        ? isPlainObject(obj.schema.flex)
          ? keysToGridClassName(obj.schema.flex)
          : `xs${obj.schema.flex}`
        : "";
    },
    getOffsetGridClassName(obj) {
      // get OFFSET-FLEX class from schema.offset ->  schema:{ offset:{ xs:12, md:4  } || offset: 4 } // offset: 4 -> is shorthand for -> offset:{ xs:4 }
      const keysToOffsetClassName = key =>
        Object.keys(key)
          .map(k => `offset-${k}${key[k]}`)
          .join(" "); //  { xs:12, md:6, lg:4  } => 'xs12 md6 lg4'
      return obj.schema.offset
        ? isPlainObject(obj.schema.offset)
          ? keysToOffsetClassName(obj.schema.offset)
          : `offset-xs${obj.schema.offset}`
        : "";
    },
    getOrderGridClassName(obj) {
      // get ORDER-FLEX class from schema.order ->  schema:{ order:{ xs:12, md:4  } || order: 4 } // order: 4 -> is shorthand for -> order:{ xs:4 }
      const keysToOrderClassName = key =>
        Object.keys(key)
          .map(k => `order-${k}${key[k]}`)
          .join(" "); //  { xs:12, md:6, lg:4  } => 'xs12 md6 lg4'
      return obj.schema.order
        ? isPlainObject(obj.schema.order)
          ? keysToOrderClassName(obj.schema.order)
          : `order-xs${obj.schema.order}`
        : "";
    },
    getGridClassName(obj) {
      // combine Flex, Offset, Order into a classname
      return `${this.getFlexGridClassName(obj)} ${this.getOffsetGridClassName(
        obj
      )} ${this.getOrderGridClassName(obj)}`;
    },

    getClassName(obj) {
      // combines all into a single classname
      // class => ie. 'item type-checkbox key-address-zip prop-adress prop-zip xs12 md6 offset-xs0'
      return `${itemClassAppendix} ${this.getTypeClassName(
        obj
      )} ${this.getKeyClassName(obj)} ${this.getPropertyClassName(
        obj
      )} ${this.getGridClassName(obj)}`;
    },
    //
    // Map Values coming FROM Control or going TO Control
    toCtrl(params) {
      // manipulate value going to control, toCtrl-function must return a (modified) value
      // schema:{ name: { type:'text', toCtrl: ( {value} ) value && value.toUpperCase, ... }, ... }
      return isFunction(params.obj.schema.toCtrl)
        ? params.obj.schema.toCtrl(params)
        : params.value;
    },
    fromCtrl(params) {
      // manipulate updated value from control, fromCtrl-function must return a (modified) value
      // schema:{ name: { type:'text', fromCtrl: ( {value} ) value && value.toUpperCase, ... }, ... }
      return isFunction(params.obj.schema.fromCtrl)
        ? params.obj.schema.fromCtrl(params)
        : params.value;
    },
    //
    // Button-Toggle sanitize item from array schema.options
    sanitizeOptions(b) {
      return isString(b) ? { value: b, label: b } : b;
    },
    //
    // Set Value
    setValue(obj) {
      // Control gets a Value
      return this.toCtrl({
        value: obj.value,
        obj,
        data: this.storeStateData,
        schema: this.storeStateSchema
      });
    },
    //
    // Get Value from Input & other Events
    onInput(value, obj) {
      // Value after change in Control
      value = this.fromCtrl({
        value,
        obj,
        data: this.storeStateData,
        schema: this.storeStateSchema
      });

      // harmonize all empty strings to null, because clearable resets to null and not to empty string !!!
      value = value === "" ? null : value;

      // update deep nested prop(key) with value
      this.setObjectByPath(this.storeStateData, obj.key, value);

      this.emitValue("input", {
        on: "input",
        id: this.ref,
        index: this.ref.replace(/\D/g, ""),
        parentId: this.$parent.id,
        key: obj.key,
        value,
        obj,
        data: this.storeStateData,
        schema: this.storeStateSchema
      });
    },
    onClick(event, obj, pos, index) {
      this.emitValue("click", {
        on: "click",
        id: this.ref,
        index: index !== undefined ? index : this.ref.replace(/\D/g, ""),
        parentId: this.$parent.id,
        params: { text: event.srcElement && event.srcElement.innerText, pos },
        key: obj.key,
        value: obj.value,
        obj,
        event,
        data: this.storeStateData,
        schema: this.storeStateSchema
      });
    },
    onFocus(event, obj) {
      this.emitValue("focus", {
        on: "focus",
        id: this.ref,
        index: this.ref.replace(/\D/g, ""),
        parentId: this.$parent.id,
        key: obj.key,
        value: obj.value,
        obj,
        event,
        data: this.storeStateData,
        schema: this.storeStateSchema
      });
    },
    onBlur(event, obj) {
      this.emitValue("blur", {
        on: "blur",
        id: this.ref,
        index: this.ref.replace(/\D/g, ""),
        parentId: this.$parent.id,
        key: obj.key,
        value: obj.value,
        obj,
        event,
        data: this.storeStateData,
        schema: this.storeStateSchema
      });
    },
    onSwipe(pos, obj) {
      this.emitValue("swipe", {
        on: "swipe",
        id: this.ref,
        key: obj.key,
        value: obj.value,
        obj,
        params: { pos },
        data: this.storeStateData,
        schema: this.storeStateSchema
      });
    },
    onResize() {
      this.emitValue("resize", {
        on: "resize",
        id: this.ref,
        params: { x: window.innerWidth, y: window.innerHeight },
        data: this.storeStateData,
        schema: this.storeStateSchema
      });
    },
    //
    // Event Base
    emitValue(emit, val) {
      if (this.$parent.id) {
        this.$parent.$emit(this.getEventParentName(emit), {
          ...val,
          parent: this.$parent
        });
        if ("inputclick".indexOf(emit) > -1)
          this.$parent.$emit(this.getEventParentName("change"), {
            ...val,
            parent: this.$parent
          });
        this.$parent.$emit(this.getEventParentName("update"), {
          ...val,
          parent: this.$parent
        });
      } else {
        this.$emit(this.getEventName(emit), val); // listen to specific event
        if ("inputclick".indexOf(emit) > -1)
          this.$emit(this.getEventName("change"), val); // listen only to changes
        this.$emit(this.getEventName("update"), val); // all listen to events
      }
    },
    getEventName(eventName) {
      return this.ref !== defaultID ? `${eventName}:${this.ref}` : eventName;
    },
    getEventParentName(eventName) {
      return this.$parent.id !== defaultID
        ? `${eventName}:${this.$parent.id}`
        : eventName;
    },
    //
    // PREPARE ARRAYS DATA & SCHEMA
    setObjectByPath(object, path, value) {
      // resolves chained keys (like 'user.address.street') on an object and set the value
      let pathArray = path.split(pathDelimiter);
      pathArray.forEach((p, ix) => {
        if (ix === pathArray.length - 1) this.$set(object, p, value);
        object = object[p];
      });
    },
    updateArrayFromState(data, schema) {
      this.flatCombinedArray.forEach(obj => {
        obj.value = get(data, obj.key, null); // get - lodash
        obj.schema = get(schema, obj.key, null); // get - lodash
      });
    },
    flattenObjects(dat, sch) {
      let data = {};
      let schema = {};

      Object.keys(dat).forEach(i => {
        if (
          (!Array.isArray(dat[i]) && dat[i] && typeof dat[i] === "object") ||
          (Array.isArray(dat[i]) && Array.isArray(sch[i]))
        ) {
          let { data: flatData, schema: flatSchema } = this.flattenObjects(
            dat[i],
            sch[i]
          );
          Object.keys(flatData).forEach(ii => {
            data[i + pathDelimiter + ii] = flatData[ii];
            schema[i + pathDelimiter + ii] = flatSchema[ii];
          });
        } else {
          data[i] = dat[i];
          schema[i] = sch[i];
        }
      });
      return { data, schema };
    },
    combineObjectsToArray({ data, schema }) {
      let arr = [];
      Object.keys(data).forEach(key => {
        if (!schema[key]) {
          console.warn(
            `Property '${key}' in Data has no correspondingly Schema Property is not editable and keeps untouched!`
          );
          return;
        }
        if (!isPlainObject(schema[key])) {
          console.warn(
            `Prop '${key}' must have a correspondingly Property in Schema with at least ${key}:{ type:'text'} as value.  Prop '${key}' is not editable and keeps untouched!`
          );
          return;
        }
        arr.push({ key, value: data[key], schema: schema[key] });
      });
      return arr;
    },
    flattenAndCombineToArray(data, schema) {
      // flatten nested structure of both objects 'data' & 'schema' ...
      let flattenedObjects = this.flattenObjects(data, schema);
      // ... and combine them to an array
      return this.combineObjectsToArray(flattenedObjects);
    }
  },
  created() {
    this.flatCombinedArray = this.flattenAndCombineToArray(
      this.storeStateData,
      this.storeStateSchema
    );
  }
};
</script>
