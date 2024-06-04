// --------------------------------------SERVER_CONFIG
const express = require('express');
const server = express();
const cors = require('cors');
server.use(cors());
const { router: APIrouter } = require('./routes/router.js');

// --------------------------------------COMMON_MIDDLEWARE
server.use(express.json());
server.use((req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	next();
});

// --------------------------------------ROUTES
server.use('/api/v1', APIrouter);
server.get('/test', (req, res) => {
	res.status(200);
	res.json({ message: 'TEST IS OK!' });
	res.end();
});

// --------------------------------------EXPORT
module.exports = { server };
