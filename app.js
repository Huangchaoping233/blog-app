var express = require('express')
var bodyParser = require('body-parser')
var log = require('morgan')
var cookieParser = require('cookie-parser')
var multer = require('multer');


var LifeDal = require('./common/life').LifeDal
var LifeDal = new LifeDal()

var storage = multer.diskStorage({
    destination:'./public/img/life',
    filename:function(req,file,cb){
        // console.log(req.body)
        cb(null,req.cookies.time+'.jpg');
    }
})

var upload = multer({storage});


//全局加载tools模块
var app = express()

app.use(log('dev')) //终端日志输出

app.use(cookieParser()) //使用cookie-parser中间件

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

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


app.post('/life/photo',upload.single('photo'),(req,res)=>{
    req.body.photo = '/img/life/'+req.body.time+'.jpg';
    LifeDal.save(req.body,isOK=>{
        if(isOK){
            res.status(200).json({code:'success',message:'保存成功'});
        }
        else{
            res.status(200).json({code:'error',message:'系统错误'});
        }
    })

})


app.get('/life/getData',(req,res)=>{
    LifeDal.getData({},data=>{
        res.json({
            status:'y',
            data:data
        })
    })
})

app.listen('3000',()=>{
	console.log('服务器运行于3000端口...')
})