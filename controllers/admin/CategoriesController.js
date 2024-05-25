var View={};
var Layout="admin/categories/";
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var fs=require("fs");
var TPromise=[];
var My_Data=require("../../library/Data");
const UPLOAD_PATH= __dirname+"/../../public/upload/";

const TCate= require("../../models/Categories");
const TProduct = require("../../models/Product");
var paginate=require("express-paginate");
require("./Global").Global(TPromise,View);
exports.add=function(req,res){
	View.data={};
	View.error={};
	
	if(req.method=="POST"){

		if(empty(req.body.name)){

			View.error.name=" Vui lòng nhập tên danh mục ";

		}
		if(empty(req.files.picture.name)){
			View.error.picture=" Vui lòng chọn hình ảnh ";
		}

		if(empty(View.error)){
			var cate_push=TCate.findOne({name:req.body.name}).exec(function(err,data){
				if(empty(data)){

					var  name_picture=My_Data.md5("cate_"+(new Date()).toString())+".png";
				
					 My_Data.uploadFile(req.files.picture,name_picture,__dirname+"/../../public/upload/cate/","/public/upload/cate/");


					
					var NCate=new TCate();
					NCate.name=req.body.name;
					NCate.alias=My_Data.toAlias(req.body.name);
					NCate.picture=name_picture;
					NCate.status=req.body.status;
					NCate.position=req.body.position;
					NCate.save();

					View.success=" Thêm một danh mục thành công. ";
				}else{
					View.error.name=" Tên danh mục đã tồn tại  ";
				}
			});
			TPromise.push(cate_push);
			
		}
	}
	Q.all(TPromise).done(function(){
	
		res.render(Layout+"add",View);
	});
}
exports.edit=function(req,res){
	View.error={};

	if(req.params.id){
			var id=req.params.id;
			var load_d= TCate.findById(req.params.id,function(err,NCate){
					if(err){console.log(err);}

					if(req.method=="POST"){

						if(empty(req.body.name)){

							View.error.name=" Vui lòng nhập tên danh mục ";

						}
						
						
						if(empty(View.error)){
								
									if(!empty(req.files.picture.name)){
										
										fs.unlink(UPLOAD_PATH+"cate/"+NCate.picture,function(err,rel){});
										fs.unlink(UPLOAD_PATH+"cate/small/"+NCate.picture,function(err,rel){});
										var  name_picture=My_Data.md5("cate_"+(new Date()).toString())+".png";
									
										 My_Data.uploadFile(req.files.picture,name_picture,__dirname+"/../../public/upload/cate/","/public/upload/cate/");
										 NCate.picture=name_picture;
									 }
									
							
									NCate.name=req.body.name;
									NCate.alias=My_Data.toAlias(req.body.name);
									NCate.status=req.body.status;
									NCate.position=req.body.position;
									NCate.save();

									View.success="Thay đổi thành công. ";
								
						}
					}
					View.data=NCate;
					
			});
			TPromise.push(load_d);
			Q.all(TPromise).done(function(){
				res.render(Layout+"edit",View);
			});
	}else{
		res.redirect("/admin/categories/list");
	}


}
exports.list=function(req,res){
	View.currentPage= (req.query.page) ? parseInt(req.query.page) : 1;
	View.limit= (req.query.limit) ? parseInt(req.query.limit) : 10;
	var sql={};
	var sql_field={};
	if(req.query.search){
		var key=My_Data.toAlias(req.query.search);
		sql_field.alias= { $regex: '.*' + key + '.*' } ;
		sql = { $and : [sql_field] };
	}
	
	var list = TCate.paginate(sql,{page: View.currentPage ,limit: 10 , sort:{"updated_at":-1}},function(err,data){

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
exports.remove=function(req,res){

	if(req.params.id){
		TCate.findByIdAndRemove(req.params.id,function(err,data){
				fs.unlink(__dirname+"/../../public/upload/cate/"+data.picture,function(err,rel){});
				fs.unlink(__dirname+"/../../public/upload/cate/small/"+data.picture,function(err,rel){});
				TProduct.remove({cid_cate:data._id}).exec(function(err,d){
					fs.unlink(__dirname+"/../../public/upload/product/"+d.picture,function(err,rel){});
					fs.unlink(__dirname+"/../../public/upload/product/small/"+d.picture,function(err,rel){});
					if(!empty(d.multipicture)){
						for (var i = d.multipicture.length - 1; i >= 0; i--) {
							
							fs.unlink(__dirname+"/../../public/upload/product/"+d.multipicture[i],function(err,rel){});
							fs.unlink(__dirname+"/../../public/upload/product/small/"+d.multipicture[i],function(err,rel){});
						}
					}
				});

		});
	}
	res.send("not working.");
}