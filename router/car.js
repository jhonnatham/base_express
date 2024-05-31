const express = require('express')
const router = express.Router()

// validate request
const { check, validationResult } = require('express-validator')
const myValidationResult = validationResult.withDefaults({
    formatter: error => error.msg,
  });


let cars = require('../data/coches.json');


// example get request
router.get('/', (req, res) => {
    res.send(cars)
})

// example get request regular expression
router.get('/id/:carid([0-9]+)', (req, res) => {
    const car = cars.find((row) => row.id == req.params.carid )
    if (car == undefined) {
        res.status(400).send('No se encuentra el vehiculo')
    } else {
        res.status(200).send(car)
    }
})

router.get('/marca/:marca', (req, res) => {
    const car = cars.filter((row) => row.marca == req.params.marca )

    if (car.length == 0) {
        res.status(200).send('No se encuentra el vehiculo')
    } else {
        res.status(200).send(car)
    }
})

// example post 

router.post('/', check('marca', 'La marca no puede  ser vacia').notEmpty(), (req, res) => {
    const errors = myValidationResult(req).array();
    if (errors.length > 0) {
        return res.status(422).json({errors: errors})
    }

    let carid = cars.length + 1

    let coche = {
        id: carid,
        marca: req.body.marca,
        model: req.body.model,
        year: req.body.year
    }

    cars.push(coche)
    res.status(201).send(coche)
})


// example put 
router.put('/:id', [
    check('marca', 'La marca no puede  ser vacia').notEmpty(),
    check('model', 'El modelo no puede  ser vacia').notEmpty(),
], (req, res) => {
    const errors = myValidationResult(req).array();
    if (errors.length > 0) {
        return res.status(422).json({errors: errors})
    }

    const car = cars.find((row) => row.id == req.params.id )
    if (car == undefined) {
        return res.status(404).send('No se encuentra el vehiculo')
    } 

    car.marca = req.body.marca
    car.model = req.body.model
    car.year = req.body.year

    res.status(204).send()
})

// example delete
router.delete('/:id', (req, res) => {
    const errors = myValidationResult(req).array();
    if (errors.length > 0) {
        return res.status(422).json({errors: errors})
    }

    const car = cars.find((row) => row.id == req.params.id )
    if (car == undefined) {
        return res.status(404).send('No se encuentra el vehiculo')
    } 

    const index = cars.indexOf(car)
    cars.splice(index,1)

    res.status(200).send("coche borrado")
})

module.exports = router
