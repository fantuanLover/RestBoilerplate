import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

//Create a schema
const userSchema = new Schema({
	email : {
		type : String,
		required : true,
		unique : true,
		lowercase : true
	},
	username : {
		type : String,
		required : true,
		unique : true,
		lowercase : true
	},
	password : { 
		type : String,
		required : true
	},
	created: { 
		type: Date,
		default: Date.now
	}
}) 

userSchema.pre('save', async function (next) {
	try {
		const salt = await bcrypt.genSalt(10)
		const passwordHash = await bcrypt.hash(this.password, salt)
		this.password = passwordHash
		next()
	} catch (error) {
		next(error)
	}
})

userSchema.methods.isValidPassword = async function(newPassword) {
	try{
		return await bcrypt.compare(newPassword, this.password)
	} catch (error) {
		throw new Error(error)
	}
}

userSchema.methods = {
	toJSON() {
		return {
			_id: this._id,
			username: this.username,
			email: this.email
		}
	}
}

//Create a model
const User = mongoose.model('user', userSchema)

//Export the model
module.exports = User














