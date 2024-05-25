const mongodb = require("mongoose");
var paginate=require("mongoose-paginate");
var Schema=mongodb.Schema;
var Initdesign=new Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	alias:String,
	picture:String,
	multipicture:Array,
	contents:String,
	detail:String,
	position:{type:Number,default:1},
	status:Boolean,
	cid_cate:{type:Schema.Types.ObjectId,ref:'Categories'},
	created_at:Date,
	updated_at:Date
});

	Initdesign.plugin(paginate);
	Initdesign.pre("save",function(next){
		var current_day= new Date();
		this.updated_at=current_day;	
		if(!this.created_at){
			this.created_at=current_day;
		}
		next();
	});
	var design= mongodb.model("design",Initdesign);
module.exports=design;