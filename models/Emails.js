const mongodb = require("mongoose");
var paginate=require("mongoose-paginate");
var Schema=mongodb.Schema;
var InitEmails=new Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	showView:{
		type:Number,
		default: 0
	},
	created_at:Date,
	updated_at:Date
});

	InitEmails.plugin(paginate);
	InitEmails.pre("save",function(next){
		var current_day= new Date();
		this.updated_at=current_day;	
		if(!this.created_at){
			this.created_at=current_day;
		}
		next();
	});
	var Emails= mongodb.model("Emails",InitEmails);
module.exports=Emails;