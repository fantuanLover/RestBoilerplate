import Joi from 'joi'

module.exports = {
	validateBody : (schema) => {
		return (req, res, next) => {
			const result = Joi.validate(req.body, schema)
			if (result.error) {
				return res.status(400).json(result.error)
			}
			if (!req.value) {
				req.value = {}
			}
			req.value['body'] = result.value
			next()
		}
	},
	schemas : {
		authSchema : Joi.object().keys({
			email : Joi.string().email().required(),
			username : Joi.string().required(),
			password : Joi.string().required()
		}),
		articleSchema : Joi.object().keys({
			title : Joi.string().required(),
			author : Joi.string().required(),
			content : Joi.string().required()
		}),
		idSchema : Joi.object().keys({
			id : Joi.string().required()
		})
	}
}