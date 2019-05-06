const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const recommendation = require('../controllers/recommendation');


// a simple test url to check that all of our files are communicating correctly.

router.post('/get_recommendation',  recommendation.get_recommendation);


module.exports = router;