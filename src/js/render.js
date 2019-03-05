//实现渲染模块

//防止全局污染编写立即执行函数
(function($, root) {

    var $scope = $(document.body);
    //渲染歌曲信息
    function renderInderInfo(info) {
        var html = '<div class="song-name">' + info.song + '</div>\
            <div class="singer-name">' + info.singer + '</div>\
            <div class="album-name">' + info.album + '</div>';
        $scope.find(".song-info").html(html);
    }
    //渲染歌曲图片
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function() {
            //高斯模糊背景
            root.blurImg(img, $scope);
            $scope.find(".song-img img").attr('src', src);
        }
    }
    //判断是否是喜欢的歌曲
    function renderIsLike(islike) {
        if (islike) {
            $scope.find(".like-btn").addClass('liking');
        } else {
            $scope.find('.like-btn').removeClass('liking');
        }
    }
    root.render = function(data) {
        renderInderInfo(data);
        renderImg(data.image);
        renderIsLike(data.isLike)
    }


})(window.Zepto, window.player || (window.player = {}))
//通过window.player暴露函数