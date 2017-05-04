var express = require('express')
var app = express()

app.set('port', process.env.PORT || 3000)
app.local.title = 'Quantified Self'

app.get('/', (request, response) => {
  response.send('Welcome to Quantified Self!')
});

if(!module.parent){
  app.listen(app.get('port'), () => {
    console.log((app.locals.title) + 'is running on ' + (app.get('port')))
  });
};


module.exports = app;
