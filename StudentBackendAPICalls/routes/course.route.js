const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const course_controller = require('../controllers/course.controller');




router.post('/createCourse', course_controller.createCourse);
router.get('/getCourseDetails', course_controller.getCourseDetails);
router.put('/updateCourseDetails/:student_id/:course_id/update', course_controller.updateCourseDetails);
router.delete('/deleteCourseDetails/:student_id/:course_id/delete', course_controller.deleteCourseDetails);
router.get('/getCourseQuiz', course_controller.getCourseQuiz);
router.get('/getCourseExam', course_controller.getCourseExam);
router.get('/getCourseAssignment', course_controller.getCourseAssignment);
module.exports = router;