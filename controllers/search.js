// const express = require('express');
// const axios = require('axios').default
// const router = express.Router();

// //* get results from search
// router.get('/results', (req, res) => {
//     let searchByName = 's=' + req.query.searchByName
//     // console.log('***********************')
//     // console.log(req.query)
//     // let searchByIngredient = 'i=' req.body.ingredient
//     var qs= {
//         headers:{
//             'x-rapidapi-key': process.env.RAPID_API_KEY,
//             'x-rapidapi-host': process.env.RAPID_API_HOST 
//         }
//     }
  
//     axios.get(`https://the-cocktail-db.p.rapidapi.com/search.php?${searchByName}`, qs)
//     .then(function (response) {
//         let data = response.data
//         // console.log(data.drinks[0].strDrink)
//         res.render('results', {data})
//     })
  
//   })


// //* get a single drink from results page
// router.get('/drinks/:single', (req, res) => {
//     // const single = req.params.single
//     let single = req.params.single
//     var options = {
//       method: 'GET',
//       url: 'https://the-cocktail-db.p.rapidapi.com/lookup.php',
//       params: {i: single},
//       headers: {
//         'x-rapidapi-key': process.env.RAPID_API_KEY,
//         'x-rapidapi-host': process.env.RAPID_API_HOST 
//       }
//     };
    
//     axios.request(options).then(function (response) {
//       const data = response.data
//       res.render('single', {data})
//       console.log(response.data);
//     }).catch(function (error) {
//       console.error(error);
//     });
  
//   }) 

//   module.exports = router;