const { validationResult } = require('express-validator');

const routes_validation = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ errors: errors.array()[0].msg });
		res.end();
		return;
	}

	next();
};

module.exports = { routes_validation };
