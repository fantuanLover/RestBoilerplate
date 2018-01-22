import JWT from 'jsonwebtoken'
import User from '../models/user'
import { JWT_SECRET } from '../config'  
import UserService from '../service/userService'

const signToken = user => {
	return JWT.sign({
		sub : user.id,
		iat : new Date().getTime(),
		exp : new Date().getTime() + 1000
	}, JWT_SECRET)
}

module.exports = {
	test : async ( req, res, next ) => {
		res.send('User api is working!')
	},
	getAll : async ( req, res, next ) => {
		let users = await UserService.getAll()
		res.status(200).json({
			error : '',
			data : {
				users : users
			}
		})
	},
	signUp : async ( req, res, next ) => {
		const { email, password, username } = req.value.body 
		
		//Check if there is user with the same email 
		const foundUser = await User.findOne({ email : email })
		if (foundUser) {
			return res.status(403).json({ error : 'Email is already in use' })
		}
			
		//Create a new user
		const newUser = new User({
			email,
			password,
			username
		})
		await newUser.save()
		
		//Respond with token
		const token = signToken(newUser)
		
		res.status(200).json({ 
			error : '',
			data : {
				token : token
			}		
		})
	},
	signIn : async ( req, res, next ) => {
		res.send('SignIn api is working!')
	},
	secret : async ( req, res, next ) => {
		res.send('Secret api is working!')
	},
	delete : async ( req, res, next ) => {
		res.send('Secret api is working!')
	},
	getById : async ( req, res, next ) => {
		res.send('Secret api is working!')
	}	
}