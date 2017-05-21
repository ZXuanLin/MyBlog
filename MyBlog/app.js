var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test',function(err){
	if(err){
		console.log('连接失败');
	}else{
		console.log('连接成功');
	}
})
//引入引擎模块
var swig = require('swig');
//引入自定义路由
var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var api = require('./routes/api');
var article = require('./routes/article');

var app = express();
//不用重启服务器
swig.setDefaults({cache:false})

// 定义模板引擎
app.engine('html',swig.renderFile); //1，解析文件的后缀名，2，解析文件名使用的方法
app.set('views', path.join(__dirname, 'views')); //1，固定参数，2，文件存放的路径
app.set('view engine', 'html'); //1，固定参数，2，解析文件的后缀名

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//静态文件
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'lib')));
app.use(express.static(path.join(__dirname, 'img')));

//设置访问路径
app.use('/', index);
app.use('/users', users);
app.use('/admin',admin);
app.use('/api',api);
app.use('/article',article);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
