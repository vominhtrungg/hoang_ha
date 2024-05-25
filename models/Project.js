const mongodb = require("mongoose");
var paginate=require("mongoose-paginate");
var Schema=mongodb.Schema;
var Initproject=new Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	links:String,
	picture:String,
	position:{
		type:Number,
		default:1
	},
	created_at:Date,
	updated_at:Date
});

	Initproject.plugin(paginate);
	Initproject.pre("save",function(next){
		var current_day= new Date();
		this.updated_at=current_day;	
		if(!this.created_at){
			this.created_at=current_day;
		}
		next();
	});
	var project= mongodb.model("project",Initproject);
module.exports=project;