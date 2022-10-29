Component({
    properties: {},
    data: {
        text: "根据《广东省森林防火条例》设立森林防火检查站，请进入林区人员积极配合接受检查",
        animation: null,
        timer: null,
        duration: 0,
        textWidth: 0,
        wrapWidth: 0
    },
    methods: {
        destroyTimer: function() {
            this.data.timer && clearTimeout(this.data.timer);
        },
        initAnimation: function(t) {
            var i = this, a = this;
            this.data.duration = 15e3, this.data.animation = wx.createAnimation({
                duration: this.data.duration,
                timingFunction: "linear"
            });
            var n = wx.createSelectorQuery().in(this);
            n.select(".content-box").boundingClientRect(), n.select("#text").boundingClientRect(), 
            n.exec(function(t) {
                a.setData({
                    wrapWidth: t[0].width,
                    textWidth: t[1].width
                }, function() {
                    i.startAnimation();
                });
            });
        },
        startAnimation: function() {
            var t = this, i = this.data.animation.translateX(this.data.wrapWidth).step({
                duration: 0
            });
            this.setData({
                animationData: i.export()
            });
            var a = this.data.animation.translateX(-this.data.textWidth).step({
                duration: this.data.duration
            });
            setTimeout(function() {
                t.setData({
                    animationData: a.export()
                });
            }, 100);
            var n = setTimeout(function() {
                t.startAnimation();
            }, this.data.duration);
            this.setData({
                timer: n
            });
        }
    },
    lifetimes: {
        attached: function() {
            this.initAnimation(this.data.text);
        },
        detached: function() {
            this.destroyTimer(), this.setData({
                timer: null
            });
        }
    },
    pageLifetimes: {
        show: function() {
            this.initAnimation(this.data.text);
        },
        hide: function() {
            this.destroyTimer(), this.setData({
                timer: null
            });
        },
        unload: function() {
            this.destroyTimer(), this.setData({
                timer: null
            });
        }
    }
});