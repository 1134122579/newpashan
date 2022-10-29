var t = require("../@babel/runtime/helpers/typeof");

module.exports = function(t) {
    function e(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
    }
    var n = {};
    return e.m = t, e.c = n, e.d = function(t, n, r) {
        e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: r
        });
    }, e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(n, "a", n), n;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 18);
}([ function(e, n, r) {
    (function(o) {
        function i() {
            var t;
            try {
                t = n.storage.debug;
            } catch (t) {}
            return !t && void 0 !== o && "env" in o && (t = o.env.DEBUG), t;
        }
        (n = e.exports = r(22)).log = function() {
            return "object" == ("undefined" == typeof console ? "undefined" : t(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
        }, n.formatArgs = function(t) {
            var e = this.useColors;
            if (t[0] = (e ? "%c" : "") + this.namespace + (e ? " %c" : " ") + t[0] + (e ? "%c " : " ") + "+" + n.humanize(this.diff), 
            e) {
                var r = "color: " + this.color;
                t.splice(1, 0, r, "color: inherit");
                var o = 0, i = 0;
                t[0].replace(/%[a-zA-Z%]/g, function(t) {
                    "%%" !== t && (o++, "%c" === t && (i = o));
                }), t.splice(i, 0, r);
            }
        }, n.save = function(t) {
            try {
                null == t ? n.storage.removeItem("debug") : n.storage.debug = t;
            } catch (t) {}
        }, n.load = i, n.useColors = function() {
            return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
        }, n.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage;
            } catch (t) {}
        }(), n.colors = [ "lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson" ], 
        n.formatters.j = function(t) {
            try {
                return JSON.stringify(t);
            } catch (t) {
                return "[UnexpectedJSONParseError]: " + t.message;
            }
        }, n.enable(i());
    }).call(n, r(21));
}, function(e, n) {
    var r;
    r = function() {
        return this;
    }();
    try {
        r = r || Function("return this")() || (0, eval)("this");
    } catch (e) {
        "object" == ("undefined" == typeof window ? "undefined" : t(window)) && (r = window);
    }
    e.exports = r;
}, function(t, e, n) {
    function r(t) {
        if (t) return function(t) {
            for (var e in r.prototype) t[e] = r.prototype[e];
            return t;
        }(t);
    }
    t.exports = r, r.prototype.on = r.prototype.addEventListener = function(t, e) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), 
        this;
    }, r.prototype.once = function(t, e) {
        function n() {
            this.off(t, n), e.apply(this, arguments);
        }
        return n.fn = e, this.on(t, n), this;
    }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(t, e) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, 
        this;
        var n = this._callbacks["$" + t];
        if (!n) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + t], this;
        for (var r, o = 0; o < n.length; o++) if ((r = n[o]) === e || r.fn === e) {
            n.splice(o, 1);
            break;
        }
        return this;
    }, r.prototype.emit = function(t) {
        this._callbacks = this._callbacks || {};
        var e = [].slice.call(arguments, 1), n = this._callbacks["$" + t];
        if (n) for (var r = 0, o = (n = n.slice(0)).length; r < o; ++r) n[r].apply(this, e);
        return this;
    }, r.prototype.listeners = function(t) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
    }, r.prototype.hasListeners = function(t) {
        return !!this.listeners(t).length;
    };
}, function(t, e, n) {
    (function(t) {
        function r(t, e, n) {
            for (var r = new Array(t.length), o = c(t.length, n), i = function(t, n, o) {
                e(n, function(e, n) {
                    r[t] = n, o(e, r);
                });
            }, s = 0; s < t.length; s++) i(s, t[s], o);
        }
        var o, i = n(28), s = n(8), a = n(29), c = n(30), u = n(31);
        t && t.ArrayBuffer && (o = n(33));
        var p = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent), h = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent), f = p || h;
        e.protocol = 3;
        var l = e.packets = {
            open: 0,
            close: 1,
            ping: 2,
            pong: 3,
            message: 4,
            upgrade: 5,
            noop: 6
        }, d = i(l), y = {
            type: "error",
            data: "parser error"
        }, g = n(34);
        e.encodePacket = function(n, r, o, i) {
            "function" == typeof r && (i = r, r = !1), "function" == typeof o && (i = o, o = null);
            var s = void 0 === n.data ? void 0 : n.data.buffer || n.data;
            if (t.ArrayBuffer && s instanceof ArrayBuffer) return function(t, n, r) {
                if (!n) return e.encodeBase64Packet(t, r);
                var o = t.data, i = new Uint8Array(o), s = new Uint8Array(1 + o.byteLength);
                s[0] = l[t.type];
                for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
                return r(s.buffer);
            }(n, r, i);
            if (g && s instanceof t.Blob) return function(t, n, r) {
                if (!n) return e.encodeBase64Packet(t, r);
                if (f) return function(t, n, r) {
                    if (!n) return e.encodeBase64Packet(t, r);
                    var o = new FileReader();
                    return o.onload = function() {
                        t.data = o.result, e.encodePacket(t, n, !0, r);
                    }, o.readAsArrayBuffer(t.data);
                }(t, n, r);
                var o = new Uint8Array(1);
                return o[0] = l[t.type], r(new g([ o.buffer, t.data ]));
            }(n, r, i);
            if (s && s.base64) return function(t, n) {
                return n("b" + e.packets[t.type] + t.data.data);
            }(n, i);
            var a = l[n.type];
            return void 0 !== n.data && (a += o ? u.encode(String(n.data), {
                strict: !1
            }) : String(n.data)), i("" + a);
        }, e.encodeBase64Packet = function(n, r) {
            var o, i = "b" + e.packets[n.type];
            if (g && n.data instanceof t.Blob) {
                var s = new FileReader();
                return s.onload = function() {
                    var t = s.result.split(",")[1];
                    r(i + t);
                }, s.readAsDataURL(n.data);
            }
            try {
                o = String.fromCharCode.apply(null, new Uint8Array(n.data));
            } catch (t) {
                for (var a = new Uint8Array(n.data), c = new Array(a.length), u = 0; u < a.length; u++) c[u] = a[u];
                o = String.fromCharCode.apply(null, c);
            }
            return i += t.btoa(o), r(i);
        }, e.decodePacket = function(t, n, r) {
            if (void 0 === t) return y;
            if ("string" == typeof t) {
                if ("b" === t.charAt(0)) return e.decodeBase64Packet(t.substr(1), n);
                if (r && !1 === (t = function(t) {
                    try {
                        t = u.decode(t, {
                            strict: !1
                        });
                    } catch (t) {
                        return !1;
                    }
                    return t;
                }(t))) return y;
                var o = t.charAt(0);
                return Number(o) == o && d[o] ? t.length > 1 ? {
                    type: d[o],
                    data: t.substring(1)
                } : {
                    type: d[o]
                } : y;
            }
            o = new Uint8Array(t)[0];
            var i = a(t, 1);
            return g && "blob" === n && (i = new g([ i ])), {
                type: d[o],
                data: i
            };
        }, e.decodeBase64Packet = function(t, e) {
            var n = d[t.charAt(0)];
            if (!o) return {
                type: n,
                data: {
                    base64: !0,
                    data: t.substr(1)
                }
            };
            var r = o.decode(t.substr(1));
            return "blob" === e && g && (r = new g([ r ])), {
                type: n,
                data: r
            };
        }, e.encodePayload = function(t, n, o) {
            "function" == typeof n && (o = n, n = null);
            var i = s(t);
            return n && i ? g && !f ? e.encodePayloadAsBlob(t, o) : e.encodePayloadAsArrayBuffer(t, o) : t.length ? void r(t, function(t, r) {
                e.encodePacket(t, !!i && n, !1, function(t) {
                    r(null, function(t) {
                        return t.length + ":" + t;
                    }(t));
                });
            }, function(t, e) {
                return o(e.join(""));
            }) : o("0:");
        }, e.decodePayload = function(t, n, r) {
            if ("string" != typeof t) return e.decodePayloadAsBinary(t, n, r);
            var o;
            if ("function" == typeof n && (r = n, n = null), "" === t) return r(y, 0, 1);
            for (var i, s, a = "", c = 0, u = t.length; c < u; c++) {
                var p = t.charAt(c);
                if (":" === p) {
                    if ("" === a || a != (i = Number(a))) return r(y, 0, 1);
                    if (a != (s = t.substr(c + 1, i)).length) return r(y, 0, 1);
                    if (s.length) {
                        if (o = e.decodePacket(s, n, !1), y.type === o.type && y.data === o.data) return r(y, 0, 1);
                        if (!1 === r(o, c + i, u)) return;
                    }
                    c += i, a = "";
                } else a += p;
            }
            return "" !== a ? r(y, 0, 1) : void 0;
        }, e.encodePayloadAsArrayBuffer = function(t, n) {
            if (!t.length) return n(new ArrayBuffer(0));
            r(t, function(t, n) {
                e.encodePacket(t, !0, !0, function(t) {
                    return n(null, t);
                });
            }, function(t, e) {
                var r = e.reduce(function(t, e) {
                    var n;
                    return t + (n = "string" == typeof e ? e.length : e.byteLength).toString().length + n + 2;
                }, 0), o = new Uint8Array(r), i = 0;
                return e.forEach(function(t) {
                    var e = "string" == typeof t, n = t;
                    if (e) {
                        for (var r = new Uint8Array(t.length), s = 0; s < t.length; s++) r[s] = t.charCodeAt(s);
                        n = r.buffer;
                    }
                    o[i++] = e ? 0 : 1;
                    var a = n.byteLength.toString();
                    for (s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
                    for (o[i++] = 255, r = new Uint8Array(n), s = 0; s < r.length; s++) o[i++] = r[s];
                }), n(o.buffer);
            });
        }, e.encodePayloadAsBlob = function(t, n) {
            r(t, function(t, n) {
                e.encodePacket(t, !0, !0, function(t) {
                    var e = new Uint8Array(1);
                    if (e[0] = 1, "string" == typeof t) {
                        for (var r = new Uint8Array(t.length), o = 0; o < t.length; o++) r[o] = t.charCodeAt(o);
                        t = r.buffer, e[0] = 0;
                    }
                    var i = (t instanceof ArrayBuffer ? t.byteLength : t.size).toString(), s = new Uint8Array(i.length + 1);
                    for (o = 0; o < i.length; o++) s[o] = parseInt(i[o]);
                    if (s[i.length] = 255, g) {
                        var a = new g([ e.buffer, s.buffer, t ]);
                        n(null, a);
                    }
                });
            }, function(t, e) {
                return n(new g(e));
            });
        }, e.decodePayloadAsBinary = function(t, n, r) {
            "function" == typeof n && (r = n, n = null);
            for (var o = t, i = []; o.byteLength > 0; ) {
                for (var s = new Uint8Array(o), c = 0 === s[0], u = "", p = 1; 255 !== s[p]; p++) {
                    if (u.length > 310) return r(y, 0, 1);
                    u += s[p];
                }
                o = a(o, 2 + u.length), u = parseInt(u);
                var h = a(o, 0, u);
                if (c) try {
                    h = String.fromCharCode.apply(null, new Uint8Array(h));
                } catch (t) {
                    var f = new Uint8Array(h);
                    for (h = "", p = 0; p < f.length; p++) h += String.fromCharCode(f[p]);
                }
                i.push(h), o = a(o, u);
            }
            var l = i.length;
            i.forEach(function(t, o) {
                r(e.decodePacket(t, n, !0), o, l);
            });
        };
    }).call(e, n(1));
}, function(t, e, n) {
    function r() {
        return "undefined" != typeof my;
    }
    function o(t) {
        return "string" == typeof t;
    }
    function i(t) {
        return "[Object array]" === Object.prototype.toString.call(t);
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = r() ? my : wx, a = "undefined" == typeof DOMException ? Error : DOMException;
    e.default = {
        isString: o,
        isArray: i,
        DOMExceptionError: a,
        isMy: r,
        apis: s
    }, e.isString = o, e.isArray = i, e.DOMExceptionError = a, e.isMy = r, e.apis = s;
}, function(t, e, n) {
    function r() {}
    function o(t) {
        var n = "" + t.type;
        return e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type || (n += t.attachments + "-"), 
        t.nsp && "/" !== t.nsp && (n += t.nsp + ","), null != t.id && (n += t.id), null != t.data && (n += JSON.stringify(t.data)), 
        c("encoded %j as %s", t, n), n;
    }
    function i() {
        this.reconstructor = null;
    }
    function s(t) {
        this.reconPack = t, this.buffers = [];
    }
    function a() {
        return {
            type: e.ERROR,
            data: "parser error"
        };
    }
    var c = n(0)("socket.io-parser"), u = n(2), p = n(8), h = n(24), f = n(10);
    e.protocol = 4, e.types = [ "CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK" ], 
    e.CONNECT = 0, e.DISCONNECT = 1, e.EVENT = 2, e.ACK = 3, e.ERROR = 4, e.BINARY_EVENT = 5, 
    e.BINARY_ACK = 6, e.Encoder = r, e.Decoder = i, r.prototype.encode = function(t, n) {
        t.type !== e.EVENT && t.type !== e.ACK || !p(t.data) || (t.type = t.type === e.EVENT ? e.BINARY_EVENT : e.BINARY_ACK), 
        c("encoding packet %j", t), e.BINARY_EVENT === t.type || e.BINARY_ACK === t.type ? function(t, e) {
            h.removeBlobs(t, function(t) {
                var n = h.deconstructPacket(t), r = o(n.packet), i = n.buffers;
                i.unshift(r), e(i);
            });
        }(t, n) : n([ o(t) ]);
    }, u(i.prototype), i.prototype.add = function(t) {
        var n;
        if ("string" == typeof t) n = function(t) {
            var n = 0, r = {
                type: Number(t.charAt(0))
            };
            if (null == e.types[r.type]) return a();
            if (e.BINARY_EVENT === r.type || e.BINARY_ACK === r.type) {
                for (var o = ""; "-" !== t.charAt(++n) && (o += t.charAt(n), n != t.length); ) ;
                if (o != Number(o) || "-" !== t.charAt(n)) throw new Error("Illegal attachments");
                r.attachments = Number(o);
            }
            if ("/" === t.charAt(n + 1)) for (r.nsp = ""; ++n && "," !== (s = t.charAt(n)) && (r.nsp += s, 
            n !== t.length); ) ; else r.nsp = "/";
            var i = t.charAt(n + 1);
            if ("" !== i && Number(i) == i) {
                for (r.id = ""; ++n; ) {
                    var s;
                    if (null == (s = t.charAt(n)) || Number(s) != s) {
                        --n;
                        break;
                    }
                    if (r.id += t.charAt(n), n === t.length) break;
                }
                r.id = Number(r.id);
            }
            return t.charAt(++n) && (r = function(t, e) {
                try {
                    t.data = JSON.parse(e);
                } catch (t) {
                    return a();
                }
                return t;
            }(r, t.substr(n))), c("decoded %s as %j", t, r), r;
        }(t), e.BINARY_EVENT === n.type || e.BINARY_ACK === n.type ? (this.reconstructor = new s(n), 
        0 === this.reconstructor.reconPack.attachments && this.emit("decoded", n)) : this.emit("decoded", n); else {
            if (!f(t) && !t.base64) throw new Error("Unknown type: " + t);
            if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
            (n = this.reconstructor.takeBinaryData(t)) && (this.reconstructor = null, this.emit("decoded", n));
        }
    }, i.prototype.destroy = function() {
        this.reconstructor && this.reconstructor.finishedReconstruction();
    }, s.prototype.takeBinaryData = function(t) {
        if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) {
            var e = h.reconstructPacket(this.reconPack, this.buffers);
            return this.finishedReconstruction(), e;
        }
        return null;
    }, s.prototype.finishedReconstruction = function() {
        this.reconPack = null, this.buffers = [];
    };
}, function(t, e) {
    e.encode = function(t) {
        var e = "";
        for (var n in t) t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
        return e;
    }, e.decode = function(t) {
        for (var e = {}, n = t.split("&"), r = 0, o = n.length; r < o; r++) {
            var i = n[r].split("=");
            e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
        }
        return e;
    };
}, function(t, e) {
    var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, r = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ];
    t.exports = function(t) {
        var e = t, o = t.indexOf("["), i = t.indexOf("]");
        -1 != o && -1 != i && (t = t.substring(0, o) + t.substring(o, i).replace(/:/g, ";") + t.substring(i, t.length));
        for (var s = n.exec(t || ""), a = {}, c = 14; c--; ) a[r[c]] = s[c] || "";
        return -1 != o && -1 != i && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), 
        a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), 
        a.ipv6uri = !0), a;
    };
}, function(e, n, r) {
    (function(n) {
        var o = r(9), i = Object.prototype.toString, s = "function" == typeof n.Blob || "[object BlobConstructor]" === i.call(n.Blob), a = "function" == typeof n.File || "[object FileConstructor]" === i.call(n.File);
        e.exports = function e(r) {
            if (!r || "object" != t(r)) return !1;
            if (o(r)) {
                for (var i = 0, c = r.length; i < c; i++) if (e(r[i])) return !0;
                return !1;
            }
            if ("function" == typeof n.Buffer && n.Buffer.isBuffer && n.Buffer.isBuffer(r) || "function" == typeof n.ArrayBuffer && r instanceof ArrayBuffer || s && r instanceof Blob || a && r instanceof File) return !0;
            if (r.toJSON && "function" == typeof r.toJSON && 1 === arguments.length) return e(r.toJSON(), !0);
            for (var u in r) if (Object.prototype.hasOwnProperty.call(r, u) && e(r[u])) return !0;
            return !1;
        };
    }).call(n, r(1));
}, function(t, e) {
    var n = {}.toString;
    t.exports = Array.isArray || function(t) {
        return "[object Array]" == n.call(t);
    };
}, function(t, e, n) {
    (function(e) {
        t.exports = function(t) {
            return e.Buffer && e.Buffer.isBuffer(t) || e.ArrayBuffer && t instanceof ArrayBuffer;
        };
    }).call(e, n(1));
}, function(e, n, r) {
    function o(e, n) {
        if (!(this instanceof o)) return new o(e, n);
        e && "object" == t(e) && (n = e, e = void 0), (n = n || {}).path = n.path || "/socket.io", 
        this.nsps = {}, this.subs = [], this.opts = n, this.reconnection(!1 !== n.reconnection), 
        this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), 
        this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor(n.randomizationFactor || .5), 
        this.backoff = new l({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        }), this.timeout(null == n.timeout ? 2e4 : n.timeout), this.readyState = "closed", 
        this.uri = e, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [];
        var r = n.parser || c;
        this.encoder = new r.Encoder(), this.decoder = new r.Decoder(), this.autoConnect = !1 !== n.autoConnect, 
        this.autoConnect && this.open();
    }
    var i = r(25), s = r(15), a = r(2), c = r(5), u = r(16), p = r(17), h = r(0)("socket.io-client:manager"), f = r(14), l = r(42), d = Object.prototype.hasOwnProperty;
    e.exports = o, o.prototype.emitAll = function() {
        for (var t in this.emit.apply(this, arguments), this.nsps) d.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments);
    }, o.prototype.updateSocketIds = function() {
        for (var t in this.nsps) d.call(this.nsps, t) && (this.nsps[t].id = this.generateId(t));
    }, o.prototype.generateId = function(t) {
        return ("/" === t ? "" : t + "#") + this.engine.id;
    }, a(o.prototype), o.prototype.reconnection = function(t) {
        return arguments.length ? (this._reconnection = !!t, this) : this._reconnection;
    }, o.prototype.reconnectionAttempts = function(t) {
        return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts;
    }, o.prototype.reconnectionDelay = function(t) {
        return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), 
        this) : this._reconnectionDelay;
    }, o.prototype.randomizationFactor = function(t) {
        return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), 
        this) : this._randomizationFactor;
    }, o.prototype.reconnectionDelayMax = function(t) {
        return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), 
        this) : this._reconnectionDelayMax;
    }, o.prototype.timeout = function(t) {
        return arguments.length ? (this._timeout = t, this) : this._timeout;
    }, o.prototype.maybeReconnectOnOpen = function() {
        !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
    }, o.prototype.open = o.prototype.connect = function(t, e) {
        if (h("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
        h("opening %s", this.uri), this.engine = i(this.uri, this.opts);
        var n = this.engine, r = this;
        this.readyState = "opening", this.skipReconnect = !1;
        var o = u(n, "open", function() {
            r.onopen(), t && t();
        }), s = u(n, "error", function(e) {
            if (h("connect_error"), r.cleanup(), r.readyState = "closed", r.emitAll("connect_error", e), 
            t) {
                var n = new Error("Connection error");
                n.data = e, t(n);
            } else r.maybeReconnectOnOpen();
        });
        if (!1 !== this._timeout) {
            var a = this._timeout;
            h("connect attempt will timeout after %d", a);
            var c = setTimeout(function() {
                h("connect attempt timed out after %d", a), o.destroy(), n.close(), n.emit("error", "timeout"), 
                r.emitAll("connect_timeout", a);
            }, a);
            this.subs.push({
                destroy: function() {
                    clearTimeout(c);
                }
            });
        }
        return this.subs.push(o), this.subs.push(s), this;
    }, o.prototype.onopen = function() {
        h("open"), this.cleanup(), this.readyState = "open", this.emit("open");
        var t = this.engine;
        this.subs.push(u(t, "data", p(this, "ondata"))), this.subs.push(u(t, "ping", p(this, "onping"))), 
        this.subs.push(u(t, "pong", p(this, "onpong"))), this.subs.push(u(t, "error", p(this, "onerror"))), 
        this.subs.push(u(t, "close", p(this, "onclose"))), this.subs.push(u(this.decoder, "decoded", p(this, "ondecoded")));
    }, o.prototype.onping = function() {
        this.lastPing = new Date(), this.emitAll("ping");
    }, o.prototype.onpong = function() {
        this.emitAll("pong", new Date() - this.lastPing);
    }, o.prototype.ondata = function(t) {
        this.decoder.add(t);
    }, o.prototype.ondecoded = function(t) {
        this.emit("packet", t);
    }, o.prototype.onerror = function(t) {
        h("error", t), this.emitAll("error", t);
    }, o.prototype.socket = function(t, e) {
        function n() {
            ~f(o.connecting, r) || o.connecting.push(r);
        }
        var r = this.nsps[t];
        if (!r) {
            r = new s(this, t, e), this.nsps[t] = r;
            var o = this;
            r.on("connecting", n), r.on("connect", function() {
                r.id = o.generateId(t);
            }), this.autoConnect && n();
        }
        return r;
    }, o.prototype.destroy = function(t) {
        var e = f(this.connecting, t);
        ~e && this.connecting.splice(e, 1), this.connecting.length || this.close();
    }, o.prototype.packet = function(t) {
        h("writing packet %j", t);
        var e = this;
        t.query && 0 === t.type && (t.nsp += "?" + t.query), e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0, 
        this.encoder.encode(t, function(n) {
            for (var r = 0; r < n.length; r++) e.engine.write(n[r], t.options);
            e.encoding = !1, e.processPacketQueue();
        }));
    }, o.prototype.processPacketQueue = function() {
        if (this.packetBuffer.length > 0 && !this.encoding) {
            var t = this.packetBuffer.shift();
            this.packet(t);
        }
    }, o.prototype.cleanup = function() {
        h("cleanup");
        for (var t = this.subs.length, e = 0; e < t; e++) this.subs.shift().destroy();
        this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy();
    }, o.prototype.close = o.prototype.disconnect = function() {
        h("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), 
        this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close();
    }, o.prototype.onclose = function(t) {
        h("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", 
        this.emit("close", t), this._reconnection && !this.skipReconnect && this.reconnect();
    }, o.prototype.reconnect = function() {
        if (this.reconnecting || this.skipReconnect) return this;
        var t = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) h("reconnect failed"), 
        this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1; else {
            var e = this.backoff.duration();
            h("will wait %dms before reconnect attempt", e), this.reconnecting = !0;
            var n = setTimeout(function() {
                t.skipReconnect || (h("attempting reconnect"), t.emitAll("reconnect_attempt", t.backoff.attempts), 
                t.emitAll("reconnecting", t.backoff.attempts), t.skipReconnect || t.open(function(e) {
                    e ? (h("reconnect attempt error"), t.reconnecting = !1, t.reconnect(), t.emitAll("reconnect_error", e.data)) : (h("reconnect success"), 
                    t.onreconnect());
                }));
            }, e);
            this.subs.push({
                destroy: function() {
                    clearTimeout(n);
                }
            });
        }
    }, o.prototype.onreconnect = function() {
        var t = this.backoff.attempts;
        this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t);
    };
}, function(t, e, n) {
    var r = n(27);
    e.websocket = r;
}, function(t, e, n) {
    function r(t) {
        this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, 
        this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, 
        this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, 
        this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, 
        this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, 
        this.forceNode = t.forceNode, this.extraHeaders = t.extraHeaders, this.localAddress = t.localAddress;
    }
    var o = n(3), i = n(2);
    t.exports = r, i(r.prototype), r.prototype.onError = function(t, e) {
        var n = new Error(t);
        return n.type = "TransportError", n.description = e, this.emit("error", n), this;
    }, r.prototype.open = function() {
        return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", 
        this.doOpen()), this;
    }, r.prototype.close = function() {
        return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), 
        this.onClose()), this;
    }, r.prototype.send = function(t) {
        if ("open" !== this.readyState) throw new Error("Transport not open");
        this.write(t);
    }, r.prototype.onOpen = function() {
        this.readyState = "open", this.writable = !0, this.emit("open");
    }, r.prototype.onData = function(t) {
        var e = o.decodePacket(t, this.socket.binaryType);
        this.onPacket(e);
    }, r.prototype.onPacket = function(t) {
        this.emit("packet", t);
    }, r.prototype.onClose = function() {
        this.readyState = "closed", this.emit("close");
    };
}, function(t, e) {
    var n = [].indexOf;
    t.exports = function(t, e) {
        if (n) return t.indexOf(e);
        for (var r = 0; r < t.length; ++r) if (t[r] === e) return r;
        return -1;
    };
}, function(e, n, r) {
    function o(t, e, n) {
        this.io = t, this.nsp = e, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], 
        this.sendBuffer = [], this.connected = !1, this.disconnected = !0, n && n.query && (this.query = n.query), 
        this.io.autoConnect && this.open();
    }
    var i = r(5), s = r(2), a = r(41), c = r(16), u = r(17), p = r(0)("socket.io-client:socket"), h = r(6);
    e.exports = o;
    var f = {
        connect: 1,
        connect_error: 1,
        connect_timeout: 1,
        connecting: 1,
        disconnect: 1,
        error: 1,
        reconnect: 1,
        reconnect_attempt: 1,
        reconnect_failed: 1,
        reconnect_error: 1,
        reconnecting: 1,
        ping: 1,
        pong: 1
    }, l = s.prototype.emit;
    s(o.prototype), o.prototype.subEvents = function() {
        if (!this.subs) {
            var t = this.io;
            this.subs = [ c(t, "open", u(this, "onopen")), c(t, "packet", u(this, "onpacket")), c(t, "close", u(this, "onclose")) ];
        }
    }, o.prototype.open = o.prototype.connect = function() {
        return this.connected || (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), 
        this.emit("connecting")), this;
    }, o.prototype.send = function() {
        var t = a(arguments);
        return t.unshift("message"), this.emit.apply(this, t), this;
    }, o.prototype.emit = function(t) {
        if (f.hasOwnProperty(t)) return l.apply(this, arguments), this;
        var e = a(arguments), n = {
            type: i.EVENT,
            data: e,
            options: {}
        };
        return n.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof e[e.length - 1] && (p("emitting packet with ack id %d", this.ids), 
        this.acks[this.ids] = e.pop(), n.id = this.ids++), this.connected ? this.packet(n) : this.sendBuffer.push(n), 
        delete this.flags, this;
    }, o.prototype.packet = function(t) {
        t.nsp = this.nsp, this.io.packet(t);
    }, o.prototype.onopen = function() {
        if (p("transport is open - connecting"), "/" !== this.nsp) if (this.query) {
            var e = "object" == t(this.query) ? h.encode(this.query) : this.query;
            p("sending connect packet with query %s", e), this.packet({
                type: i.CONNECT,
                query: e
            });
        } else this.packet({
            type: i.CONNECT
        });
    }, o.prototype.onclose = function(t) {
        p("close (%s)", t), this.connected = !1, this.disconnected = !0, delete this.id, 
        this.emit("disconnect", t);
    }, o.prototype.onpacket = function(t) {
        if (t.nsp === this.nsp) switch (t.type) {
          case i.CONNECT:
            this.onconnect();
            break;

          case i.EVENT:
          case i.BINARY_EVENT:
            this.onevent(t);
            break;

          case i.ACK:
          case i.BINARY_ACK:
            this.onack(t);
            break;

          case i.DISCONNECT:
            this.ondisconnect();
            break;

          case i.ERROR:
            this.emit("error", t.data);
        }
    }, o.prototype.onevent = function(t) {
        var e = t.data || [];
        p("emitting event %j", e), null != t.id && (p("attaching ack callback to event"), 
        e.push(this.ack(t.id))), this.connected ? l.apply(this, e) : this.receiveBuffer.push(e);
    }, o.prototype.ack = function(t) {
        var e = this, n = !1;
        return function() {
            if (!n) {
                n = !0;
                var r = a(arguments);
                p("sending ack %j", r), e.packet({
                    type: i.ACK,
                    id: t,
                    data: r
                });
            }
        };
    }, o.prototype.onack = function(t) {
        var e = this.acks[t.id];
        "function" == typeof e ? (p("calling ack %s with %j", t.id, t.data), e.apply(this, t.data), 
        delete this.acks[t.id]) : p("bad ack %s", t.id);
    }, o.prototype.onconnect = function() {
        this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered();
    }, o.prototype.emitBuffered = function() {
        var t;
        for (t = 0; t < this.receiveBuffer.length; t++) l.apply(this, this.receiveBuffer[t]);
        for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
        this.sendBuffer = [];
    }, o.prototype.ondisconnect = function() {
        p("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect");
    }, o.prototype.destroy = function() {
        if (this.subs) {
            for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
            this.subs = null;
        }
        this.io.destroy(this);
    }, o.prototype.close = o.prototype.disconnect = function() {
        return this.connected && (p("performing disconnect (%s)", this.nsp), this.packet({
            type: i.DISCONNECT
        })), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
    }, o.prototype.compress = function(t) {
        return this.flags = this.flags || {}, this.flags.compress = t, this;
    };
}, function(t, e) {
    t.exports = function(t, e, n) {
        return t.on(e, n), {
            destroy: function() {
                t.removeListener(e, n);
            }
        };
    };
}, function(t, e) {
    var n = [].slice;
    t.exports = function(t, e) {
        if ("string" == typeof e && (e = t[e]), "function" != typeof e) throw new Error("bind() requires a function");
        var r = n.call(arguments, 2);
        return function() {
            return e.apply(t, r.concat(n.call(arguments)));
        };
    };
}, function(t, e, n) {
    t.exports = n(19);
}, function(e, n, r) {
    function o(e, n) {
        "object" == t(e) && (n = e, e = void 0), n = n || {};
        var r, o = i(e), s = o.source, p = o.id, h = o.path, f = u[p] && h in u[p].nsps;
        return n.forceNew || n["force new connection"] || !1 === n.multiplex || f ? (c("ignoring socket cache for %s", s), 
        r = a(s, n)) : (u[p] || (c("new io instance for %s", s), u[p] = a(s, n)), r = u[p]), 
        o.query && !n.query && (n.query = o.query), r.socket(o.path, n);
    }
    var i = r(20), s = r(5), a = r(11), c = r(0)("socket.io-client");
    e.exports = n = o;
    var u = n.managers = {};
    n.protocol = s.protocol, n.connect = o, n.Manager = r(11), n.Socket = r(15);
}, function(t, e, n) {
    (function(e) {
        var r = n(7), o = n(0)("socket.io-client:url");
        t.exports = function(t, n) {
            var i = t;
            n = n || e.location, null == t && (t = n.protocol + "//" + n.host), "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? n.protocol + t : n.host + t), 
            /^(https?|wss?):\/\//.test(t) || (o("protocol-less url %s", t), t = void 0 !== n ? n.protocol + "//" + t : "https://" + t), 
            o("parse %s", t), i = r(t)), i.port || (/^(http|ws)$/.test(i.protocol) ? i.port = "80" : /^(http|ws)s$/.test(i.protocol) && (i.port = "443")), 
            i.path = i.path || "/";
            var s = -1 !== i.host.indexOf(":") ? "[" + i.host + "]" : i.host;
            return i.id = i.protocol + "://" + s + ":" + i.port, i.href = i.protocol + "://" + s + (n && n.port === i.port ? "" : ":" + i.port), 
            i;
        };
    }).call(e, n(1));
}, function(t, e) {
    function n() {
        throw new Error("setTimeout has not been defined");
    }
    function r() {
        throw new Error("clearTimeout has not been defined");
    }
    function o(t) {
        if (u === setTimeout) return setTimeout(t, 0);
        if ((u === n || !u) && setTimeout) return u = setTimeout, setTimeout(t, 0);
        try {
            return u(t, 0);
        } catch (e) {
            try {
                return u.call(null, t, 0);
            } catch (e) {
                return u.call(this, t, 0);
            }
        }
    }
    function i() {
        d && f && (d = !1, f.length ? l = f.concat(l) : y = -1, l.length && s());
    }
    function s() {
        if (!d) {
            var t = o(i);
            d = !0;
            for (var e = l.length; e; ) {
                for (f = l, l = []; ++y < e; ) f && f[y].run();
                y = -1, e = l.length;
            }
            f = null, d = !1, function(t) {
                if (p === clearTimeout) return clearTimeout(t);
                if ((p === r || !p) && clearTimeout) return p = clearTimeout, clearTimeout(t);
                try {
                    p(t);
                } catch (e) {
                    try {
                        return p.call(null, t);
                    } catch (e) {
                        return p.call(this, t);
                    }
                }
            }(t);
        }
    }
    function a(t, e) {
        this.fun = t, this.array = e;
    }
    function c() {}
    var u, p, h = t.exports = {};
    !function() {
        try {
            u = "function" == typeof setTimeout ? setTimeout : n;
        } catch (t) {
            u = n;
        }
        try {
            p = "function" == typeof clearTimeout ? clearTimeout : r;
        } catch (t) {
            p = r;
        }
    }();
    var f, l = [], d = !1, y = -1;
    h.nextTick = function(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
        l.push(new a(t, e)), 1 !== l.length || d || o(s);
    }, a.prototype.run = function() {
        this.fun.apply(null, this.array);
    }, h.title = "browser", h.browser = !0, h.env = {}, h.argv = [], h.version = "", 
    h.versions = {}, h.on = c, h.addListener = c, h.once = c, h.off = c, h.removeListener = c, 
    h.removeAllListeners = c, h.emit = c, h.prependListener = c, h.prependOnceListener = c, 
    h.listeners = function(t) {
        return [];
    }, h.binding = function(t) {
        throw new Error("process.binding is not supported");
    }, h.cwd = function() {
        return "/";
    }, h.chdir = function(t) {
        throw new Error("process.chdir is not supported");
    }, h.umask = function() {
        return 0;
    };
}, function(t, e, n) {
    function r(t) {
        function n() {
            if (n.enabled) {
                var t = n, r = +new Date(), i = r - (o || r);
                t.diff = i, t.prev = o, t.curr = r, o = r;
                for (var s = new Array(arguments.length), a = 0; a < s.length; a++) s[a] = arguments[a];
                s[0] = e.coerce(s[0]), "string" != typeof s[0] && s.unshift("%O");
                var c = 0;
                s[0] = s[0].replace(/%([a-zA-Z%])/g, function(n, r) {
                    if ("%%" === n) return n;
                    c++;
                    var o = e.formatters[r];
                    if ("function" == typeof o) {
                        var i = s[c];
                        n = o.call(t, i), s.splice(c, 1), c--;
                    }
                    return n;
                }), e.formatArgs.call(t, s), (n.log || e.log || console.log.bind(console)).apply(t, s);
            }
        }
        return n.namespace = t, n.enabled = e.enabled(t), n.useColors = e.useColors(), n.color = function(t) {
            var n, r = 0;
            for (n in t) r = (r << 5) - r + t.charCodeAt(n), r |= 0;
            return e.colors[Math.abs(r) % e.colors.length];
        }(t), "function" == typeof e.init && e.init(n), n;
    }
    var o;
    (e = t.exports = r.debug = r.default = r).coerce = function(t) {
        return t instanceof Error ? t.stack || t.message : t;
    }, e.disable = function() {
        e.enable("");
    }, e.enable = function(t) {
        e.save(t), e.names = [], e.skips = [];
        for (var n = ("string" == typeof t ? t : "").split(/[\s,]+/), r = n.length, o = 0; o < r; o++) n[o] && ("-" === (t = n[o].replace(/\*/g, ".*?"))[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")));
    }, e.enabled = function(t) {
        var n, r;
        for (n = 0, r = e.skips.length; n < r; n++) if (e.skips[n].test(t)) return !1;
        for (n = 0, r = e.names.length; n < r; n++) if (e.names[n].test(t)) return !0;
        return !1;
    }, e.humanize = n(23), e.names = [], e.skips = [], e.formatters = {};
}, function(e, n) {
    function r(t, e, n) {
        if (!(t < e)) return t < 1.5 * e ? Math.floor(t / e) + " " + n : Math.ceil(t / e) + " " + n + "s";
    }
    var o = 1e3, i = 6e4, s = 60 * i, a = 24 * s;
    e.exports = function(e, n) {
        n = n || {};
        var c = t(e);
        if ("string" === c && e.length > 0) return function(t) {
            if (!((t = String(t)).length > 100)) {
                var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
                if (e) {
                    var n = parseFloat(e[1]);
                    switch ((e[2] || "ms").toLowerCase()) {
                      case "years":
                      case "year":
                      case "yrs":
                      case "yr":
                      case "y":
                        return 315576e5 * n;

                      case "days":
                      case "day":
                      case "d":
                        return n * a;

                      case "hours":
                      case "hour":
                      case "hrs":
                      case "hr":
                      case "h":
                        return n * s;

                      case "minutes":
                      case "minute":
                      case "mins":
                      case "min":
                      case "m":
                        return n * i;

                      case "seconds":
                      case "second":
                      case "secs":
                      case "sec":
                      case "s":
                        return n * o;

                      case "milliseconds":
                      case "millisecond":
                      case "msecs":
                      case "msec":
                      case "ms":
                        return n;

                      default:
                        return;
                    }
                }
            }
        }(e);
        if ("number" === c && !1 === isNaN(e)) return n.long ? function(t) {
            return r(t, a, "day") || r(t, s, "hour") || r(t, i, "minute") || r(t, o, "second") || t + " ms";
        }(e) : function(t) {
            return t >= a ? Math.round(t / a) + "d" : t >= s ? Math.round(t / s) + "h" : t >= i ? Math.round(t / i) + "m" : t >= o ? Math.round(t / o) + "s" : t + "ms";
        }(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
    };
}, function(e, n, r) {
    (function(e) {
        var o = r(9), i = r(10), s = Object.prototype.toString, a = "function" == typeof e.Blob || "[object BlobConstructor]" === s.call(e.Blob), c = "function" == typeof e.File || "[object FileConstructor]" === s.call(e.File);
        n.deconstructPacket = function(e) {
            var n = [], r = e.data, s = e;
            return s.data = function e(n, r) {
                if (!n) return n;
                if (i(n)) {
                    var s = {
                        _placeholder: !0,
                        num: r.length
                    };
                    return r.push(n), s;
                }
                if (o(n)) {
                    for (var a = new Array(n.length), c = 0; c < n.length; c++) a[c] = e(n[c], r);
                    return a;
                }
                if ("object" == t(n) && !(n instanceof Date)) {
                    for (var u in a = {}, n) a[u] = e(n[u], r);
                    return a;
                }
                return n;
            }(r, n), s.attachments = n.length, {
                packet: s,
                buffers: n
            };
        }, n.reconstructPacket = function(e, n) {
            return e.data = function e(n, r) {
                if (!n) return n;
                if (n && n._placeholder) return r[n.num];
                if (o(n)) for (var i = 0; i < n.length; i++) n[i] = e(n[i], r); else if ("object" == t(n)) for (var s in n) n[s] = e(n[s], r);
                return n;
            }(e.data, n), e.attachments = void 0, e;
        }, n.removeBlobs = function(e, n) {
            var r = 0, s = e;
            (function e(u, p, h) {
                if (!u) return u;
                if (a && u instanceof Blob || c && u instanceof File) {
                    r++;
                    var f = new FileReader();
                    f.onload = function() {
                        h ? h[p] = this.result : s = this.result, --r || n(s);
                    }, f.readAsArrayBuffer(u);
                } else if (o(u)) for (var l = 0; l < u.length; l++) e(u[l], l, u); else if ("object" == t(u) && !i(u)) for (var d in u) e(u[d], d, u);
            })(s), r || n(s);
        };
    }).call(n, r(1));
}, function(t, e, n) {
    t.exports = n(26), t.exports.parser = n(3);
}, function(e, n, r) {
    (function(n) {
        function o(e, r) {
            if (!(this instanceof o)) return new o(e, r);
            r = r || {}, e && "object" == t(e) && (r = e, e = null), e ? (e = p(e), r.hostname = e.host, 
            r.secure = "https" === e.protocol || "wss" === e.protocol, r.port = e.port, e.query && (r.query = e.query)) : r.host && (r.hostname = p(r.host).host), 
            this.secure = null != r.secure ? r.secure : n.location && "https:" === location.protocol, 
            r.hostname && !r.port && (r.port = this.secure ? "443" : "80"), this.agent = r.agent || !1, 
            this.hostname = r.hostname || (n.location ? location.hostname : "localhost"), this.port = r.port || (n.location && location.port ? location.port : this.secure ? 443 : 80), 
            this.query = r.query || {}, "string" == typeof this.query && (this.query = h.decode(this.query)), 
            this.upgrade = !1 !== r.upgrade, this.path = (r.path || "/engine.io").replace(/\/$/, "") + "/", 
            this.forceJSONP = !!r.forceJSONP, this.jsonp = !1 !== r.jsonp, this.forceBase64 = !!r.forceBase64, 
            this.enablesXDR = !!r.enablesXDR, this.timestampParam = r.timestampParam || "t", 
            this.timestampRequests = r.timestampRequests, this.transports = r.transports || [ "websocket" ], 
            this.transportOptions = r.transportOptions || {}, this.readyState = "", this.writeBuffer = [], 
            this.prevBufferLen = 0, this.policyPort = r.policyPort || 843, this.rememberUpgrade = r.rememberUpgrade || !1, 
            this.binaryType = null, this.onlyBinaryUpgrades = r.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== r.perMessageDeflate && (r.perMessageDeflate || {}), 
            !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), 
            this.pfx = r.pfx || null, this.key = r.key || null, this.passphrase = r.passphrase || null, 
            this.cert = r.cert || null, this.ca = r.ca || null, this.ciphers = r.ciphers || null, 
            this.rejectUnauthorized = void 0 === r.rejectUnauthorized || r.rejectUnauthorized, 
            this.forceNode = !!r.forceNode;
            var i = "object" == t(n) && n;
            i.global === i && (r.extraHeaders && Object.keys(r.extraHeaders).length > 0 && (this.extraHeaders = r.extraHeaders), 
            r.localAddress && (this.localAddress = r.localAddress)), this.id = null, this.upgrades = null, 
            this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, 
            this.pingTimeoutTimer = null, this.open();
        }
        var i = r(12), s = r(2), a = r(0)("engine.io-client:socket"), c = r(14), u = r(3), p = r(7), h = r(6);
        e.exports = o, o.priorWebsocketSuccess = !1, s(o.prototype), o.protocol = u.protocol, 
        o.Socket = o, o.Transport = r(13), o.transports = r(12), o.parser = r(3), o.prototype.createTransport = function(t) {
            a('creating transport "%s"', t);
            var e = function(t) {
                var e = {};
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                return e;
            }(this.query);
            e.EIO = u.protocol, e.transport = t;
            var n = this.transportOptions[t] || {};
            return this.id && (e.sid = this.id), new i[t]({
                query: e,
                socket: this,
                agent: n.agent || this.agent,
                hostname: n.hostname || this.hostname,
                port: n.port || this.port,
                secure: n.secure || this.secure,
                path: n.path || this.path,
                forceJSONP: n.forceJSONP || this.forceJSONP,
                jsonp: n.jsonp || this.jsonp,
                forceBase64: n.forceBase64 || this.forceBase64,
                enablesXDR: n.enablesXDR || this.enablesXDR,
                timestampRequests: n.timestampRequests || this.timestampRequests,
                timestampParam: n.timestampParam || this.timestampParam,
                policyPort: n.policyPort || this.policyPort,
                pfx: n.pfx || this.pfx,
                key: n.key || this.key,
                passphrase: n.passphrase || this.passphrase,
                cert: n.cert || this.cert,
                ca: n.ca || this.ca,
                ciphers: n.ciphers || this.ciphers,
                rejectUnauthorized: n.rejectUnauthorized || this.rejectUnauthorized,
                perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
                extraHeaders: n.extraHeaders || this.extraHeaders,
                forceNode: n.forceNode || this.forceNode,
                localAddress: n.localAddress || this.localAddress,
                requestTimeout: n.requestTimeout || this.requestTimeout,
                protocols: n.protocols || void 0
            });
        }, o.prototype.open = function() {
            var t;
            if (this.rememberUpgrade && o.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) t = "websocket"; else {
                if (0 === this.transports.length) {
                    var e = this;
                    return void setTimeout(function() {
                        e.emit("error", "No transports available");
                    }, 0);
                }
                t = this.transports[0];
            }
            this.readyState = "opening";
            try {
                t = this.createTransport(t);
            } catch (t) {
                return this.transports.shift(), void this.open();
            }
            t.open(), this.setTransport(t);
        }, o.prototype.setTransport = function(t) {
            a("setting transport %s", t.name);
            var e = this;
            this.transport && (a("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), 
            this.transport = t, t.on("drain", function() {
                e.onDrain();
            }).on("packet", function(t) {
                e.onPacket(t);
            }).on("error", function(t) {
                e.onError(t);
            }).on("close", function() {
                e.onClose("transport close");
            });
        }, o.prototype.probe = function(t) {
            function e() {
                if (f.onlyBinaryUpgrades) {
                    var e = !this.supportsBinary && f.transport.supportsBinary;
                    h = h || e;
                }
                h || (a('probe transport "%s" opened', t), p.send([ {
                    type: "ping",
                    data: "probe"
                } ]), p.once("packet", function(e) {
                    if (!h) if ("pong" === e.type && "probe" === e.data) {
                        if (a('probe transport "%s" pong', t), f.upgrading = !0, f.emit("upgrading", p), 
                        !p) return;
                        o.priorWebsocketSuccess = "websocket" === p.name, a('pausing current transport "%s"', f.transport.name), 
                        f.transport.pause(function() {
                            h || "closed" !== f.readyState && (a("changing transport and sending upgrade packet"), 
                            u(), f.setTransport(p), p.send([ {
                                type: "upgrade"
                            } ]), f.emit("upgrade", p), p = null, f.upgrading = !1, f.flush());
                        });
                    } else {
                        a('probe transport "%s" failed', t);
                        var n = new Error("probe error");
                        n.transport = p.name, f.emit("upgradeError", n);
                    }
                }));
            }
            function n() {
                h || (h = !0, u(), p.close(), p = null);
            }
            function r(e) {
                var r = new Error("probe error: " + e);
                r.transport = p.name, n(), a('probe transport "%s" failed because of error: %s', t, e), 
                f.emit("upgradeError", r);
            }
            function i() {
                r("transport closed");
            }
            function s() {
                r("socket closed");
            }
            function c(t) {
                p && t.name !== p.name && (a('"%s" works - aborting "%s"', t.name, p.name), n());
            }
            function u() {
                p.removeListener("open", e), p.removeListener("error", r), p.removeListener("close", i), 
                f.removeListener("close", s), f.removeListener("upgrading", c);
            }
            a('probing transport "%s"', t);
            var p = this.createTransport(t, {
                probe: 1
            }), h = !1, f = this;
            o.priorWebsocketSuccess = !1, p.once("open", e), p.once("error", r), p.once("close", i), 
            this.once("close", s), this.once("upgrading", c), p.open();
        }, o.prototype.onOpen = function() {
            if (a("socket open"), this.readyState = "open", o.priorWebsocketSuccess = "websocket" === this.transport.name, 
            this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
                a("starting upgrade probes");
                for (var t = 0, e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t]);
            }
        }, o.prototype.onPacket = function(t) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (a('socket receive: type "%s", data "%s"', t.type, t.data), 
            this.emit("packet", t), this.emit("heartbeat"), t.type) {
              case "open":
                this.onHandshake(JSON.parse(t.data));
                break;

              case "pong":
                this.setPing(), this.emit("pong");
                break;

              case "error":
                var e = new Error("server error");
                e.code = t.data, this.onError(e);
                break;

              case "message":
                this.emit("data", t.data), this.emit("message", t.data);
            } else a('packet received with socket readyState "%s"', this.readyState);
        }, o.prototype.onHandshake = function(t) {
            this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), 
            this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), 
            "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), 
            this.on("heartbeat", this.onHeartbeat));
        }, o.prototype.onHeartbeat = function(t) {
            clearTimeout(this.pingTimeoutTimer);
            var e = this;
            e.pingTimeoutTimer = setTimeout(function() {
                "closed" !== e.readyState && e.onClose("ping timeout");
            }, t || e.pingInterval + e.pingTimeout);
        }, o.prototype.setPing = function() {
            var t = this;
            clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function() {
                a("writing ping packet - expecting pong within %sms", t.pingTimeout), t.ping(), 
                t.onHeartbeat(t.pingTimeout);
            }, t.pingInterval);
        }, o.prototype.ping = function() {
            var t = this;
            this.sendPacket("ping", function() {
                t.emit("ping");
            });
        }, o.prototype.onDrain = function() {
            this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
        }, o.prototype.flush = function() {
            "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (a("flushing %d packets in socket", this.writeBuffer.length), 
            this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, 
            this.emit("flush"));
        }, o.prototype.write = o.prototype.send = function(t, e, n) {
            return this.sendPacket("message", t, e, n), this;
        }, o.prototype.sendPacket = function(t, e, n, r) {
            if ("function" == typeof e && (r = e, e = void 0), "function" == typeof n && (r = n, 
            n = null), "closing" !== this.readyState && "closed" !== this.readyState) {
                (n = n || {}).compress = !1 !== n.compress;
                var o = {
                    type: t,
                    data: e,
                    options: n
                };
                this.emit("packetCreate", o), this.writeBuffer.push(o), r && this.once("flush", r), 
                this.flush();
            }
        }, o.prototype.close = function() {
            function t() {
                r.onClose("forced close"), a("socket closing - telling transport to close"), r.transport.close();
            }
            function e() {
                r.removeListener("upgrade", e), r.removeListener("upgradeError", e), t();
            }
            function n() {
                r.once("upgrade", e), r.once("upgradeError", e);
            }
            if ("opening" === this.readyState || "open" === this.readyState) {
                this.readyState = "closing";
                var r = this;
                this.writeBuffer.length ? this.once("drain", function() {
                    this.upgrading ? n() : t();
                }) : this.upgrading ? n() : t();
            }
            return this;
        }, o.prototype.onError = function(t) {
            a("socket error %j", t), o.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t);
        }, o.prototype.onClose = function(t, e) {
            "opening" !== this.readyState && "open" !== this.readyState && "closing" !== this.readyState || (a('socket close with reason: "%s"', t), 
            clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), 
            this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", 
            this.id = null, this.emit("close", t, e), this.writeBuffer = [], this.prevBufferLen = 0);
        }, o.prototype.filterUpgrades = function(t) {
            for (var e = [], n = 0, r = t.length; n < r; n++) ~c(this.transports, t[n]) && e.push(t[n]);
            return e;
        };
    }).call(n, r(1));
}, function(t, e, n) {
    function r(t) {
        t && t.forceBase64 && (this.supportsBinary = !1), this.perMessageDeflate = t.perMessageDeflate, 
        this.protocols = t.protocols, o.call(this, t);
    }
    var o = n(13), i = n(3), s = n(6), a = n(35), c = n(36), u = n(0)("engine.io-client:websocket"), p = n(37);
    t.exports = r, a(r, o), r.prototype.name = "websocket", r.prototype.supportsBinary = !0, 
    r.prototype.doOpen = function() {
        if (this.check()) {
            var t = this.uri(), e = this.protocols;
            try {
                this.ws = e ? new p(t, e) : new p(t);
            } catch (t) {
                return this.emit("error", t);
            }
            void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, 
            this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners();
        }
    }, r.prototype.addEventListeners = function() {
        var t = this;
        this.ws.onopen = function() {
            t.onOpen();
        }, this.ws.onclose = function() {
            t.onClose();
        }, this.ws.onmessage = function(e) {
            t.onData(e.data);
        }, this.ws.onerror = function(e) {
            t.onError("websocket error", e);
        };
    }, r.prototype.write = function(t) {
        var e = this;
        this.writable = !1;
        for (var n = t.length, r = 0, o = n; r < o; r++) !function(t) {
            i.encodePacket(t, e.supportsBinary, function(t) {
                try {
                    e.ws.send(t);
                } catch (t) {
                    u("websocket closed before onclose event");
                }
                --n || (e.emit("flush"), setTimeout(function() {
                    e.writable = !0, e.emit("drain");
                }, 0));
            });
        }(t[r]);
    }, r.prototype.onClose = function() {
        o.prototype.onClose.call(this);
    }, r.prototype.doClose = function() {
        void 0 !== this.ws && this.ws.close();
    }, r.prototype.uri = function() {
        var t = this.query || {}, e = this.secure ? "wss" : "ws", n = "";
        return this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (n = ":" + this.port), 
        this.timestampRequests && (t[this.timestampParam] = c()), this.supportsBinary || (t.b64 = 1), 
        (t = s.encode(t)).length && (t = "?" + t), e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t;
    }, r.prototype.check = function() {
        return !(!p || "__initialize" in p && this.name === r.prototype.name);
    };
}, function(t, e) {
    t.exports = Object.keys || function(t) {
        var e = [], n = Object.prototype.hasOwnProperty;
        for (var r in t) n.call(t, r) && e.push(r);
        return e;
    };
}, function(t, e) {
    t.exports = function(t, e, n) {
        var r = t.byteLength;
        if (e = e || 0, n = n || r, t.slice) return t.slice(e, n);
        if (e < 0 && (e += r), n < 0 && (n += r), n > r && (n = r), e >= r || e >= n || 0 === r) return new ArrayBuffer(0);
        for (var o = new Uint8Array(t), i = new Uint8Array(n - e), s = e, a = 0; s < n; s++, 
        a++) i[a] = o[s];
        return i.buffer;
    };
}, function(t, e) {
    t.exports = function(t, e, n) {
        function r(t, i) {
            if (r.count <= 0) throw new Error("after called too many times");
            --r.count, t ? (o = !0, e(t), e = n) : 0 !== r.count || o || e(null, i);
        }
        var o = !1;
        return n = n || function() {}, r.count = t, 0 === t ? e() : r;
    };
}, function(e, n, r) {
    (function(e, o) {
        var i;
        !function(s) {
            function a(t) {
                for (var e, n, r = [], o = 0, i = t.length; o < i; ) (e = t.charCodeAt(o++)) >= 55296 && e <= 56319 && o < i ? 56320 == (64512 & (n = t.charCodeAt(o++))) ? r.push(((1023 & e) << 10) + (1023 & n) + 65536) : (r.push(e), 
                o--) : r.push(e);
                return r;
            }
            function c(t, e) {
                if (t >= 55296 && t <= 57343) {
                    if (e) throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value");
                    return !1;
                }
                return !0;
            }
            function u(t, e) {
                return g(t >> e & 63 | 128);
            }
            function p(t, e) {
                if (0 == (4294967168 & t)) return g(t);
                var n = "";
                return 0 == (4294965248 & t) ? n = g(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (c(t, e) || (t = 65533), 
                n = g(t >> 12 & 15 | 224), n += u(t, 6)) : 0 == (4292870144 & t) && (n = g(t >> 18 & 7 | 240), 
                n += u(t, 12), n += u(t, 6)), n + g(63 & t | 128);
            }
            function h() {
                if (y >= d) throw Error("Invalid byte index");
                var t = 255 & l[y];
                if (y++, 128 == (192 & t)) return 63 & t;
                throw Error("Invalid continuation byte");
            }
            function f(t) {
                var e, n;
                if (y > d) throw Error("Invalid byte index");
                if (y == d) return !1;
                if (e = 255 & l[y], y++, 0 == (128 & e)) return e;
                if (192 == (224 & e)) {
                    if ((n = (31 & e) << 6 | h()) >= 128) return n;
                    throw Error("Invalid continuation byte");
                }
                if (224 == (240 & e)) {
                    if ((n = (15 & e) << 12 | h() << 6 | h()) >= 2048) return c(n, t) ? n : 65533;
                    throw Error("Invalid continuation byte");
                }
                if (240 == (248 & e) && ((n = (7 & e) << 18 | h() << 12 | h() << 6 | h()) >= 65536 && n <= 1114111)) return n;
                throw Error("Invalid UTF-8 detected");
            }
            t(n), "object" == t(e) && e && e.exports, t(o);
            var l, d, y, g = String.fromCharCode, m = {
                version: "2.1.2",
                encode: function(t, e) {
                    for (var n = !1 !== (e = e || {}).strict, r = a(t), o = r.length, i = -1, s = ""; ++i < o; ) s += p(r[i], n);
                    return s;
                },
                decode: function(t, e) {
                    var n = !1 !== (e = e || {}).strict;
                    l = a(t), d = l.length, y = 0;
                    for (var r, o = []; !1 !== (r = f(n)); ) o.push(r);
                    return function(t) {
                        for (var e, n = t.length, r = -1, o = ""; ++r < n; ) (e = t[r]) > 65535 && (o += g((e -= 65536) >>> 10 & 1023 | 55296), 
                        e = 56320 | 1023 & e), o += g(e);
                        return o;
                    }(o);
                }
            };
            void 0 === (i = function() {
                return m;
            }.call(n, r, n, e)) || (e.exports = i);
        }();
    }).call(n, r(32)(e), r(1));
}, function(t, e) {
    t.exports = function(t) {
        return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children || (t.children = []), 
        Object.defineProperty(t, "loaded", {
            enumerable: !0,
            get: function() {
                return t.l;
            }
        }), Object.defineProperty(t, "id", {
            enumerable: !0,
            get: function() {
                return t.i;
            }
        }), t.webpackPolyfill = 1), t;
    };
}, function(t, e) {
    !function() {
        for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = new Uint8Array(256), r = 0; r < t.length; r++) n[t.charCodeAt(r)] = r;
        e.encode = function(e) {
            var n, r = new Uint8Array(e), o = r.length, i = "";
            for (n = 0; n < o; n += 3) i += t[r[n] >> 2], i += t[(3 & r[n]) << 4 | r[n + 1] >> 4], 
            i += t[(15 & r[n + 1]) << 2 | r[n + 2] >> 6], i += t[63 & r[n + 2]];
            return o % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="), 
            i;
        }, e.decode = function(t) {
            var e, r, o, i, s, a = .75 * t.length, c = t.length, u = 0;
            "=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
            var p = new ArrayBuffer(a), h = new Uint8Array(p);
            for (e = 0; e < c; e += 4) r = n[t.charCodeAt(e)], o = n[t.charCodeAt(e + 1)], i = n[t.charCodeAt(e + 2)], 
            s = n[t.charCodeAt(e + 3)], h[u++] = r << 2 | o >> 4, h[u++] = (15 & o) << 4 | i >> 2, 
            h[u++] = (3 & i) << 6 | 63 & s;
            return p;
        };
    }();
}, function(t, e, n) {
    (function(e) {
        function n(t) {
            for (var e = 0; e < t.length; e++) {
                var n = t[e];
                if (n.buffer instanceof ArrayBuffer) {
                    var r = n.buffer;
                    if (n.byteLength !== r.byteLength) {
                        var o = new Uint8Array(n.byteLength);
                        o.set(new Uint8Array(r, n.byteOffset, n.byteLength)), r = o.buffer;
                    }
                    t[e] = r;
                }
            }
        }
        var r = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder, o = function() {
            try {
                return 2 === new Blob([ "hi" ]).size;
            } catch (t) {
                return !1;
            }
        }(), i = o && function() {
            try {
                return 2 === new Blob([ new Uint8Array([ 1, 2 ]) ]).size;
            } catch (t) {
                return !1;
            }
        }(), s = r && r.prototype.append && r.prototype.getBlob;
        t.exports = o ? i ? e.Blob : function(t, e) {
            return n(t), new Blob(t, e || {});
        } : s ? function(t, e) {
            e = e || {};
            var o = new r();
            n(t);
            for (var i = 0; i < t.length; i++) o.append(t[i]);
            return e.type ? o.getBlob(e.type) : o.getBlob();
        } : void 0;
    }).call(e, n(1));
}, function(t, e) {
    t.exports = function(t, e) {
        var n = function() {};
        n.prototype = e.prototype, t.prototype = new n(), t.prototype.constructor = t;
    };
}, function(t, e, n) {
    function r(t) {
        var e = "";
        do {
            e = s[t % a] + e, t = Math.floor(t / a);
        } while (t > 0);
        return e;
    }
    function o() {
        var t = r(+new Date());
        return t !== i ? (u = 0, i = t) : t + "." + r(u++);
    }
    for (var i, s = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), a = 64, c = {}, u = 0, p = 0; p < a; p++) c[s[p]] = p;
    o.encode = r, o.decode = function(t) {
        var e = 0;
        for (p = 0; p < t.length; p++) e = e * a + c[t.charAt(p)];
        return e;
    }, t.exports = o;
}, function(t, e, n) {
    function r(t, e) {
        var n = this;
        if (e) if ((0, o.isString)(e)) e = [ e ]; else if (!(0, o.isArray)(e)) throw new o.DOMExceptionError("Failed to construct 'WebSocket': The subprotocol '" + e + "' is invalid.");
        this.binaryType = "", this.readyState = r.CONNECTING, this.$id = s, s += 1, this.$options = {
            url: t,
            header: {
                "content-type": "application/json"
            },
            protocols: e,
            method: "GET"
        }, this.$handler = function(t, e) {
            "close" === t ? n.readyState = r.CLOSED : "open" === t && (n.readyState = r.OPEN), 
            n["on" + t] && n["on" + t](e);
        };
        try {
            this.$socket = (0, i.default)(this);
        } catch (t) {
            throw console.error(t), t;
        }
    }
    var o = n(4), i = function(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }(n(38)), s = 0;
    r.prototype.send = function(t) {
        if (this.readyState === r.CONNECTING) throw new o.DOMExceptionError("Failed to execute 'send' on 'WebSocket': Still in CONNECTING state.");
        this.readyState === r.OPEN ? this.$socket.send({
            data: t
        }) : console.error("WebSocket is already in CLOSING or CLOSED state.");
    }, r.prototype.close = function(t, e) {
        if (this.readyState = r.CLOSING, !this.$socket) throw new o.DOMExceptionError("Failed to execute 'close' on 'WebSocket': instance is undefined.");
        this.$socket.close({
            code: t,
            reason: e
        });
    }, r.CONNECTING = 0, r.OPEN = 1, r.CLOSING = 2, r.CLOSED = 3, t.exports = r;
}, function(t, e, n) {
    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.default = function(t) {
        if ((0, a.isMy)() || (0, i.hasSingleSocket)()) return (0, s.default)(t);
        var e = a.apis.connectSocket(t.$options);
        return e ? (c("single, 有返回socketTask, 多socket"), function(t, e) {
            e.onOpen(function() {
                t("open");
            }), e.onError(function(e) {
                t("error", e);
            }), e.onClose(function() {
                t("close");
            }), e.onMessage(function(e) {
                t("message", e);
            });
        }(t.$handler, e), e) : ((0, i.setGlobalSocket)(t), (0, i.createSingleSocketTask)(t));
    };
    var o = r(n(0)), i = n(39), s = r(i), a = n(4), c = (0, o.default)("socket.io-wxapp-client:connectSocket");
}, function(t, e, n) {
    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }
    function o(t) {
        p = t, (0, c.default)(t.$handler);
    }
    function i() {
        u.apis.connectSocket(h.$options), o(h), h = void 0;
    }
    function s(t) {
        return {
            send: function(e) {
                p === t ? u.apis.sendSocketMessage(e) : f("error send", "globalWebsocket !== instance", e);
            },
            close: function(e) {
                if (p !== t) return f("error close", "globalWebsocket !== instance", e), void t.$handler("close");
                u.apis.closeSocket(Object.assign({
                    success: function(t) {
                        f("closeSocket success", t), h && (f("nextGlobalWebsocket将连接"), i());
                    },
                    fail: function(t) {
                        f("closeSocket fail", t);
                    }
                }, e));
            }
        };
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.setGlobalSocket = o, e.hasSingleSocket = function() {
        return !!p;
    }, e.createSingleSocketTask = s, e.default = function(t) {
        return function(t) {
            h ? (f("nextGlobalWebsocket被跳过"), h = t) : (h = t, p ? 3 === p.readyState ? (f("当前socket为断开状态，将打开新socket"), 
            i()) : p.close() : (f("websocket将连接"), i()));
        }(t), s(t);
    };
    var a = r(n(0)), c = r(n(40)), u = n(4), p = void 0, h = void 0, f = (0, a.default)("socket.io-wxapp-client:connectSingleSocket");
}, function(t, e, n) {
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = function(t) {
        return t && t.__esModule ? t : {
            default: t
        };
    }(n(0)), o = n(4), i = (0, r.default)("socket.io-wxapp-client:socketGlobalEventHandle"), s = !1, a = function() {
        for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
        i("没有socket全局处理事件 %O", e);
    }, c = void 0;
    e.default = (0, o.isMy)() ? function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a;
        my.onSocketOpen(function() {
            t("open");
        }), my.onSocketError(function(e) {
            t("error", e);
        }), my.onSocketClose(function() {
            t("close");
        }), my.onSocketMessage(function(e) {
            i("message", e), t("message", e);
        });
    } : function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a;
        c = t, s || (s = !0, wx.onSocketOpen(function() {
            c("open");
        }), wx.onSocketError(function(t) {
            c("error", t);
        }), wx.onSocketClose(function() {
            c("close");
        }), wx.onSocketMessage(function(t) {
            i("message", t), c("message", t);
        }));
    };
}, function(t, e) {
    t.exports = function(t, e) {
        for (var n = [], r = (e = e || 0) || 0; r < t.length; r++) n[r - e] = t[r];
        return n;
    };
}, function(t, e) {
    function n(t) {
        t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, 
        this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
    }
    t.exports = n, n.prototype.duration = function() {
        var t = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
            var e = Math.random(), n = Math.floor(e * this.jitter * t);
            t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n;
        }
        return 0 | Math.min(t, this.max);
    }, n.prototype.reset = function() {
        this.attempts = 0;
    }, n.prototype.setMin = function(t) {
        this.ms = t;
    }, n.prototype.setMax = function(t) {
        this.max = t;
    }, n.prototype.setJitter = function(t) {
        this.jitter = t;
    };
} ]);