function getNetworkType(a) {
    wx.getNetworkType({
        success: function success(b) {
            a(b.networkType);
        }
    });
}

function getSystemInfo() {
    // var a = wx.getSystemInfoSync();
    
    return {};
    // return {
    //     adt: encodeURIComponent(a.model),
    //     scl: a.pixelRatio,
    //     scr: Laya.stage.width + "x" + Laya.stage.height,
    //     lg: a.language,
    //     fl: a.version,
    //     jv: encodeURIComponent(a.system),
    //     tz: encodeURIComponent(a.platform)
    // };


}

function getUID() {
    try {
        return wx.getStorageSync(MTA_CONFIG.prefix + "auid");
    } catch (a) {}
}

function setUID() {
    try {
        var a = getRandom();
        return wx.setStorageSync(MTA_CONFIG.prefix + "auid", a), a;
    } catch (b) {}
}

function getSID() {
    try {
        return wx.getStorageSync(MTA_CONFIG.prefix + "ssid");
    } catch (a) {}
}

function setSID() {
    try {
        var a = "s" + getRandom();
        return wx.setStorageSync(MTA_CONFIG.prefix + "ssid", a), a;
    } catch (b) {}
}

function getRandom(a) {
    var b, c, d, e;
    for (b = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], c = 10; c > 1; c--) {
        d = Math.floor(10 * Math.random()), e = b[d], b[d] = b[c - 1], b[c - 1] = e;
    }
    for (c = d = 0; 5 > c; c++) {
        d = 10 * d + b[c];
    }
    return (a || "") + (d + "" + +new Date());
}

function getPagePath() {
    return "index.html";
}

function getMainInfo() {
    var a = {
        dm: "wechat.apps.xx",
        url: getPagePath(),
        pvi: "",
        si: "",
        ty: 0
    };
    return a.pvi = function() {
        var b = getUID();
        return b || (b = setUID(), a.ty = 1), b;
    }(), a.si = function() {
        var a = getSID();
        return a || (a = setSID()), a;
    }(), a;
}

function getBasicInfo() {

    return {ct:"4g"}
    // var a = getSystemInfo();
    // return getNetworkType(function(a) {
    //     try {
    //         wx.setStorageSync(MTA_CONFIG.prefix + "ntdata", a);
    //     } catch (b) {}
    // }), a.ct = wx.getStorageSync(MTA_CONFIG.prefix + "ntdata") || "4g", a;
}

function getExtentInfo() {
    var c, a = MTA.Data.userInfo, b = [];
    for (c in a) {
        a.hasOwnProperty(c) && b.push(c + "=" + a[c]);
    }
    return a = b.join(";"), {
        r2: MTA_CONFIG.app_id,
        r4: "wx",
        ext: "v=" + MTA_CONFIG.version + (null !== a && "" !== a ? ";ui=" + encodeURIComponent(a) : "")
    };
}

var MTA_CONFIG = {
    app_id: "",
    event_id: "",
    api_base: "",//https://pingtas.qq.com/pingd
    prefix: "_mta_",
    version: "1.3.6",
    stat_share_app: !1,
    stat_pull_down_fresh: !1,
    stat_reach_bottom: !1
}, MTA = {
    App: {
        init: function init(a) {
            "appID" in a && (MTA_CONFIG.app_id = a.appID), "eventID" in a && (MTA_CONFIG.event_id = a.eventID), 
            "statShareApp" in a && (MTA_CONFIG.stat_share_app = a.statShareApp), "statPullDownFresh" in a && (MTA_CONFIG.stat_pull_down_fresh = a.statPullDownFresh), 
            "statReachBottom" in a && (MTA_CONFIG.stat_reach_bottom = a.statReachBottom), setSID();
            try {
                "lauchOpts" in a && (MTA.Data.lanchInfo = a.lauchOpts, MTA.Data.lanchInfo.landing = 1);
            } catch (b) {}
        }
    },
    Page: {
        stat: function stat(a) {
            // var b, c, e, f;
            // if ("" != MTA_CONFIG.app_id) {
            //     if (b = [], c = getExtentInfo(), a && (c.r2 = a), a = [ getMainInfo(), c, getBasicInfo() ], 
            //     MTA.Data.lanchInfo) {
            //         a.push({
            //             ht: MTA.Data.lanchInfo.scene,
            //             rdm: "/",
            //             rurl: MTA.Data.lanchInfo.path
            //         }), MTA.Data.lanchInfo.query && MTA.Data.lanchInfo.query._mta_ref_id && a.push({
            //             rarg: MTA.Data.lanchInfo.query._mta_ref_id
            //         });
            //         try {
            //             1 == MTA.Data.lanchInfo.landing && (c.ext += ";lp=1", MTA.Data.lanchInfo.landing = 0);
            //         } catch (d) {}
            //     }
            //     for (a.push({
            //         rand: +new Date()
            //     }), c = 0, e = a.length; e > c; c++) {
            //         for (f in a[c]) {
            //             a[c].hasOwnProperty(f) && b.push(f + "=" + ("undefined" == typeof a[c][f] ? "" : a[c][f]));
            //         }
            //     }
            //     wx.request({
            //         url: MTA_CONFIG.api_base + "?" + b.join("&").toLowerCase()
            //     });
            // }
        }
    },
    Event: {
        stat: function stat(a, b) {
            var c, d, e, f, h, g, i;
            if ("" != MTA_CONFIG.event_id) {
                c = [], d = getMainInfo(), e = getExtentInfo(), d.dm = "wxapps.click", d.url = a, 
                e.r2 = MTA_CONFIG.event_id, f = "undefined" == typeof b ? {} : b, g = [];
                for (h in f) {
                    f.hasOwnProperty(h) && g.push(encodeURIComponent(h) + "=" + encodeURIComponent(f[h]));
                }
                for (f = g.join(";"), e.r5 = f, f = 0, d = [ d, e, getBasicInfo(), {
                    rand: +new Date()
                } ], e = d.length; e > f; f++) {
                    for (i in d[f]) {
                        d[f].hasOwnProperty(i) && c.push(i + "=" + ("undefined" == typeof d[f][i] ? "" : d[f][i]));
                    }
                }
                wx.request({
                    url: MTA_CONFIG.api_base + "?" + c.join("&").toLowerCase()
                });
            }
        }
    },
    Data: {
        userInfo: null,
        lanchInfo: null
    }
};

window.mta  = MTA;