/**
 * Created by UserPC on 7/16/2017.
 */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var multipart           = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs                  = require('fs');




//Sync Model module ADMIN 

var models={};
     var models_path = process.cwd() + '/models'
      fs.readdirSync(models_path).forEach(function (model_file) {
          if (model_file.indexOf('.js') != -1) {
              models[model_file.split('.')[0]] = require(models_path + '/' + model_file);
          }
      });




//Sync controller module ADMIN 
var controllers={};
var controllers_path = process.cwd() + '/controllers/admin'
fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file);
    }
});


router.use(bodyParser.urlencoded({
    extended: true
}));
 
//GENERAL
router.all('/index/dashboard', isAuthenticated,function(req,res){
    controllers.IndexController.dashboard(req,res);
});

//Categories management
router.all("/categories/add",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.CategoriesController.add(req,res);
});
router.all("/categories/list",isAuthenticated,function(req,res){
    controllers.CategoriesController.list(req,res);
});
router.all("/categories/edit/:id",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.CategoriesController.edit(req,res);
});
router.all("/categories/remove/:id",isAuthenticated,function(req,res){
    controllers.CategoriesController.remove(req,res);
});

//Product management
router.all("/product/add",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.ProductController.add(req,res);
});
router.all("/product/list",isAuthenticated,function(req,res){
    controllers.ProductController.list(req,res);
});
router.all("/product/edit/:id",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.ProductController.edit(req,res);
});
router.all("/product/remove/:id",isAuthenticated,function(req,res){
    controllers.ProductController.remove(req,res);
});
router.all("/product/removepicture/:id/:picture",isAuthenticated,function(req,res){
    controllers.ProductController.removepicture(req,res);
});



//Categories management
router.all("/news/add",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.NewsController.add(req,res);
});
router.all("/news/list",isAuthenticated,function(req,res){
    controllers.NewsController.list(req,res);
});
router.all("/news/edit/:id",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.NewsController.edit(req,res);
});
router.all("/news/remove/:id",isAuthenticated,function(req,res){
    controllers.NewsController.remove(req,res);
});

//Product management
router.all("/catalogue/add",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.CatalogueController.add(req,res);
});
router.all("/catalogue/list",isAuthenticated,function(req,res){
    controllers.CatalogueController.list(req,res);
});
router.all("/catalogue/edit/:id",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.CatalogueController.edit(req,res);
});
router.all("/catalogue/remove/:id",isAuthenticated,function(req,res){
    controllers.CatalogueController.remove(req,res);
});
router.all("/catalogue/removepicture/:id/:i",isAuthenticated,function(req,res){
    controllers.CatalogueController.removepicture(req,res);
});



//Design management
router.all("/design/add",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.DesignController.add(req,res);
});
router.all("/design/list",isAuthenticated,function(req,res){
    controllers.DesignController.list(req,res);
});
router.all("/design/edit/:id",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.DesignController.edit(req,res);
});
router.all("/design/remove/:id",isAuthenticated,function(req,res){
    controllers.DesignController.remove(req,res);
});
router.all("/design/removepicture/:id/:picture",isAuthenticated,function(req,res){
    controllers.DesignController.removepicture(req,res);
});


//JOB management
router.all("/job/add",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.JobController.add(req,res);
});
router.all("/job/list",isAuthenticated,function(req,res){
    controllers.JobController.list(req,res);
});
router.all("/job/edit/:id",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.JobController.edit(req,res);
});
router.all("/job/remove/:id",isAuthenticated,function(req,res){
    controllers.JobController.remove(req,res);
});

//PROJECT  management
router.all("/project/add",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.ProjectController.add(req,res);
});
router.all("/project/list",isAuthenticated,function(req,res){
    controllers.ProjectController.list(req,res);
});
router.all("/project/edit/:id",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.ProjectController.edit(req,res);
});
router.all("/project/remove/:id",isAuthenticated,function(req,res){
    controllers.ProjectController.remove(req,res);
});
router.all("/project/removepicture/:id/:picture",isAuthenticated,function(req,res){
    controllers.ProjectController.removepicture(req,res);
});

//SUPLIER management 
router.all("/supplier/add",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.SupplierController.add(req,res);
});
//Printer management 
router.all("/printer/add",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.PrinterController.add(req,res);
});
//Info management 
router.all("/intro/add",isAuthenticated,function(req,res){
    controllers.IntroController.add(req,res);
});
//SLIDESHOW  management
router.all("/slideshow/add",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.SlideshowController.add(req,res);
});
router.all("/slideshow/list",isAuthenticated,function(req,res){
    controllers.SlideshowController.list(req,res);
});
router.all("/slideshow/edit/:id",multipartMiddleware,isAuthenticated,function(req,res){
    controllers.SlideshowController.edit(req,res);
});
router.all("/slideshow/remove/:id",isAuthenticated,function(req,res){
    controllers.SlideshowController.remove(req,res);
});

//USer management

router.all("/user/contact",isAuthenticated,function(req,res){
    controllers.UserController.contact(req,res);
});
router.all("/user/removecontact/:id",isAuthenticated,function(req,res){
    controllers.UserController.removecontact(req,res);
});
router.all("/user/add",isAuthenticated,function(req,res){
    controllers.UserController.add(req,res);
});
router.all("/user/password",isAuthenticated,function(req,res){
    controllers.UserController.password(req,res);
});
router.all("/user/list",isAuthenticated,function(req,res){
    controllers.UserController.list(req,res);
});
router.all("/user/edit/:id",isAuthenticated,function(req,res){
    controllers.UserController.edit(req,res);
});
router.all("/user/remove/:id",isAuthenticated,function(req,res){
    controllers.UserController.remove(req,res);
});
router.all("/user/login",function(req,res){
    controllers.UserController.login(req,res);
});
router.all("/user/logout",function(req,res){
    controllers.UserController.logout(req,res);
});


function isAuthenticated(req,res,next){
   // return next();
   if(req.session.user){
        
      return next();
   }
   else{
      res.redirect('/admin/user/login');
   }
}

router.post("/user_upload", multipartMiddleware,isAuthenticated,function(req, res) {
          //  console.log(req.files);

            var dest, fileName, fs, l, tmpPath;

            fs = require('fs');

            tmpPath = req.files.upload.path;
            // for path linux
            /*
            l = tmpPath.split('/').length;
            fileName = tmpPath.split('/')[l – 1] + "_" + req.files.upload.name;

            l = tmpPath.split('\\').length;
            fileName = tmpPath.split('\\')[l – 1] + "_" + req.files.upload.name;*/

            l = tmpPath.split('/').length;
            fileName = tmpPath.split('/')[1] + "_" + req.files.upload.name;

            dest = __dirname + "/../public/user_upload/" + fileName;
            fs.readFile(req.files.upload.path, function(err, data) {
            if (err) {
            console.log(err);
            return;
            }

            fs.writeFile(dest, data, function(err) {
            var html;
            if (err) {
            console.log(err);
            return;
            }

            html = "";
            html += "<script type='text/javascript'>";
            html += " var funcNum = " + req.query.CKEditorFuncNum + ";";
            html += " var url = \"/public/user_upload/" + fileName + "\";";
            html += " var message = \"Uploaded file successfully\";";
            html += "";
            html += " window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
            html += "</script>";

            res.send(html);
            });
            });
});

module.exports = router;
