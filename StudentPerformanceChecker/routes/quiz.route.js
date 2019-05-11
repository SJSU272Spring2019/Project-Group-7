/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/27/2019     Rama Tejaswini Thotapalli      Initial Development
                                                               for Student Performance Checker            
*/

const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const quiz_controller = require('../controllers/quiz.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/quizTest',  quiz_controller.test);
router.post('/create',  quiz_controller.quiz_create);
router.post('/average', quiz_controller.quiz_average);
router.get('/:quiz_id', quiz_controller.quiz_details_id);
router.put('/:quiz_id/update', quiz_controller.quiz_update);
router.delete('/:quiz_id/delete', quiz_controller.quiz_delete);


module.exports = router;