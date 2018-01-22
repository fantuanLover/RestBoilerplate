import mongoose from 'mongoose'

// Article Schema
let articleSchema = mongoose.Schema({
	title:{
		type: String, 
		unique: true,
		trim: true,
		required: true 
	},
	author:{
		type: String,
		trim: true,
		required: true
	},
	content:{
		type: String,
		trim: true,
		required: true
	},
	created: { 
		type: Date,
		default: Date.now
	}
})

let Article = module.exports = mongoose.model('Article', articleSchema)