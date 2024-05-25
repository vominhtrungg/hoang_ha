
const XGeneral =require("../../models/General");
const XCate= require("../../models/Categories");
const TDesign= require("../../models/Design");
var i18n = require('i18n');

exports.Global=function(TPromise,View){
	
	var xload_general=XGeneral.findOne({}).exec(function(err,data){
		View.general=data;
	})
	
	TPromise.push(xload_general);
	
	var xload_cate = XCate.find({status:true}).sort({"position":-1}).exec(function(err,data){
			View.menu_cate= data;
		
	});
	TPromise.push(xload_cate);

	
	var load_design = TDesign.find({status:true}).sort({"position":-1}).populate("cid_cate").exec(function(err,data){
		View.design=data;
	});
	TPromise.push(load_design);

	View.i18n=i18n;	
}
