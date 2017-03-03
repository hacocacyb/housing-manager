module.exports = (obj) => {
  Object.keys(obj).forEach((keyName) => {
    const val = obj[keyName]
    if (val && typeof val === 'object') {
      obj[keyName] = val.id
    }
  })
  return obj;
}
