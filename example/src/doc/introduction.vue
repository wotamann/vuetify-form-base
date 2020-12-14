<template>
  <v-container fluid>    
   <vue-markdown :html=true :show=true lang-prefix="lang-js">
     {{md}}
   </vue-markdown>
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
      md:
`
### Why Vuetify-Form-Base?

**Vuetify-Form-Base** is a Model based Form-Generator. The Goal of the Project is to provide a Tool to generate an editable Form from any Data-Model, even if the Model is deep nested. This Form Generator works as [Vue Component](https://vuejs.org/v2/guide/components.html) and can easily be integrated into any Vue Project.   

If you have to generate Forms or you have to edit Data presented as JS-Objects, then take a closer look at **Vuetify-Form-Base** and try it. It can make your work much easier and save your time. Furthermore if you don't define a Schema, then **Vuetify-Form-Base** tries to generate a schema automatically. This works if the Model Values are of Type 'string', 'number' or 'bool'.

**Vuetify-Form-Base** uses the well known and excellent [Component Framework Vuetify 2.0](https://vuetifyjs.com/) to style and layout your Form. Vuetify Controls have a clear, minimalistic design and support responsive Design. If necessary add specific layouts by using the implemented Vuetify [Grid System](https://vuetifyjs.com/en/components/grids/).

---

Let us take the following example and imagine you get Data as JS-Object and you have to create an editable Form. 
\`\`\`
myModel: {
	name: 'Jumo',
	position: 'Coder',
	tasks: [
		{ 
		  done: true,
		  title: 'make refactoring' 
		},
		{ 
		  done: false,
		  title: 'write documentation'  
		},
		{ 
		  done: true,
		  title: 'remove logs'  
		}        
	]        
}
\`\`\`
Normally you have to flatten the Data-Structure and map all to an appropriate Format. Then you have to define a HTML-Form and animate it with your Data. 
With **Vuetify-Form-Base** create a Schema Object with the same Structure as your Model-Data. 
\`\`\`
mySchema: {
	name: { type:'text', label:'Name' },
	position: { type:'text', label:'Position' },
	tasks: { 
		type: 'array',
		schema: { 
			done:{ type:'checkbox', label:'done', col:3}, 
			title:{ type:'text', col:9 }
		} 
	}
}  
\`\`\`

It is a [Vue Component](https://vuejs.org/v2/guide/components.html) and can easily be integrated like any other Vue component.   

    <v-form-base :model="myModel" :schema="mySchema" @input="handleInput" />

and you will get a full reactive, editable Form

![Demo](https://raw.githubusercontent.com/wotamann/vuetify-form-base/master/images/array-schema.PNG)

`
    }
  }
}
</script>
