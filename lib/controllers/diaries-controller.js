var Diaries = require('../models/diary')
pry = require('pryjs')
function create(request, response){
  // eval(pry.it);
  diary_params = [
    request.body.date,
    0,
    new Date
  ]
  // eval(pry.it);
  Diaries.create(diary_params)
  .then(function(data){
    new_entry = data.rows[0]
    response.json(new_entry)
  });
}

module.exports = {
  create:create
}
