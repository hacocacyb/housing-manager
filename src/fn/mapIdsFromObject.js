module.exports = (obj) => {
  Object.keys(obj).forEach((keyName) => {
    if (typeof obj[keyName] === 'object') {
      obj[keyName] = obj[keyName].id
    }
  })
  return obj;
}
