var environment   = process.env.NODE_ENV || 'development'
var configuration = require('../../knexfile')[environment]
var database      = require('knex')(configuration)
pry = require('pryjs')



function create(params){
  return database.raw('INSERT INTO meal_diaries (food_id, diary_id, meal_id, created_at) VALUES (?, ?, ?, ?) RETURNING *', params)
}

function all(params){
  return database.raw(`SELECT foods.id as id, foods.name AS food, foods.calories AS calories FROM foods INNER JOIN meal_diaries ON foods.id = meal_diaries.food_id WHERE meal_diaries.diary_id= ${params[0]} AND meal_diaries.meal_id = ${params[1]}`)
}

function destroy(params){
  return database.raw(`DELETE FROM meal_diaries WHERE meal_diaries.food_id = ${params.id} AND meal_diaries.diary_id = ${params.diary_id} AND meal_diaries.meal_id = ${params.meal_id}`)
}


module.exports = {
  create:create,
  all:all,
  destroy:destroy
}
