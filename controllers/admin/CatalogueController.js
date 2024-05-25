var View={};
var Layout="admin/catalogue/";
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var fs=require("fs");
var TPromise=[];
var My_Data=require("../../library/Data");
const UPLOAD_PATH= __dirname+"/../../public/upload/catalogue/";

const TCate= require("../../models/Categories");
const TCatalogue =require("../../models/Catalogue");

var paginate=require("express-paginate");
require("./Global").Global(TPromise,View);
exports.add=function(req,res){
	View.data={};
	View.error={};
	


	if(req.method=="POST"){

		if(empty(req.body.name)){
			View.error.name = " Vui lòng nhập tên Catalogue ";
		}
		
		if(empty(View.error)){
			NCatalogue=new TCatalogue();
			NCatalogue.name=req.body.name;
			NCatalogue.alias=My_Data.toAlias(NCatalogue.name);

			var  name_picture_first=My_Data.md5("catalogue_first_"+(new Date()).toString())+".png";
			My_Data.uploadFileCatalogue(req.files.picture_first,name_picture_first,UPLOAD_PATH,"/public/upload/catalogue/");


			var  name_picture_end=My_Data.md5("catalogue_end_"+(new Date()).toString())+".png";
			My_Data.uploadFileCatalogue(req.files.picture_end,name_picture_end,UPLOAD_PATH,"/public/upload/catalogue/");


			//LEFT
			var multipicture_left=new Array();
			if(!empty(req.files.picture_left)){
					    	
					    	for (var i = req.files.picture_left.length - 1; i >= 0; i--) {
					    		var  n_p=My_Data.md5("catalogue_left_"+i+(new Date()).toString())+".png";
					  			 My_Data.uploadFileCatalogue(req.files.picture_left[i],n_p,UPLOAD_PATH,"/public/upload/catalogue/");
					  			 multipicture_left.push(n_p);
					    	}
					    }

			//RIGHT
			var multipicture_right=new Array();
			if(!empty(req.files.picture_right)){
					    	
					    	for (var i = req.files.picture_right.length - 1; i >= 0; i--) {
					    		var  n_p=My_Data.md5("catalogue_right_"+i+(new Date()).toString())+".png";
					  			 My_Data.uploadFileCatalogue(req.files.picture_right[i],n_p,UPLOAD_PATH,"/public/upload/catalogue/");
					  			 multipicture_right.push(n_p);
					    	}
					    }

			NCatalogue.firstpage=name_picture_first;
			NCatalogue.lastpage=name_picture_end;
			NCatalogue.leftpages=multipicture_left;
			NCatalogue.rightpages=multipicture_right;
			NCatalogue.likes='1';
			NCatalogue.save();

			View.success="Thêm Catalogue mới thành công";


		}else{
			
			View.data.name=req.body.name;
		
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
		var load_catalogue=TCatalogue.findById(req.params.id,function(err,NCatalogue){
			if(err){console.log(err);}
				if(!empty(NCatalogue)){

						if(req.method=="POST"){

							console.log(req.method);

										if(empty(req.body.name)){
											View.error.name = " Vui lòng nhập tên Catalogue ";
										}
										
										if(empty(View.error)){
										
											NCatalogue.name=req.body.name;
											NCatalogue.alias=My_Data.toAlias(NCatalogue.name);
										
											if(!empty(req.files.picture_first.name)){	
												var  name_picture_first=My_Data.md5("catalogue_first_"+(new Date()).toString())+".png";
												My_Data.uploadFileCatalogue(req.files.picture_first,name_picture_first,UPLOAD_PATH,"/public/upload/catalogue/");
												NCatalogue.firstpage=name_picture_first;
											}
											if(!empty(req.files.picture_end.name)){
												var  name_picture_end=My_Data.md5("catalogue_end_"+(new Date()).toString())+".png";
												My_Data.uploadFileCatalogue(req.files.picture_end,name_picture_end,UPLOAD_PATH,"/public/upload/catalogue/");
												NCatalogue.lastpage=name_picture_end;
											}

											//LEFT
											if(!empty(req.files.picture_left[0].name)){
												var multipicture_left=NCatalogue.leftpages;
												if(!empty(req.files.picture_left)){
														    	
														    	for (var i = req.files.picture_left.length - 1; i >= 0; i--) {
														    		var  n_p=My_Data.md5("catalogue_left_"+i+(new Date()).toString())+".png";
														  			 My_Data.uploadFileCatalogue(req.files.picture_left[i],n_p,UPLOAD_PATH,"/public/upload/catalogue/");
														  			 multipicture_left.push(n_p);
														    	}
														    }
												NCatalogue.leftpages=multipicture_left;
											}

											//RIGHT
											if(!empty(req.files.picture_right[0].name)){
												var multipicture_right=NCatalogue.rightpages;
												if(!empty(req.files.picture_right)){
														    	
														    	for (var i = req.files.picture_right.length - 1; i >= 0; i--) {
														    		var  n_p=My_Data.md5("catalogue_right_"+i+(new Date()).toString())+".png";
														  			 My_Data.uploadFileCatalogue(req.files.picture_right[i],n_p,UPLOAD_PATH,"/public/upload/catalogue/");
														  			 multipicture_right.push(n_p);
														    	}
														    }
													NCatalogue.rightpages=multipicture_right;

											}
										
								
											NCatalogue.save();

											View.success="Chỉnh sửa Catalogue mới thành công";


									
										}
									
									}
						
						}
				
						
						View.data.name=NCatalogue.name;
						View.data.firstpage=NCatalogue.firstpage;
						View.data.lastpage=NCatalogue.lastpage;
						View.data.leftpages=NCatalogue.leftpages;
						View.data.rightpages=NCatalogue.rightpages;
						View.data.id=req.params.id;
			

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

	var list = TCatalogue.paginate(sql,{page: View.currentPage ,limit: 10 , sort:{"updated_at":-1}},function(err,data){

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
		TCatalogue.findById(req.params.id,function(err,data){
			 


			res.send("successfully");
		});
	}
	
}
exports.remove=function(req,res){
	if(req.params.id){
		TCatalogue.findByIdAndRemove(req.params.id,function(err,d){
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