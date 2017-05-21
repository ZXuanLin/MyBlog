var express = require('express');
var router = express.Router();

/* 访问根目录的时候，比如这里是localhost:3000/admin */
router.get('/', function(req, res, next) {
  res.render('admin',{adminName:'管理员'});
});

module.exports = router;