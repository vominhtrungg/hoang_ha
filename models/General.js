const mongodb = require("mongoose");
var Schema=mongodb.Schema;
var InitGeneral=new Schema({
	name:String,
	description:String,
	phone:String,
	email:String,
	emailMain:String,
	emailMainKey:String,
	hotline:String,
	address:String,
	gc:String,
	facebook:String,
	skype:String,
	google:String,
	linkedin:String,
	youtube:String,
	created_at:Date,
	updated_at:Date
});


	InitGeneral.pre("save",function(next){
		var current_day= new Date();
		this.updated_at=current_day;	
		if(!this.created_at){
			this.created_at=current_day;
		}
		next();
	});
	var General= mongodb.model("General",InitGeneral);
module.exports=General;