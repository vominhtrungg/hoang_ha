var View={};
var Layout="home/index/";
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
const TDesign= require("../../models/Design");
const TNews= require("../../models/News");

const TSupplier = require("../../models/Supplier");

const Sitemap =require("express-sitemap");

var paginate=require("express-paginate");


exports.sitemap=function(req,res){
	let mydate= My_Data.formatDateSitemap(new Date());

	let map = {	
			
			'/san-pham':['get'],
			'/in-gia-cong-offset':['get'],
			'/thiet-ke':['get'],
			'/tin-tuc':['get']
		};

	let route ={
	      
	        '/san-pham': {
	            lastmod: mydate,
	            changefreq: 'daily',
	            priority: 1.0,
	        },
	         '/in-gia-cong-offset': {
	            lastmod: mydate,
	            changefreq: 'daily',
	            priority: 1.0,
	        },
	         '/thiet-ke': {
	            lastmod: mydate,
	            changefreq: 'daily',
	            priority: 1.0,
	        },
	        '/tin-tuc': {
	            lastmod: mydate,
	            changefreq: 'daily',
	            priority: 1.0,
	        }
	    };

	 //PROUDCT 
	var load_product = TCate.find({status:true}).exec(function(err,data){
		data.forEach(function(d){

			var url ="/san-pham/";
			url = url.concat("",d.alias);
			
			//map= My_Data.addValueInObject(map, url , ['get']);
		
			//route= My_Data.addValueInObject(route, url ,  ) ;
				
	          
	        map[url]=['get']; 
	        route[url]= {lastmod: mydate, changefreq: 'daily',priority: 1.0};

			

			//route = Object.assign(route,{url :{	lastmod: mydate, changefreq: 'always', priority: 1.0,}});
			
	           
	           

			
		
		});
	});
	TPromise.push(load_product);

	//DESIG
	var load_detail_design = TDesign.find({}).exec(function(err,data){
		data.forEach(function(d){

			var url ="/thiet-ke/";
			url = url.concat("",d.alias);
			
			
			  map[url]=['get']; 
	        route[url]= {lastmod: mydate, changefreq: 'daily',priority: 0.9};

		
		});
	});
	TPromise.push(load_detail_design);

	//NEWS

	var load_news = TNews.find({status:true}).exec(function(err,data){
		data.forEach(function(d){

			var url ="/tin-tuc/";
			url = url.concat("",d.alias);
			

			 map[url]=['get']; 
	        route[url]= {lastmod: mydate, changefreq: 'daily',priority: 0.9};
		
		
		});
	});
	TPromise.push(load_news);

	Q.all(TPromise).done(function(){

		//res.json(mydate);
		Sitemap({
			http:'https',
			url:'inanhoangha.com',
		    map: map ,
		    route: route,
		}).XMLtoWeb(res);
		
	});

	
}
exports.index=function(req,res){

	


	View.data={};
	View.error={};
	View.stylepage="home";
	
	var load_slide=TSlideshow.find({status:true,page:'home'}).sort({"updated_at":-1}).exec(function(err,data){
			View.slideshow=data;
	});
	TPromise.push(load_slide);

	var load_project = TProject.find().sort({"position":1}).exec(function(err,data){
			View.project =data;
			
	});
	TPromise.push(load_project);
	
	var load_supplier = TSupplier.findOne().exec(function(err,data){
			View.supplier =data;
	});
	TPromise.push(load_supplier);

	
	require("./Global").Global(TPromise,View);

	Q.all(TPromise).done(function(){
	
		res.render(Layout+"index",View);
	});
}