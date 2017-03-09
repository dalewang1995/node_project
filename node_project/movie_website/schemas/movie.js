var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({  //调用mongoose的Schema方法
	doctor: String,
	title: String,
	langguage: String,
	country: String,
	summary: String,
	flash: String,
	poster:String,
	year: Number,
	meta: {
		cerateAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})  


// 添加方法
MovieSchema.pre('save', function(next) {
	if (this.isNew){
		this.meta.cerateAt = this.meta.updateAt = Date.now()
	}else {
		this.meta.updateAt = Date.now()
	}
	next();    //存储流程走下去
});

// 添加静态方法
MovieSchema.statics = {
	fetch: function (cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)   //执行回到方法
	},
	findById: function (id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = MovieSchema;