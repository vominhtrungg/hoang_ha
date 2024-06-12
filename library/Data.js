const nodemailer = require("nodemailer");
const TEmails= require("../models/Emails");
const TGeneral= require("../models/General");

exports.addValueInObject = function (object, key, value) {
	var res = {};
	var textObject = JSON.stringify(object);
	if (textObject === '{}') {
		res = JSON.parse('{"' + key + '":"' + value + '"}');
	} else {
		res = JSON.parse('{' + textObject.substring(1, textObject.length - 1) + ',"' + key + '":"' + value + '"}');
	}
	return res;
}
exports.removeAccent = function (s) {

	if (typeof s === "undefined") {
		return;
	}
	var i = 0, uni1, arr1;
	var newclean = s;
	uni1 = 'à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ|A';
	arr1 = uni1.split('|');
	for (i = 0; i < uni1.length; i++)
		newclean = newclean.replace(uni1[i], 'a');
	uni1 = 'è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ|E';
	arr1 = uni1.split('|');
	for (i = 0; i < uni1.length; i++)
		newclean = newclean.replace(uni1[i], 'e');
	uni1 = 'ì|í|ị|ỉ|ĩ|Ì|Í|Ị|Ỉ|Ĩ|I';
	arr1 = uni1.split('|');
	for (i = 0; i < uni1.length; i++)
		newclean = newclean.replace(uni1[i], 'i');
	uni1 = 'ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ|O';
	arr1 = uni1.split('|');
	for (i = 0; i < uni1.length; i++)
		newclean = newclean.replace(uni1[i], 'o');
	uni1 = 'ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ|U';
	arr1 = uni1.split('|');
	for (i = 0; i < uni1.length; i++)
		newclean = newclean.replace(uni1[i], 'u');

	uni1 = 'ỳ|ý|ỵ|ỷ|ỹ|Ỳ|Ý|Ỵ|Ỷ|Ỹ|Y';
	arr1 = uni1.split('|');
	for (i = 0; i < uni1.length; i++)
		newclean = newclean.replace(uni1[i], 'y');
	uni1 = 'd|Đ|D';
	arr1 = uni1.split('|');
	for (i = 0; i < uni1.length; i++)
		newclean = newclean.replace(uni1[i], 'd');
	newclean = newclean.toLowerCase();
	ret = newclean.replace(/[\&]/g, '-').replace(/[^a-zA-Z0-9.-\/]/g, '-').replace(/[-]+/g, '-').replace(/-$/, '');
	return ret;
}


exports.urlPost = function (post) {
	return '/post/' + this.removeAccent(post.slug) + '/' + post.id + '.html';
}
exports.formatDate = function (mydate) {

	var monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];
	var monthNames = [
		"01", "02", "03",
		"04", "05", "06", "07",
		"08", "09", "10",
		"11", "12"
	];

	var day = mydate.getDate();
	var monthIndex = mydate.getMonth();
	var year = mydate.getFullYear();

	return day + '/' + monthNames[monthIndex] + '/' + year;

}
exports.formatDateSitemap = function (mydate) {

	var monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];
	var monthNames = [
		"01", "02", "03",
		"04", "05", "06", "07",
		"08", "09", "10",
		"11", "12"
	];

	var day = mydate.getDate();
	var monthIndex = mydate.getMonth();
	var year = mydate.getFullYear();

	return year + "-" + monthNames[monthIndex] + "-" + day;

}
exports.md5 = function (mystring) {
	var md5 = require("md5");
	var result = md5(mystring);
	return result;
}


