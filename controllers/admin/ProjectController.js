var View={};
var Layout="admin/project/";
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var fs=require("fs");
var TPromise=[];
var My_Data=require("../../library/Data");
const UPLOAD_PATH= __dirname+"/../../public/upload/project/";

const TCate= require("../../models/Categories");
const TProject =require("../../models/Project");

var paginate=require("express-paginate");
require("./Global").Global(TPromise,View);
exports.add=function(req,res){
	View.data={};
	View.error={};
	View.data.status=true;
	var load_cate=TCate.find().sort({"created_at":1}).exec(function(err,cate){
		View.cate=cate;
	});
	TPromise.push(load_cate);

	if(req.method=="POST"){

		if(empty(req.body.name)){
			View.error.name = " Vui lòng nhập tên  ";
		}
		if(empty(req.files.picture)){
			View.error.picture=" Vui lòng chọn hình ảnh đại diện ";
		}
		//res.send(req.files.multipicture);
		if(empty(View.error)){
			NProject=new TProject();
			NProject.name=req.body.name;
			NProject.position=req.body.position;
			
			NProject.links=req.body.links;
		

			var  name_picture=My_Data.md5("Project_"+(new Date()).toString())+".png";
		    My_Data.uploadFile(req.files.picture,name_picture,UPLOAD_PATH,"/public/upload/project/");

		    NProject.picture=name_picture;

		    NProject.save();

		    View.success="Thêm  mới thành công";

		}else{
			
			View.data.name=req.body.name;
			View.data.position=req.body.position;
			View.data.links=req.body.links;
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
		var load_Project=TProject.findById(req.params.id,function(err,NProject){
			if(err){console.log(err);}
			if(!empty(NProject)){

				if(req.method=="POST"){

					if(empty(req.body.name)){
						View.error.name = " Vui lòng nhập tên  ";
					}
					
					if(empty(View.error)){
					
						NProject.name=req.body.name;
					
						
						NProject.position=req.body.position;
						NProject.links=req.body.links;
						
						if(!empty(req.files.picture.name)){
							var  name_picture=My_Data.md5("Project_"+(new Date()).toString())+".png";
						    My_Data.uploadFile(req.files.picture,name_picture,UPLOAD_PATH,"/public/upload/project/");

						    NProject.picture=name_picture;

					    }

					    NProject.save();

					    View.success="Thay đổi thành công";

					
					}
				
				}
				
						
						View.data.name=NProject.name;
						View.data.position=NProject.position;
						View.data.links=NProject.links;
						View.data.picture=NProject.picture;
					
						View.data.id=req.params.id;

			}else{
					
					
			}

			});
			TPromise.push(load_Project);
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
	var list = TProject.paginate(sql,{page: View.currentPage ,limit: 20 , sort:{"position":1}},function(err,data){

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
		TProject.findById(req.params.id,function(err,data){
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
		TProject.findByIdAndRemove(req.params.id,function(err,d){
						fs.unlink(__dirname+"/../../public/upload/project/"+d.picture,function(err,rel){});
						fs.unlink(__dirname+"/../../public/upload/project/small/"+d.picture,function(err,rel){});
						if(!empty(d.multipicture)){
							for (var i = d.multipicture.length - 1; i >= 0; i--) {
								
								fs.unlink(__dirname+"/../../public/upload/project/"+d.multipicture[i],function(err,rel){});
								fs.unlink(__dirname+"/../../public/upload/project/small/"+d.multipicture[i],function(err,rel){});
							}
						}
		});
	}
	res.send("removed");

}