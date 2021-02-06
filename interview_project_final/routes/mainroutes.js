const express = require('express');
const router = express();
const f1 = require('../controller/maincontroller.js');
router.get('/topics' , f1.viewtopic);
router.get('/topic_question/:id' , f1.viewquestion);
router.get('/experience',f1.viewexperience);
router.get('/addexp',f1.addexperience);
router.post('/addexp',f1.postexperience);
router.get('/addq' , f1.addq);
router.post('/addq' , f1.addqpost)
router.get('/spefexp/:id' , f1.viewspefexperience)
router.get('/admin' , f1.getadmin);
module.exports = router ;
