var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Category = require('../models/Categories');
var Content = require('../models/Content');
var Promise = require('promise');


function renderAdminTable(obj,type,limit,_query){
	router.get('/'+type+'/',function(req,res,next){
		var page = req.query.page || 1;

		var count = 0; 
		obj.count().then(function(_count){
			count = _count;
			var pages = Math.ceil(count/limit);
			page = Math.min(page,pages);
			page = Math.max(page,1);
			var skip = (page - 1) * limit;

			var newObj = _query?
			obj.find().sort({_id:-1}).limit(limit).skip(skip).populate(_query):obj.find().sort({_id:-1}).limit(limit).skip(skip);
			newObj.then(function(data){
				console.log(data);
				res.render(type + '_index',{
					type:type,
					userInfo:req.userInfo,
					data:data,
					page:page,
					pages:pages,
					limit:limit,
					count:count,
					user:req.userInfo._id
				});
			});
		})
	})
}
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


renderAdminTable(User,'user',2);
renderAdminTable(Category,'category',2);
renderAdminTable(Content,'content',2,['category','user']);
//分类添加
router.get('/category/add',function(req,res,next){
	res.render('category_add',{
		userInfo:req.userInfo
	})
})


//分类提交
router.post('/category/add',function(req,res,next){
	var name = req.body.name || '';
	if(name === ''){
		res.render('addError',{
			userInfo:req.userInfo,
			message:'提交的内容不能为空',
			operation:{
				url:'javascript:window.history.back()',
				operation:'返回上一步'
			}
		})
	}

	Category.findOne({
		name:name
	}).then(function(rs){
		if(rs){
			res.render('addError',{
				userInfo:req.userInfo,
				message:'数据库已经有该分类',
				operation:{
					url:'javascript:window.history.back()',
					operation:'返回上一步'
				}
			});
			return Promise.reject();
		}else{
			return new Category({
				name:name
			}).save();
		}
	}).then(function(newCategory){
		res.render('addSuccess',{
			userInfo:req.userInfo,
			message:'分类保存成功',
			operation:{
				url:"javascript:window.history.back()",
				operation:'返回上一步'
			}
		})
	})
})
//分类修改
router.get('/category/edit',function(req,res,next){
	
	var id = req.query.id || '';
	var name = req.body.name || name;

	Category.findOne({
		_id:id
	}).then(function(category){
		if(!category){
			res.render('addError',{
				userInfo:req.userInfo,
				message:'分类信息不存在'
			})
			return Promise.reject();
		}else{
			res.render('edit',{
				userInfo:req.userInfo,
				category:category
			})
			}
		})

	})


//分类保存
router.post('/category/edit/', function (req, res, next) {
    var id = req.query.id || '';

    var name = req.body.name || name;
    Category.findOne({
        _id: id
    }).then(function (category) {

        if (!category) {
            res.render('addError', {
                userInfo: req.body.userInfo,
                message: '分类信息不存在！'
            });
            return Promise.reject();
        } else {
            // 如果用户不做任何修改就提交
            if (name == category.name) {
                res.render('addSuccess', {
                    userInfo: req.body.userInfo,
                    message: '修改成功！',
                    operation: {
                        url: '/admin/category',
                        operation: '返回分类管理'
                    }
                });
                return Promise.reject();
            } else {
                // 再查询id：不等于当前id
                return Category.findOne({
                    _id: {
                        $ne: id
                    },
                    name: name
                });
            }
        }
    }).then(function (same) {
        if (same) {
            res.render('addError', {
                userInfo: req.body.userInfo,
                message: '已经存在同名数据！'
            });
            return Promise.reject();
        } else {
            return Category.update({
                _id: id
            }, {
                name: name
            });
        }
    }).then(function (resb) {
        res.render('addSuccess', {
            userInfo: req.body.userInfo,
            message: '修改成功！',
            operation: {
                url: '/admin/category',
                operation: '返回分类管理'
            }
        });
    });
});

//分类删除
router.get('/category/delete',function(req,res,next){
	var id = req.query.id;
	Category.findOne({
		_id:id
	}).then(function(category){
		if(!category){
			res.render('addError',{
				userInfo:req.body.userInfo,
				message:'该内容不存在',
				operation:{
					url:'/admin/category',
					operation:'返回分类管理'
				}
			})
			return Promise.reject();
		}else{
			return Category.remove({
				_id:id
			})
		}
	}).then(function(){
		res.render('addSuccess',{
			userInfo:req.body.userInfo,
			message:'删除成功',
			operation:{
				url:"/admin/category",
				operation:'返回分类管理'
			}
		})
	})
})

//内容管理
router.get('/content',function(req,res,next){
	res.render('content_index')
})

//添加文章
router.get('/content/add',function(req,res,next){
	Category.find().then(function(categories){
		res.render('content_add',{
			userInfo:req.userInfo,
			categories:categories

		})
	})
})

//提交文章
router.post('/content/add',function(req,res,next){
	if(req.body.category.trim() == ''){
		res.render('addError',{
			userInfo:req.userInfo,
			message:'分类信息不存在！'
		})
		return Promise.reject();
	}

	if(req.body.title.trim() == ''){
		res.render('addError',{
			userInfo:req.userInfo,
			message:'标题不能为空'
		})
		return Promise.reject();
	}

	if(req.body.content.trim() == ''){
		res.render('addError',{
			userInfo:req.userInfo,
			message:'内容不能为空'
		})
		return Promise.reject();
	}


	new Content({
		category:req.body.category,
		title:req.body.title,
		description:req.body.description,
		content:req.body.content,
		date:new Date().toString(),
		user:req.userInfo._id
		
	}).save().then(function(){
		res.render('addSuccess',{
			userInfo:req.userInfo,
			message:'文章发布成功'
		})
	})
})

//文章修改
router.get('/content/edit',function(req,res,next){
	// res.render('content_edit')
	var id = req.query.id || '';

	Content.findOne({
		_id:id
	}).then(function(content){
		console.log(content);
		if(!content){
			res.render('addError',{
				userInfo:req.userInfo,
				message:'该文章已经被删除'
			})
			return Promise.reject();
		}else{
			Category.find().then(function(categories){
				res.render('content_edit',{
					userInfo:req.userInfo,
					categories:categories,
					data:content
				})
			})
		}
	})
})

//文章修改保存
router.post('/content/edit',function(req,res,next){
	var id = req.query.id || '';

	Content.findOne({
		_id:id
	}).then(function(content){
		if(!content){
			res.render('addError',{
				userInfo:req.body.userInfo,
				message:'文章已经被删除'
			})
			return Promise.reject();
		}else{
			return Content.update({
				_id:id
			},{
				category:req.body.category,
				title:req.body.title,
				description:req.body.description,
				content:req.body.content
			})
		}
	}).then(function(){
		res.render('addSuccess',{
			userInfo:req.body.userInfo,
			message:'修改成功！',
			operation:{
				url:'/admin/content',
				operation:'返回分类管理'
			}
		})
	})
})

//文章删除
router.get('/content/delete',function(req,res,next){
	var id = req.query.id || '';

	Content.remove({
		_id:id
	}).then(function(){
		res.render('addSuccess',{
			userInfo:req.userInfo,
			message:'删除文章成功',
			operation:{
				url:'/admin/content',
				operation:'返回分类管理'
			}
		})
	})

	// res.send('ok')
})





























module.exports = router;