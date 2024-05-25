var View={};
var Layout="admin/slideshow/";
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var fs=require("fs");
var TPromise=[];
var My_Data=require("../../library/Data");
const UPLOAD_PATH= __dirname+"/../../public/upload/slideshow/";

const TCate= require("../../models/Categories");
const TSlideshow =require("../../models/Slideshow");

var paginate=require("express-paginate");
require("./Global").Global(TPromise,View);
exports.add=function(req,res){
	View.data={};
	View.error={};
	View.data.status=true;
	View.page=[
		["home","Trang chủ "],
		["info","Trang Giới thiệu "],
		["product","Trang Sản phẩm"],
		["design","Trang Thiết kế"],
		["print","Trang In gia công"]
	];
	if(req.method=="POST"){

		if(empty(req.body.name)){
			View.error.name = " Vui lòng nhập tên Slideshow ";
		}
		if(empty(req.files.picture.name)){
			View.error.picture=" Vui lòng chọn hình ảnh ";
		}
		//res.send(req.files.multipicture);
		if(empty(View.error)){
			NSlideshow=new TSlideshow();
			NSlideshow.name=req.body.name;
			NSlideshow.alias=My_Data.toAlias(req.body.name);
			
			NSlideshow.links=req.body.links;
			NSlideshow.status=req.body.status;
			NSlideshow.page= req.body.page;

			var  name_picture=My_Data.md5("slideshow_"+(new Date()).toString())+".png";
		    My_Data.uploadFile(req.files.picture,name_picture,UPLOAD_PATH,"/public/upload/slideshow/");

		    NSlideshow.picture=name_picture;

		    var my_multi_picture=[];
		    if(!empty(req.files.multipicture)){
		    	
		    	for (var i = req.files.multipicture.length - 1; i >= 0; i--) {
		    		var  n_p=My_Data.md5("Slideshow_"+i+(new Date()).toString())+".png";
		  			 My_Data.uploadFile(req.files.multipicture[i],n_p,UPLOAD_PATH,"/public/upload/Slideshow/");
		  			 my_multi_picture.push(n_p);
		    	}
		    }

		    NSlideshow.multipicture=my_multi_picture;
		    NSlideshow.save();

		    View.success="Thêm Slideshow mới thành công";

		}else{
			View.data.cate=req.body.cate;
			View.data.name=req.body.name;
			View.data.cont=req.body.cont;
			View.data.status=req.body.status;
			View.data.page= req.body.page;
		}
	
	}
	Q.all(TPromise).done(function(){
		res.render(Layout+"add",View);
	});
}
exports.edit=function(req,res){
	View.data={};
	View.error={};
		
	View.page=[
		["home","Trang chủ "],
		["info","Trang Giới thiệu "],
		["product","Trang Sản phẩm"],
		["design","Trang Thiết kế"],
		["print","Trang In gia công"]
	];

	if(req.params.id){
		var load_Slideshow=TSlideshow.findById(req.params.id,function(err,NSlideshow){
			if(err){console.log(err);}
			if(!empty(NSlideshow)){

				if(req.method=="POST"){

					if(empty(req.body.name)){
						View.error.name = " Vui lòng nhập tên Slideshow ";
					}
					
					if(empty(View.error)){
					
						NSlideshow.name=req.body.name;
						NSlideshow.alias=My_Data.toAlias(req.body.name);
						NSlideshow.links=req.body.links;
						NSlideshow.page=req.body.page;
						
						NSlideshow.status=req.body.status;
						
						if(!empty(req.files.picture.name)){
							var  name_picture=My_Data.md5("Slideshow_"+(new Date()).toString())+".png";
						    My_Data.uploadFile(req.files.picture,name_picture,UPLOAD_PATH,"/public/upload/slideshow/");

						    NSlideshow.picture=name_picture;

					    }

					   
					    NSlideshow.save();

					    View.success="Thêm Slideshow mới thành công";

					
					}
				
				}
				
						
						View.data.name=NSlideshow.name;
						View.data.links=NSlideshow.links;
						View.data.status=NSlideshow.status;
						View.data.picture=NSlideshow.picture;	
						View.data.page=NSlideshow.page;
						
						View.data.id=req.params.id;

			}else{
					
					
			}

			});
			TPromise.push(load_Slideshow);
			Q.all(TPromise).done(function(){
						
					res.render(Layout+"edit",View);
				});	
		}else{
			res.send("not id");

		}
}
exports.list=function(req,res){
	View.currentPage= (req.query.page) ? parseInt(req.query.page) : 1;
	View.page=[
		["home","Trang chủ "],
		["info","Trang Giới thiệu "],
		["product","Trang Sản phẩm"],
		["design","Trang Thiết kế"],
		["print","Trang In gia công"]
	];
	var sql={};
	var sql_field={};
	if(req.query.search){
		var key=My_Data.toAlias(req.query.search);
		sql_field.alias= { $regex: '.*' + key + '.*' } ;
		sql = { $and : [sql_field] };
	}
	var list = TSlideshow.paginate(sql,{page: View.currentPage ,limit: 10 , sort:{"updated_at":1}},function(err,data){

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
		TSlideshow.findByIdAndRemove(req.params.id,function(err,d){
						fs.unlink(__dirname+"/../../public/upload/slideshow/"+d.picture,function(err,rel){});
						fs.unlink(__dirname+"/../../public/upload/slideshow/small/"+d.picture,function(err,rel){});
						
		});
	}
	res.send("removed");

}