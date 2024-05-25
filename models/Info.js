const mongodb = require("mongoose");
var paginate=require("mongoose-paginate");
var Schema=mongodb.Schema;
var InitInfo=new Schema({
	
	general:String,
	vision:String,
	mission:String,
	fieldwork:String,
	creativedesign:String,
	bussiness:String,
	gift:String,
	printing:String,
	logistic:String,
	processing:String,
	scale:String,
	product:String,
	customer:String,
	created_at:Date,
	updated_at:Date
});

	InitInfo.plugin(paginate);
	InitInfo.pre("save",function(next){
		var current_day= new Date();
		this.updated_at=current_day;	
		if(!this.created_at){
			this.created_at=current_day;
		}
		next();
	});

	var Info= mongodb.model("Info",InitInfo);
module.exports=Info;