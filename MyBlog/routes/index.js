var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//第一个参数是文件名，第二个参数是传递到页面的值
  res.render('index', { title: 'Express' });
});

module.exports = router;
