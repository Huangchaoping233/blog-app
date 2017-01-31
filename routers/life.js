var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');


var storage = multer.diskStorage({
    destination:'/img/life',
    filename:function(req,file,cb){
        cb(null,'icon.jpg');
    }
})

var upload = multer({storage:storage});


router.post('/photo',upload.single('photo'),(req,res)=>{
    console.log(req.body)
    res.status(200).json({code:'success',message:'上传成功'});
})

router.listen(3000,function(){
    console.log('服务器开启了...')
})

module.exports = router;