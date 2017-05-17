var Diaries = require('../models/diary')
pry = require('pryjs')

function create(request, response){
  diary_params = [
    request.body.date,
    0,
    new Date
  ]
  Diaries.create(diary_params)
  .then(function(data){
    new_entry = data.rows[0]
    response.json(new_entry)
  });
}

function update(request,response){
  calories_params = [
    request.body.id,
    request.body.total_calories
  ]
  Diaries.update(calories_params)
  .then(function(data){
    let new_total = data.rows[0]
      if(!new_total) {
        response.sendStatus(404)
      }else{
        response.json(new_total)
      }
  })
}

module.exports = {
  create:create,
  update:update
}
