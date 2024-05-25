
const express=require("express");
const app = express();
var session = require('express-session');
const config= require("./config/database");
var mongoose            = require('mongoose');
var paginate = require("express-paginate");



//var sharp = require("sharp");
mongoose.connect(config.databases);
var dbMongo = mongoose.connection;
dbMongo.on('error', console.error.bind(console, 'connection error:'));

dbMongo.once('open', function(){
	console.log('MongoDb connected');
});


/*app.use(session({
    secret: "i18n_demo",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
*/

//app.use(require('skipper')());

app.use(session(
		{
			secret:"HOANG_HA",
			
		}
));


const home=require("./router/home");
const api =require("./router/api");
const admin=require("./router/admin");

app.use(paginate.middleware(10, 50));


app.set("view engine","jade");

app.use("/public",express.static(__dirname+"/public"));
app.use("/",home);

app.use("/api",api);

app.disable('etag');

app.use("/admin",admin);





app.listen(3001,function(){
	console.log(" listening on port 3001");
});