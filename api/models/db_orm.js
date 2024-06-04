const Sequelize = require('sequelize');
const { sequelize } = require('./db_connection.js');

const User = sequelize.define('user', {
	first_name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: false,
		validate: {
			is: /^[a-zA-Z]{2,}$/i,
			msg: 'Name should be min 2 letters and must contain only letters',
		},
	},
	last_name: {
		type: Sequelize.STRING,
		allowNull: true,
		unique: false,
		validate: {
			is: /^[a-zA-Z]{2,}$/i,
			msg: 'LastName should be min 2 letters and must contain only letters',
		},
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: {
				msg: 'Email should be valid',
			},
		},
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: false,
	},
	gender: {
		type: Sequelize.STRING,
		allowNull: true,
		unique: false,
		validate: {
			is: /^(male|female)$/i,
			msg: 'Gender should be male or female',
		},
	},
	photo: {
		type: Sequelize.STRING,
		allowNull: true,
		unique: false,
	},
	created_at: {
		type: Sequelize.DATE,
		allowNull: false,
		unique: false,
		defaultValue: Sequelize.NOW,
	},
	updated_at: {
		type: Sequelize.DATE,
		allowNull: true,
		unique: false,
	},
});

module.exports = { sequelize, User };
