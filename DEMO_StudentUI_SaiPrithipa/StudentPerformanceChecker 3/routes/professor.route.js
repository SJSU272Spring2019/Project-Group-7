/*VERSION          DATE                 AUTHOR                  COMMENTS
-----------------------------------------------------------------------------------------
    1.0          04/27/2019     Rama Tejaswini Thotapalli      Initial Development
                                                               for Student Performance Checker            
*/

const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const professor_controller = require('../controllers/professor.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', professor_controller.test);
router.post('/create', professor_controller.professor_register);
router.post('/login', professor_controller.professor_login);

router.get('/:id', professor_controller.professor_details_id);
router.put('/:id/update', professor_controller.professor_update);
router.delete('/:id/delete', professor_controller.professor_delete);


module.exports = router;