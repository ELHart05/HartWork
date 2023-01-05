const { Router } = require('express');
const { logInUser, signInUser } = require('../controllers/userController.js')

const router = Router();

router.post('/login', logInUser)

router.post('/signin', signInUser)

module.exports = router;