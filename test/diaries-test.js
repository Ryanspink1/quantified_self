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

/// POST

  describe('POST /api/v1/diaries', function(){
    beforeEach(function(done){
      database.raw('INSERT INTO diaries (date, total_calories, created_at) VALUES (?, ?, ?)', ["15 May 2017", 2000, new Date])
      .then(function(){
        done();
      });
    });

    afterEach(function(done){
      database.raw('TRUNCATE diaries RESTART IDENTITY')
      .then(function(){
        done();
      });
    });

    it('should create a new diary entry', function(done){
      var id = 2;
      var diary_params = { date: '16 May 2017', total_calories: 1500, created_at: new Date }
      this.request.post('/api/v1/diaries', { form: diary_params }, function(error, response){
        let parsedDiary = JSON.parse(response.body.toString());

        assert.equal(response.statusCode, 200);
        // assert.equal(parsedDiary.id, id);
        // assert.equal(parsedDiary.total_calories, diary_params.total_calories);
        // assert.equal(parsedDiary.date, diary_params.date);
        done();
      });
    });
  });


});
