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
			await User.create({
				first_name: first_name,
				email: email,
				password: password_hash,
			})
				.then(() => {
					res.status(200);
					res.json({ message: `User: ${first_name} was successfully created!` });
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
								message: `User: ${isRegisteredUser.first_name} was successfully signed in!`,
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
	async signout(req, res) {
		try {
			const refresh_token = req.headers.authorization.split(' ')[1];
			JWT.verify(refresh_token, jwt_config.jwt_secretKey, (err, decoded) => {
				if (err) {
					res.status(401);
					res.json({ message: `Refresh token is not valid! User is not signed in.` });
					res.end();
					return;
				} else {
					JWT_BlackList.create({ jwt_token: refresh_token })
						.then(() => {
							res.status(200);
							res.json({ message: `User was successfully signed out!` });
							res.end();
						})
						.catch((error) => {
							res.status(500);
							res.json({ message: `${error}` });
							res.end();
						});
				}
			});
		} catch (error) {
			res.status(500);
			res.json({ message: `${error}` });
			res.end();
		}
	}
	async refresh(req, res) {
		try {
			const refresh_token = req.headers.authorization.split(' ')[1];
			const isTokenBlackListed = await JWT_BlackList.findOne({ where: { jwt_token: refresh_token } });
			if (isTokenBlackListed) {
				res.status(401);
				res.json({ message: `Refresh token is not valid! User is not signed in.` });
				res.end();
				return;
			} else {
				JWT.verify(refresh_token, jwt_config.jwt_secretKey, (err, decoded) => {
					if (err) {
						res.status(401);
						res.json({ message: `Refresh token is not valid! User is not signed in.` });
						res.end();
						return;
					} else {
						const token_access = JWT.sign({ user_id: decoded.user_id, email: decoded.email }, jwt_config.jwt_secretKey, {
							expiresIn: jwt_config.jwt_expiresInAccess,
						});
						res.status(200);
						res.json({ token_access: token_access });
						res.end();
					}
				});
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
