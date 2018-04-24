const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

var pTitle = 'Spacely Space  Sprockets, Inc.';

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//middleware

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append or access server.log');
    }
  });
  next();
});

// // Maintenance middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: pTitle
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: pTitle,
    welcomeMessage: 'Welcome to our new website',
    name: 'George Jetson',
    boss: 'Mister Spacely'
  });
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: pTitle
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: "SuperBad Response",
    problems: [
      'Momma dresses you funny',
      'I really just do not want to do it',
      'Dang,  this is just getting wierd'
    ]
  })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000...');
});
