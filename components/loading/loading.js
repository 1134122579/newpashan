Component({
    properties: {
        type: String
    },
    data: {},
    methods: {
        preventdefault: function() {}
    },
    ready: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                if ("getSystemInfo:ok" == e.errMsg) {
                    console.log("getSystemInfo : ok");
                    var o = e.windowWidth, i = e.windowHeight;
                    t.setData({
                        height: 2 * i + "rpx",
                        width: 2 * o + "rpx"
                    }), console.log("windowHeight : " + t.data.height), console.log("windowWidth : " + t.data.width);
                }
            }
        });
        if (3 == this.data.type) {
            console.log("loadingtype : 3 ,  setTimeout 2000ms");
            setTimeout(function() {
                console.log("timeout already setted");
            }, 2e3);
            console.log("timeout already clear");
        }
    }
});