var MealDiaries = require('../models/meal-diaries')
pry = require('pryjs')

function create(request, response){
  mealParams = [
    request.body.foodID,
    request.body.diaryID,
    request.body.mealID,
    new Date
  ]
  
  MealDiaries.create(mealParams)
    .then(function(data){
      new_item = data.rows[0]
      response.json(new_item)
    });
}

function index (request, response){
  mealDiariesParams = [
    request.query.diaryID,
    request.query.mealID
  ]

  MealDiaries.all(mealDiariesParams)
    .then(function(data){
      new_item = data.rows
      response.json(new_item)
    });
}

function destroy (request, response){
  MealDiaries.destroy(request.body)
  .then(function(data){
    response.sendStatus(200)
  })
}


module.exports = {
  create:create,
  index:index,
  destroy:destroy
}
