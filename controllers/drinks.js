const express = require('express')
const passport = require('passport');
const { TimeoutError } = require('sequelize');
const router = express.Router()


const db = require('../models')

//GET TO UPDATE FORM
router.get('/editmydrink/:idDrink', (req, res) => {
    let idDrink = req.params.idDrink
    console.log(req.params.idDrink)
    db.cocktail.findOne({
      
      where: {
        id: idDrink
      } 
    }).then(function(cocktail){
      console.log('looooooooooooook***************', cocktail)
      res.render('drinks/editmydrink', { data:cocktail });
    });
  }); 

//GET TO INDIVIDUAL COCKTAIL
router.get('/mydrink/:idDrink', (req, res) => {
    let idDrink = req.params.idDrink
    console.log(req.params.idDrink)
    db.cocktail.findOne({
      
      where: {
        id: idDrink
      } 
    }).then(function(cocktail){
      console.log('looooooooooooook***************', cocktail)
      res.render('drinks/mydrink', { data:cocktail });
    });
  }); 

router.put('/editmydrink/:idDrink)

module.exports = router;