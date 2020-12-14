export default (eventValue) => {
  
  let { on, id, key, value, params, obj, data, schema, parent, index, event } = eventValue

  console.log(`------ '${on}' Event from '${key}@${id}' has Value ${value} ---------------------------------------`)
  // console.log(`Key: ${key} | Value: ${value} | Index of Control: ${index}`)
  if (params) console.log(`Params:`, params)
  // console.log(`Key:${key}`)
  // console.log(`Value:`, value)
  console.log('Current Object:', obj)
  console.log('Model:', data)
  console.log('Schema:', schema)
  if (parent) console.log('Parent Object:', parent)
 
  return eventValue
}
