var View={};
var Layout="home/catalogue/";
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
const TCatalogue =require("../../models/Catalogue");
var paginate=require("express-paginate");

exports.index=function(req,res){
	require("./Global").Global(TPromise,View);
	View.data={};
	View.error={};

	View.stylepage='catalogue';
	View.seo_title=" Catalogue ";
	View.host=req.get('host');
	if(req.params.alias){
			var load_cata=TCatalogue.findOne({alias:req.params.alias}).sort({"updated_at":-1}).exec(function(err,data){
					View.catalogue=data;
			});
			TPromise.push(load_cata);
	}else{
		var load_cata=TCatalogue.findOne({}).sort({"updated_at":-1}).exec(function(err,data){
			View.catalogue=data;
		});
		TPromise.push(load_cata);
		
	}

	Q.all(TPromise).done(function(){
			
		TCatalogue.find({_id:{$ne:View.catalogue.id}}).sort({"updated_at":-1}).exec(function(err,other){
			View.other=other;
			res.render(Layout+"index",View);
		})
	});
}

exports.likes=function(req,res){


	if(req.params.id){
			var load_cata=TCatalogue.findOne({_id:req.params.id}).exec(function(err,data){
				if(err){res.json(err); }
				if(!empty(data)){
					data.likes=data.likes*1+1;
					data.save();

				}
			});
			TPromise.push(load_cata);
			Q.all(TPromise).done(function(){
	
				res.json("success");
			});
			
	
	}else{
		res.json("not had id");
	}
	

}