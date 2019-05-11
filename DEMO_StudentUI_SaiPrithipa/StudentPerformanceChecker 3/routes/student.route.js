const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const student_controller = require('../controllers/student.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', student_controller.test);
router.post('/register', student_controller.student_register);
router.post('/login', student_controller.student_login);
router.get('/getStudentProfile/:id', student_controller.getStudentProfile);
router.get('/getallstudents', student_controller.getAllstudents);
router.put('/updateStudentProfile/:id/update', student_controller.updateStudentProfile);
router.delete('/deleteStudentProfile/:id/delete', student_controller.deleteStudentProfile);


module.exports = router;