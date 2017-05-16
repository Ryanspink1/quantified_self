var environment   = process.env.NODE_ENV || 'development'
var configuration = require('../../knexfile')[environment]
var database      = require('knex')(configuration)

function create(params){
  // eval(pry.it);
  return database.raw('INSERT INTO diaries (date, total_calories, created_at) VALUES (?, ?, ?) RETURNING *', params)
}

module.exports = {
  create:create
}
