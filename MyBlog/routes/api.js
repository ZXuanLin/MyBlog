var express = require('express');
var User = require('../models/User');
var Category = require('../models/Categories');
var router = express.Router();
var responseData = null;

router.use(function(req,res,next){
	responseData = {
		code:0,
		message:''
	};
	next();
})
router.post('/user/register',function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;
	var repassword = req.body.repassword;

	if(username == ''){
		responseData.code = 1;
		responseData.message = '用户名不能为空';
		res.json(responseData);
		return;
	};

	if(password == ''){
		responseData.code = 2;
		responseData.message = '密码不能为空';
		res.json(responseData);
		return;
	};

	if(repassword !== password){
		responseData.code = 3;
		responseData.message = '两次密码不一致';
		res.json(responseData);
		return;
	};
	User.findOne({
		username:username
	}).then(function(userInfo){
		if(userInfo){
			responseData.code = 4;
			responseData.message = '用户名已存在';
			res.json(responseData);
			return;
		}else{
			//保存用户信息到数据库
			var user = new User({
				username:username,
				password:password
			});
			return user.save();
		}
	}).then(function(newUserInfo){
		// console.log(newUserInfo);
		responseData.message = '注册成功';
		res.json(responseData);
	})
	
})

router.post('/user/login',function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;
	if(username == '' || password == ''){
		responseData.code = 1;
		responseData.message = '用户名和密码不能为空';
		res.json(responseData);
		return;
	}

	User.findOne({
		username:username,
		password:password
	}).then(function(userInfo){
		if(!userInfo){
			responseData.code = 2;
			responseData.message = '用户名或密码错误';
			res.json(responseData);
			return;
		}else{
			responseData.username = userInfo.username;
			responseData.message = '登陆成功';

			var loginUserInfo = JSON.stringify({_id:userInfo._id,username:userInfo.username,isAdmin:userInfo.isAdmin})
			req.cookies.set('userInfo',loginUserInfo)
			res.json(responseData);
			// console.log(req.cookies);
			return;
		}
	})
	// next();
})

router.get('/user/logout',function(req,res){
	req.cookies.set('userInfo',JSON.stringify({
		_id:null,
		username:null,
		isAdmin:false
	}));

	res.json(responseData);
	return;
})

router.post('/category/add',function(req,res,next){

	var name = req.body.name || '';

	if(name === ''){
		res.render('addError',{
			userInfo:req.userInfo
		})
	}
})


// 评论提交
router.post('/comment/post',function(req,res,next){
    // 文章的id是需要前端提交的。
    var contentId=req.body.contentId||'';
    var postData={
        username:req.userInfo.username,
        postTime: new ConvertDate().getDate(),
        content: req.body.content
    };

    // 查询当前内容信息
    Content.findOne({
        _id:contentId
    }).then(function(content){
        content.comments.push(postData);
        return content.save()
    }).then(function(newContent){//最新的内容在newContent！
        responseData.message='评论成功！';
        res.json(responseData);
    })

});









module.exports = router;