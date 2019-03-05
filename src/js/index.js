var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);

var index = 0;
var songList;

var audio = new root.audioControl();
console.log(audio);

function bindEvent() {
    $scope.on("play:change", function(event, index, flag) {

        audio.setAudio(songList[index].audio);
        if (audio.status == "play") {
            audio.play();
            root.process.start();
        }
        root.process.renderAllTime(songList[index].duration);
        root.render(songList[index]);
        root.process.updata(0);
    })
    $scope.on("click", ".prev-btn", function() {
        // if (index === 0) {
        //     index = songList.length - 1;
        // } else {
        //     index--;
        // }
        var index = controlManger.prev();
        root.render(songList[index]);
        $scope.trigger("play:change", index);
    })
    $scope.on("click", ".next-btn", function() {
        // if (index === songList.length - 1) {
        //     index = 0;
        // } else {
        //     index++;
        // }
        var index = controlManger.next();
        root.render(songList[index]);
        $scope.trigger("play:change", index);
    })
    $scope.on("click", ".play-btn", function() {

        if (audio.status == "play") {
            audio.pause();
            root.process.stop();
        } else {
            audio.play();
            root.process.start();

        }
        $(this).toggleClass('pause')
    })

}

function bindTouch() {
    var $slider = $scope.find(".slider-pointer");
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $slider.on("touchstart", function() {
        root.process.stop();
    }).on('touchmove', function(e) {
        //Percent-->updata
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per < 0 || per > 1) {
            per = 0
        }
        root.process.updata(per);
    }).on('touchend', function(e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per < 0 || per > 1) {
            per = 0
        }
        console.log(controlManger);
        var curDuration = songList[controlManger.index].duration;
        var curTime = per * curDuration;
        audio.playTo(curTime);
        root.process.start(per);
        $scope.find(".play-btn").addClass('pause');
    })
}

function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function(data) {
            songList = data;
            root.render(data[0]);
            bindEvent();
            controlManger = new root.controlManger(data.length);
            console.log(data);
            $scope.trigger("play:change", 0);
            bindTouch();
        },
        error: function() {
            console.log('error');
        }
    })
}

getData('../mock/data.json');