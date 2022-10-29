var r = require("../../../@babel/runtime/helpers/typeof");

module.exports = {
    isValidUrl: function(r) {
        return /(ht|f)tp(s?):\/\/([^ \\/]*\.)+[^ \\/]*(:[0-9]+)?\/?/.test(r);
    },
    equal: function e(t, n) {
        if (t === n) return !0;
        if (t && n && "object" == r(t) && "object" == r(n)) {
            var i, f, u, a = Array.isArray(t), o = Array.isArray(n);
            if (a && o) {
                if ((f = t.length) != n.length) return !1;
                for (i = f; 0 != i--; ) if (!e(t[i], n[i])) return !1;
                return !0;
            }
            if (a != o) return !1;
            var s = t instanceof Date, c = n instanceof Date;
            if (s != c) return !1;
            if (s && c) return t.getTime() == n.getTime();
            var l = t instanceof RegExp, g = n instanceof RegExp;
            if (l != g) return !1;
            if (l && g) return t.toString() == n.toString();
            var p = Object.keys(t);
            if ((f = p.length) !== Object.keys(n).length) return !1;
            for (i = f; 0 != i--; ) if (!Object.prototype.hasOwnProperty.call(n, p[i])) return !1;
            for (i = f; 0 != i--; ) if (!e(t[u = p[i]], n[u])) return !1;
            return !0;
        }
        return t != t && n != n;
    }
};