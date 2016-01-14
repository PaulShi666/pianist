/**
 * Created by Administrator on 2016/1/13.
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
            'audio/piano/42.mp3',
            'audio/piano/44.mp3',
            'audio/piano/45.mp3',
            'audio/piano/47.mp3',
            'audio/piano/49.mp3',
            'audio/piano/51.mp3',
            'audio/piano/52.mp3'
        ],
        finishedLoading
    );

    bufferLoader.load();
    function finishedLoading(bufferList) {

        var keyWhiteDom = document.getElementsByClassName("key-white");
        for (var i = 0; i < keyWhiteDom.length; i++) {

            keyWhiteDom[i].addEventListener("touchstart", function (e) {
                var index = this.id;
                var source = context.createBufferSource();
                source.buffer = bufferList[index];
                source.connect(context.destination);
                source.start(0);

            })
        }
    }


}

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
    for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i);
}


