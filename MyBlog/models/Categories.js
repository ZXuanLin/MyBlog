var mongoose = require('mongoose');
//博客分类的表结构
var categoresSchema = require('../schemas/categories');

module.exports = mongoose.model('Category',categoresSchema)