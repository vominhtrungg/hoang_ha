var View={};
var Layout="home/page/";
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var fs=require("fs");
var TPromise=[];
var My_Data=require("../../library/Data");


const TCate= require("../../models/Categories");
const TProduct = require("../../models/Product");
const TProject =require("../../models/Project");
const TSlideshow = require("../../models/Slideshow");
const TSupplier = require("../../models/Supplier");
const TGeneral= require("../../models/General");
const TDesign= require("../../models/Design");
const TContact= require("../../models/Contact");
const TJob= require("../../models/Job");
const TPrinter= require("../../models/Printer");
const TInfo= require("../../models/Info");

var paginate=require("express-paginate");

exports.info=function(req,res){
	require("./Global").Global(TPromise,View);
	View.data={};
	View.error={};

	View.stylepage='info';
	View.seo_title="Giới thiệu ";

	var load_info= TInfo.findOne({}).exec(function(err,data){
			View.info=data;
	});
	TPromise.push(load_info);


	Q.all(TPromise).done(function(){
		res.render(Layout+"info",View);
	});
}
exports.design=function(req,res){

	require("./Global").Global(TPromise,View);
	View.data={};
	View.error={};
	View.seo_title="Thiết kế ";
	View.stylepage='design';

	

	var load_slide=TSlideshow.find({status:true,page:"design"}).sort({"updated_at":-1}).exec(function(err,data){
			View.slideshow=data;
	});
	
	Q.all(TPromise).done(function(){
	
		res.render(Layout+"design",View);
	});
}
exports.detaildesign=function(req,res){
	var View={};
	var TPromise=[];
	require("./Global").Global(TPromise,View);
	View.data={};
	View.error={};
	View.seo_title="Thiết kế ";
	View.stylepage='detail';

	

	var load_slide=TSlideshow.find({status:true,page:"design"}).sort({"updated_at":-1}).exec(function(err,data){
			View.slideshow=data;
	});
	TPromise.push(load_slide);

	var load_detail_design = TDesign.findOne({alias: req.params.alias}).exec(function(err,data){
		View.design_detail=data;
	});
	TPromise.push(load_detail_design);


	
	

	Q.all(TPromise).done(function(){
		TDesign.find({alias: {$ne:req.params.alias} , cid_cate: View.design_detail.cid_cate  }).exec(function(err,data){
			View.other_design=data;
			res.render(Layout+"detaildesign",View);
		});
		
	});
}
exports.contact=function(req,res){
	require("./Global").Global(TPromise,View);
	View.data={};
	View.error={};
	View.stylepage='contact';
	View.seo_title="Liên hệ ";
	if(req.method=='POST'){
		if(empty(req.body.name)){
			View.error.name= " Vui lòng nhập tên của bạn ";
		}
		if(empty(req.body.email)){
			View.error.email= " Vui lòng nhập tên của bạn ";
		}
		if(empty(req.body.content)){
			View.error.content= " Vui lòng nhập tên của bạn ";
		}
		if(empty(View.error)){
			var contact=new TContact();
			contact.name=req.body.name;
			contact.email=req.body.email;
			contact.description=req.body.content;
			contact.save();
			View.success=" Cảm ơn bạn đã liên hệ đến chúng tôi. Chúng tôi sẽ phản hồi đến bạn một cách sớm nhất. ";
		}
	}

	Q.all(TPromise).done(function(){
	
		res.render(Layout+"contact",View);
	});
}
exports.job=function(req,res){
	require("./Global").Global(TPromise,View);
	View.data={};
	View.error={};
	View.seo_title="Tuyển dụng  ";
	View.stylepage='job';
	var load_job = TJob.find({status:true}).sort({"updated_at":-1}).exec(function(err,data){
		View.job=data;
	});
	TPromise.push(load_job);

	
	
	Q.all(TPromise).done(function(){
		res.render(Layout+"job",View);
	});
}
exports.printer=function(req,res){
	require("./Global").Global(TPromise,View);
	View.data={};
	View.error={};
View.seo_title="In gia công OFFSET  ";
	View.stylepage='printer';
	
	var load_slide=TSlideshow.find({status:true,page:"print"}).sort({"updated_at":-1}).exec(function(err,data){
			View.slideshow=data;
	});
	TPromise.push(load_slide);

	var load_printer = TPrinter.findOne().exec(function(err,data){
			View.printer=data;
	});
	TPromise.push(load_printer);
	

		


	Q.all(TPromise).done(function(){
	
		res.render(Layout+"printer",View);
	});
}