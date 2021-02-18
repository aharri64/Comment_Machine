/*
const express = require('express')
var axios = require("axios").default;

const app = express();

var options = {
  method: 'GET',
  url: 'https://the-cocktail-db.p.rapidapi.com/search.php',
  params: {i: req.body.search}, //TODO req.body.search
  headers: {
    'x-rapidapi-key': process.env.RAPID_API_KEY,
    'x-rapidapi-host': process.env.RAPID_API_HOST
  }
};

axios.request(options).then(function (response) {
	console.log(response.data); //TODO if response.data.length > 0
}).catch(function (error) {
	console.error(error);
});

var options = {
    method: 'GET',
    url: 'https://the-cocktail-db.p.rapidapi.com/search.php',
    params: {s: 'long island'},
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': process.env.RAPID_API_HOST
    }
  };
  
  axios.request(options).then(function (response) {
      console.log(response.data);
  }).catch(function (error) {
      console.error(error);
  });

app.get('/results', (req, res) => {
    let searchByName = 's=' + req.body.name
    // let searchByIngredient = 'i=' req.body.ingredient
    var qs= {
        headers:{
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': process.env.RAPID_API_HOST 
        }
    }

    axios.get(`https://the-cocktail-db.p.rapidapi.com/search.php?${searchByName}`, qs)
    .then(function (response) {
        let data = responce.data.search
        res.render('results', {data})
    })

})
*/