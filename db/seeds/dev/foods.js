exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meal_diaries RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO foods (name, visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Banana","on", 34, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["French Silk Pie", "on", 340, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Orange","on", 34, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Deep Dish Pizza","on", 890, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Spinach Salad w/dressing","on", 240, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Roasted Cauliflower","on", 80, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Chicken Breast","on", 210, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Dark Chocolate","on", 150, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Beef Jerky","on", 95, new Date]
      )
    ]);
  });
};
