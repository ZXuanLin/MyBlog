var express = require('express');
var router = express.Router();
var Category = require('../models/Categories');
var Content=require('../models/Content');
/* GET home page. */
router.get('/', function(req, res, next) {
	//第一个参数是文件名，第二个参数是传递到页面的值
  Category.find().sort({_id:-1}).then(function(categories){
  		res.render('index', { 
  			userInfo: req.userInfo ,
  			categories:categories
  		});
  })
  // res.send('ok')
});



router.get('/article',function(req,res,next){
		var data={
        userInfo:req.userInfo,
        category:req.query.category||'',
        categories:[],
        count:0,
        page:Number(req.query.page||1),
        limit:3,
        pages:0
    };

    var where={};
	if(data.category){
	    where.category=data.category
	}

    	Category.find().then(function(categories){
    		data.categories = categories;
    		return Content.where(where).count();
    	}).then(function(count){
    		data.count = count;
    		data.pages = Math.ceil(data.count/data.limit);
    		data.page = Math.min(data.page,data.pages);
    		data.page = Math.max(data.page,1);
    		var skip = (data.page - 1) * data.limit;
    		
    		return Content.where(where).find().limit(data.limit).skip(skip).sort({_id:-1}).populate(['category','user']);
    	}).then(function(contents){
    		data.contents = contents;
    		res.render('index',data);
    	})
})
	

router.get('/view',function(req,res,next){
	
    var contentId=req.query.contentid||'';
    // console.log(contentId);
    var data={
        userInfo:req.userInfo,
        categories:[],
        content:null
    };

    Category.find().then(function(categories){
        data.categories=categories;
        return Content.findOne({_id:contentId});
    }).then(function(content){
        data.content=content;
        content.views++;//保存阅读数
        content.save();
        // console.log(data);
        res.render('article_layout',data);
    })
});

    

module.exports = router;
