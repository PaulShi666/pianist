/**
 * Created by Paul on 2016/1/14.
 */
//视图层
function viewInit(){
    $(".key-white").on("touchstart",function(e){
        e.preventDefault();
        this.className = "key-white pressed";
    }).on("touchend",function(e){
        e.preventDefault();

        this.className = "key-white";
    });

    $(".key-black").on("touchstart",function(e){
        e.preventDefault();

        this.className = "key-black pressed";
    }).on("touchend",function(e){
        e.preventDefault();

        this.className = "key-black";
    });

}
