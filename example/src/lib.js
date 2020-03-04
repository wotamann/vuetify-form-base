export default (val) => {
  let { on, id, key, value, params, obj, data, schema, parent, index, event } = val

  console.log(`-- v-form-base event ---------------------------------------`)
  console.log(`Event: ${on} | Key: ${key}@${id} | Value:`,value)
  // console.log(`Formbase-ID:${id}`)
  // console.log(`Key:${key}`)
  // console.log(`Value:`, value)
  if (params) console.log(`Params:`, params)
  console.log('Value Object:', data)
  console.log('Schema Object:', schema)
  console.log('Key Object:', obj)
  // if (parent) console.log(`Parent ID:${parent.id} | Parent:`, parent)
  // if (index == true) console.log(`Index of Array:>${index}<`)
  // if (event) console.log('Event:', event)

  return val
}
