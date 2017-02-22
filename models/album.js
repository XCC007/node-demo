var fs  = require("fs");
//列出所有相册名字列表，这是函数是异步的，asynchronous的
exports.listAllAlbum = function(callback){
    //准备一个数组
    var arr = [];
    //已经遍历好的文件或者文件夹个数
    var already = 0;
    //这里写具体的脏活累活，我们要读取文件夹
    fs.readdir("./albums",function(err,files){
        if(err){
            console.log("读取albums错误");
            return;
        }
        // files是形如：
        // [ '奥运', '孙杨', '王八蛋.txt', '里约' ]
        // 的数组
        itorator(0);

        function itorator(i){
            //检查是否所有的文件或者文件夹都已经遍历了：
            if(i == files.length){
                callback(arr);
                return;
            }
            //看某一个文件或者文件夹的状态
            fs.stat("./albums/" + files[i], function (err, stats) {
                if (stats.isDirectory()) {
                    arr.push({"mingzi": files[i] , "shijian" : stats.birthtime});
                }
                itorator(++i);
            });
        };
    });
}

//列出指定文件夹中的图片列表，这个函数是异步的。
exports.listPhotos = function(wenjianjia , callback){
    var arr = [];  //存放所有文件
    fs.readdir("./albums/" + wenjianjia , function(err,files){
        iterator(0);
        function iterator(i){
            if(i == files.length){
                callback(arr);
                return;
            }
            fs.stat("./albums/" + wenjianjia + "/" + files[i] , function(err,stats){
                if(stats.isFile()){
                    arr.push(files[i]);
                }
                iterator(++i);
            });
        }
    });
}

//创建文件夹
exports.createAlbum = function(wenjianjia , callback){
    //先判断这个文件夹是否已经存在
    fs.readdir("./albums",function(err,files){
        for(var i = 0 ; i < files.length ; i++){
            if(wenjianjia == files[i]){
                callback("WRONG4");
                return;
            }
        }
        //没有重名的创建
        fs.mkdir("./albums/" + wenjianjia,function(err){
            if(err){
                callback("WRONG3");
                return;
            }
            callback("RIGHT");
        });
    })
}