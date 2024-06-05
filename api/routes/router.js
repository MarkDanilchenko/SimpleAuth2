// --------------------------------------ROUTER_CONFIG
const router = require('express').Router();
const { check } = require('express-validator');
const AuthController = require('../controllers/controller_auth.js');

// --------------------------------------URLS "http://127.0.0.1:3000/api/v1/..."
// http://127.0.0.1:3000/api/v1/signup
router.route('/signup').post(
	[
		check('first_name', 'FirstName should be min 2 characters and must contain only letters').custom((value) => {
			return value.match(/^[a-zA-Z]{2,}$/gi);
		}),
		check('email', 'Email should be valid').isEmail(),
		check('password', 'Password must be at least 8 characters and contain at least one number and one letter!').custom((value) => {
			return value.match(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gi);
		}),
	],
	AuthController.signup
);

// http://127.0.0.1:3000/api/v1/

// http://127.0.0.1:3000/api/v1/

// --------------------------------------EXPORT
module.exports = { router };
