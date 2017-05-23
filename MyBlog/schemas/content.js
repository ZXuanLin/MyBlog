var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	category:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Category'
	},

	title:String,

	description:{
		type:String,
		default:''
	},

	content:{
		type:String,
		default:''
	},

	date:String,

	user:{
		type:mongoose.Schema.Types.ObjectId,
		//引用
		ref:'User'
	},

	views:{
		type:Number,
		default:0
	}



})