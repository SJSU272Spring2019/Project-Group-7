/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/27/2019     Rama Tejaswini Thotapalli      Initial Development
                                                               for Student Performance Checker            
*/
const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const assignment_controller = require('../controllers/assignment.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/assignmentTest',  assignment_controller.test);
router.post('/create',  assignment_controller.assignment_create);
router.get('/:assignment_name', assignment_controller.assignment_details_name);
router.put('/:assignment_name/update', assignment_controller.assignment_update);
router.delete('/:assignment_name/delete', assignment_controller.assignment_delete);


module.exports = router;