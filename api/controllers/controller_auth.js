// --------------------------------------CONTROLLER_CONFIG
const { User } = require('../models/db_orm.js');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

// --------------------------------------AUTH_CONTROLLER
class AuthController {
	async signup(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400).json({ errors: errors.array()[0].msg });
				res.end();
				return;
			}
			const first_name = req.body.first_name;
			const email = req.body.email;
			const password = req.body.password;
			const password_hash = bcryptjs.hashSync(password, 10);
			//
			const user = await User.create({
				first_name: first_name,
				email: email,
				password: password_hash,
			})
				.then(() => {
					res.status(200);
					res.json({ message: `User ${first_name} was successfully created!` });
					res.end();
				})
				.catch((error) => {
					res.status(500);
					res.json({ message: `${error}` });
					res.end();
				});
		} catch (error) {
			res.status(500);
			res.json({ message: `${error}` });
			res.end();
		}
	}
}

// --------------------------------------EXPORT
module.exports = new AuthController();
