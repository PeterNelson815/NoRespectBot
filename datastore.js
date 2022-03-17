const fs = require('fs-extra')
const datastoreFilename = 'store.json'

const getStore = async () => {
  try {
    fs.ensureFile(datastoreFilename)
    const data = await fs.readJson(datastoreFilename)
    console.log(`just got the store: ${data}`)
    formattedData = JSON.parse(data)
    return formattedData

  } catch (err) {
    console.log('err:', err.toString())
    return null
  }
}

const getProperty = async key => {
  const store = await getStore()
  return store && store[key]
}

const writeToStore = async (key, value) => {
  const store = await getStore() || {}
  store[key] = value
  try {
    await fs.outputJson(datastoreFilename, JSON.stringify(store))
    console.log(`successfully wrote ${key}:${value} to store`)

  } catch (err) {
    if (err) console.log(err)
  }
}

module.exports = {
  getProperty,
  getStore,
  writeToStore
}
