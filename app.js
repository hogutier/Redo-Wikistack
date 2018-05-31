const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { db } = require('./models')
const app = express()
const PORT = 3000

// Logging middleware
app.use(morgan('dev'))

// Body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Static middleware
app.use(express.static(path.join(__dirname, 'public')))

// If you want to add routes, they should go here!

// For all GET requests that aren't to an API route,
// we will send the index.html!
const layout = require('./views/layout')

app.get('/', (req, res, next) => {
  res.send(layout("Hello World!"))
})

// Handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handling endware
app.use((err, req, res, next) => {
  console.error(err.message)
  console.error(err.stack)
  res.status(err.status || 500)
  res.send(err.message || 'Internal server error')
})

const init = async () => {
  try {
    await db.sync({force: true}).then(() => console.log('The database is synced'))
    await app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
  } catch (error) {
    next(error)
  }
}
init();

