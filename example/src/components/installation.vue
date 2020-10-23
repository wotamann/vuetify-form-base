<template>
  <v-container fluid>
    
   <vue-markdown :source="md"/>
    
  </v-container>
</template>

<script>
import VFormBase from '@/components/vFormBase'
import Infoline from '@/components/infoline'
import VueMarkdown from 'vue-markdown'
import log from '@/lib'
   
export default {
  name: 'Textfields',
  components: { VFormBase, Infoline, VueMarkdown },
  data () {
    return {
      md:`

### Quickstart

Clone or download this Project, change current directory to **./vuetify-form-base/example**  and then run

\`npm install\`

\`npm run serve\`

or 

Download and open this [HTML-File](https://github.com/wotamann/vuetify-form-base/blob/master/umd/demo.html) in your Browser

---

### Installation

For proper working you need a Vue.js Project with Vuetify 2.0 installed. After successful installation of a [Vue 2.6 Project](https://vuejs.org/v2/guide/installation.html) you have to install [Vuetify 2.0](https://vuetifyjs.com/en/getting-started/quick-start/), the world’s most popular Vue.js framework for building feature rich, blazing fast applications.

**vuetify-form-base** is a [Vue.js single-file component](https://vuejs.org/v2/guide/single-file-components.html) with a .vue extension and you can use it like any other Vue-Component. 

\`npm install vuetify-form-base --save\`

**INFORMATION:** The vuetify-loader will also make code-splitting more effective, as webpack will only load the components required for that chunk to be displayed. But there is a limitation because **Vuetify-Form-Base** works with dynamic bind components 

\`<component is="my-component" />\`

The Vue-Loader can't autoload dynamic components with [Treeshaking](https://vuetifyjs.com/en/features/treeshaking/#dynamic-components) and therefore Vuetify-Components must be [manually imported](https://vuetifyjs.com/en/customization/a-la-carte/). Find more Information about dynamic Components in the official [Vue documentation](https://vuejs.org/v2/guide/components.html#Dynamic-Components).

### How to manually import components and directives 

#### Steps to import
1. Go to the file src/plugins/vuetify.js
2. Import the necessary components and directives used by vuetify-form-base:
  - Components
    - VRow
    - VCol
    - VTooltip
  - Directives
    - Ripple
    - Intersect
    - Touch
    - Resize
3. After this, the library will be successfully imported to your Vue file, and no errors on the console should appear.
4. If a new error appears on the console, it means component you are using is not imported. See the name of the component on the console and add to the plugin file.

#### Example file from src/plugins/vuetify.js

    // src/plugins/vuetify.js
    import Vue from 'vue';
    import Vuetify, {
        VRow,
        VCol,
        VTextField,
        VTooltip,
        VCheckbox,
        VSelect,
    } from 'vuetify/lib';
    import { Ripple, Intersect, Touch, Resize } from 'vuetify/lib/directives';

    Vue.use(Vuetify, {
        components: { VRow, VTooltip, VCol, VTextField, VCheckbox, VSelect },
        directives: { Ripple, Intersect, Touch, Resize },
    });

    export default new Vuetify({});

This example shows how to import the needed components and directives to use the vuetify-form-base and some basic components like VTextField, VCheckbox, VSelect.

### Quickstart with VUE-File

In order for your application to work correct, you must wrap it in a [v-app](https://next.vuetifyjs.com/en-US/framework/default-markup) component. This component is required and can exist anywhere inside the body, but must be the parent of ALL Vuetify components. **v-main** needs to be a direct descendant of **v-app**. 

    <!-- exampleFile.vue -->
    <template>
      <v-app>
      <!-- Since Vuetify 2.3.10 "v-content" is named "v-main"  -->
        <v-main>
          <v-container fluid>
            <v-form>
              <v-form-base :model="myModel" :schema="mySchema" @input="handleInput"/>
            </v-form>
          </v-container>   
        </v-main>
      </v-app>
    </template>
    // javascript
    import VFormBase from 'vuetify-form-base';  
    export default {	
      components:{ VFormBase },
      data () {
        return {
          myModel: {
            name: 'Jumo',
            password: '123456',
          },   
          mySchema: {
            name: { type: 'text', label: 'Name' },
            password: { type: 'password', label: 'Password' },
          }
        }
      },
      methods:{
        handleInput(val){
          console.log(val) 
        }
      }
    }
`
    }
  },
  methods: {
    log
  }
}
</script>
