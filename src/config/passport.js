import passport from 'passport'
import { ExtractJwt } from 'passport-jwt'
import { JWT_SECRET } from './index'
import User from '../models/user'

const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy

//jwt strategy
passport.use(new JwtStrategy({
	jwtFromRequest : ExtractJwt.fromHeader('authorization'),
	secretOrKey : JWT_SECRET
}, async (payload, done) => {
	try {
		//find the user by id 
		const user = await User.findById(payload.sub)
		//if user not exists, handle it 
		if (!user) {
			return done(null, false)
		}
		//otherwise, return the user
		done(null, user)
	} catch (error) {
		done(error, false)
	}
}))

//local strategy

passport.use(new LocalStrategy({
	usernameField : 'email'
}, async (email, password, done) => {
	try{
		//Find the user given the email 
		const user = await User.findOne({ email })
		//If not, handle it 
		if (!user) {
			return done(null, false)
		}
		//Check if the password is correct 
		const isMatch = user.isValidPassword(password)
		//If not, handle it 
		if (!isMatch){
			return done(null, false)
		}
		//Otherwise, return the user 
		done(null, user)
	} catch (error) {
		done(error, false)
	}
	
}))







