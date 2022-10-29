var a = require("../../utils/wxml2canvas");

Page({
    data: {},
    drawCanvas: function() {
        a("#wrapper", ".draw", "canvas-map").then(function() {
            console.log("canvas has been drawn");
        });
    }
});