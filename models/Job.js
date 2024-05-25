const mongodb = require("mongoose");
var paginate=require("mongoose-paginate");
var Schema=mongodb.Schema;
var Initjob=new Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	contents:String,
	picture:String,
	timed:String,
	contact:String,
	status:Boolean,
	created_at:Date,
	updated_at:Date
});

	Initjob.plugin(paginate);
	Initjob.pre("save",function(next){
		var current_day= new Date();
		this.updated_at=current_day;	
		if(!this.created_at){
			this.created_at=current_day;
		}
		next();
	});
	var job= mongodb.model("job",Initjob);
module.exports=job;