/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/27/2019     Rama Tejaswini Thotapalli      Initial Development
                                                               for Student Performance Checker            
*/

const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const studentmarks_controller = require('../controllers/studentmarks.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', studentmarks_controller.test);
router.post('/create', studentmarks_controller.studentmarks_create);
router.get('/getquiz', studentmarks_controller.studentmarks_getquiz);
router.get('/getexam', studentmarks_controller.studentmarks_getexam);
router.get('/getassignment', studentmarks_controller.studentmarks_getassignment);
router.get('/average', studentmarks_controller.studentmarks_average);
router.get('/testname/:test_name', studentmarks_controller.studentmarks_details_testname);
router.put('/:student_id/update', studentmarks_controller.studentmarks_update);
router.delete('/:student_id/delete', studentmarks_controller.studentmarks_delete);


module.exports = router;