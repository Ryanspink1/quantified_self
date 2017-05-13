var environment   = process.env.NODE_ENV || 'development'
var configuration = require('../../knexfile')[environment]
var database      = require('knex')(configuration)
pry = require('pryjs')


function find(id) {
  return database.raw('SELECT * FROM foods WHERE id = ? LIMIT 1', [id])
}

function create(params){
  return database.raw('INSERT INTO foods (name, visible, calories, created_at) VALUES (?, ?, ?, ?) RETURNING *', params)
}

function all(params){
  return database.raw("SELECT * FROM foods WHERE visible = 'true'")
}

function destroy(id){
  return database.raw('DELETE FROM foods WHERE id = ?', [id] )
}

function update(params){
  // eval(pry.it)
  // this.timeout(100000);
  return database.raw(`UPDATE foods SET name = ?,visible = ?, calories = ? WHERE id = ? RETURNING *`, [params[1], params[2], params[3], params[0]])
}

module.exports = {
  find: find,
  create:create,
  all:all,
  destroy:destroy,
  update:update
}
