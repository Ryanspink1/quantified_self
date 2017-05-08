pry = require('pryjs')
const Food = require('../models/food')

function show(request, response) {
  Food.find(request.params.id)
  .then((data) => {
    let food = data.rows[0]

    if (food == null) {
      response.sendStatus(404)
    } else {
    response.json(food)
    }
  })
}

function create(request, response) {
  eval(pry.it)
  const name = request.body.name
  const calories = request.body.calories

  if (!name || !calories) {
    response.status(422).send({
      error: 'Missing food parameters.'
    })
  } else {
    Food.create(name, calories).then((data) => {
      response.status(201).json(data)
    })
  }
}

module.exports = {
  show: show,
  create: create
}
