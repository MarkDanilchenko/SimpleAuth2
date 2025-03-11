// --------------------------------------JWT_VERIFICATION
const JWT = require('jsonwebtoken');
const { jwt_config } = require('../services/jwt_config.js');

const notAuthorizedResponse = (res) => {
	res.status(401);
	res.json({ message: `User is not signed in! Please, enter the correct credentials and try again.` });
	res.end();
};

const jwt_verification = (req, res, next) => {
	try {
		const access_token = req.headers.authorization.split(' ')[1];
		if (!access_token) {
			notAuthorizedResponse(res);
			return;
		} else {
			JWT.verify(access_token, jwt_config.jwt_secretKey, (err, decoded) => {
				if (err) {
					notAuthorizedResponse(res);
					return;
				} else {
					next();
				}
			});
		}
	} catch (error) {
		notAuthorizedResponse(res);
	}
};

// --------------------------------------EXPORT
module.exports = { jwt_verification };
