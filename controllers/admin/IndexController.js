var View={};
var Layout="admin/index/";

const TGeneral= require("../../models/General");
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var TPromise=[];
require("./Global").Global(TPromise,View);
exports.dashboard=function(req,res){

	require("./Global").Global(TPromise,View);
	var get_general=TGeneral.findOne({},function(err,data){
		if(err){console.log(err);}
		if(req.method=="POST"){
			if(!data){
				data=new TGeneral();
			}
			data.name=req.body.name;
			data.email=req.body.email;
			data.address=req.body.address;
			data.hotline=req.body.hotline;
			data.phone=req.body.phone;
			data.gc=req.body.gc;
			data.description=req.body.description;
			data.facebook=req.body.facebook;
			data.skype=req.body.skype;
			data.google=req.body.google;
			data.linkedin=req.body.linkedin;
			data.youtube=req.body.youtube;
			data.save();
		}
		if(data){
			View.data=data;
		}

		
	});

	TPromise.push(get_general);
	Q.all(TPromise).done(function(){
		
		res.render(Layout+"dashboard",View);
	});

}