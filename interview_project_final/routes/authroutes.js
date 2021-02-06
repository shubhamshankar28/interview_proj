const route = require('express');
const func = require('../controller/authcontroller.js')
router = route();
router.get('/signup',func.signup_get)
router.post('/signup',func.signup_post)
router.get('/login',func.login_get)
router.post('/login',func.login_post)
router.get('/logout',func.logout_get)

module.exports = router;
