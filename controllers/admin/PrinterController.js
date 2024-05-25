
var View={};
var Layout="admin/printer/";
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var fs=require("fs");
var TPromise=[];
var My_Data=require("../../library/Data");
const UPLOAD_PATH= __dirname+"/../../public/upload/printer/";


const TPrinter =require("../../models/Printer");

var paginate=require("express-paginate");
require("./Global").Global(TPromise,View);

exports.add=function(req,res){
	View.data={};
	View.error={};
	

	if(req.method=="POST"){

		if(empty(req.body.name)){
			View.error.name = " Vui lòng nhập tên sản phẩm ";
		}
	
		if(empty(View.error)){
			var load_data=TPrinter.findOne({},function(err,NPrinter){
					if(empty(NPrinter)){
						NPrinter=new TPrinter();
					}

					NPrinter.name=req.body.name;
					NPrinter.alias=My_Data.toAlias(req.body.name);
					NPrinter.description=req.body.description;
					NPrinter.downloads=req.body.downloads;
					
					NPrinter.namefooter=req.body.namefooter;


					var get_footer = [];
					
					for (var i = 0; i < req.files.contentfooter.length ; i++) {

						
						if(!empty(req.files.contentfooter[i].name)){

							var  name_picture_first=My_Data.md5("printer_"+i+(new Date()).toString())+".png";
							My_Data.uploadFilePrinter(req.files.contentfooter[i],name_picture_first,UPLOAD_PATH,"/public/upload/printer/");

							get_footer.push(name_picture_first);
						}else{
							get_footer.push( (NPrinter.contentfooter[i] ? NPrinter.contentfooter[i] : '') );
						}
						
					}

					NPrinter.contentfooter=get_footer;

					

				    NPrinter.save();

				    View.success="Thêm mới thành công";
				    View.data.name=NPrinter.name;
					View.data.description=NPrinter.description;
					View.data.downloads=NPrinter.downloads;
					View.data.namefooter=NPrinter.namefooter;
					View.data.contentfooter=NPrinter.contentfooter;


					
					
			});
			TPromise.push(load_data);

		
		}
	
	}else{
			var get_data=TPrinter.findOne({},function(err,d){
				if(!empty(d)){
					View.data.name=d.name;
					View.data.description=d.description;
					View.data.downloads=d.downloads;
					View.data.namefooter=d.namefooter;
					View.data.contentfooter=d.contentfooter;
					
				}
			});
			TPromise.push(get_data);
	}

	
	
	Q.all(TPromise).done(function(){
				res.render(Layout+"add",View);
			});
	
}
