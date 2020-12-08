import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/nominations', (req, res) => {
  res.json(data)
})

app.get('/year/:year', (req, res) => {
  const year = req.params.year
  const wonParam = req.query.won

  let yearFilter = data.filter((movie) => movie.year_award === +year)

  if (wonParam === 'true') {
    yearFilter = yearFilter.filter((movie) => movie.win === true)
  } else if (wonParam === 'false') {
    yearFilter = yearFilter.filter((movie) => movie.win === false)
  }

  res.json(yearFilter)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
