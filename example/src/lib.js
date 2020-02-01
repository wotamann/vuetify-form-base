export default (val) => {
  let { on, id, key, value, params, obj, data, schema, parent, index, event } = val

  console.log(`-- v-form-base ---------------------------------------`)
  console.log(`Formbase-ID:${id} has been updated from '${on}'`)
  console.log(`Key:${key}`)
  console.log(`Value:`, value)
  if (params) console.log(`Params:`, params)
  console.log('Data:', data)
  console.log('Schema:', schema)
  console.log('Object:', obj)
  if (parent) console.log(`Parent ID:${parent.id} | Parent:`, parent)
  if (index == true) console.log(`Index of Array:>${index}<`)
  if (event) console.log('Event:', event)

  return val
}
