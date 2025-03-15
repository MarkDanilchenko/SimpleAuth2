// // --------------------------------------CONTROLLER_CONFIG
// const { User } = require('../models/db_orm.js');
// const fs = require('fs');

// // --------------------------------------USERSDATA_CONTROLLER
// class UsersDataController {
// 	async getUsers(req, res) {
// 		try {
// 			const page = Number(req.query.page);
// 			const limit = 10;
// 			const offset = (page - 1) * limit;
// 			const paginatedResult = await User.findAll({ limit: limit, offset: offset, order: [['created_at', 'ASC']], attributes: { exclude: ['password'] } });
// 			const totalItems = await User.count();
// 			const totalPages = Math.ceil((await User.count()) / limit);
// 			res.status(200);
// 			res.json({
// 				message: 'Data was successfully fetched!',
// 				data: paginatedResult,
// 				pageInfo: {
// 					currentPage: page,
// 					limit: limit,
// 					totalItems: totalItems,
// 					totalPages: totalPages,
// 					nextPage: page < totalPages ? page + 1 : null,
// 					previousPage: page > 1 ? page - 1 : null,
// 				},
// 			});
// 			res.end();
// 		} catch (error) {
// 			res.status(500);
// 			res.json({ message: `${error}` });
// 			res.end();
// 		}
// 	}
// 	async getExactUser(req, res) {
// 		try {
// 			const id = Number(req.params.id);
// 			const result = await User.findOne({ where: { id: id }, attributes: { exclude: ['password'] } });
// 			if (!result) {
// 				res.status(400);
// 				res.json({ message: `User with id: ${id} is not found!` });
// 				res.end();
// 				return;
// 			}
// 			res.status(200);
// 			res.json({ message: 'Data was successfully fetched!', data: result });
// 			res.end();
// 		} catch (error) {
// 			res.status(500);
// 			res.json({ message: `${error}` });
// 			res.end();
// 		}
// 	}
// 	async updateUser(req, res) {
// 		try {
// 			// fileTypeValidation
// 			if (req.imageFileTypeValidationError) {
// 				res.status(415);
// 				res.json({ message: `${req.imageFileTypeValidationError}` });
// 				res.end();
// 				return;
// 			}

// 			// fileSizeValidation
// 			if (req.files[0] && req.files[0].size > 10_000_000) {
// 				fs.unlink(req.files[0].path, (err) => {
// 					if (err) {
// 						console.log(err);
// 					}
// 				});
// 				res.status(413);
// 				res.json({ message: 'File size should be less than 100kb!' });
// 				res.end();
// 				return;
// 			}

// 			// Check if User to update exists
// 			const user_id = Number(req.params.id);
// 			const user = await User.findOne({ where: { id: user_id } });
// 			if (!user) {
// 				res.status(400);
// 				res.json({ message: `User with id: ${user_id} is not found in database.\nPlease, specify correct user id and try again!` });
// 				res.end();
// 				return;
// 			}

// 			// Update user fields
// 			const updated_at = new Date();
// 			let userDataForUpdate = {};
// 			const first_name = req.body.first_name !== undefined ? (userDataForUpdate = { ...userDataForUpdate, first_name: req.body.first_name }) : null;
// 			const last_name = req.body.last_name !== undefined ? (userDataForUpdate = { ...userDataForUpdate, last_name: req.body.last_name }) : null;
// 			const email = req.body.email !== undefined ? (userDataForUpdate = { ...userDataForUpdate, email: req.body.email }) : null;
// 			const gender = req.body.gender !== undefined ? (userDataForUpdate = { ...userDataForUpdate, gender: req.body.gender }) : null;
// 			const photo = req.files[0] !== undefined ? (userDataForUpdate = { ...userDataForUpdate, photo: req.files[0].path }) : null;
// 			// remove old photo from the database if new photo was uploaded
// 			if (userDataForUpdate.photo) {
// 				await User.findOne({ where: { id: user_id } })
// 					.then((user) => {
// 						if (user.photo) {
// 							fs.unlink(user.photo, (err) => {
// 								if (err) {
// 									throw err;
// 								}
// 							});
// 						}
// 					})
// 					.catch((error) => {
// 						res.status(500);
// 						res.json({ message: `${error}` });
// 						res.end();
// 						return;
// 					});
// 			}
// 			await User.update({ ...userDataForUpdate, updated_at: updated_at }, { where: { id: user_id } })
// 				.then(() => {
// 					res.status(200);
// 					res.json({ message: `Updated at: ${updated_at}.\nUser with id: ${user_id} was successfully updated!\nUpdated fields: ${JSON.stringify(userDataForUpdate)}` });
// 					res.end();
// 				})
// 				.catch((error) => {
// 					res.status(500);
// 					res.json({ message: `${error}` });
// 					res.end();
// 				});
// 		} catch (error) {
// 			res.status(500);
// 			res.json({ message: `${error}` });
// 			res.end();
// 		}
// 	}
// }

// // --------------------------------------EXPORT
// module.exports = new UsersDataController();
