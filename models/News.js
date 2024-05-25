const mongodb = require("mongoose");
var paginate=require("mongoose-paginate");
var Schema=mongodb.Schema;
var InitNews=new Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	alias:String,
	status:Boolean,
	is_home:Boolean,
	description:String,
	contents:String,
	picture:String,
	my_created_at:String,
	picture_title:String,
	picture_main:String,
	slogan:String,
	cid_cate:Number,
	viewer:Number,
	is_time:String,
	created_at:Date,
	updated_at:Date
});

	InitNews.plugin(paginate);
	InitNews.pre("save",function(next){
		var current_day= new Date();
		this.updated_at=current_day;	
		if(!this.created_at){
			this.created_at=current_day;
		}
		next();
	});
	
	var News= mongodb.model("News",InitNews);
module.exports=News;