export default (eventValue) => {
  
  let { on, id, key, value, params, obj, data, schema, parent, index, event } = eventValue

  console.log(`------ '${on}' event from '${key}@${id}' with value ${value} ---------------------------------------`)
  // console.log(`Key: ${key} | Value: ${value} | Index of Control: ${index}`)
  if (params) console.log(`params:`, params)
  // console.log(`Key:${key}`)
  // console.log(`Value:`, value)
  console.log('current object:', obj)
  console.log('model:', data)
  console.log('schema:', schema)
  if (parent) console.log('parent object:', parent)
 
  return eventValue
}
