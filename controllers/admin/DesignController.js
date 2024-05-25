var View={};
var Layout="admin/design/";
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var fs=require("fs");
var TPromise=[];
var My_Data=require("../../library/Data");
const UPLOAD_PATH= __dirname+"/../../public/upload/design/";

const TDesign =require("../../models/Design");
const TCate	= require("../../models/Categories");
var paginate=require("express-paginate");
require("./Global").Global(TPromise,View);
exports.add=function(req,res){
	View.data={};
	View.data.status=true;
	View.error={};
		
	var load_cate=TCate.find().sort({"created_at":1}).exec(function(err,cate){
		View.cate=cate;
	});
	TPromise.push(load_cate);

	if(req.method=="POST"){

		if(empty(req.body.name)){
			View.error.name = " Vui lòng nhập tên Thiết kế  ";
		}
		if(empty(req.files.picture.name)){
			View.error.picture=" Vui lòng chọn hình ảnh đại diện ";
		}
		//res.send(req.files.multipicture);
		if(empty(View.error)){
			NDesign=new TDesign();
			NDesign.name=req.body.name;
			NDesign.alias=My_Data.toAlias(req.body.name);
			
			NDesign.contents=req.body.cont;
			NDesign.status=req.body.status;
			NDesign.cid_cate=req.body.cate;
			NDesign.detail=req.body.detail;
			NDesign.position=req.body.position;
			var  name_picture=My_Data.md5("design_"+(new Date()).toString())+".png";
		    My_Data.uploadFile(req.files.picture,name_picture,UPLOAD_PATH,"/public/upload/design/");

		    NDesign.picture=name_picture;

		    var my_multi_picture=[];
		    if(!empty(req.files.multipicture)){
		    	
		    	for (var i = req.files.multipicture.length - 1; i >= 0; i--) {
		    		var  n_p=My_Data.md5("design_"+i+(new Date()).toString())+".png";
		  			 My_Data.uploadFile(req.files.multipicture[i],n_p,UPLOAD_PATH,"/public/upload/design/");
		  			 my_multi_picture.push(n_p);
		    	}
		    }

		    NDesign.multipicture=my_multi_picture;
		    NDesign.save();

		    View.success="Thêm Thiết kế  mới thành công";

		}else{
			
			View.data.name=req.body.name;
			View.data.cont=req.body.cont;
			View.data.status=req.body.status;
			View.data.cate=req.body.cate;
			View.data.detail=req.body.detail;
			View.data.position=req.body.position;
		}
	
	}
	Q.all(TPromise).done(function(){
		res.render(Layout+"add",View);
	});
}
exports.edit=function(req,res){
	View.data={};
	View.error={};
	
	var load_cate=TCate.find().sort({"created_at":1}).exec(function(err,cate){
		View.cate=cate;
	});
	TPromise.push(load_cate);

	if(req.params.id){
		var load_design=TDesign.findById(req.params.id,function(err,NDesign){
			if(err){console.log(err);}
			if(!empty(NDesign)){

				if(req.method=="POST"){

					if(empty(req.body.name)){
						View.error.name = " Vui lòng nhập tên Thiết kế  ";
					}
					
					if(empty(View.error)){
					
						NDesign.name=req.body.name;
						NDesign.alias=My_Data.toAlias(req.body.name);
						
						NDesign.contents=req.body.cont;
						NDesign.status=req.body.status;
						NDesign.cid_cate=req.body.cate;
						NDesign.detail=req.body.detail;
						NDesign.position=req.body.position;
						
						if(!empty(req.files.picture.name)){
							var  name_picture=My_Data.md5("design_"+(new Date()).toString())+".png";
						    My_Data.uploadFile(req.files.picture,name_picture,UPLOAD_PATH,"/public/upload/design/");

						    NDesign.picture=name_picture;

					    }

					    var my_multi_picture=[];
					    if(!empty(req.files.multipicture)){
					    	
					    	for (var i = req.files.multipicture.length - 1; i >= 0; i--) {
					    		var  n_p=My_Data.md5("design_"+i+(new Date()).toString())+".png";
					  			 My_Data.uploadFile(req.files.multipicture[i],n_p,UPLOAD_PATH,"/public/upload/design/");
					  			 NDesign.multipicture.push(n_p);
					    	}
					    }

					    NDesign.save();

					    View.success="Thêm Thiết kế  mới thành công";

					
					}
				
				}
				
					
						View.data.name=NDesign.name;
						View.data.cont=NDesign.contents;
						View.data.status=NDesign.status;
						View.data.picture=NDesign.picture;
						View.data.multipicture=NDesign.multipicture;
						View.data.id=req.params.id;
						View.data.cate=NDesign.cid_cate;
						View.data.detail=NDesign.detail;
						View.data.position=NDesign.position;

			}else{
					
					
			}

			});
			TPromise.push(load_design);
			Q.all(TPromise).done(function(){
						
					res.render(Layout+"edit",View);
				});	
		}else{
			res.send("not id");

		}
}
exports.list=function(req,res){
	View.currentPage= (req.query.page) ? parseInt(req.query.page) : 1;
	
	var sql={};
	var sql_field={};
	if(req.query.search){
		var key=My_Data.toAlias(req.query.search);
		sql_field.alias= { $regex: '.*' + key + '.*' } ;
		sql = { $and : [sql_field] };
	}
	var list = TDesign.paginate(sql,{page: View.currentPage ,limit: 20 , sort:{"cid_cate":-1}, populate:{path:"cid_cate"}},function(err,data){

			View.pageCount=data.pages;
	        View.itemCount= data.limit;
	        View.paginate=paginate;
	        View.pages= paginate.getArrayPages(req)(3, data.pages, req.query.page);
			View.list=data;
		
	});
	TPromise.push(list);
	Q.all(TPromise).done(function(){
		res.render(Layout+"list",View);
	});
}
exports.removepicture=function(req,res){
	if(req.params.id){
		TDesign.findById(req.params.id,function(err,data){
			var multipicture = data.multipicture;
			multipicture.splice(multipicture.indexOf(req.params.picture),1);
			data.multipicture=multipicture;
			data.save();
		});
	}
	res.send("successfully");
}
exports.remove=function(req,res){
	if(req.params.id){
		TDesign.findByIdAndRemove(req.params.id,function(err,d){
						fs.unlink(__dirname+"/../../public/upload/design/"+d.picture,function(err,rel){});
						fs.unlink(__dirname+"/../../public/upload/design/small/"+d.picture,function(err,rel){});
						if(!empty(d.multipicture)){
							for (var i = d.multipicture.length - 1; i >= 0; i--) {
								
								fs.unlink(__dirname+"/../../public/upload/design/"+d.multipicture[i],function(err,rel){});
								fs.unlink(__dirname+"/../../public/upload/design/small/"+d.multipicture[i],function(err,rel){});
							}
						}
		});
	}
	res.send("removed");

}