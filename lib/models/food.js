var environment   = process.env.NODE_ENV || 'development'
var configuration = require('../../knexfile')[environment]
var database      = require('knex')(configuration)


function find(id) {
  return database.raw('SELECT * FROM foods WHERE id = ? LIMIT 1', [id])
}

function create(params){
  return database.raw('INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?) RETURNING *', params)
}

function all(params){
  return database.raw('SELECT * FROM foods')
}



module.exports = {
  find: find,
  create:create,
  all:all
}
