export default (val) => {
  let { on, id, index, key, value, obj, params, data, schema, parent } = val
  console.log(' Formbase-ID:', id, ' is updated on', on)
  console.log('Index:', index, ' Key|Value:', key, '|', value, ' Params:', params)
  console.log('Object:', obj)
  console.log('Data:', data)
  console.log('Schema:', schema)
  if (parent) console.log('Parent:', parent)
  console.log('-----------------------------------')

  return val
}
