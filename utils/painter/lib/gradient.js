var t = require("../../../@babel/runtime/helpers/createForOfIteratorHelper");

!function() {
    var a = {
        isGradient: function(t) {
            return !(!t || !t.startsWith("linear") && !t.startsWith("radial"));
        },
        doGradient: function(t, a, e, n) {
            t.startsWith("linear") ? function(t, a, e, n) {
                for (var s = function(t, a, r) {
                    var e, n = t.match(/([-]?\d{1,3})deg/);
                    switch (n && n[1] ? parseFloat(n[1]) : 0) {
                      case 0:
                        e = [ 0, -r / 2, 0, r / 2 ];
                        break;

                      case 90:
                        e = [ a / 2, 0, -a / 2, 0 ];
                        break;

                      case -90:
                        e = [ -a / 2, 0, a / 2, 0 ];
                        break;

                      case 180:
                        e = [ 0, r / 2, 0, -r / 2 ];
                        break;

                      case -180:
                        e = [ 0, -r / 2, 0, r / 2 ];
                        break;

                      default:
                        var s = 0, i = 0, h = 0, l = 0;
                        n[1] > 0 && n[1] < 90 ? (s = a / 2 - (a / 2 * Math.tan((90 - n[1]) * Math.PI * 2 / 360) - r / 2) * Math.sin(2 * (90 - n[1]) * Math.PI * 2 / 360) / 2, 
                        l = Math.tan((90 - n[1]) * Math.PI * 2 / 360) * s, h = -s, i = -l) : n[1] > -180 && n[1] < -90 ? (s = -a / 2 + (a / 2 * Math.tan((90 - n[1]) * Math.PI * 2 / 360) - r / 2) * Math.sin(2 * (90 - n[1]) * Math.PI * 2 / 360) / 2, 
                        l = Math.tan((90 - n[1]) * Math.PI * 2 / 360) * s, h = -s, i = -l) : n[1] > 90 && n[1] < 180 ? (s = a / 2 + (-a / 2 * Math.tan((90 - n[1]) * Math.PI * 2 / 360) - r / 2) * Math.sin(2 * (90 - n[1]) * Math.PI * 2 / 360) / 2, 
                        l = Math.tan((90 - n[1]) * Math.PI * 2 / 360) * s, h = -s, i = -l) : (s = -a / 2 - (-a / 2 * Math.tan((90 - n[1]) * Math.PI * 2 / 360) - r / 2) * Math.sin(2 * (90 - n[1]) * Math.PI * 2 / 360) / 2, 
                        l = Math.tan((90 - n[1]) * Math.PI * 2 / 360) * s, h = -s, i = -l), e = [ s, i, h, l ];
                    }
                    return e;
                }(e, t, a), i = n.createLinearGradient(s[0], s[1], s[2], s[3]), h = e.match(/linear-gradient\((.+)\)/)[1], l = r(h.substring(h.indexOf(",") + 1)), o = 0; o < l.colors.length; o++) i.addColorStop(l.percents[o], l.colors[o]);
                n.fillStyle = i;
            }(a, e, t, n) : t.startsWith("radial") && function(t, a, e, n) {
                for (var s = r(e.match(/radial-gradient\((.+)\)/)[1]), i = n.createCircularGradient(0, 0, t < a ? a / 2 : t / 2), h = 0; h < s.colors.length; h++) i.addColorStop(s.percents[h], s.colors[h]);
                n.fillStyle = i;
            }(a, e, t, n);
        }
    };
    function r(a) {
        var r, e = a.substring(0, a.length - 1).split("%,"), n = [], s = [], i = t(e);
        try {
            for (i.s(); !(r = i.n()).done; ) {
                var h = r.value;
                n.push(h.substring(0, h.lastIndexOf(" ")).trim()), s.push(h.substring(h.lastIndexOf(" "), h.length) / 100);
            }
        } catch (t) {
            i.e(t);
        } finally {
            i.f();
        }
        return {
            colors: n,
            percents: s
        };
    }
    module.exports = {
        api: a
    };
}();