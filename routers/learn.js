
var express = require('express')
var router = express.Router()
var LearnDal = require('../common/learn').LearnDal
var learnDal = new LearnDal()


router.post('/save',(req,res)=>{
    learnDal.save(req.body,isOK=>{
        if(isOK){
            res.json({
                status:'y',
                message:'保存成功'
            })
        }
        else{
            res.json({
                status:'n',
                message:'保存失败'
            })
        }
    })

})

router.get('/getData/:page?',(req,res)=>{
    var page = 1;
    if(req.params.page){
        page = req.params.page;
    }
    learnDal.getDataByPage(page,{},data=>{
        res.json({
            status:'y',
            data:data.res,
            pageCount:data.pageCount,
            page:page
        })
    })
})


module.exports = router