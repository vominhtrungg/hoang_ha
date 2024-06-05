var View={};
var Layout="admin/user/";
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var fs=require("fs");
var TPromise=[];
var My_Data=require("../../library/Data");
const UPLOAD_PATH= __dirname+"/../../public/upload/user/";

const TCate= require("../../models/Categories");
const TCustomers =require("../../models/Customers");
const TContact =require("../../models/Contact");

var paginate=require("express-paginate");
require("./Global").Global(TPromise,View);
//Contact 
exports.contact=function(req,res){
		View.currentPage= (req.query.page) ? parseInt(req.query.page) : 1;
	
	var sql={};
	var sql_field={};
	if(req.query.search){
		var key=My_Data.toAlias(req.query.search);
		sql_field.alias= { $regex: '.*' + key + '.*' } ;
		sql = { $and : [sql_field] };
	}
	var list = TContact.paginate(sql,{page: View.currentPage ,limit: 10 , sort:{"updated_at":-1}, populate:{path:"cid_cate"}},function(err,data){

			View.pageCount=data.pages;
	        View.itemCount= data.limit;
	        View.paginate=paginate;
	        View.pages= paginate.getArrayPages(req)(3, data.pages, req.query.page);
			View.list=data;
			// console.log();
		
	});
	TPromise.push(list);
	Q.all(TPromise).done(function(){
		res.render(Layout+"contact",View);
	});
}
exports.removecontact=function(req,res){
	if(req.params.id){
		TContact.findByIdAndRemove(req.params.id,function(err,d){
						
		});
	}
	res.send("removed");

}
//Users

exports.password=function(req,res){
	View.data={};
	View.error={};
	if(empty(req.session.user)){
		//res.redirect("/admin/user/login");
	}
	
	if(req.method=="POST"){

		if(empty(req.body.oldpassword)){
			View.error.oldpassword = " Vui lòng nhập mật khẩu  ";
		}else{
			if(md5(req.body.oldpassword)!=req.session.user.password){
				View.error.oldpassword = " Vui lòng nhập mật khẩu chính xác ";
			}
		}
		if(empty(req.body.password) || empty(req.body.reset)){
			View.error.password="Vui lòng nhập mật khẩu ";
		}else{
			if(req.body.password != req.body.reset){
				View.error.reset=" Vui lòng nhập mật khẩu chính xác ";
			}
		}
		if(empty(View.error)){
			var update_password=TCustomers.findById(req.session.user._id,function(err,data){
					data.password=md5(req.body.password);
					
					data.save();
					View.success="Thay đổi mới thành công";
			});
			TPromise.push(update_password);
		    

		
		}
	
	}
	Q.all(TPromise).done(function(){
		res.render(Layout+"password",View);
	});
}
exports.add=function(req,res){
	View.data={};
	View.error={};
	
	if(req.method=="POST"){

		if(empty(req.body.username)){
			View.error.username = " Vui lòng nhập tên  ";
		}
		if(empty(req.body.password)){
			View.error.password = " Vui lòng nhập   ";
		}
		if(empty(req.body.reset)){
			View.error.reset = " Vui lòng nhập   ";
		}else{
			if(req.body.reset != req.body.password){
				View.error.reset = " Vui lòng nhập chính xác   ";
			}
		}
		
		if(empty(View.error)){
			NUser=new TCustomers();
			NUser.username=req.body.username;
			NUser.password=md5(req.body.password);
		    NUser.save();
		    
		    View.success="Thêm mới thành công";

		}else{
			View.data.username=req.body.username;
			
		}
	
	}
	Q.all(TPromise).done(function(){
		res.render(Layout+"add",View);
	});
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
	var list = TCustomers.paginate(sql,{page: View.currentPage ,limit: 10 , sort:{"updated_at":-1}},function(err,data){

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
		var list= TCustomers.findById(req.params.id,function(err,data){
			var multipicture = data.multipicture;
			multipicture.splice(multipicture.indexOf(req.params.picture),1);
			data.multipicture=multipicture;
			data.save();
		});
		TPromise.push(list);
		Q.all(TPromise).done(function(){
			res.send("successfully");
		});
	}else{
		res.send("successfully");
	}
	
}
exports.remove=function(req,res){
	if(req.params.id){
		var list= TCustomers.findByIdAndRemove(req.params.id,function(err,d){
						
		});
		TPromise.push(list);
		Q.all(TPromise).done(function(){
			res.send("successfully");
		});
	}else{
		res.send("removed");
	}
	

}
exports.logout=function(req,res){
	req.session.destroy();
	res.redirect("/admin/user/login");
}
exports.login=function(req,res){
	View.data={};
	View.error={};
	if(req.method=="POST"){
		if(!empty(req.body.username) && !empty(req.body.password)){
			var load_p=TCustomers.findOne({username:req.body.username, password: md5(req.body.password)},function(err,data){
				
					if(!empty(data)){
						
						req.session.user=data;
					//	res.send( 401 );
						return res.redirect('/admin/index/dashboard');
						//res.json({'error':"lsk"});
						//return;
					}
			});
			TPromise.push(load_p);
		}
	}else{
		res.render(Layout+"login",View);
	}
	
}