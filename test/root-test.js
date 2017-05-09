var assert = require('chai').assert;
var request = require('request');
var app = require('../server');


var environment   = process.env.NODE_ENV || 'test'
var configuration = require('../knexfile')[environment]
var database      = require('knex')(configuration)

describe('Server', () => {
  before(function(done){
    this.port = 9876;
    this.server = app.listen(this.port, function(error, result){
      if (error) { return done(error); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    });
  });

  after(function(){
    this.server.close();
  });

  it('should exist', () =>{
    assert(app);
  });

  // ROOT TEST

  describe('GET /', function(){
    it('should return a 200', function(done){
      this.request.get('/', function(error, response){
        if (error) { return done(error) }
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  // INDEX TEST

  describe('GET /api/v1/foods', function(){
    beforeEach(function(done){
      Promise.all([
        database.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Steak", 500, new Date]
        ),
        database.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Chimichangas", 1000,new Date]
        )
      ])
      .then(function(){
        done();
      });
    });

    afterEach(function(done){
      database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(function(){
        done();
      });
    });

    it('should return a 200 if the response is found', function(done){
      this.request.get('/api/v1/foods', function(error, response){
        if(error){ done(error) }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should return all parameters for all food items', function(done){
      this.request.get('/api/v1/foods', function(error, response){
        if(error){ done(error) }

        var idOne = 1;
        var nameOne = 'Steak';
        var idTwo = 2;
        var nameTwo = 'Chimichangas';
        var caloriesOne = 500;
        var caloriesTwo = 1000;
        let parsedFoods = JSON.parse(response.body.toString());

        assert.equal( parsedFoods[0].id, idOne);
        assert.equal( parsedFoods[1].id, idTwo);
        assert.notEqual(parsedFoods[0].id, parsedFoods[1].id);

        assert.equal( parsedFoods[0].name, nameOne);
        assert.equal( parsedFoods[1].name, nameTwo);
        assert.notEqual(parsedFoods[0].name, parsedFoods[1].name);

        assert.equal( parsedFoods[0].calories, caloriesOne);
        assert.equal( parsedFoods[1].calories, caloriesTwo);
        assert.notEqual(parsedFoods[0].calories, parsedFoods[1].calories);

        assert.ok(parsedFoods[0].created_at)
        assert.ok(parsedFoods[1].created_at)
        done();
      })
    })
  });

 // SHOW TEST

  describe('GET /api/v1/foods/:id', function(){
    beforeEach(function(done){
      database.raw('INSERT INTO foods (name, calories, created_at) VALUES (?,?,?)',
      ["Steak", 500, new Date])
      .then(function(){
        done();
      });
    });

    afterEach(function(done){
      database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(function(){
        done();
      });
    });

    it('should return 404 if resource is not found', function(done) {
      this.request.get('/api/v1/foods/10000', function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404);
        done();
      });
    });

    it('should return a 200', function(done){
      this.request.get('/api/v1/foods/1', function(error, response){
        if (error) { return done(error) }
        assert.equal(response.statusCode, 200);
        assert(response.body.includes('1'));
        done();
      });
    });

    it('should return all food params', function(done){
      this.request.get('/api/v1/foods/1', function(error, response){
        if(error){ done(error) }
        let parsedFood = JSON.parse(response.body.toString());

        assert.equal(parsedFood.id, 1);
        assert.equal(parsedFood.name, 'Steak');
        assert.equal(parsedFood.calories, 500);
        assert.ok(parsedFood.created_at);
        done();
      })
    });
  });

  // POST TEST

  describe('POST /api/v1/foods', function(){
    beforeEach(function(done){
      database.raw('INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ["Steak", 500, new Date])
      .then(function(){
        done();
      });
    });

    afterEach(function(done){
      database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(function(){
        done();
      });
    });

    it('should create a new food item', function(done){
      var id = 2;
      var food_params = { name: 'Ham', calories: 200, created_at: new Date}
      this.request.post('/api/v1/foods', {form: food_params}, function(error, response) {
        let parsedFood = JSON.parse(response.body.toString());

        assert.equal(response.statusCode, 200);
        assert.equal(parsedFood.id, id);
        assert.equal(parsedFood.name, food_params.name);
        assert.equal(parsedFood.calories, food_params.calories);
        done();
      })
    })
  });

  // DELETE TEST

  describe('DELETE /api/v1/foods', function(){
    beforeEach(function(done){
      database.raw('INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ["Steak", 500, new Date])
      .then(database.raw('INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ["Ham", 400, new Date]))
      .then(function(){
        done();
      });
    });

    afterEach(function(done){
      database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(function(){
        done();
      });
    });

    it('should return 200', function(done){
      var food_params = { id: 2, name: 'Ham', calories: 400}
      this.request.delete('/api/v1/foods/2', function(error, response) {
        if (error) { return done(error) }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should delete the item', function(done){
      var food_params = { id: 2, name: 'Ham', calories: 400}
      this.request.delete('/api/v1/foods/2', function(error, response) {
      })
        this.request.get('/api/v1/foods', function(error, response){
          if(error){ done(error) }

          var idOne = 1;
          var nameOne = 'Steak';
          var idTwo = 2;
          var nameTwo = 'Ham';
          var caloriesOne = 500;
          var caloriesTwo = 400;
          let parsedFoods = JSON.parse(response.body.toString());

          // assert.equal( parsedFoods[0].id, idOne);
          // assert.equal( parsedFoods[1].id, idTwo);
          // assert.notEqual(parsedFoods[0].id, parsedFoods[1].id);
          //
          // assert.equal( parsedFoods[0].name, nameOne);
          // assert.equal( parsedFoods[1].name, nameTwo);
          // assert.notEqual(parsedFoods[0].name, parsedFoods[1].name);
          //
          // assert.equal( parsedFoods[0].calories, caloriesOne);
          // assert.equal( parsedFoods[1].calories, caloriesTwo);
          // assert.notEqual(parsedFoods[0].calories, parsedFoods[1].calories);

          assert.isOk(parsedFoods[0])
          assert.isNotOk(parsedFoods[1])
          done();
        })
      // })
    })
  })



});
