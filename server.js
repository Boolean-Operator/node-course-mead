const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

var pTitle = 'Spacely Space Sprockets, Inc.';

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//middleware

// server log
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
  res.render('home.hbs', {
    pageTitle: pTitle,
    welcomeMessage: 'Welcome to our new website',
    name: 'George Jetson',
    boss: 'Mister Spacely'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: pTitle
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
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

app.listen(port, () => {
  console.log(`Server is up on port ${port}...`);
});
