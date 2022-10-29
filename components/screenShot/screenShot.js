Component({
    properties: {},
    data: {},
    methods: {
        setSaveImage: function(a) {
            wx.showLoading({
                title: "图片生成中..."
            });
            this.drawImages();
        },
        drawImages: function() {
            this.canvasHidden = !1, this.getImageInfo(this.data.imgUrls[0]);
            var a = this.data.imagePath, t = this.data.goodsInfo.title, e = wx.createCanvasContext("imageCanvas", this);
            e.setFillStyle("#fff"), e.fillRect(0, 0, 375, 356), e.drawImage(this.data.banner_image_url, 0, 0, 375, 180), 
            e.setFontSize(14), e.setFillStyle("#000"), e.fillText(t, 26, 228), e.drawImage(a, 228, 200, 130, 130), 
            e.draw(!1, this.drawCallBack);
        },
        drawCallBack: function() {
            wx.canvasToTempFilePath({
                canvasId: "imageCanvas",
                fileType: "jpg",
                success: function(a) {
                    a.tempFilePath;
                    wx.saveImageToPhotosAlbum({
                        filePath: a.tempFilePath,
                        success: function(a) {
                            wx.hideLoading(), wx.showToast({
                                title: "保存成功",
                                icon: "success",
                                duration: 2e3
                            });
                        }
                    });
                },
                fail: function(a) {
                    cosole.log(a, "<-fail res");
                }
            });
        },
        setCanvasSize: function() {
            var a = this;
            wx.getSystemInfo({
                success: function(t) {
                    console.log(t);
                    var e = t.windowWidth, s = t.windowHeight;
                    a.setData({
                        canvasWidth: e,
                        canvasHeight: s
                    });
                }
            });
        },
        getImageInfo: function(a) {
            if ("string" == typeof a) {
                var t = this;
                wx.getImageInfo({
                    src: a,
                    success: function(a) {
                        t.setData({
                            banner_image_url: a.path
                        });
                    },
                    fail: function(a) {
                        console.log(a);
                    }
                });
            }
        }
    }
});