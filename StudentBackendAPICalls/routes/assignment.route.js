const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const assignment_controller = require('../controllers/assignment.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/assignmentTest',  assignment_controller.assignmentTest);
router.post('/createAssignment',  assignment_controller.createAssignment);
router.get('/getAssignment',  assignment_controller.getAssignment);

module.exports = router;