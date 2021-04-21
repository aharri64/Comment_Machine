const express = require('express')
const router = express.Router()

// lesson index page

router.get('/', (req, res) => {
    res.render('lessons/index')
})

module.exports = router;