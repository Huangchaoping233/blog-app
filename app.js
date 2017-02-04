var express = require('express')
var bodyParser = require('body-parser')
var log = require('morgan')
var cookieParser = require('cookie-parser')
var multer = require('multer');

global.pageSize = 6;

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

app.use('/learn',require('./routers/learn'))

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


app.get('/life/getData/:page?',(req,res)=>{
    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }
    LifeDal.getDataByPage(page,{},data=>{
        res.json({
            status:'y',
            data:data.res,
            pageCount:data.pageCount,
        })
    })
})


const adminUserData = [
    {userName:'admin',pwd:"admin"},
    {userName:'admin001',pwd:"123456"},
]
app.post('/admin/login',(req,res)=>{
    var userName = req.body.userName
    var userPWD = req.body.userPWD

    //根据用户名查询用户数据
    var user = adminUserData.find(item=>{
        return item.userName == userName
    })
    if(user){
        if(user.pwd == userPWD){
            res.cookie('adminUserName',userName,{path:'/'}) //设置管理后台中登陆用户的cookie信息
            res.json({
                status:'y',
                msg:'登录成功'
            })
        }
        else{
            res.json({
                status:'n',
                msg:'用户密码错误!'
            })
        }
    }
    else{
        res.json({
            status:'n',
            msg:'用户信息不存在!'
        })
    }
})
//所有的路由地址中包含/admin的都需要进行登录判断
app.all('/admin/*',(req,res,next)=>{
    console.log('当前访问的是管理后台,需要登录')
    console.log(req.cookies)
    //判断用户是否登录
    if(req.cookies.adminUserName){
        //此处可以继续用户合法性的判断...
        next()
    }
    else{
        res.redirect('/admin/login.html')
    }
    // next()
})
//渲染管理后台首页
app.get('/admin/main',(req,res)=>{
    res.render('admin/main')
})

app.use('/admin/life',require('./routers/admin/life'))
app.use('/admin/learn',require('./routers/admin/learn'))


app.listen('3000',()=>{
	console.log('服务器运行于3000端口...')
})