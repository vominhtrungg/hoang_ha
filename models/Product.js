const mongodb = require("mongoose");
var paginate=require("mongoose-paginate");
var Schema=mongodb.Schema;
var InitProduct=new Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	alias:String,
	picture:String,
	multipicture:Array,
	contents:String,
	cid_cate:{ type: Schema.Types.ObjectId, ref: 'Categories' },
	status:Boolean,
	created_at:Date,
	updated_at:Date
});

	InitProduct.plugin(paginate);
	InitProduct.pre("save",function(next){
		var current_day= new Date();
		this.updated_at=current_day;	
		if(!this.created_at){
			this.created_at=current_day;
		}
		next();
	});
	var Product= mongodb.model("Product",InitProduct);
module.exports=Product;