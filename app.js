//引用express
var express = require("express");
//引用路由
var router = require("./router/router.js");

//创建一个app程序
var app = express();
//设置默认的模板引擎
app.set("view engine","ejs");

//路由中间件列表：
app.use("/public"       , express.static("public"));          //静态资源
app.get("/"             , router.showIndex);                  //显示首页
app.get("/getAllAlbum"  , router.getAllAlbum);               //显示所有文件夹JSON，供前台Ajax调用
app.get("/albums/:wenjianjia" , router.showAlbum);          //显示某一个文件夹
app.get("/getPhotos"    , router.getPhotos);                  //显示查询的文件夹的JSON，供Ajax使用
app.use("/albums"       , express.static("albums"))          //静态资源
app.get("/upload"       , router.showUpload);                //显示上传文件页面
app.get("/createAlbum"  , router.createAlbum);               //创建一个文件夹
app.post("/shangchuan"   , router.shangchuan);               //上传文件的

//监听
app.listen(3000);