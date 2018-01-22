import Article from '../models/article'

module.exports = {
	getAll : async () => {
		try {
			return await Article.find().limit(10)
		} catch (error) {
			throw new Error(error)
		}
	},
	getById : async (id) => {
		try {
			return await Article.findById(id)
		} catch (error) {
			throw new Error(error)
		}
	},
	delete : async (id) => {
		try {
			var query = { _id: id }
			return await Article.remove(query)
		} catch (error) {
			throw new Error(error)
		}
	},
	add : async (article) => {
		try {
			return await Article.create(article)
		} catch (error) {
			throw new Error(error)
		}
	},
	update : async (article) => {
		try {
			let query = {_id: article.id}
			let update = {
				title : article.title,
				content : article.content
			}
			return await Article.findOneAndUpdate(query, update)
		} catch (error) {
			throw new Error(error)
		}
	},
	addMore : async (id, number) => {
		try {
			const articles = Article.find({_id: {$gt: id}}).sort({_id: 1 }).limit(5)
			return articles
		} catch (error) {
			throw new Error(error)
		}
		
	}
}