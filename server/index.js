const cors = require('cors')
const express = require('express')
const groupBy = require('lodash.groupby')
const http = require('http-status-codes').StatusCodes

const franchisees = require('./data/franchisees.json')
const locations = require('./data/locations.json')
const sales = require('./data/sales.json')

const app = express()
app.use(cors())

app.listen(3333, () => console.log('Express on 3333'))

app.get('/franchisees', async (req, res) => {
  try {
    const sorted = franchisees.sort((a,b) => {
      if (a.last_name < b.last_name) return -1
      if (a.last_name > b.last_name) return 1
      return 0
    })
    res.send(sorted)
  } catch (e) {
    res.sendStatus(http.BAD_REQUEST)
  }
})

app.get('/locations', async (req, res) => {
  try {
    const entries = locations.map(l => [l._id, l.address])
    const data = Object.fromEntries(entries)
    res.send(data)
  } catch (e) {
    res.sendStatus(http.BAD_REQUEST)
  }
})

app.get('/sales', async (req, res) => {
  try {
    const data = await groupBy(sales, f => f.location_id)
    res.send(data)
  } catch (e) {
    res.sendStatus(http.BAD_REQUEST)
  }
})
