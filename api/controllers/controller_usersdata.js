// --------------------------------------CONTROLLER_CONFIG
const { User } = require('../models/db_orm.js');

// --------------------------------------USERSDATA_CONTROLLER
class UsersDataController {
	async getUsers(req, res) {
		try {
			const page = Number(req.query.page);
			const limit = 10;
			const offset = (page - 1) * limit;
			const paginatedResult = await User.findAll({ limit: limit, offset: offset, order: [['created_at', 'ASC']], attributes: { exclude: ['password'] } });
			const totalItems = await User.count();
			const totalPages = Math.ceil((await User.count()) / limit);
			res.status(200);
			res.json({
				message: 'Data was successfully fetched!',
				data: paginatedResult,
				pageInfo: {
					currentPage: page,
					limit: limit,
					totalItems: totalItems,
					totalPages: totalPages,
					nextPage: page < totalPages ? page + 1 : null,
					previousPage: page > 1 ? page - 1 : null,
				},
			});
			res.end();
		} catch (error) {
			res.status(500);
			res.json({ message: `${error}` });
			res.end();
		}
	}

	async getExactUser(req, res) {
		try {
			const id = Number(req.params.id);
			const result = await User.findOne({ where: { id: id }, attributes: { exclude: ['password'] } });
			if (!result) {
				res.status(400);
				res.json({ message: `User with id: ${id} is not found!` });
				res.end();
				return;
			}
			res.status(200);
			res.json({ message: 'Data was successfully fetched!', data: result });
			res.end();
		} catch (error) {
			res.status(500);
			res.json({ message: `${error}` });
			res.end();
		}
	}
}

// --------------------------------------EXPORT
module.exports = new UsersDataController();
