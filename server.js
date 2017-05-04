pry = require('pryjs')

var express = require('express')
var app = express()

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

app.get('/', (request, response) => {
  response.send('Welcome to Quantified Self!')
});

app.get('/api/v1/foods', (request, response) =>{
  response.send('This is the index')
});

app.get('/api/v1/foods/:id', (request, response) => {
  // eval(pry.it)
  var id = request.params.id;
  // if(typeof id !== 'number'){return response.sendStatus(404)};
  response.json({
    id: id
  });
});




if(!module.parent){
  app.listen(app.get('port'), () => {
    console.log((app.locals.title) + ' is running on ' + (app.get('port')))
  });
};


module.exports = app;
