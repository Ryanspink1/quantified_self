exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(() => {
    return Promise.all([
      knex.raw(
        'INSERT INTO foods (name, visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Banana","true", 34, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["French Silk Pie", "true", 340, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Orange","true", 34, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Deep Dish Pizza","true", 890, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Spinach Salad w/dressing","true", 240, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Roasted Cauliflower","true", 80, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Chicken Breast","true", 210, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Dark Chocolate","true", 150, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name,visible, calories, created_at) VALUES (?, ?, ?, ?)',
        ["Beef Jerky","true", 95, new Date]
      )
    ]);
  });
};
