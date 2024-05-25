
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var multipart           = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs                  = require('fs');
const md5 =require("md5");




var session = require('express-session');

var models={};
     var models_path = process.cwd() + '/models'
      fs.readdirSync(models_path).forEach(function (model_file) {
          if (model_file.indexOf('.js') != -1) {
              models[model_file.split('.')[0]] = require(models_path + '/' + model_file);
          }
      });
const app = express();
var i18n = require('i18n');
var cookieParser = require('cookie-parser');
app.use(cookieParser("HOANG_HA_HOME"));


 i18n.configure({

      //define how many languages we would support in our application
      locales:['en', 'vn'],

      //define the path to language json files, default is /locales
      directory: __dirname + '/locales',

      //define the default language
      defaultLocale: 'vn',

      // define a custom cookie name to parse locale settings from 
      cookie: 'HOANG_HA_HOME'
  });
      
app.use(i18n.init);


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

router.get('/', function(req,res){
      
    
    controllers.IndexController.index(req,res);
});

router.get('/sitemap.xml',function(req,res,next){
  //req.accepts('application/json');
  
   res.sendFile(process.cwd() + '/views/home/index/sitemap.xml');
/*
  fs.readFile(process.cwd() + '/views/home/index/sitemap.xml', function (err, data) {
    if (err) {
      next(err); // Pass errors to Express.
    } else {
       res.header('Content-Type', 'text/xml');
      res.send(data)
    }
  });
*/
});



router.get('/sitemap/content',function(req,res){
   res.header('Content-Type', 'text/xml');
  controllers.IndexController.sitemap(req,res);
});
//Page
router.get('/gioi-thieu', function(req,res){
    controllers.PageController.info(req,res);
});


router.all('/lien-he', function(req,res){
    controllers.PageController.contact(req,res);
});
router.all('/tuyen-dung', function(req,res){
    controllers.PageController.job(req,res);
});

router.all('/in-gia-cong-offset', function(req,res){
    controllers.PageController.printer(req,res);
});
//Catalogue
router.get("/catalogue",function(req,res){
  controllers.CatalogueController.index(req,res);
});
router.get("/catalogue/:alias",function(req,res){
  controllers.CatalogueController.index(req,res);
});
router.get("/cataloguelikes/:id",function(req,res){
  controllers.CatalogueController.likes(req,res);
});

router.get('/thiet-ke', function(req,res){
    controllers.PageController.design(req,res);
});
//Product
router.get('/san-pham', function(req,res){
    controllers.ProductController.cate(req,res);
});




var browser = require('../filemanager/browser.js');


router.all("/browser/browse",browser.browse);

//router.post("/browse_url",()=>browser.browse);
router.post("/uploader/upload",browser.upload);




router.get('/thiet-ke/:alias', function(req,res){
    controllers.PageController.detaildesign(req,res);
});

router.get('/san-pham/:alias', function(req,res){
    controllers.ProductController.product(req,res);
});
router.get('/san-pham/:alias/:product', function(req,res){
    controllers.ProductController.product(req,res);
});
router.post("/tu-khoa",function(req,res){
  controllers.ProductController.postsearch(req,res);
});
router.get('/tu-khoa/:key', function(req,res){
    controllers.ProductController.search(req,res);
});

router.get("/tin-tuc",function(req,res){
  controllers.NewsController.index(req,res);
});
router.get('/tin-tuc/:news', function(req,res){
    controllers.NewsController.detail(req,res);
});

router.get('/robots.txt', function (req, res, next) {
    res.type('text/plain')
    res.send("User-agent: * \n \Allow: / \n Sitemap: https://inanhoangha.com/sitemap.xml");
});



router.get('/du-an/:alias', function(req,res){
    controllers.ProductController.project(req,res);
});
router.get('/:cate/:product', function(req,res){
    controllers.ProductController.detail(req,res);
});

router.get('/en', function (req, res) {
    //res.cookie('i18n', 'en');
    i18n.setLocale('en');
    res.redirect('/')
});
router.get('/vn', function (req, res) {
    //res.cookie('i18n', 'en');
    i18n.setLocale('vn');
    res.redirect('/')
});



module.exports = router;
