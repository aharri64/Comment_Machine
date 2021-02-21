require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppconfig'); //
const flash = require('connect-flash');
const axios = require('axios').default


const app = express();
app.set('view engine', 'ejs');

// Secret Session here
const SECRET_SESSION = process.env.SECRET_SESSION;
const isLoggedIn = require('./middleware/isLoggedIn');
const { search } = require('./controllers/auth');
// MIDDLEWARE
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

// Session Middleware

// secret: What we actually will be giving the user on our site as a session cookie
// resave: Save the session even if it's modified, make this false
// saveUninitialized: If we have a new session, we save it, therefore making that true

const sessionObject = {
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}
app.use(session(sessionObject));


// Passport
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Add a session
// Flash 
app.use(flash());
app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// Controllers
app.use('/auth', require('./controllers/auth'));
// app.use('/search', require('./controllers/search'));


app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/new', (req, res) => {
//   res.render('new')
// })

//* profile
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('profile', { id, name, email });
});

//* go to search page from nav bar
app.get('/search', isLoggedIn, (req, res) => {
  res.render('search');
})


//* get results from search
app.get('/results', (req, res) => {
  let searchByName = 's=' + req.query.searchByName
  // console.log('***********************')
  // console.log(req.query)
  // let searchByIngredient = 'i=' req.body.ingredient
  var qs= {
      headers:{
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': process.env.RAPID_API_HOST 
      }
  }

  axios.get(`https://the-cocktail-db.p.rapidapi.com/search.php?${searchByName}`, qs)
  .then(function (response) {
      let data = response.data
      // console.log(data.drinks[0].strDrink)
      res.render('results', {data})
  })

})

app.get('/drinks/:single/new', (req, res) => {
  // const single = req.params.single
  let single = req.params.single
  var options = {
    method: 'GET',
    url: 'https://the-cocktail-db.p.rapidapi.com/lookup.php',
    params: {i: single},
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': process.env.RAPID_API_HOST 
    }
  };
  
  axios.request(options).then(function (response) {
    const data = response.data
    res.render('single/new', {data})
    console.log('*****', response.data, '*****');
  }).catch(function (error) {
    console.error(error);
  });

}) 

//* get a single drink from results page
app.get('/drinks/:single', (req, res) => {
  // const single = req.params.single
  let single = req.params.single
  var options = {
    method: 'GET',
    url: 'https://the-cocktail-db.p.rapidapi.com/lookup.php',
    params: {i: single},
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': process.env.RAPID_API_HOST 
    }
  };
  
  axios.request(options).then(function (response) {
    const data = response.data
    res.render('single', {data})
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

}) 

//* get a single drink from results page

// app.post('/addToList', (req, res) => {
//   res.redirect('/addToList')
// })

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;