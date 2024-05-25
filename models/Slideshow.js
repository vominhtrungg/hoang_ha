const mongodb = require("mongoose");
var paginate=require("mongoose-paginate");
var Schema=mongodb.Schema;
var InitSlideshow=new Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	alias:String,
	picture:String,
	links:String,
	status:Boolean,
	page:{
		type:String,
		default:'home'
	},
	created_at:Date,
	updated_at:Date
});

	InitSlideshow.plugin(paginate);
	InitSlideshow.pre("save",function(next){
		var current_day= new Date();
		this.updated_at=current_day;	
		if(!this.created_at){
			this.created_at=current_day;
		}
		next();
	});
	var Slideshow= mongodb.model("Slideshow",InitSlideshow);
module.exports=Slideshow;