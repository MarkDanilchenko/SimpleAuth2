// --------------------------------------ROUTER_CONFIG
const router = require('express').Router();
const { check, header } = require('express-validator');
const AuthController = require('../controllers/controller_auth.js');
const { routes_validation } = require('../middleware/routes_validation.js');

// --------------------------------------URLS "http://127.0.0.1:3000/api/v1/..."
// http://127.0.0.1:3000/api/v1/signup
router.route('/signup').post(
	[
		check('first_name', 'FirstName should be min 2 characters and must contain only letters!').custom((value) => {
			return value.match(/^[a-zA-Z]{2,}$/gi);
		}),
		check('email', 'Email should be valid!').isEmail(),
		check('password', 'Password must be at least 8 characters and contain at least one number and one letter!').custom((value) => {
			return value.match(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gi);
		}),
	],
	routes_validation,
	AuthController.signup
);

// http://127.0.0.1:3000/api/v1/signin
router.route('/signin').get([check('email', 'Email should be valid!').isEmail()], routes_validation, AuthController.signin);

// http://127.0.0.1:3000/api/v1/signout
router.route('/signout').post([header('Authorization', 'Bearer refresh token should be provided!').exists()], routes_validation, AuthController.signout);

// http://127.0.0.1:3000/api/v1/refresh
router.route('/refresh').get([header('Authorization', 'Bearer refresh token should be provided!').exists()], routes_validation, AuthController.refresh);

// --------------------------------------EXPORT
module.exports = { router };
