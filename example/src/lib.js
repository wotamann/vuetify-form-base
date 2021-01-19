export default (eventValue) => {
  
  let { on, id, key, value, params, obj, data, schema, index, event } = eventValue

  console.log(`--------- '${on}' event from '${key}@${id}' with value ${value} ---------------------------------------`)
  // console.log(`Key: ${key} | Value: ${value} | Index of Control: ${index}`)
  // console.log(`Key:${key}`)
  // console.log(`Value:`, value)
  console.log('current object:', obj)
  console.log('model:', data)
  console.log('schema:', schema)
  if (params) console.log(`params:`, params)
  if (index) console.log('index:', index)
  if (parent) console.log('parent:', parent)
  if (event) console.log('event:', event)
 
  return eventValue
}
