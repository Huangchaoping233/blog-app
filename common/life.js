var db = require('./db_base')
var DBBase = db.DBBase
var mongoose = db.mongoose
var Schema = mongoose.Schema
//创建book集合的数据结构
var lifeSchema = new Schema({
    tip:String,
    photo:String,
    date:String
})

var Life = mongoose.model('life',lifeSchema) //创建book模型

/**
 * 书籍模型
 */
class LifeDal extends DBBase{
    constructor(){
        super(Life)
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
    Life:Life,
    LifeDal:LifeDal
}
