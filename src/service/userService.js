import User from '../models/user'

module.exports = {
	getAll : async () => {
		try {
			return await User.find()
		} catch (error) {
			throw new Error(error)
		}
	},
	getById : async (id) => {
		try {
			return await User.findById(id)
		} catch (error) {
			throw new Error(error)
		}
	},
	delete : async (id) => {
		try {
			var query = { _id: id }
			return await User.remove(query)
		} catch (error) {
			throw new Error(error)
		}
	},
	add : async (user) => {
		try {
			return await User.create(user)
		} catch (error) {
			throw new Error(error)
		}
	}

}




























