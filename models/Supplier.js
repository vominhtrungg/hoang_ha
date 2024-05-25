const mongodb = require("mongoose");
var paginate=require("mongoose-paginate");
var Schema=mongodb.Schema;
var InitSupplier=new Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	alias:String,
	picture:String,
	description:String,
	status:Boolean,
	created_at:Date,
	updated_at:Date
});

	InitSupplier.plugin(paginate);
	InitSupplier.pre("save",function(next){
		var current_day= new Date();
		this.updated_at=current_day;	
		if(!this.created_at){
			this.created_at=current_day;
		}
		next();
	});
	/*InitSupplier.pre("remove",function(next){
		console.log(JSON.stringify(this) );
			this.model("Product").remove({cid_cate:this._id},next);
			//next();
	});*/
	var Supplier= mongodb.model("Supplier",InitSupplier);
module.exports=Supplier;