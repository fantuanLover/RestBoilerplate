import Article from '../models/article'
import ArticleService from '../service/articleService'

module.exports = {
	test : async ( req, res, next ) => {
		res.send('Article api is working!')
	},
	add : async ( req, res, next ) => {
		console.log(req.value.body)
		let newArticle = req.value.body
		let article = await ArticleService.add(newArticle)
		res.status(200).json({
			error : '',
			data : {
				article : article
			}
		})
	},
	update : async ( req, res, next ) => {
		let newArticle = req.value.body
		let article = await ArticleService.update(newArticle)
		res.status(200).json({
			error : '',
			data : {
				article : article
			}
		})
	},
	getById : async ( req, res, next ) => {
		console.log(req.value.body)
		let id = req.value.body.id
		let article = await ArticleService.getById(id)
		res.status(200).json({
			error : '',
			data : {
				article : article
			}
		})
	},
	delete : async ( req, res, next ) => {
		let id = req.value.body.id
		let article = await ArticleService.delete(id)
		res.status(200).json({
			error : '',
			data : {
				article : article
			}
		})
	},
	getAll : async ( req, res, next ) => {
		let articles = await ArticleService.getAll()
		res.status(200).json({
			error : '',
			data : {
				articles : articles
			}
		})
	},
	addMore : async (req, res, next ) => {
		console.log(req.value.body)
		let id = req.value.body.id
		let articles = await ArticleService.addMore(id, 5)
		res.status(200).json({
			error : '',
			data : {
				articles : articles
			}
		})
	}
}