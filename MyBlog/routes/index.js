var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//第一个参数是文件名，第二个参数是传递到页面的值
	console.log(req.userInfo);
  res.render('index', { userInfo: req.userInfo });
  // 
});

module.exports = router;
