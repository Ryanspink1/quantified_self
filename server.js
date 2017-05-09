// pry = require('pryjs')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var md5 = require('md5')
var FoodsController = require('./lib/controllers/foods-controller')

var environment   = process.env.NODE_ENV || 'development'
var configuration = require('./knexfile')[environment]
var database      = require('knex')(configuration)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

app.get('/', (request, response) => {
  response.send('Welcome to Quantified Self!')
});

app.get('/api/v1/foods', (request, response) =>{
  response.send('This is the index')
});

app.get('/api/v1/foods/:id', FoodsController.show);

app.post('/api/v1/foods', FoodsController.create);




if(!module.parent){
  app.listen(app.get('port'), () => {
    console.log((app.locals.title) + ' is running on ' + (app.get('port')))
  });
};


module.exports = app;
