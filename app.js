var express = require('express')
var bodyParser = require('body-parser')
var log = require('morgan')
var cookieParser = require('cookie-parser')

//全局加载tools模块
var app = express()

app.use(log('dev')) //终端日志输出

app.use(cookieParser()) //使用cookie-parser中间件

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// art-template模版引擎配置
var template = require('art-template')
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static('./public'))



app.listen('3000',()=>{
	console.log('服务器运行于3000端口...')
})