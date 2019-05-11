/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/27/2019     Rama Tejaswini Thotapalli      Initial Development
                                                               for Student Performance Checker            
*/
const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const course_controller = require('../controllers/course.controller');




router.post('/create', course_controller.course_create);
router.get('courseid/:course_id', course_controller.course_details_id);
router.put('/:course_id/update', course_controller.course_update);
router.delete('/:course_id/delete', course_controller.course_delete);
router.get('/getallcourses', course_controller.getallcourses);


module.exports = router;





