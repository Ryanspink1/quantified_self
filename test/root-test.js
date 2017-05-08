const assert = require('chai').assert;
const request = require('request');
const app = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

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

  describe('GET /', function(){
    it('should return a 200', function(done){
      this.request.get('/', function(error, response){
        if (error) { return done(error) }
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  describe('GET /api/v1/foods', function(){
    it('should return a 200', function(done){
      this.request.get('/api/v1/foods', function(error, response){
        if (error) { return done(error) }
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });

  it('GET /api/v1/foods/:id', () => {
    beforeEach((done) => {
      database.raw('INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ['steak', 500, new Date])
      .then(()=> {
        done()
      })
    })
    afterEach((done) => {
      database.raw('TRUNCATE foods RESTART IDENTITY')
      .then(() => done());
    })

    it('should return a 404 if the resource is not found', (done) => {
      this.request.get('/api/v1/foods/10000', (error, response) => {
        if (error) { done(error) }
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it('should have the id and the message from the resource', (done) => {
      this.request.get('/api/v1/foods/1', (error, response) => {
        if (error) { done(error) }
        const id = 1
        const name = 'steak'
        const calories = 500
        let parsedFood = JSON.parse(response.body)
        assert.equal(parsedFood.id, id)
        assert.equal(parsedFood.name, name)
        assert.equal(parsedFood.calories, calories)
        assert.ok(parsedFood.created_at)
        done()
      })
    })
  // })
    // stop

  // describe('GET /api/v1v1/foods/:id', function(){
  //   it('should return a 200', function(done){
  //     this.request.get('/api/v1v1/foods/1', function(error, response){
  //       if (error) { return done(error) }
  //       assert.equal(response.statusCode, 200);
  //       assert(response.body.includes('1'));
  //       done();
  //     });
  //   });
  });

  // describe('POST /api/v1/foods', () => {
  //   it('should not return a 404', (done) => {
  //     this.request.post('/api/v1/foods', (error, response) => {
  //       if (error) { done(error) }
  //
  //       assert.notEqual(response.statusCode, 404)
  //
  //       done()
  //     })
  //   })
  //
  //   it('should receive and store data', (done) => {
  //     const food = {
  //       name: 'milkshake',
  //       calories: 600
  //     }
  //
  //     this.request.post('/api/v1/foods', { form: food }, (error, response) => {
  //       if (error) { done(error) }
  //
  //       const id      = 1
  //       const name = "milkshake"
  //       const calories = 600
  //
  //       let parsedFood = JSON.parse(response.body)
  //
  //       assert.equal(parsedFood.id, id)
  //       assert.equal(parsedFood.name, name)
  //       assert.equal(parsedFood.calories, calories)
  //       assert.ok(parsedFood.created_at)
  //
  //       done()
  //     })
  //   })




});
