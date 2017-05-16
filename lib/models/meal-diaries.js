var environment   = process.env.NODE_ENV || 'development'
var configuration = require('../../knexfile')[environment]
var database      = require('knex')(configuration)
pry = require('pryjs')



function create(params){
  return database.raw('INSERT INTO meal_diaries (food_id, diary_id, meal_id, created_at) VALUES (?, ?, ?, ?) RETURNING *', params)
}


module.exports = {
  create:create,
}
