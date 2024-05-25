
var View={};
var Layout="admin/info/";
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var fs=require("fs");
var TPromise=[];
var My_Data=require("../../library/Data");
const UPLOAD_PATH= __dirname+"/../../public/upload/info/";


const TInfo =require("../../models/Info");

var paginate=require("express-paginate");
require("./Global").Global(TPromise,View);

exports.add=function(req,res){
	View.data={};
	View.error={};
	

	if(req.method=="POST"){

		if(empty(req.body.general)){
			View.error.general = " Vui lòng nhập   ";
		}
		
	
		if(empty(View.error)){
			var load_data=TInfo.findOne({},function(err,NInfo){
					if(empty(NInfo)){
						NInfo=new TInfo();
					}

					NInfo.general=req.body.general;
					NInfo.vision=req.body.vision;
					NInfo.mission=req.body.mission;
					NInfo.fieldwork=req.body.fieldwork;
					NInfo.creativedesign=req.body.creativedesign;
					NInfo.bussiness=req.body.bussiness;
					NInfo.gift=req.body.gift;
					NInfo.printing=req.body.printing;
					NInfo.logistic=req.body.logistic;
					NInfo.processing=req.body.processing;
					NInfo.scale=req.body.scale;
					NInfo.product=req.body.product;
					NInfo.customer=req.body.customer;
				
				    NInfo.save();

				    View.success="Thêm mới thành công";
				    View.data.general=NInfo.general;
				    View.data.vision=NInfo.vision;
				    View.data.mission=NInfo.mission;
				    View.data.fieldwork=NInfo.fieldwork;
				    View.data.creativedesign=NInfo.creativedesign;
				    View.data.bussiness=NInfo.bussiness;
				    View.data.gift=NInfo.gift;
				    View.data.printing=NInfo.printing;
				    View.data.logistic=NInfo.logistic;
				    View.data.processing=NInfo.processing;
				    View.data.scale=NInfo.scale;
				    View.data.product=NInfo.product;
				    View.data.customer=NInfo.customer;
				
					
			});
			TPromise.push(load_data);
 
		}
	
	}else{
			var get_data=TInfo.findOne({},function(err,d){
				if(!empty(d)){
					View.data.general=d.general;
					View.data.vision=d.vision;
					View.data.mission=d.mission;
					View.data.fieldwork=d.fieldwork;
					View.data.creativedesign=d.creativedesign;
					View.data.bussiness=d.bussiness;
					View.data.gift=d.gift;
					View.data.printing=d.printing;
					View.data.logistic=d.logistic;
					View.data.processing=d.processing;
					View.data.scale=d.scale;
					View.data.processing=d.processing;
					View.data.product=d.product;
					View.data.customer=d.customer;
				}
					
		
			});
			TPromise.push(get_data);
	}

	
	
	Q.all(TPromise).done(function(){
				res.render(Layout+"add",View);
			});
	
}
