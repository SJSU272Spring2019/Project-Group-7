
/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/27/2019     Rama Tejaswini Thotapalli      Initial Development
                                                               for Student Performance Checker            
*/
const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const exam_controller = require('../controllers/exam.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/examTest',  exam_controller.test);
router.post('/create',  exam_controller.exam_create);
router.post('/average', exam_controller.exam_average);
router.get('/:exam_id', exam_controller.exam_details_id);
router.put('/:exam_id/update', exam_controller.exam_update);
router.delete('/:exam_id/delete', exam_controller.exam_delete);


module.exports = router;