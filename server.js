require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/ppconfig'); //
const flash = require('connect-flash');
const axios = require('axios').default
const db = require('./models')
const methodOverride = require('method-override');


const app = express();
app.set('view engine', 'ejs');

// Secret Session here
const SECRET_SESSION = process.env.SECRET_SESSION;
const isLoggedIn = require('./middleware/isLoggedIn');
const { search, get } = require('./controllers/auth');

// MIDDLEWARE 
app.use(methodOverride('_method'));
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
  // console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// Controllers
app.use('/auth', require('./controllers/auth'));
app.use('/drinks', require('./controllers/drinks'));
// app.use('/search', require('./controllers/search'));



app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/new', (req, res) => {
//   res.render('new')
// })

app.get('/error/404', (req,res)=>{
  console.log(`user reached an error page`)
  res.render('error/404')
})

//* profile
app.get('/profile', isLoggedIn, (req, res) => {
  db.user.findOne({
    include: [db.cocktail],
    where: {
      id: req.user.dataValues.id
    } 
  }).then(function(user){
    // users will have a .pets key with an array of pets
    // console.log(user[0].pets);
    console.log(user)
    res.render('profile', { data:user });
  })
    // const { id, name, email } = req.user.get();
}).catch


//* go to search page from nav bar
app.get('/search', isLoggedIn, (req, res) => {
  res.render('search');
})


//* get results from search
app.get('/results', isLoggedIn, (req, res) => {
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
      console.log(data)
      res.render('results', {data})
  })

})

app.get('/drinks/:single/new', isLoggedIn, (req, res) => {
  // const single = req.params.single
  let single = req.params.single
  var options = {
    method: 'get',
    url: 'https://the-cocktail-db.p.rapidapi.com/lookup.php',
    params: {i: single},
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': process.env.RAPID_API_HOST 
    }
  };
  
  axios.request(options).then(function (response) {

    const data = response.data
    // //console.log('LOOOOOOOOOOOOOOK HERE***', data)
    res.render('single/new', {data})
    // console.log('*****', response.data, '*****');
  }).catch(function (error) {
    console.error(error);
  });

}) 




app.post('/drinks/:single/new', isLoggedIn, (req, res) => {
  const addCocktail = req.body
  const userId = req.user.dataValues.id

  const trackingCocktail = req.params.single
  if (addCocktail.ingredient2 == undefined){
    addCocktail.ingredient2 = ''
  }
  if (addCocktail.ingredient3 == undefined){
    addCocktail.ingredient3 = ''
  }
  if (addCocktail.ingredient4 == undefined){
    addCocktail.ingredient4 = ''
  }
  if (addCocktail.ingredient5 == undefined){
    addCocktail.ingredient5 = ''
  }
  if (addCocktail.ingredient6 == undefined){
    addCocktail.ingredient6 = ''
  }
  if (addCocktail.ingredient7 == undefined){
    addCocktail.ingredient7 = ''
  }
  if (addCocktail.ingredient8 == undefined){
    addCocktail.ingredient8 = ''
  }
  if (addCocktail.ingredient9 == undefined){
    addCocktail.ingredient9 = ''
  }
  if (addCocktail.ingredient10 == undefined){
    addCocktail.ingredient10 = ''
  }
  if (addCocktail.ingredient11 == undefined){
    addCocktail.ingredient11 = ''
  }
  if (addCocktail.ingredient12 == undefined){
    addCocktail.ingredient12 = ''
  }
  if (addCocktail.ingredient13 == undefined){
    addCocktail.ingredient13 = ''
  }
  if (addCocktail.ingredient14 == undefined){
    addCocktail.ingredient14 = ''
  }
  if (addCocktail.ingredient15 == undefined){
    addCocktail.ingredient15 = ''
  }
  // console.log('req.params', trackingCocktail)
  // console.log('req.body.rating', addCocktail.rating)
  // console.log('req.body', addCocktail)
  // console.log('1.LOOKHERE!!!!!!', req.user.dataValues.id)
  db.cocktail.findOrCreate({
    
    where: {
      userId: userId,
      drinkId: trackingCocktail,
      drinkName: addCocktail.drinkName,
      ingredient1: addCocktail.ingredient1,
      ingredient2: addCocktail.ingredient2,
      ingredient3: addCocktail.ingredient3,
      ingredient4: addCocktail.ingredient4,
      ingredient5: addCocktail.ingredient5,
      ingredient6: addCocktail.ingredient6,
      ingredient7: addCocktail.ingredient7,
      ingredient8: addCocktail.ingredient8,
      ingredient9: addCocktail.ingredient9,
      ingredient10: addCocktail.ingredient10,
      ingredient11: addCocktail.ingredient11,
      ingredient12: addCocktail.ingredient12,
      ingredient13: addCocktail.ingredient13,
      ingredient14: addCocktail.ingredient14,
      ingredient15: addCocktail.ingredient15,
      rating: addCocktail.rating,
      instructions: addCocktail.instructions,
      month: addCocktail.month,
      day: addCocktail.day,
      year: addCocktail.year,
      comment: addCocktail.comment,
      strDrinkThumb: addCocktail.strDrinkThumb
    }
  })
  res.redirect('/profile')
})




//* get a single drink from results page
app.get('/drinks/:single', isLoggedIn, (req, res) => {
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

//PUT ROUTE


/*
function addIngredientsArray (responseData) {
  const data = responseData
  data.drinks[0].ingredient = []
  if (data.drinks[0].strIngredient1 !== null) {
    const ingr = {
      name: data.drinks[0].strIngredient1,
      measurment: data.drinks[0].strMeasure1
    }
    data.drinks[0].ingredient.push(ingr)
  }
  return data;
};
*/
//* get a single drink from results page

// app.post('/addToList', (req, res) => {
//   res.redirect('/addToList')
// })

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;