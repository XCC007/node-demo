var album = require("../models/album.js");
var formidable = require('formidable');
var fs = require("fs");
//显示首页
exports.showIndex = function(req,res,next){
    //使用视图
    res.render("index");
}

//这里是控制器，是领导，不做具体的活儿。负责调度。
//所以，现在要把具体读文件夹的任务，交给ablum.js模块就行了
exports.getAllAlbum =  function(req,res,next){
    //这是一个异步函数
    album.listAllAlbum(function(arr){
        res.json({"jieguo" : arr});
    });
}


//显示文件夹
exports.showAlbum = function(req,res,next){
    var xiangcemingzi = req.params.wenjianjia;
    //使用视图
    res.render("list",{
        "xiangcemingzi" : xiangcemingzi
    });
}

//得到所有图片
exports.getPhotos = function(req,res,next){
    var wenjianjia = req.query.wenjianjia;
    //让ablum模块去列出所有的图片。给他两个参数，一个参数是文件夹名字，一个参数是函数。
    //结果将通过函数的实参来返回。
    album.listPhotos(wenjianjia , function(arr){
        res.json({"jieguo" : arr});
    });

}

//显示上传页面
exports.showUpload = function(req,res,next){
    album.listAllAlbum(function(arr){
        res.render("upload",{
            "wenjianjias" : arr
        });
    })
}

//创建文件夹的接口，是供Ajax使用的
exports.createAlbum = function(req,res,next){
    //用户输入的文件夹
    var wenjianjia = req.query.wenjianjia;
    //这里使用正则！这里的正则运行在服务器上，鲁棒！！
    if(/[\!\@\#\$\%\^\&\*\(\)\<\>\{\}\s]/.test(wenjianjia)){
        res.send("WRONG1");  //非法字符
        return;
    }
    //判断长度
    if(wenjianjia.length > 10){
        res.send("WRONG2");
        return;
    }

    //让album模块去做脏活累活
    album.createAlbum(wenjianjia,function(result){
        res.send(result);
    });
}

exports.shangchuan = function(req,res){
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.uploadDir = "./linshi";

    form.parse(req, function(err, fields, files) {
        if(!files.wenjian){
            return;
            res.end("错误");
        }

        var m = parseInt(Math.random() * 9999999);
        fs.rename("./" + files.wenjian.path ,"./albums/" + fields.wenjianjia + "/" + m + ".jpg",function(err){
            res.send("ok");
        })
    });
}