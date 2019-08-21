export default (val) => {
  let { on, id, index, key, value, obj, params, data, schema, parentId, parent, event } = val

  console.log('-----------------------------------')
  console.log('Formbase-ID:', id, ' has been updated on', on)
  if (index) console.log('Index:', index)
  console.log('Key|Value:', key, '|', value, ' Params:', params)
  console.log('Object:', obj)
  console.log('Data:', data)
  console.log('Schema:', schema)
  if (parent) console.log('Parent:', parentId, parent)
  if (event) console.log('Event:', event)

  return val
}
