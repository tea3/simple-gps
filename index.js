'use strict'

var fr      = require('node-filelist');
var exif    = require("jpeg-exif");
var fileArr = [];
var retObj  = [];
var callback_Function;

function getGPS(inFilePath){
  exif.parse(inFilePath, (err, data) => {
    if (err) {
        callback_Function(err,null);
    } else {
        retObj.push({
          "path"            : inFilePath ,
          "GPSLatitude"     : repDec(data.GPSInfo.GPSLatitude) ,
          "GPSLongitude"    : repDec(data.GPSInfo.GPSLongitude) ,
          "GPSLatitudeRef"  : data.GPSInfo.GPSLatitudeRef.replace("\u0000\u0000\u0000","") ,
          "GPSLongitudeRef" : data.GPSInfo.GPSLongitudeRef.replace("\u0000\u0000\u0000","")
        });
    }
    getGPS_call();
  });
}

function repDec( inGPS ){
  var repD = inGPS[0] + inGPS[1] / 60 + inGPS[2] / 3600;
  repD = Math.floor(repD * 1000000);
  return repD / 1000000;
}

function callback_onFileReadFn(inFileArr){
    fileArr = inFileArr;
    getGPS_call();
};

function getGPS_call(){
  if(fileArr && fileArr.length > 0){
    var filePath = fileArr.shift();
    getGPS(filePath.path);
  }else{
    callback_Function(null,retObj);
  }
}

function readImgFile(inFilePath){
  fr.read([inFilePath], {"ext":"jpg|JPEG|JPG|jpeg|png|PNG|gif|GIF" , "isStats":true}, callback_onFileReadFn);
}


module.exports.read = function(inFilePath, inCallback_Func){
    readImgFile(inFilePath);
    callback_Function = inCallback_Func;
};