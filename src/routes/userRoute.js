import Router from 'express-promise-router'
import UserController from '../controllers/userController'
import { validateBody, schemas } from '../helpers/routeHelpers'
import passport from 'passport'

const passportConfig = require('../config/passport')
const router = Router()
const passportSignIn = passport.authenticate('local', { session : false })
const passportJWT = passport.authenticate('jwt', { session : false })

router.route('/test')
	.get(UserController.test)
	
router.route('/signup')
	.post(validateBody(schemas.authSchema), UserController.signUp)
	
router.route('/signin')
	.post(validateBody(schemas.authSchema), passportSignIn, UserController.signIn)
	
router.route('/secret')
	.get(passportJWT, UserController.secret)
	
router.route('/getall')
	.get(UserController.getAll)
	
router.route('/getbyid')
	.post(validateBody(schemas.idSchema), UserController.getById)

router.route('/delete')
	.post(validateBody(schemas.idSchema), UserController.delete)
	
module.exports = router