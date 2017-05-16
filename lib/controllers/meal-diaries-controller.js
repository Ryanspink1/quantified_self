var MealDiaries = require('../models/meal-diaries')
pry = require('pryjs')

function create(request, response){
  mealDiariesParams = [
    request.body.foodID,
    request.body.diaryID,
    request.body.mealID,
    new Date
  ]

  MealDiaries.create(mealDiariesParams)
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

  // eval(pry.it)
  MealDiaries.all(mealDiariesParams)
    .then(function(data){
      new_item = data.rows
      // new_item.i = mealDiariesParams[1]
      // console.log(new_item)
      response.json(new_item)
    });
}


module.exports = {
  create:create,
  index:index
}
