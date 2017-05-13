exports.seed = function(knex, Promise) {
  return knex.raw('')
  .then(() => {
    return Promise.all([
      // knex.raw('INSERT INTO meal_diaries (food_id, diary_id, meal_id, created_at) VALUES(?,?,?,?)', [ 1 , 1, 1, new Date ]),
      // knex.raw('INSERT INTO meal_diaries (food_id, diary_id, meal_id, created_at) VALUES(?,?,?,?)', [ 2 , 2, 2, new Date ]),
      // knex.raw('INSERT INTO meal_diaries (food_id, diary_id, meal_id, created_at) VALUES(?,?,?,?)', [ 3 , 3, 3, new Date ]),
      // knex.raw('INSERT INTO meal_diaries (food_id, diary_id, meal_id, created_at) VALUES(?,?,?,?)', [ 4 , 4, 4, new Date ]),
      // knex.raw('INSERT INTO meal_diaries (food_id, diary_id, meal_id, created_at) VALUES(?,?,?,?)', [ 3 , 1, 1, new Date ]),
      // knex.raw('INSERT INTO meal_diaries (food_id, diary_id, meal_id, created_at) VALUES(?,?,?,?)', [ 4 , 1, 1, new Date ]),
      // knex.raw('INSERT INTO meal_diaries (food_id, diary_id, meal_id, created_at) VALUES(?,?,?,?)', [ 5 , 1, 1, new Date ]),
      // knex.raw('INSERT INTO meal_diaries (food_id, diary_id, meal_id, created_at) VALUES(?,?,?,?)', [ 6 , 1, 1, new Date ])

    ]);
  });
};

// TRUNCATE meal_diaries RESTART IDENTITY
