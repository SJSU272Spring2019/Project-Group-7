const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const exam_controller = require('../controllers/exam.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/examTest',  exam_controller.examTest);
router.get('/getExamScore',  exam_controller.getExamScore);

module.exports = router;