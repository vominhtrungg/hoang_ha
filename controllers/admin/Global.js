
const GContact =require("../../models/Contact");
const GProduct =require("../../models/Product");
const GDesign =require("../../models/Design");
const GCate =require("../../models/Categories");
const GProject =require("../../models/Project");
exports.Global=function(TPromise,View){
	
	var load_total_contact=GContact.count({},function(err,count){
		View.totalcontact=count;
	});
	TPromise.push(load_total_contact);
	
	var load_total_product=GProduct.count({},function(err,count){
		View.totalproduct=count;
	});
	TPromise.push(load_total_product);


	var load_total_design=GDesign.count({},function(err,count){
		View.totaldesign=count;
	});
	TPromise.push(load_total_design);


	var load_total_cate=GCate.count({},function(err,count){
		View.totalcate=count;
	});
	TPromise.push(load_total_cate);


	var load_total_project=GProject.count({},function(err,count){
		View.totalproject=count;
	});
	TPromise.push(load_total_project);

	
}
