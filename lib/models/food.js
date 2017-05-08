pry = require('pryjs')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function find(id){
  return database.raw('SELECT * FROM foods WHERE id= ? LIMIT 1', [id])
}

function create (name, calories) {
  eval(pry.it);
  return database.raw(
    'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?) RETURNING id',
    [name, calories, new Date]
  ).then((data) => {
    const id = data.rows[0]['id']
    return find(id)
  })
}

module.exports = {
  find: find,
  create: create
}
