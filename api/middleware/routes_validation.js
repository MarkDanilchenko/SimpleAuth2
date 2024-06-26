// --------------------------------------ROUTES_VALIDATION
const { validationResult } = require('express-validator');

const routes_validation = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ message: errors.array()[0].msg });
		res.end();
		return;
	}

	next();
};

// --------------------------------------EXPORT
module.exports = { routes_validation };
