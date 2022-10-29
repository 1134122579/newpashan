require("../../../@babel/runtime/helpers/Arrayincludes");

var e = require("../../../@babel/runtime/helpers/objectSpread2"), r = require("../../../@babel/runtime/helpers/slicedToArray");

require("../../../@babel/runtime/helpers/Objectentries");

var n = Page;

Page = function(o) {
    var i = o.mixins;
    Array.isArray(i) && (delete o.mixins, o = function(n, o) {
        return n.forEach(function(n) {
            if ("[object Object]" !== Object.prototype.toString.call(n)) throw new Error("mixin 类型必须为对象！");
            for (var i = function() {
                var i = r(c[l], 2), s = i[0], u = i[1];
                if (a.includes(s)) o[s] = e(e({}, u), o[s]); else if (t.includes(s)) {
                    var p = o[s];
                    o[s] = function() {
                        for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
                        return u.call.apply(u, [ this ].concat(r)), p && p.call.apply(p, [ this ].concat(r));
                    };
                } else o = e(e({}, n), o);
            }, l = 0, c = Object.entries(n); l < c.length; l++) i();
        }), o;
    }(i, o)), n(o);
};

var a = [ "data", "properties", "options" ], t = [ "onLoad", "onReady", "onShow", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onShareAppMessage", "onPageScroll", "onTabItemTap" ];