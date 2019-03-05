//将控制栏功能封装成模块
(function($, root) {
    function controlManger(len) {
        this.index = index;
        this.len = len;
    }
    controlManger.prototype = {
        prev: function() {
            return this.getIndex(-1);
        },
        next: function() {
            return this.getIndex(1);
        },
        getIndex: function(val) {
            var index = this.index;
            var len = this.len;
            var curIndex = (index + len + val) % len;
            this.index = curIndex;
            return curIndex;
        }
    }

    root.controlManger = controlManger;

})(window.Zepto, window.player || {})