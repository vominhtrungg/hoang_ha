var View={};
var Layout="admin/news/";
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var fs=require("fs");
var TPromise=[];
var My_Data=require("../../library/Data");
const UPLOAD_PATH= __dirname+"/../../public/upload/news/";


const TNews =require("../../models/News");

var paginate=require("express-paginate");
require("./Global").Global(TPromise,View);


exports.add=function(req,res){
	View.data={};
	View.error={};
	


	if(req.method=="POST"){

		if(empty(req.body.name)){
			View.error.name = " Vui lòng nhập tên  ";
		}
		if(empty(req.files.picture)){
			View.error.picture = " Vui lòng nhập hình ảnh  ";
		}
		if(empty(req.body.description)){
			View.error.description = " Vui lòng nhập mô tả  ";
		}
		if(empty(req.body.contents)){
			View.error.contents = " Vui lòng nhập nội dung  ";
		}
		
		if(empty(View.error)){
			NTNews=new TNews();
			NTNews.name=req.body.name;
			NTNews.alias=My_Data.toAlias(NTNews.name);

			var  name_picture=My_Data.md5("picture_"+(new Date()).toString())+".png";

			My_Data.uploadFileCatalogue(req.files.picture,name_picture,UPLOAD_PATH,"/public/upload/news/");


			var  name_picturetitle=My_Data.md5("picturetitle_"+(new Date()).toString())+".png";
			My_Data.uploadFileCatalogue(req.files.picturetitle,name_picturetitle,UPLOAD_PATH,"/public/upload/news/");


			NTNews.picture=name_picture;
		
			NTNews.picture_main=name_picturetitle;
			NTNews.my_created_at=req.body.my_created_at;
			NTNews.status=req.body.status;
			NTNews.description=req.body.description;
			NTNews.contents=req.body.contents;
			NTNews.is_home=req.body.is_home;
			NTNews.slogan=req.body.slogan;
			NTNews.cid_cate=req.body.cid_cate;
			NTNews.viewer=1;
			NTNews.is_time=req.body.is_time;
			NTNews.save();

			View.success="Thêm tin tức mới thành công";


		}else{
			
			View.data=req.body;

		
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
		var load_catalogue=TNews.findById(req.params.id,function(err,DNews){
			if(err){console.log(err);}
				if(!empty(DNews)){

						if(req.method=="POST"){

							console.log(req.method);

										if(empty(req.body.name)){
											View.error.name = " Vui lòng nhập tên Catalogue ";
										}
										
										if(empty(View.error)){
										
											DNews.name=req.body.name;
											DNews.alias=My_Data.toAlias(DNews.name);
										
											if(!empty(req.files?.picture?.name)){	
												var  name_picture=My_Data.md5("picture_"+(new Date()).toString())+".png";
												My_Data.uploadFileCatalogue(req.files.picture,name_picture,UPLOAD_PATH,"/public/upload/news/");
												DNews.picture=name_picture;
											}
											if(!empty(req.files?.picturetitle?.name)){
												var  name_picture_title=My_Data.md5("picture_main_"+(new Date()).toString())+".png";
												My_Data.uploadFileCatalogue(req.files.picturetitle,name_picture_title,UPLOAD_PATH,"/public/upload/news/");
												DNews.picture_main=name_picture_title;
											}
											
									
										
											DNews.is_home=req.body.is_home;
											DNews.status=req.body.status;
											DNews.description=req.body.description;
											DNews.contents=req.body.contents;

											DNews.my_created_at=req.body.my_created_at;

											DNews.slogan=req.body.slogan;
											DNews.cid_cate=req.body.cid_cate;
											DNews.is_time=req.body.is_time;
											
											DNews.save();

											View.success="Chỉnh sửa Tin tức mới thành công";


									
										}
									
									}
						
						}
				
						
						View.data=DNews;
			

			});
			TPromise.push(load_catalogue);
			Q.all(TPromise).done(function(){
						
					res.render(Layout+"edit",View);
			});	
	}
}
exports.list=function(req,res){
	View.currentPage= (req.query.page) ? parseInt(req.query.page) : 1;
	
	var sql={};
	if(req.query.search){
		sql = {name: req.query.search};
	}
	/*
	var myDate=new Date();
	res.send(Date.create().format('{dd}/{MM}/{yyyy} {hh}:{mm}:{ss}.{fff}').toString());
	var inputDate = new Date(myDate.toString());
	var myupdate=	TNews.find({
	    'date': { $lte: inputDate }
	});
*/


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

	var list = TNews.paginate(sql,{page: View.currentPage ,limit: 10 , sort:{"updated_at":-1}},function(err,data){

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
		TNews.findById(req.params.id,function(err,data){
			 


			res.send("successfully");
		});
	}
	
}
exports.remove=function(req,res){
	if(req.params.id){
		TNews.findByIdAndRemove(req.params.id,function(err,d){
						fs.unlink(__dirname+"/../../public/upload/catalogue/"+d.firstpage,function(err,rel){});
						fs.unlink(__dirname+"/../../public/upload/catalogue/thumb/"+d.firstpage,function(err,rel){});
						fs.unlink(__dirname+"/../../public/upload/catalogue/"+d.lastpage,function(err,rel){});
						fs.unlink(__dirname+"/../../public/upload/catalogue/thumb/"+d.lastpage,function(err,rel){});
						if(!empty(d.leftpages)){
							for (var i = d.leftpages.length - 1; i >= 0; i--) {
								
								fs.unlink(__dirname+"/../../public/upload/catalogue/"+d.leftpages[i],function(err,rel){});
								fs.unlink(__dirname+"/../../public/upload/catalogue/thumb/"+d.leftpages[i],function(err,rel){});
							}
						}
						if(!empty(d.rightpages)){
							for (var i = d.rightpages.length - 1; i >= 0; i--) {
								
								fs.unlink(__dirname+"/../../public/upload/catalogue/"+d.rightpages[i],function(err,rel){});
								fs.unlink(__dirname+"/../../public/upload/catalogue/thumb/"+d.rightpages[i],function(err,rel){});
							}
						}
		});
	}
	res.send("removed");

}