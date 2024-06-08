const mongodb = require("mongoose");
var paginate=require("mongoose-paginate");
var Schema=mongodb.Schema;
var Initcontact=new Schema({
	name:{
		type:String,
		required:true,
		unique:false
	},
	productName: String,
	email:String,
	quantity:{
		type:Number,
		default: 0
	},
	description:String,
	created_at:Date,
	updated_at:Date
});

	Initcontact.plugin(paginate);
	Initcontact.pre("save",function(next){
		var current_day= new Date();
		this.updated_at=current_day;	
		if(!this.created_at){
			this.created_at=current_day;
		}
		next();
	});
	var contact= mongodb.model("contact",Initcontact);
module.exports=contact;