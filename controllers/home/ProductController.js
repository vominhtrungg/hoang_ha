	var View={};
var Layout="home/product/";
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


var paginate=require("express-paginate");

exports.cate=function(req,res){	
	require("./Global").Global(TPromise,View);
	View.data={};
	View.error={};
	View.seo_title="Tất cả danh mục " ;
	View.stylepage='cate';
	var load_slide=TSlideshow.find({status:true,page:"product"}).sort({"updated_at":-1}).exec(function(err,data){
			View.slideshow=data;
	});
	TPromise.push(load_slide);

	 

	var load_cate = TCate.find({status:true}).sort({"name":-1}).exec(function(err,data){
			View.cate= data;
		
	});
	TPromise.push(load_cate);

	Q.all(TPromise).done(function(){
		
	//	console.log(View.cate);
		res.render(Layout+"cate",View);
	});
}


exports.product=function(req,res){
	require("./Global").Global(TPromise,View);
	View.data={};
	View.error={};

	View.stylepage='detail';
	
	TCate.findOne({alias:req.params.alias},function(err,MyCate){
			var load_slide=TSlideshow.find({status:true,page:"product"}).sort({"updated_at":-1}).exec(function(err,data){
					View.slideshow=data;
			});
			TPromise.push(load_slide);
			
		
			if(req.params.alias){
				
				var load_cate = TCate.find({status:true}).sort({"name":-1}).exec(function(err,data){
					View.cate= data;
				
				});
				TPromise.push(load_cate);
				if(!req.params.product){
					View.seo_url = `https://inanhoangha.com/san-pham/${req.params.alias}`;
				}else{
					View.seo_url = `https://inanhoangha.com/san-pham/${req.params.alias}/${req.params.product}`;
				}
				if(req.params.product){
					var detail_product=TProduct.findOne({status:true,alias:req.params.product,cid_cate:MyCate._id}).populate({path:"cid_cate"}).sort({"updated_at":-1}).exec(function(err,data){
							View.product_detail=data;
							View.seo_description=data.description;
							data.picture ? View.seo_image= `/public/upload/product/${data.picture}` : '';
							View.seo_title = data.name;
					});
				}else{
						var detail_product=TProduct.findOne({status:true,cid_cate:MyCate._id}).populate({path:"cid_cate"}).sort({"updated_at":-1}).exec(function(err,data){
							View.seo_title=MyCate.name;
							// View.seo_description=data.description;
							View.product_detail=data;
							View.seo_image= `/public/upload/product/${MyCate.picture}`;
						});
				}
				
				TPromise.push(detail_product);

				var load_product=TProduct.find({status:true,cid_cate:MyCate._id}).populate({path:"cid_cate"} ).sort({"updated_at":-1}).exec(function(err,data){
						View.load_product=data;
					
				});
				TPromise.push(load_product);

				View.alias=req.params.alias;

				
			}


		Q.all(TPromise).done(function(){
		
			res.render(Layout+"product",View);
		});

	});
}

exports.detail=function(req,res){
	require("./Global").Global(TPromise,View);
	if(req.params.product && req.params.cate){


		View.data={};
		View.error={};

		View.stylepage='detail';
		
		var load_slide=TSlideshow.find({status:true,page:"product"}).sort({"updated_at":-1}).exec(function(err,data){
			View.slideshow=data;
		});
		TPromise.push(load_slide);
		
		var load_cate = TCate.find({status:true}).sort({"name":-1}).exec(function(err,data){
				View.cate= data;
		});
		TPromise.push(load_cate);

		var load_product=TProduct.findOne({'alias':req.params.product}).populate("cid_cate").exec(function(err,data){
				if(empty(data)){
					res.json([{"error":"not found product"}]);	
					return ;
				}
				View.product=data;
				View.seo_title=data.name;
				View.seo_description=data.name;
		});
		
		var load_other_product=TProduct.find({status:true, alias:{$ne : req.params.product}}).populate({path:"cid_cate",match:{alias:req.params.cate},select:"alias"}).exec(function(err,data){
				View.other_product=data;
				
		});
		TPromise.push(load_other_product);


		Q.all(TPromise).done(function(){
		
			res.render(Layout+"detail",View);
		});
	}else{
		res.json([{"error":"not found"}]);	
	}
}
exports.search=function(req,res){
	require("./Global").Global(TPromise,View);
	


		View.data={};
		View.error={};

		View.stylepage='cate';
		var load_slide=TSlideshow.find({status:true,page:"product"}).sort({"updated_at":-1}).exec(function(err,data){
				View.slideshow=data;
		});
		TPromise.push(load_slide);

		var load_cate = TCate.find({status:true}).sort({"name":-1}).exec(function(err,data){
				View.cate= data;
		});
		TPromise.push(load_cate);

			var sql={'status':true};
			
			
			if(req.params.key){
					sql={ $and:[ 
						{'status':true},{alias: { $regex: '.*' + req.params.key + '.*' } }
					]};
					View.seo_title="Tìm kiếm " + req.params.key.split("-").join(" ");
				
			}

		var load_product=TProduct.find(sql).populate("cid_cate").exec(function(err,data){
				
				View.product=data;
		});
		TPromise.push(load_product);
		


		Q.all(TPromise).done(function(){
		
			res.render(Layout+"search",View);
		});
	
}
exports.postsearch=function(req,res){
	
	if(req.body.k){

			var x=My_Data.toAlias(req.body.k);

			res.redirect("/tu-khoa/"+x);
	}else{
		res.redirect("/");
	}
}

exports.project=function(req,res){
	require("./Global").Global(TPromise,View);
	View.data={};
	View.error={};
	View.seo_title=" Dự án thực hiện " ;
	View.stylepage='project';
	
	var load_project=TProject.findOne({alias:req.params.alias}).exec(function(err,data){
		View.project=data;
	});
	TPromise.push(load_project);

		var load_other_project=TProject.find({status:true, alias:{$ne : req.params.product}}).limit(4).exec(function(err,data){
				View.other_project=data;
				
		});
		TPromise.push(load_other_project);


	Q.all(TPromise).done(function(){
		View.slideshow=null;
		res.render(Layout+"project",View);
	});
}