const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const quiz_controller = require('../controllers/quiz.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/quizTest',  quiz_controller.test);
router.get('/getQuiz',  quiz_controller.getQuiz);

module.exports = router;