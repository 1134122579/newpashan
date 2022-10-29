var r = [ "hover-class", "hover-start-time", "space", "src" ], t = [ "color", "font-size", "font-weight", "font-family", "backgroundColor", "border", "border-radius", "box-sizing", "line-height" ], e = 0, o = 1, n = 2, i = function(r) {
    for (var t = 0, e = 0, o = r.length; e < o; e++) t += r.charCodeAt(e) < 256 ? 1 : 2;
    return t / 2;
}, a = function(r, t) {
    var e = t.dataset.text, o = t.left, n = t.top, a = t.color, c = t["font-weight"], u = t["font-size"], l = t["font-family"], s = Array.isArray(e) ? e[0] : e;
    r.font = "".concat(c, " ").concat(Math.round(parseFloat(u)), "px ").concat(l), r.setFillStyle(a), 
    function(r, t) {
        var e = r["font-size"], o = r.width;
        return i(t) * parseInt(e, 10) > o;
    }(t, s) ? function(r, t, e) {
        for (var o = t["font-size"], n = t.width, a = t.left, c = t.top, u = t["line-height"], l = "normal" === u ? Math.round(1.2 * o) : u, s = Math.floor(n / parseInt(o, 10)), d = i(e), h = 0; h < d; h += s) {
            var f = e.substring(h, h + s), v = c + Math.floor(h / s) * parseInt(l, 10);
            r.fillText(f, a, v);
        }
    }(r, t, s) : r.fillText(s, o, n), r.restore();
}, c = function(r) {
    return new Promise(function(t, e) {
        wx.getImageInfo({
            src: r,
            success: function(r) {
                t(r);
            }
        });
    });
}, u = function(r) {
    return "0px none rgb(0, 0, 0)" !== r;
}, l = function(r) {
    return "0px" !== r;
}, s = function(r) {
    var t, e, o = 0;
    return u && (o = parseInt(r.split(/\s/)[0], 10), e = r.split(/\s/)[1], t = r.match(/(rgb).*/gi)[0]), 
    {
        borderWidth: o,
        borderStyle: e,
        borderColor: t
    };
}, d = function(r) {
    var t = r.width, e = r.height;
    return {
        coordX: t / 2 + r.left,
        coordY: e / 2 + r.top
    };
}, h = function(r) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, e = r.width;
    return e / 2 - t / 2;
}, f = function(r, t, e) {
    var o = r.border, n = function(r, t) {
        return {
            imgWidth: r.width - 2 * t,
            imgHeight: r.height - 2 * t,
            imgLeft: r.left + t,
            imgTop: r.top + t
        };
    }(r, s(o).borderWidth), i = n.imgWidth, a = n.imgHeight, c = t / e, u = c > 0 ? i : a * c, l = c > 0 ? i * (1 / c) : a;
    return {
        realWidth: u,
        realHeight: l,
        left: n.imgLeft + (c > 0 ? 0 : (i - u) / 2),
        top: n.imgTop + (c > 0 ? (a - l) / 2 : 0)
    };
}, v = function(r, t) {
    var e = t.border, o = t["border-radius"];
    return (l(o) ? function(r, t) {
        var e = t.src, o = d(t), n = o.coordX, i = o.coordY;
        return c(e).then(function(o) {
            var a = o.width, c = o.height, u = h(t);
            r.save(), r.beginPath(), r.arc(n, i, u, 0, 2 * Math.PI), r.closePath(), r.clip();
            var l = f(t, a, c), s = l.left, d = l.top, v = l.realWidth, g = l.realHeight;
            r.drawImage(e, 0, 0, a, c, s, d, v, g), r.restore();
        });
    }(r, t) : function(r, t) {
        var e = t.src, o = t.width, n = t.height, i = t.left, a = t.top;
        return c(e).then(function(c) {
            var u = c.width, l = c.height;
            r.save(), r.beginPath(), r.rect(i, a, o, n), r.closePath(), r.clip();
            var s = f(t, u, l), d = s.left, h = s.top, v = s.realWidth, g = s.realHeight;
            r.drawImage(e, 0, 0, u, l, d, h, v, g), r.restore();
        });
    }(r, t)).then(function() {
        return u(e) ? l(o) ? function(r, t) {
            var e = t.border, o = d(t), n = o.coordX, i = o.coordY, a = s(e), c = a.borderWidth, u = a.borderColor, l = h(t, c);
            r.save(), r.beginPath(), r.setLineWidth(c), r.setStrokeStyle(u), r.arc(n, i, l, 0, 2 * Math.PI), 
            r.stroke(), r.restore();
        }(r, t) : function(r, t) {
            var e = t.border, o = t.left, n = t.top, i = t.width, a = t.height, c = s(e), u = c.borderWidth, l = c.borderColor, d = u + 1;
            r.save(), r.beginPath(), r.setLineWidth(d), r.setStrokeStyle(l), r.rect(o + u / 2, n + u / 2, i - u, a - u), 
            r.stroke(), r.restore();
        }(r, t) : Promise.resolve();
    });
}, g = function(r) {
    var t = r.width, e = r.height, o = r["border-radius"], n = parseInt(o, 10);
    if (-1 !== o.indexOf("%")) {
        var i = parseInt(n / 100 * t, 10), a = parseInt(n / 100 * e, 10);
        return {
            isCircle: i === a,
            borderRadius: i,
            borderRadiusX: i,
            borderRadiusY: a
        };
    }
    return {
        isCircle: !0,
        borderRadius: n
    };
}, p = function(r, t) {
    g(t).isCircle ? function(r, t) {
        var e = t.width, o = t.height, n = t.left, i = t.top, a = t.backgroundColor, c = t.border, u = g(t).borderRadius, l = s(c), d = l.borderWidth, h = l.borderColor;
        r.beginPath(), r.moveTo(n + u, i), r.lineTo(n + e - u, i), r.arcTo(n + e, i, n + e, i + u, u), 
        r.lineTo(n + e, i + o - u), r.arcTo(n + e, i + o, n + e - u, i + o, u), r.lineTo(n + u, i + o), 
        r.arcTo(n, i + o, n, i + o - u, u), r.lineTo(n, i + u), r.arcTo(n, i, n + u, i, u), 
        r.closePath(), a && (r.setFillStyle(a), r.fill()), h && d && (r.setLineWidth(d), 
        r.setStrokeStyle(h), r.stroke());
    }(r, t) : function(r, t) {
        var e = t.width, o = t.height, n = t.left, i = t.top, a = t.backgroundColor, c = t.border, u = s(c), l = u.borderWidth, d = u.borderColor, h = g(t), f = h.borderRadiusX, v = h.borderRadiusY;
        r.beginPath(), r.moveTo(n + f, i), r.lineTo(n + e - f, i), r.quadraticCurveTo(n + e, i, n + e, i + v), 
        r.lineTo(n + e, i + o - v), r.quadraticCurveTo(n + e, i + o, n + e - f, i + o), 
        r.lineTo(n + f, i + o), r.quadraticCurveTo(n, i + o, n, i + o - v), r.lineTo(n, i + v), 
        r.quadraticCurveTo(n, i, n + f, i), r.closePath(), a && (r.setFillStyle(a), r.fill()), 
        d && l && (r.setLineWidth(l), r.setStrokeStyle(d), r.stroke());
    }(r, t);
}, b = function(r) {
    var t = r.dataset.text, e = r.type;
    return Boolean(t) || "text" === e;
}, m = function(r) {
    var t = r.src, e = r.type;
    return Boolean(t) || "image" === e;
}, w = function(r, t) {
    var e = [];
    return t.forEach(function(t) {
        if (b(t)) {
            var o = a(r, t);
            e.push(o);
        } else if (m(t)) {
            var n = v(r, t);
            e.push(n);
        } else {
            var i = p(r, t);
            e.push(i);
        }
    }), e;
}, k = function(r, t, i) {
    var a = wx.createCanvasContext(r);
    a.setTextBaseline("top"), function(r, t) {
        var e = t.backgroundColor, o = t.width, n = t.height;
        r.setFillStyle(e), r.fillRect(0, 0, o, n);
    }(a, t[0]);
    var c = {};
    return function(r) {
        return r.sort(function(r, t) {
            return r.rank < t.rank ? -1 : r.rank > t.rank ? 1 : 0;
        });
    }(i.map(function(r) {
        return b(r) ? (r.type = "text", r.rank = n) : m(r) ? (r.type = "image", r.rank = o) : (r.type = "view", 
        r.rank = e), r;
    })).forEach(function(r) {
        c[r.rank] || (c[r.rank] = []), (b(r) || m(r) || function(r) {
            return "view" === r.type;
        }(r)) && c[r.rank].push(r);
    }), function r(t, e) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0, n = arguments.length > 3 ? arguments[3] : void 0;
        void 0 === n && (n = Promise.resolve());
        var i = o, a = n.then(function() {
            return e[i] ? Promise.all(w(t, e[i])) : Promise.resolve();
        });
        return o >= Object.keys(e).length ? a : r(t, e, o + 1, a);
    }(a, c).then(function() {
        return new Promise(function(r, t) {
            a.draw(!0, function() {
                r();
            });
        });
    });
}, y = function(e) {
    return new Promise(function(o, n) {
        try {
            wx.createSelectorQuery().selectAll(e).fields({
                dataset: !0,
                size: !0,
                rect: !0,
                properties: r,
                computedStyle: t
            }, function(r) {
                o(r);
            }).exec();
        } catch (r) {
            n(r);
        }
    });
};

module.exports = function(r, t, e) {
    var o = y(r), n = y(t);
    return Promise.all([ o, n ]).then(function(r) {
        return k(e, r[0], r[1]);
    });
};