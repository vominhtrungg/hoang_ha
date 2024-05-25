const mongodb = require("mongoose");
var paginate=require("mongoose-paginate");
var Schema=mongodb.Schema;
var InitCustomers=new Schema({
	username:String,
	password:String,
	
	created_at:Date,
	updated_at:Date
});

	InitCustomers.plugin(paginate);
	InitCustomers.pre("save",function(next){
		var current_day= new Date();
		this.updated_at=current_day;	
		if(!this.created_at){
			this.created_at=current_day;
		}
		next();
	});

	var Customers= mongodb.model("Customers",InitCustomers);
module.exports=Customers;