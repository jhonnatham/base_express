const express = require('express')
const app = express()
const permisos = require('./midlleware/validationUser')
const logs = require('./midlleware/registerLog')
const car = require('./router/car')

const port = process.env.PORT || 3003

// process request format json
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