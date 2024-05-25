var View={};
var Layout="admin/product/";
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var fs=require("fs");
var TPromise=[];
var My_Data=require("../../library/Data");
const UPLOAD_PATH= __dirname+"/../../public/upload/product/";

const TCate= require("../../models/Categories");
const TProduct =require("../../models/Product");

var paginate=require("express-paginate");
require("./Global").Global(TPromise,View);
exports.add=function(req,res){
	View.data={};
	View.error={};
	View.status=true;
	var load_cate=TCate.find().sort({"created_at":1}).exec(function(err,cate){
		View.cate=cate;
	});
	TPromise.push(load_cate);

	if(req.method=="POST"){

		if(empty(req.body.name)){
			View.error.name = " Vui lòng nhập tên sản phẩm ";
		}
		if(empty(req.files.picture)){
			View.error.picture=" Vui lòng chọn hình ảnh đại diện ";
		}
		//res.send(req.files.multipicture);
		if(empty(View.error)){
			NProduct=new TProduct();
			NProduct.name=req.body.name;
			NProduct.alias=My_Data.toAlias(req.body.name);
			NProduct.cid_cate=req.body.cate;
			NProduct.contents=req.body.cont;
			NProduct.status=req.body.status;

			var  name_picture=My_Data.md5("product_"+(new Date()).toString())+".png";
		    My_Data.uploadFile(req.files.picture,name_picture,UPLOAD_PATH,"/public/upload/product/");

		    NProduct.picture=name_picture;

		    var my_multi_picture=[];
		    if(!empty(req.files.multipicture)){
		    	
		    	for (var i = req.files.multipicture.length - 1; i >= 0; i--) {
		    		var  n_p=My_Data.md5("product_"+i+(new Date()).toString())+".png";
		  			 My_Data.uploadFile(req.files.multipicture[i],n_p,UPLOAD_PATH,"/public/upload/product/");
		  			 my_multi_picture.push(n_p);
		    	}
		    }

		    NProduct.multipicture=my_multi_picture;
		    NProduct.save();

		    View.success="Thêm sản phẩm mới thành công";

		}else{
			View.data.cate=req.body.cate;
			View.data.name=req.body.name;
			View.data.cont=req.body.cont;
			View.data.status=req.body.status;
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
		var load_product=TProduct.findById(req.params.id,function(err,NProduct){
			if(err){console.log(err);}
			if(!empty(NProduct)){

				if(req.method=="POST"){

					if(empty(req.body.name)){
						View.error.name = " Vui lòng nhập tên sản phẩm ";
					}
					
					if(empty(View.error)){
					
						NProduct.name=req.body.name;
						NProduct.alias=My_Data.toAlias(req.body.name);
						NProduct.cid_cate=req.body.cate;
						NProduct.contents=req.body.cont;
						NProduct.status=req.body.status;
						
						if(!empty(req.files.picture.name)){
							var  name_picture=My_Data.md5("product_"+(new Date()).toString())+".png";
						    My_Data.uploadFile(req.files.picture,name_picture,UPLOAD_PATH,"/public/upload/product/");

						    NProduct.picture=name_picture;

					    }

					    var my_multi_picture=[];
					    if(!empty(req.files.multipicture)){
					    	
					    	for (var i = req.files.multipicture.length - 1; i >= 0; i--) {
					    		var  n_p=My_Data.md5("product_"+i+(new Date()).toString())+".png";
					  			 My_Data.uploadFile(req.files.multipicture[i],n_p,UPLOAD_PATH,"/public/upload/product/");
					  			 NProduct.multipicture.push(n_p);
					    	}
					    }

					    //NProduct.multipicture=my_multi_picture;
					    NProduct.save();

					    View.success="Thêm sản phẩm mới thành công";

					
					}
				
				}
				
						View.data.cate=NProduct.cid_cate;
						View.data.name=NProduct.name;
						View.data.cont=NProduct.contents;
						View.data.status=NProduct.status;
						View.data.picture=NProduct.picture;
						View.data.multipicture=NProduct.multipicture;
						View.data.id=req.params.id;

			}else{
					
					
			}

			});
			TPromise.push(load_product);
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
	var list = TProduct.paginate(sql,{page: View.currentPage ,limit: 50 , sort:{"updated_at":-1}, populate:{path:"cid_cate"}},function(err,data){

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
		TProduct.findById(req.params.id,function(err,data){
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
		TProduct.findByIdAndRemove(req.params.id,function(err,d){
						fs.unlink(__dirname+"/../../public/upload/product/"+d.picture,function(err,rel){});
						fs.unlink(__dirname+"/../../public/upload/product/small/"+d.picture,function(err,rel){});
						if(!empty(d.multipicture)){
							for (var i = d.multipicture.length - 1; i >= 0; i--) {
								
								fs.unlink(__dirname+"/../../public/upload/product/"+d.multipicture[i],function(err,rel){});
								fs.unlink(__dirname+"/../../public/upload/product/small/"+d.multipicture[i],function(err,rel){});
							}
						}
		});
	}
	res.send("removed");

}