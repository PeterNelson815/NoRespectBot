
const express = require('express')

const { getProperty } = require('./datastore.js')

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/messageCounter', async (req, res) => {
  const messageCount = await getProperty('messageCount')
  if (!messageCount) res.send('error reading data store')
  res.send(`Message Count: ${messageCount}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const http = require('http')
setInterval(function () {
  console.log(`poking myself to stay awake at ${new Date(Date.now())}`)
  http.get('http://bsb-no-respect-bot.herokuapp.com/')
}, 300000) // every 5 minutes (300000)