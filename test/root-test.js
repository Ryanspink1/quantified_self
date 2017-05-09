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
    it('should return a 200', function(done){
      this.request.get('/api/v1/foods', function(error, response){
        if (error) { return done(error) }
        assert.equal(response.statusCode, 200);
        done();
      });
    });
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



});
