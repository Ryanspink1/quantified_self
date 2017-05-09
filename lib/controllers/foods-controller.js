var Foods = require('../models/food')

function create(request, response){
  food_params = [
    request.body.name,
    request.body.calories,
    request.body.created_at
  ]
  Foods.create(food_params)
    .then(function(data){
      new_item = data.rows[0]
      response.json(new_item)
    });
}


function show(request, response) {
  Foods.find(request.params.id)
  .then(function(data) {
    let food = data.rows[0]
    if(!food) {
      response.sendStatus(404)
    }else{
      response.json(food)
    };
  });
}


module.exports = {
  show: show,
  create:create
}
