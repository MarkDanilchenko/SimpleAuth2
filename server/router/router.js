// --------------------------------------ROUTER_CONFIG
const router = require('express').Router();
const { check, header, query, param } = require('express-validator');
const AuthController = require('../controllers/controller_auth.js');
const UsersDataController = require('../controllers/controller_usersdata.js');
const { routes_validation } = require('../middleware/routes_validation.js');
const { jwt_verification } = require('../middleware/jwt_verification.js');
const { multer_config } = require('../services/imgStorage_config.js');

// --------------------------------------API_URLS "http://127.0.0.1:3000/api/v1/..."
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

// http://127.0.0.1:3000/api/v1/profiles?page=1         (by default perPage = 10)
router.route('/profiles').get([query('page').isInt({ min: 1 })], routes_validation, UsersDataController.getUsers);

// http://127.0.0.1:3000/api/v1/profile/:id
router
	.route('/profile/:id')
	.get([param('id').isInt({ min: 1 })], routes_validation, UsersDataController.getExactUser)
	.put(
		// multer_config.any() is set up in this place,
		// because we need to upload multiple data from the request, which is sended with multipart/form-data
		multer_config.any(),
		[
			check('first_name', 'FirstName should be min 2 characters and must contain only letters!').custom((value) => {
				if (value !== undefined) {
					return value.match(/^[a-zA-Z]{2,}$/gi);
				}
				return true;
			}),
			check('last_name', 'LastName should be min 2 characters and must contain only letters!').custom((value) => {
				if (value !== undefined) {
					return value.match(/^[a-zA-Z]{2,}$/gi);
				}
				return true;
			}),
			check('email', 'Email should be valid!').custom((value) => {
				if (value !== undefined) {
					return value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gi);
				}
				return true;
			}),
			check('gender', 'Gender should be male or female!').custom((value) => {
				if (value !== undefined) {
					return value.match(/^(male|female)$/gi);
				}
				return true;
			}),
			param('id').isInt({ min: 1 }),
		],
		routes_validation,
		jwt_verification,
		UsersDataController.updateUser
	);

// --------------------------------------EXPORT
module.exports = { router };
