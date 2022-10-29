Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var t = require("../../../@babel/runtime/helpers/toConsumableArray"), s = require("../../../@babel/runtime/helpers/createForOfIteratorHelper"), e = require("../../../@babel/runtime/helpers/classCallCheck"), i = require("../../../@babel/runtime/helpers/createClass"), h = require("./qrcode.js"), c = require("./gradient.js"), a = function() {
    function a(t, s) {
        e(this, a), this.ctx = t, this.data = s, this.globalWidth = {}, this.globalHeight = {};
    }
    return i(a, [ {
        key: "paint",
        value: function(t) {
            this.style = {
                width: this.data.width.toPx(),
                height: this.data.height.toPx()
            }, this._background();
            var e, i = s(this.data.views);
            try {
                for (i.s(); !(e = i.n()).done; ) {
                    var h = e.value;
                    this._drawAbsolute(h);
                }
            } catch (t) {
                i.e(t);
            } finally {
                i.f();
            }
            this.ctx.draw(!1, function() {
                t();
            });
        }
    }, {
        key: "_background",
        value: function() {
            this.ctx.save();
            var t = this.style, s = t.width, e = t.height, i = this.data.background;
            this.ctx.translate(s / 2, e / 2), this._doClip(this.data.borderRadius, s, e), i ? i.startsWith("#") || i.startsWith("rgba") || "transparent" === i.toLowerCase() ? (this.ctx.fillStyle = i, 
            this.ctx.fillRect(-s / 2, -e / 2, s, e)) : c.api.isGradient(i) ? (c.api.doGradient(i, s, e, this.ctx), 
            this.ctx.fillRect(-s / 2, -e / 2, s, e)) : this.ctx.drawImage(i, -s / 2, -e / 2, s, e) : (this.ctx.fillStyle = "#fff", 
            this.ctx.fillRect(-s / 2, -e / 2, s, e)), this.ctx.restore();
        }
    }, {
        key: "_drawAbsolute",
        value: function(s) {
            if (s) switch (s.css && s.css.length && (s.css = Object.assign.apply(Object, t(s.css))), 
            s.type) {
              case "image":
                this._drawAbsImage(s);
                break;

              case "text":
                this._fillAbsText(s);
                break;

              case "rect":
                this._drawAbsRect(s);
                break;

              case "qrcode":
                this._drawQRCode(s);
            }
        }
    }, {
        key: "_doClip",
        value: function(t, s, e) {
            if (t && s && e) {
                var i = Math.min(t.toPx(), s / 2, e / 2);
                this.ctx.globalAlpha = 0, this.ctx.fillStyle = "white", this.ctx.beginPath(), this.ctx.arc(-s / 2 + i, -e / 2 + i, i, 1 * Math.PI, 1.5 * Math.PI), 
                this.ctx.lineTo(s / 2 - i, -e / 2), this.ctx.arc(s / 2 - i, -e / 2 + i, i, 1.5 * Math.PI, 2 * Math.PI), 
                this.ctx.lineTo(s / 2, e / 2 - i), this.ctx.arc(s / 2 - i, e / 2 - i, i, 0, .5 * Math.PI), 
                this.ctx.lineTo(-s / 2 + i, e / 2), this.ctx.arc(-s / 2 + i, e / 2 - i, i, .5 * Math.PI, 1 * Math.PI), 
                this.ctx.closePath(), this.ctx.fill(), getApp().systemInfo && getApp().systemInfo.version <= "6.6.6" && "ios" === getApp().systemInfo.platform || this.ctx.clip(), 
                this.ctx.globalAlpha = 1;
            }
        }
    }, {
        key: "_doBorder",
        value: function(t, s, e) {
            if (t.css) {
                var i = t.css, h = i.borderRadius, c = i.borderWidth, a = i.borderColor;
                if (c) {
                    var r;
                    this.ctx.save(), this._preProcess(t, !0), r = h ? Math.min(h.toPx(), s / 2, e / 2) : 0;
                    var o = c.toPx();
                    this.ctx.lineWidth = o, this.ctx.strokeStyle = a || "black", this.ctx.beginPath(), 
                    this.ctx.arc(-s / 2 + r, -e / 2 + r, r + o / 2, 1 * Math.PI, 1.5 * Math.PI), this.ctx.lineTo(s / 2 - r, -e / 2 - o / 2), 
                    this.ctx.arc(s / 2 - r, -e / 2 + r, r + o / 2, 1.5 * Math.PI, 2 * Math.PI), this.ctx.lineTo(s / 2 + o / 2, e / 2 - r), 
                    this.ctx.arc(s / 2 - r, e / 2 - r, r + o / 2, 0, .5 * Math.PI), this.ctx.lineTo(-s / 2 + r, e / 2 + o / 2), 
                    this.ctx.arc(-s / 2 + r, e / 2 - r, r + o / 2, .5 * Math.PI, 1 * Math.PI), this.ctx.closePath(), 
                    this.ctx.stroke(), this.ctx.restore();
                }
            }
        }
    }, {
        key: "_preProcess",
        value: function(t, s) {
            var e, i, h, c, a = 0;
            switch (t.type) {
              case "text":
                for (var r = t.text.split("\n"), o = 0; o < r.length; ++o) "" === r[o] && (r[o] = " ");
                var l = "bold" === t.css.fontWeight ? "bold" : "normal";
                t.css.fontSize = t.css.fontSize ? t.css.fontSize : "20rpx", this.ctx.font = "normal ".concat(l, " ").concat(t.css.fontSize.toPx(), "px ").concat(t.css.fontFamily ? t.css.fontFamily : "sans-serif");
                for (var n = 0, x = [], d = 0; d < r.length; ++d) {
                    var g = this.ctx.measureText(r[d]).width, f = t.css.width ? t.css.width.toPx() : g, u = Math.ceil(g / f);
                    a = f > a ? f : a, n += u, x[d] = u;
                }
                n = t.css.maxLines < n ? t.css.maxLines : n;
                var b = t.css.lineHeight ? t.css.lineHeight.toPx() : t.css.fontSize.toPx();
                e = b * n, i = {
                    lines: n,
                    lineHeight: b,
                    textArray: r,
                    linesArray: x
                };
                break;

              case "image":
                var P = getApp().systemInfo.pixelRatio ? getApp().systemInfo.pixelRatio : 2;
                t.css && (t.css.width || (t.css.width = "auto"), t.css.height || (t.css.height = "auto")), 
                !t.css || "auto" === t.css.width && "auto" === t.css.height ? (a = Math.round(t.sWidth / P), 
                e = Math.round(t.sHeight / P)) : "auto" === t.css.width ? (e = t.css.height.toPx(), 
                a = t.sWidth / t.sHeight * e) : "auto" === t.css.height ? (a = t.css.width.toPx(), 
                e = t.sHeight / t.sWidth * a) : (a = t.css.width.toPx(), e = t.css.height.toPx());
                break;

              default:
                if (!t.css.width || !t.css.height) return void console.error("You should set width and height");
                a = t.css.width.toPx(), e = t.css.height.toPx();
            }
            if (t.css && t.css.right) if ("string" == typeof t.css.right) h = this.style.width - t.css.right.toPx(!0); else {
                var v = t.css.right;
                h = this.style.width - v[0].toPx(!0) - this.globalWidth[v[1]] * (v[2] || 1);
            } else if (t.css && t.css.left) if ("string" == typeof t.css.left) h = t.css.left.toPx(!0); else {
                var p = t.css.left;
                h = p[0].toPx(!0) + this.globalWidth[p[1]] * (p[2] || 1);
            } else h = 0;
            if (t.css && t.css.bottom) c = this.style.height - e - t.css.bottom.toPx(!0); else if (t.css && t.css.top) if ("string" == typeof t.css.top) c = t.css.top.toPx(!0); else {
                var w = t.css.top;
                c = w[0].toPx(!0) + this.globalHeight[w[1]] * (w[2] || 1);
            } else c = 0;
            var y = t.css && t.css.rotate ? this._getAngle(t.css.rotate) : 0;
            switch (t.css && t.css.align ? t.css.align : t.css && t.css.right ? "right" : "left") {
              case "center":
                this.ctx.translate(h, c + e / 2);
                break;

              case "right":
                this.ctx.translate(h - a / 2, c + e / 2);
                break;

              default:
                this.ctx.translate(h + a / 2, c + e / 2);
            }
            return this.ctx.rotate(y), !s && t.css && t.css.borderRadius && "rect" !== t.type && this._doClip(t.css.borderRadius, a, e), 
            this._doShadow(t), t.id && (this.globalWidth[t.id] = a, this.globalHeight[t.id] = e), 
            {
                width: a,
                height: e,
                x: h,
                y: c,
                extra: i
            };
        }
    }, {
        key: "_doBackground",
        value: function(t) {
            this.ctx.save();
            var s = this._preProcess(t, !0), e = s.width, i = s.height, h = t.css, a = h.background, r = h.padding, o = [ 0, 0, 0, 0 ];
            if (r) {
                var l = r.split(/\s+/);
                if (1 === l.length) {
                    var n = l[0].toPx();
                    o = [ n, n, n, n ];
                }
                if (2 === l.length) {
                    var x = l[0].toPx(), d = l[1].toPx();
                    o = [ x, d, x, d ];
                }
                if (3 === l.length) {
                    var g = l[0].toPx(), f = l[1].toPx();
                    o = [ g, f, l[2].toPx(), f ];
                }
                if (4 === l.length) o = [ l[0].toPx(), l[1].toPx(), l[2].toPx(), l[3].toPx() ];
            }
            var u = e + o[1] + o[3], b = i + o[0] + o[2];
            this._doClip(t.css.borderRadius, u, b), c.api.isGradient(a) ? c.api.doGradient(a, u, b, this.ctx) : this.ctx.fillStyle = a, 
            this.ctx.fillRect(-u / 2, -b / 2, u, b), this.ctx.restore();
        }
    }, {
        key: "_drawQRCode",
        value: function(t) {
            this.ctx.save();
            var s = this._preProcess(t), e = s.width, i = s.height;
            h.api.draw(t.content, this.ctx, -e / 2, -i / 2, e, i, t.css.background, t.css.color), 
            this.ctx.restore(), this._doBorder(t, e, i);
        }
    }, {
        key: "_drawAbsImage",
        value: function(t) {
            if (t.url) {
                this.ctx.save();
                var s = this._preProcess(t), e = s.width, i = s.height, h = t.sWidth, c = t.sHeight, a = 0, r = 0, o = e / i;
                o >= t.sWidth / t.sHeight ? (c = h / o, r = Math.round((t.sHeight - c) / 2)) : (h = c * o, 
                a = Math.round((t.sWidth - h) / 2)), t.css && "scaleToFill" === t.css.mode ? this.ctx.drawImage(t.url, -e / 2, -i / 2, e, i) : this.ctx.drawImage(t.url, a, r, h, c, -e / 2, -i / 2, e, i), 
                this.ctx.restore(), this._doBorder(t, e, i);
            }
        }
    }, {
        key: "_fillAbsText",
        value: function(t) {
            if (t.text) {
                t.css.background && this._doBackground(t), this.ctx.save();
                var s = this._preProcess(t, t.css.background && t.css.borderRadius), e = s.width, i = s.height, h = s.extra;
                this.ctx.fillStyle = t.css.color || "black";
                var c = h.lines, a = h.lineHeight, r = h.textArray, o = h.linesArray;
                if (t.id) {
                    for (var l = 0, n = 0; n < r.length; ++n) l = this.ctx.measureText(r[n]).width > l ? this.ctx.measureText(r[n]).width : l;
                    this.globalWidth[t.id] = e ? l < e ? l : e : l;
                }
                for (var x = 0, d = 0; d < r.length; ++d) for (var g = Math.round(r[d].length / o[d]), f = 0, u = 0, b = 0; b < o[d] && !(x >= c); ++b) {
                    u = g;
                    for (var P = r[d].substr(f, u), v = this.ctx.measureText(P).width; f + u <= r[d].length && (e - v > t.css.fontSize.toPx() || v > e); ) {
                        if (v < e) P = r[d].substr(f, ++u); else {
                            if (P.length <= 1) break;
                            P = r[d].substr(f, --u);
                        }
                        v = this.ctx.measureText(P).width;
                    }
                    if (f += P.length, x === c - 1 && (d < r.length - 1 || f < r[d].length)) {
                        for (;this.ctx.measureText("".concat(P, "...")).width > e && !(P.length <= 1); ) P = P.substring(0, P.length - 1);
                        P += "...", v = this.ctx.measureText(P).width;
                    }
                    this.ctx.setTextAlign(t.css.textAlign ? t.css.textAlign : "left");
                    var p = void 0;
                    switch (t.css.textAlign) {
                      case "center":
                        p = 0;
                        break;

                      case "right":
                        p = e / 2;
                        break;

                      default:
                        p = -e / 2;
                    }
                    var w = -i / 2 + (0 === x ? t.css.fontSize.toPx() : t.css.fontSize.toPx() + x * a);
                    x++, "stroke" === t.css.textStyle ? this.ctx.strokeText(P, p, w, v) : this.ctx.fillText(P, p, w, v);
                    var y = t.css.fontSize.toPx();
                    t.css.textDecoration && (this.ctx.beginPath(), /\bunderline\b/.test(t.css.textDecoration) && (this.ctx.moveTo(p, w), 
                    this.ctx.lineTo(p + v, w)), /\boverline\b/.test(t.css.textDecoration) && (this.ctx.moveTo(p, w - y), 
                    this.ctx.lineTo(p + v, w - y)), /\bline-through\b/.test(t.css.textDecoration) && (this.ctx.moveTo(p, w - y / 3), 
                    this.ctx.lineTo(p + v, w - y / 3)), this.ctx.closePath(), this.ctx.strokeStyle = t.css.color, 
                    this.ctx.stroke());
                }
                this.ctx.restore(), this._doBorder(t, e, i);
            }
        }
    }, {
        key: "_drawAbsRect",
        value: function(t) {
            this.ctx.save();
            var s = this._preProcess(t), e = s.width, i = s.height;
            c.api.isGradient(t.css.color) ? c.api.doGradient(t.css.color, e, i, this.ctx) : this.ctx.fillStyle = t.css.color;
            var h = t.css.borderRadius, a = h ? Math.min(h.toPx(), e / 2, i / 2) : 0;
            this.ctx.beginPath(), this.ctx.arc(-e / 2 + a, -i / 2 + a, a, 1 * Math.PI, 1.5 * Math.PI), 
            this.ctx.lineTo(e / 2 - a, -i / 2), this.ctx.arc(e / 2 - a, -i / 2 + a, a, 1.5 * Math.PI, 2 * Math.PI), 
            this.ctx.lineTo(e / 2, i / 2 - a), this.ctx.arc(e / 2 - a, i / 2 - a, a, 0, .5 * Math.PI), 
            this.ctx.lineTo(-e / 2 + a, i / 2), this.ctx.arc(-e / 2 + a, i / 2 - a, a, .5 * Math.PI, 1 * Math.PI), 
            this.ctx.closePath(), this.ctx.fill(), this.ctx.restore(), this._doBorder(t, e, i);
        }
    }, {
        key: "_doShadow",
        value: function(t) {
            if (t.css && t.css.shadow) {
                var s = t.css.shadow.replace(/,\s+/g, ",").split(" ");
                s.length > 4 ? console.error("shadow don't spread option") : (this.ctx.shadowOffsetX = parseInt(s[0], 10), 
                this.ctx.shadowOffsetY = parseInt(s[1], 10), this.ctx.shadowBlur = parseInt(s[2], 10), 
                this.ctx.shadowColor = s[3]);
            }
        }
    }, {
        key: "_getAngle",
        value: function(t) {
            return Number(t) * Math.PI / 180;
        }
    } ]), a;
}();

exports.default = a;