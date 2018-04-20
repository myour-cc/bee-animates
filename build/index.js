"use strict";
(function () {
    var Animate = /** @class */ (function () {
        function Animate(options) {
            var _this = this;
            options = Object.assign({
                el: '',
                animations: [],
                only: false,
                callback: function () {
                    _this.el.style.animation = '';
                }
            }, options);
            if ('[object HTMLDivElement]' != Object.prototype.toString.call(options.el)) {
                var els = document.querySelectorAll(options.el);
                if (els.length != 1) {
                    throw "\u8BF7\u4F20\u5165\u552F\u4E00 el";
                }
                else {
                    this.el = els[0];
                }
            }
            else {
                this.el = options.el;
            }
            if (options.animations.length < 1) {
                throw "\u52A8\u753B\u79CD\u7C7B\u81F3\u5C11\u4E3A\u4E00\u79CD";
            }
            this.animations = options.animations;
            this.only = options.only;
            this.callback = options.callback;
            this.count = options.animations.length;
            this.current = 0;
            this.animating = true;
            this.begin();
        }
        Animate.prototype.setAnimate = function () {
            var _this = this;
            var animate = this.animations[this.current];
            this.current++;
            var style = {
                'animation-name': animate.name,
                'animation-duration': animate.duration + "s",
                'animation-delay': animate.delay + "s",
                'animation-iteration-count': this.only ? 1 : animate.count === 0 ? 'infinite' : animate.count
            };
            Object.keys(style).forEach(function (key) {
                _this.el.style[key] = style[key];
            });
        };
        Animate.prototype.on = function (events, callback) {
            var _this = this;
            events.split(' ').forEach(function (event) {
                _this.el.addEventListener(event, callback);
            });
        };
        Animate.prototype.unbind = function (events, callback) {
            var _this = this;
            events.split(' ').forEach(function (event) {
                _this.el.removeEventListener(event, callback);
            });
        };
        Animate.prototype.doCallback = function () {
            var callback = this.animations[this.current - 1].callback;
            if ('[object Function]' === Object.prototype.toString.call(callback)) {
                callback();
            }
        };
        Animate.prototype.begin = function () {
            var _this = this;
            var listenAnimate = function () {
                if (!_this.animating) {
                    _this.unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', _this.begin);
                    return;
                }
                if (_this.current <= 0) {
                    // 初始动画
                    _this.setAnimate();
                    _this.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', listenAnimate);
                }
                else if (_this.current <= (_this.count - 1)) {
                    // 动画回调
                    _this.doCallback();
                    // 后续动画
                    _this.setAnimate();
                    _this.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', listenAnimate);
                }
                else {
                    // 动画回调
                    _this.doCallback();
                    // 所有动画完成
                    _this.unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', listenAnimate);
                    if (_this.callback)
                        _this.callback(_this);
                }
            };
            listenAnimate();
        };
        Animate.prototype.stop = function () {
            this.animating = false;
            this.el.style.animation = '';
        };
        return Animate;
    }());
    window.beeAnimations = function (options) {
        return new Animate(options);
    };
})();
