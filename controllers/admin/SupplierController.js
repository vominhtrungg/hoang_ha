
var View={};
var Layout="admin/supplier/";
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var fs=require("fs");
var TPromise=[];
var My_Data=require("../../library/Data");
const UPLOAD_PATH= __dirname+"/../../public/upload/supplier/";


const TSupplier =require("../../models/Supplier");

var paginate=require("express-paginate");
require("./Global").Global(TPromise,View);

exports.add=function(req,res){
	View.data={};
	View.error={};
	

	if(req.method=="POST"){

		if(empty(req.body.name)){
			View.error.name = " Vui lòng nhập tên  ";
		}
		
		
		
		//res.send(req.files.multipicture);
		if(empty(View.error)){
			var load_data=TSupplier.findOne({},function(err,NSupplier){
					if(empty(NSupplier)){
						NSupplier=new TSupplier();
					}

					NSupplier.name=req.body.name;
					NSupplier.alias=My_Data.toAlias(req.body.name);
					NSupplier.description=req.body.description;
					NSupplier.status=req.body.status;
					if(!empty(req.files.picture.name)){
							var  name_picture=My_Data.md5("Supplier_"+(new Date()).toString())+".png";
						    My_Data.uploadFile(req.files.picture,name_picture,UPLOAD_PATH,"/public/upload/supplier/");

						    NSupplier.picture=name_picture;
				    }
				    NSupplier.save();

				    View.success="Thêm mới thành công";
				    View.data.name=NSupplier.name;
					View.data.description=NSupplier.description;
					View.data.status=NSupplier.status;
					View.data.picture=NSupplier.picture;
					
			});
			TPromise.push(load_data);

		
		}
	
	}else{
			var get_data=TSupplier.findOne({},function(err,d){

					View.data.name=d.name;
					View.data.description=d.description;
					View.data.status=d.status;
					View.data.picture=d.picture;
					
			});
			TPromise.push(get_data);
	}

	
	
	Q.all(TPromise).done(function(){
				res.render(Layout+"add",View);
			});
	
}
