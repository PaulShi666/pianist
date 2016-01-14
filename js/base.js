/**
 * Created by Administrator on 2016/1/13.
 */

//基础操作
var P ={};
P.DOM = {};
$ = function () {
    var args = arguments || "document";
    return document.querySelectorAll(args[0]);
};
$.on= function(){

};
NodeList.prototype.on = function(){
    var args = arguments || "document";
    var that = this || document ;

    if(typeof args[0] == "string" && typeof args[1] == "function"  ){
        for(var i = 0; i < that.length; i++){
            that[i].addEventListener(args[0],args[1]);
        }
        return that;
    }else{
        console.error("on方法error");
    }
};
P.console = {


};

