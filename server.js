pry = require('pryjs')

const express = require('express')
const app = express()
// const bodyParser = require('body-parser')
// const md5 = require('md5')

const FoodsController = require('./lib/controllers/foods-controller')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

app.get('/', (request, response) => {
  response.send('Welcome to Quantified Self!')
});

app.get('/api/v1/foods', (request, response) =>{
  response.send('This is the index')
});

app.get('/api/v1/foods/:id', FoodsController.show)

// app.post('')



if(!module.parent){
  app.listen(app.get('port'), () => {
    console.log((app.locals.title) + ' is running on ' + (app.get('port')))
  });
};


module.exports = app;
