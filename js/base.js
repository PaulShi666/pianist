/**
 * Created by Paul on 2016/1/13.
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
    timers:{},
    time:function(){
        var timerName =arguments[0];
        if(!P["console"]["timers"][timerName]){
            P["console"]["timers"][timerName] = {};
            P["console"]["timers"][timerName]["start"]= new Date().getTime();
        }
    },
    timeEnd:function(){
        var timerName =arguments[0];
        if(P["console"]["timers"][timerName]){
            P["console"]["timers"][timerName]["End"]= new Date().getTime();
            var time =  P["console"]["timers"][timerName]["End"] - P["console"]["timers"][timerName]["start"];
            alert("耗时" + time+"ms");
        }

    }



};

