const mongodb = require("mongoose");
var paginate=require("mongoose-paginate");
var Schema=mongodb.Schema;
var InitCategories=new Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	alias:String,
	picture:String,
	position:{
		type:Number,
		default:1

	},
	status:Boolean,
	created_at:Date,
	updated_at:Date
});

	InitCategories.plugin(paginate);
	InitCategories.pre("save",function(next){
		var current_day= new Date();
		this.updated_at=current_day;	
		if(!this.created_at){
			this.created_at=current_day;
		}
		next();
	});
	/*InitCategories.pre("remove",function(next){
		console.log(JSON.stringify(this) );
			this.model("Product").remove({cid_cate:this._id},next);
			//next();
	});*/
	var Categories= mongodb.model("Categories",InitCategories);
module.exports=Categories;