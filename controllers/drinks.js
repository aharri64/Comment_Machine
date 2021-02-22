const express = require('express')
const passport = require('passport');
const { TimeoutError } = require('sequelize');
const router = express.Router()


const db = require('../models')

//GET TO UPDATE FORM
router.get('/editmydrink/:idDrink', (req, res) => {
    let idDrink = req.params.idDrink
    // console.log(req.params.idDrink)
    db.cocktail.findOne({
      
      where: {
        id: idDrink
      } 
    }).then(function(cocktail){
    //   console.log('looooooooooooook***************', cocktail)
      res.render('drinks/editmydrink', { data:cocktail });
    });
  }); 

//GET TO INDIVIDUAL COCKTAIL
router.get('/mydrink/:idDrink', (req, res) => {
    let idDrink = req.params.idDrink
    // console.log(req.params.idDrink)
    db.cocktail.findOne({
      
      where: {
        id: idDrink
      } 
    }).then(function(cocktail){
    //   console.log('looooooooooooook***************', cocktail)
      res.render('drinks/mydrink', { data:cocktail });
    });
  }); 

router.put('/editmydrink/:idDrink', (req, res) => {
    let idDrink = req.params.idDrink
    let upd = req.body
    // console.log(req.params.idDrink)
    db.cocktail.update({
        drinkName: upd.drinkName,
        ingredient1: upd.ingredient1,
        ingredient2: upd.ingredient2,
        ingredient3: upd.ingredient3,
        ingredient4: upd.ingredient4,
        ingredient5: upd.ingredient5,
        ingredient6: upd.ingredient6,
        ingredient7: upd.ingredient7,
        ingredient8: upd.ingredient8,
        ingredient9: upd.ingredient9,
        ingredient10: upd.ingredient10,
        ingredient11: upd.ingredient11,
        ingredient12: upd.ingredient12,
        ingredient13: upd.ingredient13,
        ingredient14: upd.ingredient14,
        ingredient15: upd.ingredient15,
        rating: upd.rating,
        instructions: upd.instructions,
        month: upd.month,
        day: upd.day,
        year: upd.year,
        comment: upd.comment,
        strDrinkThumb: upd.strDrinkThumb
    }, { 
      where: {
        id: idDrink
      } 
    })
    .then(update => {
        // console.log(update)
        res.redirect('/profile');
    })

})
router.delete('/mydrink/:idDrink', (req, res) => {
    let idDrink = req.params.idDrink

    // console.log(req.params.idDrink)
    db.cocktail.destroy({
      where: {
        id: idDrink
      } 
    })
    .then(deleted => {
        // console.log(`This one was deleted${deleted}`)
        res.redirect('/profile');
    })

})


module.exports = router;