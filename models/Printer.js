const mongodb = require("mongoose");
var paginate=require("mongoose-paginate");
var Schema=mongodb.Schema;
var InitPrinter=new Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	
	downloads:String,
	description:String,
	namefooter:Array,
	contentfooter:Array,
	created_at:Date,
	updated_at:Date
});

	InitPrinter.plugin(paginate);
	InitPrinter.pre("save",function(next){
		var current_day= new Date();
		this.updated_at=current_day;	
		if(!this.created_at){
			this.created_at=current_day;
		}
		next();
	});
	/*InitPrinter.pre("remove",function(next){
		console.log(JSON.stringify(this) );
			this.model("Product").remove({cid_cate:this._id},next);
			//next();
	});*/
	var Printer= mongodb.model("Printer",InitPrinter);
module.exports=Printer;