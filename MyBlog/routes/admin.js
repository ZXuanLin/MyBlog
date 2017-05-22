var express = require('express');
var router = express.Router();
var User = require('../models/User');
/* 访问根目录的时候，比如这里是localhost:3000/admin */
router.use(function(req,res,next){
	if(!req.userInfo.isAdmin){
		res.send('不是管理员');
		return;
	}else{
		next();
	}
})

router.get('/',function(req,res,next){
	res.render('admin',{ userInfo: req.userInfo })
})

router.get('/user/',function(req,res,next){
	var page = req.query.page || 1;
	var limit = 2;
	var count = 0;

	User.count().then(function(_count){
		count = _count;
		var pages = Math.ceil(count/limit);

		page = Math.min(page,pages);

		page = Math.max(page,1);

		var skip = (page - 1) * limit;

		User.find().limit(limit).skip(skip).then(function(user){
			res.render('user_index',{
				userInfo:req.userInfo,
				users:user,
				page:page,
				pages:pages,
				limit:limit,
				count:count,
				type:'user'
			})
		})
	})
})

router.get('/category',function(req,res,next){
	res.render('category_index',{
		userInfo:req.userInfo
	})
})




module.exports = router;