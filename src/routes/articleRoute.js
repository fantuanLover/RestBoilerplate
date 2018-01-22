import Router from 'express-promise-router'
import ArticleController from '../controllers/articleController'
import { validateBody, schemas } from '../helpers/routeHelpers'
import passport from 'passport'

const passportConfig = require('../config/passport')
const router = Router()
const passportJWT = passport.authenticate('jwt', { session : false })

router.route('/test')
	.get(ArticleController.test)
	
router.route('/add')
	.post(validateBody(schemas.articleSchema), ArticleController.add)
	
router.route('/update')
	.post(validateBody(schemas.articleSchema), ArticleController.update)
	
router.route('/getbyid')
	.post(validateBody(schemas.idSchema), ArticleController.getById)
	
router.route('/delete')
	.post(validateBody(schemas.idSchema), ArticleController.delete)
	
router.route('/addmore')
	.post(validateBody(schemas.idSchema), ArticleController.addMore)
	
router.route('/getall')
	.get(ArticleController.getAll)



	
module.exports = router