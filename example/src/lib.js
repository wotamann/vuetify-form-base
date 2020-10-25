export default (eventValue) => {
  
  let { on, id, key, value, params, obj, data, schema, parent, index, event } = eventValue

  console.log(`-- v-form-base event ---------------------------------------`)
  console.log(`Event: ${on} | Key: ${key}@${id} | Value:`,value)
  // console.log(`Formbase-ID:${id}`)
  if (params) console.log(`Params:`, params)
  // console.log(`Key:${key}`)
  // console.log(`Value:`, value)
  console.log('Current Key Object:', obj)
  console.log('Model Object:', data)
  console.log('Schema Object:', schema)
 
  return eventValue
}
