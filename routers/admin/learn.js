
var express = require('express')
var router = express.Router()

var LearnDal = require('../../common/learn').LearnDal
var learnDal = new LearnDal()
// 列表数据
router.get('/list',(req,res)=>{
    // var searchName = ''
    var filter = {}
    if(req.query.name){
        var searchName = req.query.name;
        filter = {
            $or:[
                {title:{$regex:new RegExp(searchName,'i')}},
                {date:{$regex:new RegExp(searchName,'i')}}
            ]
        }
    }
    //取得已经存在的
    learnDal.getData(filter,function(dataList){
        res.render('admin/learn/list',{list:dataList,query:req.query})
    })
})
// 新增页面
router.get('/add',(req,res)=>{
    res.render('admin/learn/add')
})
// 新增数据表单提交
router.post('/create',(req,res)=>{
    console.log(req.body)
    learnDal.save(req.body,function(isOK){
        if(isOK){
            res.redirect('/admin/learn/list') //页面跳转
        }
        else{
            //错误处理
        }
    })
})

router.post('/del',(req,res)=>{
    learnDal.del(req.body.id,isOK=>{
        if(isOK){
            res.redirect('/admin/learn/list')
        }
        else{
            //错误处理
        }
    })
})

//修改指定的记录
router.get('/edit/:id',(req,res)=>{
    var id = req.params.id
    learnDal.findByID(id,function(model){
        //res.json(model)
        res.render('admin/learn/edit',{model:model})
    })
})

router.post('/update/:id',(req,res)=>{
    var id = req.params.id
    learnDal.updateByID(id,req.body,function(isOK){
        if(isOK){
            res.redirect('/admin/learn/list')
        }
        else{
            //错误处理
        }
    })
})

module.exports = router