//渲染进度条
(function($, root) {
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var lastPer = 0;
    var startTime;
    //将秒转换成分钟,处理时间格式
    function formatTime(time) {
        var time = Math.round(time);
        var minute = Math.floor(time / 60);
        var second = time - minute * 60;
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        return minute + ":" + second;
    }
    //渲染当前总时间
    function renderAllTime(duration) {
        lastPer = 0;
        curDuration = duration;
        var allTime = formatTime(duration);
        $scope.find('.all-time').html(allTime);
    }
    //更新进度条
    function updata(percent) {
        var curTime = percent * curDuration;
        curTime = formatTime(curTime);
        $scope.find('.cur-time').html(curTime);
        //渲染进度条
        var percentage = (percent - 1) * 100 + "%";
        $scope.find(".pro-top").css({
            'transform': 'translateX(' + percentage + ')'
        })
    }
    //时间和进度条的改变
    function start(per) {
        //lastPer = 0;
        lastPer = per === undefined ? lastPer : per;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();

        function frame() {
            var curTime = new Date().getTime();
            var percent = lastPer + (curTime - startTime) / (curDuration * 1000);
            frameId = requestAnimationFrame(frame);
            updata(percent);
        }
        frame()
    }

    function stop() {
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000)
        cancelAnimationFrame(frameId);
    }
    root.process = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        updata: updata
    }
})(window.Zepto, window.player || (window.play = {}));