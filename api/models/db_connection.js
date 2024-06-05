// --------------------------------------DB_CONFIG
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env' });
const name_db = process.env.DB_NAME;
const user_db = process.env.DB_USERNAME;
const pass_db = process.env.DB_PASSWORD;
const sequelize = new Sequelize(name_db, user_db, pass_db, {
	dialect: 'mysql',
	host: process.env.DB_HOST || '127.0.0.1',
	port: process.env.DB_PORT || 3306,
	define: {
		timestamps: false,
	},
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

// --------------------------------------EXPORT
module.exports = { sequelize };
