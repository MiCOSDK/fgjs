/**
* FogCloud api by Rcoke 
* 2015-09-08
*/
'use strict';
var Promise = require("promise");
var FG = exports = {};
// const API_ROOT = "http://www.easylink.io/v1/";
var _userToken, _appId;

//init user information
FG.init = function(appId, userToken) {
	_userToken = userToken;
	_appId = appId;
}

var end_point = "http://www.easylink.io/v1/";

//the function of ajax
var _ajax = function(method, url, data) {
    var p = new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json"); 
        xhr.setRequestHeader("X-Application-Id", _appId); 
        xhr.setRequestHeader("Authorization", "token " + _userToken); 
        xhr.send(data);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        resolve(JSON.parse(xhr.responseText));
                    } catch (e) {
                        reject(JSON.parse(xhr.responseText));
                    }
                } else {
                    reject(JSON.parse(xhr.responseText));
                }
            }
        };
    });
    return p;
};

//Change the name to function name
var _changeName = function(name){
    var namelist = name.split("");
    var xxzm = namelist[(name.indexOf("/"))+1];
    var dxzm = xxzm.toUpperCase();
    return name.replace("/"+xxzm, dxzm);
};

var urls = {
    // "device/devices" : "post",
    // "device/devices" : "post",
    "device/devices" : "post",
    "user/login" : "post"
}

//make anonymous functions
for(var k in urls) {
    var fk = _changeName(k);
    FG[fk] = (function (url, method) {
      return function (param) {
        return _ajax(method, end_point+url, JSON.stringify(param));
        }
    })(k, urls[k]);
}

global.FG = FG;