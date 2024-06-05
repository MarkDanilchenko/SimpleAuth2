// --------------------------------------CONTROLLER_CONFIG
const bcryptjs = require('bcryptjs');
const JWT = require('jsonwebtoken');
const { User, JWT_BlackList } = require('../models/db_orm.js');
const { jwt_config } = require('../services/jwt_config.js');

// --------------------------------------AUTH_CONTROLLER
class AuthController {
	async signup(req, res) {
		try {
			const first_name = req.body.first_name;
			const email = req.body.email;
			const password = req.body.password;
			const password_hash = bcryptjs.hashSync(password, 10);
			const user = await User.create({
				first_name: first_name,
				email: email,
				password: password_hash,
			})
				.then(() => {
					res.status(200);
					res.json({ message: `User: ${user.first_name} was successfully created!` });
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
	async signin(req, res) {
		try {
			const email = req.body.email;
			const password = req.body.password;
			const isRegisteredUser = await User.findOne({ where: { email: email } });
			if (!isRegisteredUser) {
				res.status(400);
				res.json({ message: `User with email: ${email} is not registered!` });
				res.end();
				return;
			} else {
				const isPasswordCorrect = bcryptjs.compareSync(password, isRegisteredUser.password);
				if (isPasswordCorrect) {
					const token_access = JWT.sign({ user_id: isRegisteredUser.id, email: isRegisteredUser.email }, jwt_config.jwt_secretKey, {
						expiresIn: jwt_config.jwt_expiresInAccess,
					});
					// Generate a refresh token and check if the token is already blacklisted
					while (true) {
						const token_refresh = JWT.sign({ user_id: isRegisteredUser.id, email: isRegisteredUser.email }, jwt_config.jwt_secretKey, {
							expiresIn: jwt_config.jwt_expiresInRefresh,
						});
						const isTokenBlackListed = await JWT_BlackList.findOne({ where: { jwt_token: token_refresh } });
						// If the token is not blacklisted, send the response with the access and refresh tokens
						if (!isTokenBlackListed) {
							res.status(200);
							res.json({
								message: `User: ${isRegisteredUser.first_name} was successfully logged in!`,
								token_access: token_access,
								token_refresh: token_refresh,
							});
							res.end();
							break;
						} else {
							// If the token is blacklisted, generate a new one and check again
							continue;
						}
					}
				} else {
					res.status(400);
					res.json({ message: `Password is not correct! Please, try again.` });
					res.end();
					return;
				}
			}
		} catch (error) {
			res.status(500);
			res.json({ message: `${error}` });
			res.end();
		}
	}
}

// --------------------------------------EXPORT
module.exports = new AuthController();
