const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const suggestion_controller = require('../controllers/suggestion.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/getSuggestion',  suggestion_controller.getSuggestion);
router.post('/createSuggestion',  suggestion_controller.createSuggestion);

module.exports = router;