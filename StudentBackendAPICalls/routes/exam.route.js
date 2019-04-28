const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const exam_controller = require('../controllers/exam.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/examTest',  exam_controller.examTest);
router.post('/createExam',  exam_controller.createExam);
router.get('/getExam',  exam_controller.getExam);

module.exports = router;