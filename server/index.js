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

// 10 % franchise fee
const FEE = 0.1

// helper to round and format currency
const roundMoney = m => (Math.round(m * 100) / 100).toFixed(2)

// return a sorted array based on last name
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

// return dict of locations based on location id
app.get('/locations', async (req, res) => {
  try {
    const entries = locations.map(l => [l._id, l.address])
    const data = Object.fromEntries(entries)
    res.send(data)
  } catch (e) {
    res.sendStatus(http.BAD_REQUEST)
  }
})
// return totalSales, totalFee and a dict on location_id
// each location also has fee and total sales calculated and rounded
app.get('/sales', async (req, res) => {
  try {
    // groupBy is not async but would be if we called an external service such as a DB
    const data = await groupBy(sales, f => f.location_id)
    const totalSales = sales
      .map(sale => sale.subtotal)
      .reduce((a, b) => a + b)

    for (let [k, v] of Object.entries(data)) {
      const total = v
        .map(sale => sale.subtotal)
        .reduce((a, b) => a + b)
      data[k] = {
        sales: v,
        total: roundMoney(total),
        fee: roundMoney(total * FEE),
      }
    }
    res.send({
      ...data,
      totalSales: roundMoney(totalSales),
      totalFee: roundMoney(totalSales * FEE),
    })

  } catch (e) {
    res.sendStatus(http.BAD_REQUEST)
  }
})
