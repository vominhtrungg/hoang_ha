const mongodb = require("mongoose");
var paginate=require("mongoose-paginate");
var Schema=mongodb.Schema;
var InitCatalogue=new Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	alias:String,
	firstpage:String,
	lastpage:String,
	leftpages:Array,
	rightpages:Array,
	likes:String,
	created_at:Date,
	updated_at:Date
});

	InitCatalogue.plugin(paginate);
	InitCatalogue.pre("save",function(next){
		var current_day= new Date();
		this.updated_at=current_day;	
		if(!this.created_at){
			this.created_at=current_day;
		}
		next();
	});
	
	var Catalogue= mongodb.model("Catalogue",InitCatalogue);
module.exports=Catalogue;