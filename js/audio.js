/**
 * Created by Paul on 2016/1/13.
 */
//音频层


function audioInit() {
    var context;
    var bufferLoader;


    //初始化context
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    try {
        context = new window.AudioContext();
    } catch (e) {
        alert("很抱歉，您当前的浏览器不支持Web Audio API,请使用QQ浏览器或Chrome")
    }

    bufferLoader = new BufferLoader(
        context,
        [
            'audio/piano/40.mp3',
            'audio/piano/41.mp3',
            'audio/piano/42.mp3',
            'audio/piano/43.mp3',
            'audio/piano/44.mp3',
            'audio/piano/45.mp3',
            'audio/piano/46.mp3',
            'audio/piano/47.mp3',
            'audio/piano/48.mp3',
            'audio/piano/49.mp3',
            'audio/piano/50.mp3',
            'audio/piano/51.mp3',
            'audio/piano/52.mp3',
            'audio/piano/53.mp3',
            'audio/piano/54.mp3',
            'audio/piano/55.mp3',
            'audio/piano/56.mp3',
            'audio/piano/57.mp3'
        ],
        finishedLoading
    );
    console.log(bufferLoader);
    bufferLoader.load();
    function finishedLoading(bufferList) {

        var keyWhiteDom = document.getElementsByClassName("key");
        for (var i = 0; i < keyWhiteDom.length; i++) {

            keyWhiteDom[i].addEventListener("touchstart", function (e) {
                var pitch = this.getAttribute("data-pitch");
                console.log(pitch);
                var source = context.createBufferSource();
                source.buffer = bufferList[pitch];
                source.connect(context.destination);
                source.start(0);

            })
        }
    }

}
//BufferLoader对象构造(xhr请求、decode、buffer)
function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function (url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function () {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
            request.response,
            function (buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                if (++loader.loadCount == loader.urlList.length)
                    loader.onload(loader.bufferList);
            },
            function (error) {
                console.error('decodeAudioData error', error);
            }
        );
    }

    request.onerror = function () {
        alert('BufferLoader: XHR error');
    }

    request.send();
}

BufferLoader.prototype.load = function () {
    for (var i = 0; i < this.urlList.length; ++i){
        //console.log(this.urlList[i]);
        var fileRegex = /[^\/]\d/;
        var fileName = fileRegex.exec(this.urlList[i])[0];

        this.loadBuffer(this.urlList[i], fileName);
    }

}


