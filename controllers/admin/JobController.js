var View={};
var Layout="admin/job/";
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var fs=require("fs");
var TPromise=[];
var My_Data=require("../../library/Data");
const UPLOAD_PATH= __dirname+"/../../public/upload/job/";

const TJob =require("../../models/Job");

var paginate=require("express-paginate");
require("./Global").Global(TPromise,View);
exports.add=function(req,res){
	View.data={};
	View.data.status=true;
	View.error={};
	

	if(req.method=="POST"){

		if(empty(req.body.name)){
			View.error.name = " Vui lòng nhập tên   ";
		}
		if(empty(req.files.picture.name)){
			View.error.picture=" Vui lòng chọn hình ảnh đại diện ";
		}
		//res.send(req.files.multipicture);
		if(empty(View.error)){
			NJob=new TJob();
			NJob.name=req.body.name;
			NJob.timed=req.body.timed;
			NJob.contact=req.body.contact;
			
			
			NJob.contents=req.body.cont;
			NJob.status=req.body.status;

			var  name_picture=My_Data.md5("job_"+(new Date()).toString())+".png";
		    My_Data.uploadFile(req.files.picture,name_picture,UPLOAD_PATH,"/public/upload/job/");

		    NJob.picture=name_picture;

		    
		    NJob.save();

		    View.success="Thêm  mới thành công";

		}else{
			
			View.data.name=req.body.name;
			View.data.cont=req.body.cont;
			View.data.timed=req.body.timed;
			View.data.contact=req.body.contact;
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
	

	if(req.params.id){
		var load_job=TJob.findById(req.params.id,function(err,NJob){
			if(err){console.log(err);}
			if(!empty(NJob)){

				if(req.method=="POST"){

					if(empty(req.body.name)){
						View.error.name = " Vui lòng nhập tên Thiết kế  ";
					}
					
					if(empty(View.error)){
					
						NJob.name=req.body.name;
						
						
						NJob.contents=req.body.cont;
						NJob.status=req.body.status;
							
						NJob.timed=req.body.timed;
						NJob.contact=req.body.contact;

						if(!empty(req.files.picture.name)){
							var  name_picture=My_Data.md5("job_"+(new Date()).toString())+".png";
						    My_Data.uploadFile(req.files.picture,name_picture,UPLOAD_PATH,"/public/upload/job/");

						    NJob.picture=name_picture;

					    }

					    
					    NJob.save();

					    View.success="Thêm  mới thành công";

					
					}
				
				}
				
					
						View.data.name=NJob.name;
						View.data.cont=NJob.contents;
						View.data.status=NJob.status;
						View.data.picture=NJob.picture;
						
						View.data.contact=NJob.contact;
						View.data.timed=NJob.timed;
						View.data.id=req.params.id;


			}else{
					
					
			}

			});
			TPromise.push(load_job);
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
	var list = TJob.paginate(sql,{page: View.currentPage ,limit: 10 , sort:{"updated_at":-1}},function(err,data){

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
		TJob.findById(req.params.id,function(err,data){
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
		TJob.findByIdAndRemove(req.params.id,function(err,d){
						fs.unlink(__dirname+"/../../public/upload/job/"+d.picture,function(err,rel){});
						fs.unlink(__dirname+"/../../public/upload/job/small/"+d.picture,function(err,rel){});
						if(!empty(d.multipicture)){
							for (var i = d.multipicture.length - 1; i >= 0; i--) {
								
								fs.unlink(__dirname+"/../../public/upload/job/"+d.multipicture[i],function(err,rel){});
								fs.unlink(__dirname+"/../../public/upload/job/small/"+d.multipicture[i],function(err,rel){});
							}
						}
		});
	}
	res.send("removed");

}