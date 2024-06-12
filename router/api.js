/**
 * Created by UserPC on 7/16/2017.
 */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var multipart           = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs                  = require('fs');
const md5= require("md5");
var session = require('express-session');



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
var controllers_path = process.cwd() + '/controllers/home'
fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file);
    }
});


router.use(bodyParser.urlencoded({
    extended: true
}));
router.all("/general",isAuthenticated,function(req,res){
  controllers.ApiController.general(req,res);
});
router.get("/home",isAuthenticated, function(req,res){
    controllers.ApiController.home(req,res);
});
router.get("/project",isAuthenticated,function(req,res){
  controllers.ApiController.project(req,res);
});
router.get("/slideshow",isAuthenticated,function(req,res){
  controllers.ApiController.slideshow(req,res);
});
router.all("/supplier",isAuthenticated,function(req,res){
  controllers.ApiController.supplier(req,res);
});
router.all("/contacts", multipartMiddleware, controllers.ApiController.contacts);
router.all("/create-email", multipartMiddleware, controllers.ApiController.createEmails);
router.all("/delete-email/:id", multipartMiddleware, controllers.ApiController.deleteEmails);
router.all("/showview-email/:id", multipartMiddleware, controllers.ApiController.showviewEmails);


function isAuthenticated(req,res,next){
      return next();

   if(req.session.mytoken){
        
      return next();
   }
   else{
       res.json({'errr':"slkdj"});
       return ;
   }
}


module.exports = router;
