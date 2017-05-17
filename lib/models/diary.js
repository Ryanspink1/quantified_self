var environment   = process.env.NODE_ENV || 'development'
var configuration = require('../../knexfile')[environment]
var database      = require('knex')(configuration)

function create(params){
  return database.raw('INSERT INTO diaries (date, total_calories, created_at) VALUES (?, ?, ?) ON CONFLICT (date) DO UPDATE SET date=EXCLUDED.date RETURNING *', params)
  // return database.raw('INSERT INTO diaries (date, total_calories, created_at) VALUES (?, ?, ?) ON CONFLICT (date) DO NOTHING RETURNING *', params)

  // return database.raw('INSERT INTO diaries (date, total_calories, created_at) VALUES (?, ?, ?) RETURNING *', params)
}

function update(params){
  return database.raw(`UPDATE diaries SET total_calories = ? WHERE id = ? RETURNING *`, [params[1], params[0]])
}

module.exports = {
  create:create,
  update:update
}
