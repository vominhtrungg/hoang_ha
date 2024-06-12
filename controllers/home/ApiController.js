var View={};
var empty= require("is-empty");
var md5= require("md5");
var session=require("express-session");
var Q= require("q");
var fs=require("fs");
var TPromise=[];
var My_Data=require("../../library/Data");
const GContact =require("../../models/Contact");


const TCate= require("../../models/Categories");
const TProduct = require("../../models/Product");
const TProject =require("../../models/Project");
const TSlideshow = require("../../models/Slideshow");
const TSupplier = require("../../models/Supplier");
const TGeneral= require("../../models/General");
const TEmails= require("../../models/Emails");

var paginate=require("express-paginate");

exports.home=function(req,res){
		res.json(['slkd','sdkf']);
}
exports.project=function(req,res){
	var load_project=TProject.find({status:true}).sort({"updated_at":-1}).exec(function(err,data){
		View.project=data;
	});
	TPromise.push(load_project);
	Q.all(TPromise).done(function(){
		res.json(View.project);
	});
}
exports.slideshow=function(req,res){
	var load_slideshow=TSlideshow.find({status:true}).sort({"updated_at":-1}).exec(function(err,data){
		View.slideshow=data;
	})
	TPromise.push(load_slideshow);
	Q.all(TPromise).done(function(){
		res.json(View.slideshow);
	});
}
exports.supplier=function(req,res){
	
	var load_slideshow=TSupplier.find().exec(function(err,data){
		View.supplier=data;
	});
	TPromise.push(load_slideshow);
	Q.all(TPromise).done(function(){
		res.json(View.supplier);
	});
}
exports.general=function(req,res){
	
	var load_general=TGeneral.findOne().exec(function(err,data){
		View.general=data;
	});
	TPromise.push(load_general);
	Q.all(TPromise).done(function(){
		res.json(View.general);
	});
}
exports.contacts = async function(req,res){
	const {email, quantity, name, description, productName} = req.body;
	try {
		if(!email){
			return res.json({error: true, message: 'Chưa nhập Email hoặc số điện thoại!'})
		}
		if(!name){
			return res.json({error: true, message: 'Chưa nhập Tên!'})
		}
		if(!quantity){
			return res.json({error: true, message: 'Chưa nhập Số lượng!'})
		}
		const global = new GContact({...req.body});
		// if(!description){
		// 	return res.json({error: true, message: 'Chưa nhập Nội dung!'})
		// }
		// global.email = email;
		// global.quantity = quantity;
		// global.name = name;
		// global.description = description;
		// global.productName = productName;
		
		global.save();
		
		await My_Data.sendMails(req.body)
		
		Q.all(TPromise).done(function(){
			return res.json({error: false, message: 'Gửi thông tin thành công! chúng tôi sẽ liện hệ với bạn trong thời gian sớm nhất'});
		});
	} catch (error) {
		console.log(error);
		return res.json({error: false, message: 'Lỗi server! vui lòng liên hệ đội ngũ dev để được hỗ trợ'});
	}
}

// Create email
exports.createEmails = async function(req,res){
	const {email} = req.body;
	try {
		if(!email){
			return res.json({error: true, message: 'Chưa nhập Email!'})
		}
		if(!My_Data.validateEmail(email)){
			return res.json({error: true, message: 'Email chưa đúng định dạng!'})
		}
		const checkEmail = await TEmails.findOne({name: email})
		if (checkEmail) {
			return res.json({error: true, message: 'Email đã tồn tại!'})
		}
		const emails = new TEmails({name: email});
		emails.save();
		Q.all(TPromise).done(function(){
			return res.json({error: false, message: 'Thêm mới email thành công'});
		});
	} catch (error) {
		console.log(error);
		return res.json({error: false, message: 'Lỗi server! vui lòng liên hệ đội ngũ dev để được hỗ trợ'});
	}
}
// Delete email
exports.deleteEmails = async function(req,res){
	const {id} = req.params;
	try {
		await TEmails.findByIdAndRemove(id);
		Q.all(TPromise).done(function(){
			return res.json({error: false, message: 'Xóa email thành công'});
		});
	} catch (error) {
		console.log(error);
		return res.json({error: true, message: 'Lỗi server! vui lòng liên hệ đội ngũ dev để được hỗ trợ'});
	}
}
// Showview email
exports.showviewEmails = async function(req,res){
	const {id} = req.params;
	const {showView} = req.body;
	try {
		if (id) {
			await TEmails.findByIdAndUpdate(id, {showView}, {new: true,});
		}else{
			return res.json({error: true, message: 'Cập nhật email không thành công!'})
		}
		Q.all(TPromise).done(function(){
			return res.json({error: false, message: 'Cập nhật email thành công'});
		});
	} catch (error) {
		console.log(error);
		return res.json({error: true, message: 'Lỗi server! vui lòng liên hệ đội ngũ dev để được hỗ trợ'});
	}
}