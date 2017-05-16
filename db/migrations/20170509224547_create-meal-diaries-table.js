
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE meal_diaries(

    id SERIAL PRIMARY KEY NOT NULL,
    food_id INTEGER,
    diary_id INTEGER,
    meal_id INTEGER,
    created_at TIMESTAMP
  )`;
  // let createQuery = `CREATE TABLE meal_diaries(
  //   id SERIAL PRIMARY KEY NOT NULL,
  //   food_id integer REFERENCES foods,
  //   diary_id integer REFERENCES diaries,
  //   meal_id integer REFERENCES meals,
  //   created_at TIMESTAMP
  // )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE meal_diaries`;
  return knex.raw(dropQuery);
};
