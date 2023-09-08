const express = require('express');
const { registerController, loginController, logoutController, submitContactForm } = require('../controllers/authController');

//creating router object
const router = express.Router();

//routes

//Register
router.post('/register', registerController);

//Login
router.post('/login', loginController);

//Logout
router.post('/contact', submitContactForm);

router.post('/logout', logoutController);



module.exports = router;