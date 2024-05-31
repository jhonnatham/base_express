const express = require('express')
const app = express()
const permisos = require('./validationUser')
const logs = require('./registerLog')
const car = require('./cars/car')

const port = process.env.PORT || 3003

app.use(express.json())

// middleware cualquier peticion
app.use(permisos)

// middleware path especifico
app.use('/api/cars$', logs, permisos)

// Example  router
app.use('/api/cars', car)

// example  get
app.get('/', function (req, res) {
  res.send('Hello World')
})




// execute  server
app.listen(port, () => console.log(`Conectado al puerto ${port}`))