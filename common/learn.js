var db = require('./db_base')
var DBBase = db.DBBase
var mongoose = db.mongoose
var Schema = mongoose.Schema


var learnSchema = new Schema({
    title:String,
    content:String,
    date:String
})

var Learn = mongoose.model('learn',learnSchema) //创建Learn模型

/**
 * 书籍模型
 */
class LearnDal extends DBBase{
    constructor(){
        super(Learn)
    }
    /**
     * 分页取数据
     * @param  {[type]}   page     当前页码
     * @param  {[type]}   filter   查询条件
     * @param  {Function} callback 回调函数
     * @return {[type]}            [description]
     */

}

module.exports = {
    Learn:Learn,
    LearnDal:LearnDal
}