exports.listcate = function (al) {
	al = al.split("--").join("-");

	var t = {
		"1": "dien-tu", "2": "dien-lanh", "9": "gia-dung",
		"15": "vien-thong", "19": "di-dong-tablet"
		, "20": "vi-tinh", "21": "noi-that", "22": "me-be", "23": "dien-co",
		"97": "trang-tri", "104": "thoi-trang-phu-kien",
		"112": "suc-khoe-sac-dep", "120": "dich-vu"
	};
	for (var x in t) {

		if (al == t[x]) {
			return x;
		}
	}
	return 0;

}
exports.repAll = function (string) {
	if (typeof string == 'string') {
		return string.split(' ').join('');
	}
	return '';
}
exports.replaceValue = function (string) {
	if (typeof string == 'string') {
		return string.split(" ").join("-");
	}
	return '';
}
exports.convertString = function (str) {
	if (typeof str === "string") {


		str = str.toLowerCase();

		var translate = {
			'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
			'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
			'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
			'À': 'a', 'Á': 'a', 'Ả': 'a', 'Ã': 'a', 'Ạ': 'a',
			'Ă': 'a', 'Ằ': 'a', 'Ắ': 'a', 'Ẳ': 'a', 'Ẵ': 'a', 'Ặ': 'a',
			'Â': 'a', 'Ầ': 'a', 'Ấ': 'a', 'Ẩ': 'a', 'Ẫ': 'a', 'Ậ': 'a',
			'đ': 'd', 'Đ': 'd',
			'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
			'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
			'È': 'e', 'É': 'e', 'Ẻ': 'e', 'Ẽ': 'e', 'Ẹ': 'e',
			'Ê': 'e', 'Ề': 'e', 'Ế': 'e', 'Ể': 'e', 'Ễ': 'e', 'Ệ': 'e',
			'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
			'Ì': 'i', 'Í': 'i', 'Ỉ': 'i', 'Ĩ': 'i', 'Ị': 'i',
			'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
			'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
			'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
			'Ò': 'o', 'Ó': 'o', 'Ỏ': 'o', 'Õ': 'o', 'Ọ': 'o',
			'Ô': 'o', 'Ồ': 'o', 'Ố': 'o', 'Ổ': 'o', 'Ỗ': 'o', 'Ộ': 'o',
			'Ơ': 'o', 'Ờ': 'o', 'Ớ': 'o', 'Ở': 'o', 'Ỡ': 'o', 'Ợ': 'o',
			'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
			'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
			'Ù': 'u', 'Ú': 'u', 'Ủ': 'u', 'Ũ': 'u', 'Ụ': 'u',
			'Ư': 'u', 'Ừ': 'u', 'Ứ': 'u', 'Ử': 'u', 'Ữ': 'u', 'Ự': 'u',
			'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
			'Y': 'y', 'Ỳ': 'y', 'Ý': 'y', 'Ỷ': 'y', 'Ỹ': 'y', 'Ỵ': 'y'
		};

		for (var t in translate) {
			str = str.split(t).join(translate[t]);
		}

		var cha = [",", "”", "–", "~", "`", "!", "@", "#", "$", "%", '%', "^", "&", "*", "(", ")", "-", "_", "=", "+", "{", "[", "]", "}", "|", "\\", ":", ";", "'", "\"", "<", ",", ">", ".", "?", "/"];
		for (var i = cha.length - 1; i >= 0; i--) {

			//str=str.replace(cha[i],"");
			str = str.split(cha[i]).join("");
		};



		return str;

	} else {
		return '0';
	}
}
exports.toIcon = function (string) {
	return this.repAll(this.convertString(string)).toLowerCase();
}
exports.toAlias = function (string) {
	if (string != undefined && string != null) {
		return this.replaceValue(this.convertString(string)).toLowerCase().replace("---", "-").replace("--", "-");
	}
}
exports.getName = function (string) {
	var s = string.split(' ');
	var result = "";
	if (s) {
		for (var i = 0; i < s.length; i++) {
			result = result + s[i].substring(0, 1).toUpperCase();
		}
	}

	return result;
}
exports.toPrice = function (number) {
	number = parseInt(number);
	if (isNaN(number)) {
		return '0 Đ';
	}
	var number = number.toFixed(0) + '';
	var x = number.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return (x1 + x2) + " Đ";
}
exports.showTime = function (n) {
	var date = new Date(n);

	var v = '';

	var seconds = Math.floor((new Date() - date) / 1000);

	var interval = Math.floor(seconds / 31536000);

	if (interval > 1) {
		v = interval + " năm trước";

		return v;
	}
	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {
		v = interval + " tháng trước";
		element.text(v);
		return;
	}
	interval = Math.floor(seconds / 86400);
	if (interval > 1) {
		v = interval + " ngày trước";

		return v;
	}
	interval = Math.floor(seconds / 3600);
	if (interval > 1) {
		v = interval + " giờ trước ";

		return v;
	}
	interval = Math.floor(seconds / 60);
	if (interval > 1) {
		v = interval + " phút trước";

		return v;
	}
	v = Math.floor(seconds) + " giây trước";

	return v;
}
exports.resize = function (T_src, T_dis, T_width, T_height) {
	/*var resizeImage = require('resize-image');
	 
	var img = new Image();
	img.onload= function () {
	  var data = resizeImage.resize(img, 200, 100, resizeImage.PNG);
	  //console.log(data);
	};
	img.src = url; */
	var easyimg = require('easyimage');
	//easyimg.rescrop({
	easyimg.resize({
		src: T_src, dst: T_dis,
		width: T_width, height: T_height,
		cropwidth: 128, cropheight: 128,
		x: 0, y: 0
	}).then(
		function (image) {
			console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
		},
		function (err) {
			console.log(err);
		}
	);


}
exports.uploadFile = function (file, name_picture, path = __dirname + '../public/upload/', pathImg = '/public/upload') {
	var fs = require("fs");
	var originalFilename = file.name;
	var fileType = file.type.split('/')[1];
	var fileSize = file.size;
	var pathUpload = path + name_picture;
	var pathImg = pathImg + originalFilename;
	var data = fs.readFileSync(file.path);
	fs.writeFileSync(pathUpload, data);
	var imgUrl = '';
	if (fs.existsSync(pathUpload)) {
		imgUrl = pathImg;

		this.resize(pathUpload, path + "small/" + name_picture, 315, 249);
	}
	return imgUrl;
}
exports.uploadFileCatalogue = function (file, name_picture, path = __dirname + '../public/upload/', pathImg = '/public/upload') {
	var fs = require("fs");
	var originalFilename = file.name;
	var fileType = file.type.split('/')[1];
	var fileSize = file.size;
	var pathUpload = path + name_picture;
	var pathImg = pathImg + originalFilename;
	var data = fs.readFileSync(file.path);
	fs.writeFileSync(pathUpload, data);
	var imgUrl = '';
	if (fs.existsSync(pathUpload)) {
		imgUrl = pathImg;

		this.resize(pathUpload, path + "thumb/" + name_picture, 120, 156);
	}
	return imgUrl;
}
exports.uploadFilePrinter = function (file, name_picture, path = __dirname + '../public/upload/printer', pathImg = '/public/upload/printer') {
	var fs = require("fs");
	var originalFilename = file.name;
	var fileType = file.type.split('/')[1];
	var fileSize = file.size;
	var pathUpload = path + name_picture;
	var pathImg = pathImg + originalFilename;
	var data = fs.readFileSync(file.path);
	fs.writeFileSync(pathUpload, data);
	var imgUrl = '';
	if (fs.existsSync(pathUpload)) {
		imgUrl = pathImg;

	}
	return imgUrl;
}
const getListEmails = async () => { 
	let listEmails = '';
	const data = await TEmails.find({showView: 1})
	const dataGeneral = await TGeneral.findOne({})
	data.forEach((item, index) => {
		if (index < data.length - 1) {
			listEmails += `${item.name}, `;
		}else{
			listEmails += `${item.name}`;
		}
	})
	return {
		listEmails,dataGeneral
	};
}
exports.sendMails = async (data) => {
	try {
		const {listEmails, dataGeneral} = await getListEmails();
		// const transporter = await nodemailer.createTestAccount();
		if(dataGeneral.emailMain && dataGeneral.emailMainKey){
			const transporter = nodemailer.createTransport({
				host: 'smtp.gmail.com',
				port: 465,
				secure: true,
				auth: {
					user: dataGeneral.emailMain,
					pass: dataGeneral.emailMainKey,
				},
			});
			// send mail with defined transport object
			const info = await transporter.sendMail({
				from: '"Quảng cáo Hoàng Hà" <chauc800@gmail.com>', // sender address
				to: listEmails, // list of receivers
				subject: `${data.name} cần liên hệ báo giá ở website`, // Subject line
				html: `<div>
					SĐT: ${data.email}
					<br/>
					Tên: ${data.name}
					<br/>
					Sản phẩm: ${data.productName}
					<br/>
					SL: ${data.quantity}
					<br/>
					Nội dung: ${data.description}
					<br/>
				</div>`, // html body
			});
			console.log("Message sent: %s", info.messageId);
		// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
		}
	} catch (error) {
		console.log(error);
	}
}

exports.validateEmail = (email) => {
	return email.match(
	  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
  };