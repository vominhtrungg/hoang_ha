	var View={};
var Layout="home/news/";
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var fs=require("fs");
var TPromise=[];
var My_Data=require("../../library/Data");

var share = require('social-share');

const TNews= require("../../models/News");

const TGeneral= require("../../models/General");


var paginate=require("express-paginate");

exports.index=function(req,res){	
	require("./Global").Global(TPromise,View);

	View.data={};
	View.error={};
	View.seo_title="Tất cả tin tức" ;
	View.stylepage='news';
	
	var load_news_header = TNews.findOne({is_home:true,status:true}).exec(function(err,data){
			View.news_header= data;
		
	});
	TPromise.push(load_news_header);
	var load_news = TNews.find({status:true,cid_cate:3}).sort({created_at: -1}).exec(function(err,data){
			View.news= data;
		
	});
	TPromise.push(load_news);


	//UPLOAD 

	 var myupdate=TNews.find().then(function (news) {
                    news.forEach(function(nn,index,arr){
                    	if(nn.is_time){
                    		   var convertotstring=new Date(nn.is_time);
                    		   var mycurrent=new Date();
                    		   if(convertotstring<mycurrent){
                    		   		nn.status=true;
                    		   		nn.save();
                    		   }
                    		
                    	}
                        
                    });
                });

	 
                    		
	TPromise.push(myupdate);

	

	var load_promotion = TNews.find({status:true,cid_cate:1}).sort({created_at: -1}).exec(function(err,data){
			View.news_km= data;
	});
	TPromise.push(load_promotion);
	

	var load_tt = TNews.find({status:true,cid_cate:2}).sort({created_at: 1}).exec(function(err,data){
			View.news_tt= data;
		
	});
	TPromise.push(load_tt);
	


	Q.all(TPromise).done(function(){
		
	
		res.render(Layout+"index",View);
	});
}


exports.detail=function(req,res){
	require("./Global").Global(TPromise,View);
	

	if(req.params.news){


		View.data={};
		View.error={};

		View.stylepage='news';
		
	

		var load_news=TNews.findOne({'alias':req.params.news}).exec(function(err,data){
				if(empty(data)){
					res.json([{"error":"not found news"}]);	
					return ;
				}

				View.my_date=My_Data.formatDate(data.created_at);
				View.news=data;
				View.seo_title=data.name;
				View.seo_description=data.name;


				 View.Shared_url = share(
						'twitter', {
								    title:data.name
								}
					);
				  View.Shared_url_facebook = share(
						'facebook', {
								    title:data.name
								}
					);
				  


		});

		
		TPromise.push(load_news);

		



		Q.all(TPromise).done(function(){
				var load_other_news=TNews.find({status:true, alias:{$ne : req.params.news},"cid_cate":View.news.cid_cate}).exec(function(err,data){
						View.other_news=data;
				
				});
				TPromise.push(load_other_news);
			Q.all(TPromise).done(function(){
		
				res.render(Layout+"detail",View);
			});
		});
	}else{
		res.json([{"error":"not found"}]);	
	}
}
