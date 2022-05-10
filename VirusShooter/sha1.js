var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

!function() {
    "use strict";
    function Sha1(a) {
        a ? (blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0, 
        this.blocks = blocks) : this.blocks = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
        this.h0 = 1732584193, this.h1 = 4023233417, this.h2 = 2562383102, this.h3 = 271733878, 
        this.h4 = 3285377520, this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, 
        this.first = !0;
    }
    var COMMON_JS, AMD, HEX_CHARS, EXTRA, SHIFT, OUTPUT_TYPES, blocks, createOutputMethod, createMethod, nodeWrap, exports, root = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) ? window : {}, NODE_JS = !root.JS_SHA1_NO_NODE_JS && "object" == (typeof process === "undefined" ? "undefined" : _typeof(process)) && process.versions && process.versions.node;
    NODE_JS && (root = global), COMMON_JS = !root.JS_SHA1_NO_COMMON_JS && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports, 
    AMD = "function" == typeof define && define.amd, HEX_CHARS = "0123456789abcdef".split(""), 
    EXTRA = [ -2147483648, 8388608, 32768, 128 ], SHIFT = [ 24, 16, 8, 0 ], OUTPUT_TYPES = [ "hex", "array", "digest", "arrayBuffer" ], 
    blocks = [], createOutputMethod = function createOutputMethod(a) {
        return function(b) {
            return new Sha1(!0).update(b)[a]();
        };
    }, createMethod = function createMethod() {
        var b, c, a = createOutputMethod("hex");
        for (NODE_JS && (a = nodeWrap(a)), a.create = function() {
            return new Sha1();
        }, a.update = function(b) {
            return a.create().update(b);
        }, b = 0; b < OUTPUT_TYPES.length; ++b) {
            c = OUTPUT_TYPES[b], a[c] = createOutputMethod(c);
        }
        return a;
    }, nodeWrap = function nodeWrap(method) {
        var crypto = eval("require('crypto')"), Buffer = eval("require('buffer').Buffer"), nodeMethod = function nodeMethod(a) {
            if ("string" == typeof a) return crypto.createHash("sha1").update(a, "utf8").digest("hex");
            if (a.constructor === ArrayBuffer) a = new Uint8Array(a); else if (void 0 === a.length) return method(a);
            return crypto.createHash("sha1").update(new Buffer(a)).digest("hex");
        };
        return nodeMethod;
    }, Sha1.prototype.update = function(a) {
        var b, c, e, d, f, g;
        if (!this.finalized) {
            for (b = "string" != typeof a, b && a.constructor === root.ArrayBuffer && (a = new Uint8Array(a)), 
            d = 0, f = a.length || 0, g = this.blocks; f > d; ) {
                if (this.hashed && (this.hashed = !1, g[0] = this.block, g[16] = g[1] = g[2] = g[3] = g[4] = g[5] = g[6] = g[7] = g[8] = g[9] = g[10] = g[11] = g[12] = g[13] = g[14] = g[15] = 0), 
                b) for (e = this.start; f > d && 64 > e; ++d) {
                    g[e >> 2] |= a[d] << SHIFT[3 & e++];
                } else for (e = this.start; f > d && 64 > e; ++d) {
                    c = a.charCodeAt(d), 128 > c ? g[e >> 2] |= c << SHIFT[3 & e++] : 2048 > c ? (g[e >> 2] |= (192 | c >> 6) << SHIFT[3 & e++], 
                    g[e >> 2] |= (128 | 63 & c) << SHIFT[3 & e++]) : 55296 > c || c >= 57344 ? (g[e >> 2] |= (224 | c >> 12) << SHIFT[3 & e++], 
                    g[e >> 2] |= (128 | 63 & c >> 6) << SHIFT[3 & e++], g[e >> 2] |= (128 | 63 & c) << SHIFT[3 & e++]) : (c = 65536 + ((1023 & c) << 10 | 1023 & a.charCodeAt(++d)), 
                    g[e >> 2] |= (240 | c >> 18) << SHIFT[3 & e++], g[e >> 2] |= (128 | 63 & c >> 12) << SHIFT[3 & e++], 
                    g[e >> 2] |= (128 | 63 & c >> 6) << SHIFT[3 & e++], g[e >> 2] |= (128 | 63 & c) << SHIFT[3 & e++]);
                }
                this.lastByteIndex = e, this.bytes += e - this.start, e >= 64 ? (this.block = g[16], 
                this.start = e - 64, this.hash(), this.hashed = !0) : this.start = e;
            }
            return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, 
            this.bytes = this.bytes % 4294967296), this;
        }
    }, Sha1.prototype.finalize = function() {
        if (!this.finalized) {
            this.finalized = !0;
            var a = this.blocks, b = this.lastByteIndex;
            a[16] = this.block, a[b >> 2] |= EXTRA[3 & b], this.block = a[16], b >= 56 && (this.hashed || this.hash(), 
            a[0] = this.block, a[16] = a[1] = a[2] = a[3] = a[4] = a[5] = a[6] = a[7] = a[8] = a[9] = a[10] = a[11] = a[12] = a[13] = a[14] = a[15] = 0), 
            a[14] = this.hBytes << 3 | this.bytes >>> 29, a[15] = this.bytes << 3, this.hash();
        }
    }, Sha1.prototype.hash = function() {
        var f, g, h, a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4, i = this.blocks;
        for (g = 16; 80 > g; ++g) {
            h = i[g - 3] ^ i[g - 8] ^ i[g - 14] ^ i[g - 16], i[g] = h << 1 | h >>> 31;
        }
        for (g = 0; 20 > g; g += 5) {
            f = b & c | ~b & d, h = a << 5 | a >>> 27, e = h + f + e + 1518500249 + i[g] << 0, 
            b = b << 30 | b >>> 2, f = a & b | ~a & c, h = e << 5 | e >>> 27, d = h + f + d + 1518500249 + i[g + 1] << 0, 
            a = a << 30 | a >>> 2, f = e & a | ~e & b, h = d << 5 | d >>> 27, c = h + f + c + 1518500249 + i[g + 2] << 0, 
            e = e << 30 | e >>> 2, f = d & e | ~d & a, h = c << 5 | c >>> 27, b = h + f + b + 1518500249 + i[g + 3] << 0, 
            d = d << 30 | d >>> 2, f = c & d | ~c & e, h = b << 5 | b >>> 27, a = h + f + a + 1518500249 + i[g + 4] << 0, 
            c = c << 30 | c >>> 2;
        }
        for (;40 > g; g += 5) {
            f = b ^ c ^ d, h = a << 5 | a >>> 27, e = h + f + e + 1859775393 + i[g] << 0, b = b << 30 | b >>> 2, 
            f = a ^ b ^ c, h = e << 5 | e >>> 27, d = h + f + d + 1859775393 + i[g + 1] << 0, 
            a = a << 30 | a >>> 2, f = e ^ a ^ b, h = d << 5 | d >>> 27, c = h + f + c + 1859775393 + i[g + 2] << 0, 
            e = e << 30 | e >>> 2, f = d ^ e ^ a, h = c << 5 | c >>> 27, b = h + f + b + 1859775393 + i[g + 3] << 0, 
            d = d << 30 | d >>> 2, f = c ^ d ^ e, h = b << 5 | b >>> 27, a = h + f + a + 1859775393 + i[g + 4] << 0, 
            c = c << 30 | c >>> 2;
        }
        for (;60 > g; g += 5) {
            f = b & c | b & d | c & d, h = a << 5 | a >>> 27, e = h + f + e - 1894007588 + i[g] << 0, 
            b = b << 30 | b >>> 2, f = a & b | a & c | b & c, h = e << 5 | e >>> 27, d = h + f + d - 1894007588 + i[g + 1] << 0, 
            a = a << 30 | a >>> 2, f = e & a | e & b | a & b, h = d << 5 | d >>> 27, c = h + f + c - 1894007588 + i[g + 2] << 0, 
            e = e << 30 | e >>> 2, f = d & e | d & a | e & a, h = c << 5 | c >>> 27, b = h + f + b - 1894007588 + i[g + 3] << 0, 
            d = d << 30 | d >>> 2, f = c & d | c & e | d & e, h = b << 5 | b >>> 27, a = h + f + a - 1894007588 + i[g + 4] << 0, 
            c = c << 30 | c >>> 2;
        }
        for (;80 > g; g += 5) {
            f = b ^ c ^ d, h = a << 5 | a >>> 27, e = h + f + e - 899497514 + i[g] << 0, b = b << 30 | b >>> 2, 
            f = a ^ b ^ c, h = e << 5 | e >>> 27, d = h + f + d - 899497514 + i[g + 1] << 0, 
            a = a << 30 | a >>> 2, f = e ^ a ^ b, h = d << 5 | d >>> 27, c = h + f + c - 899497514 + i[g + 2] << 0, 
            e = e << 30 | e >>> 2, f = d ^ e ^ a, h = c << 5 | c >>> 27, b = h + f + b - 899497514 + i[g + 3] << 0, 
            d = d << 30 | d >>> 2, f = c ^ d ^ e, h = b << 5 | b >>> 27, a = h + f + a - 899497514 + i[g + 4] << 0, 
            c = c << 30 | c >>> 2;
        }
        this.h0 = this.h0 + a << 0, this.h1 = this.h1 + b << 0, this.h2 = this.h2 + c << 0, 
        this.h3 = this.h3 + d << 0, this.h4 = this.h4 + e << 0;
    }, Sha1.prototype.hex = function() {
        this.finalize();
        var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4;
        return HEX_CHARS[15 & a >> 28] + HEX_CHARS[15 & a >> 24] + HEX_CHARS[15 & a >> 20] + HEX_CHARS[15 & a >> 16] + HEX_CHARS[15 & a >> 12] + HEX_CHARS[15 & a >> 8] + HEX_CHARS[15 & a >> 4] + HEX_CHARS[15 & a] + HEX_CHARS[15 & b >> 28] + HEX_CHARS[15 & b >> 24] + HEX_CHARS[15 & b >> 20] + HEX_CHARS[15 & b >> 16] + HEX_CHARS[15 & b >> 12] + HEX_CHARS[15 & b >> 8] + HEX_CHARS[15 & b >> 4] + HEX_CHARS[15 & b] + HEX_CHARS[15 & c >> 28] + HEX_CHARS[15 & c >> 24] + HEX_CHARS[15 & c >> 20] + HEX_CHARS[15 & c >> 16] + HEX_CHARS[15 & c >> 12] + HEX_CHARS[15 & c >> 8] + HEX_CHARS[15 & c >> 4] + HEX_CHARS[15 & c] + HEX_CHARS[15 & d >> 28] + HEX_CHARS[15 & d >> 24] + HEX_CHARS[15 & d >> 20] + HEX_CHARS[15 & d >> 16] + HEX_CHARS[15 & d >> 12] + HEX_CHARS[15 & d >> 8] + HEX_CHARS[15 & d >> 4] + HEX_CHARS[15 & d] + HEX_CHARS[15 & e >> 28] + HEX_CHARS[15 & e >> 24] + HEX_CHARS[15 & e >> 20] + HEX_CHARS[15 & e >> 16] + HEX_CHARS[15 & e >> 12] + HEX_CHARS[15 & e >> 8] + HEX_CHARS[15 & e >> 4] + HEX_CHARS[15 & e];
    }, Sha1.prototype.toString = Sha1.prototype.hex, Sha1.prototype.digest = function() {
        this.finalize();
        var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4;
        return [ 255 & a >> 24, 255 & a >> 16, 255 & a >> 8, 255 & a, 255 & b >> 24, 255 & b >> 16, 255 & b >> 8, 255 & b, 255 & c >> 24, 255 & c >> 16, 255 & c >> 8, 255 & c, 255 & d >> 24, 255 & d >> 16, 255 & d >> 8, 255 & d, 255 & e >> 24, 255 & e >> 16, 255 & e >> 8, 255 & e ];
    }, Sha1.prototype.array = Sha1.prototype.digest, Sha1.prototype.arrayBuffer = function() {
        var a, b;
        return this.finalize(), a = new ArrayBuffer(20), b = new DataView(a), b.setUint32(0, this.h0), 
        b.setUint32(4, this.h1), b.setUint32(8, this.h2), b.setUint32(12, this.h3), b.setUint32(16, this.h4), 
        a;
    }, exports = createMethod(), COMMON_JS ? module.exports = exports : (root.sha1 = exports, 
    AMD && define(function() {
        return exports;
    }));
}();