 
(function(e, t, n, r) {
    function o(e) {
        if (e.length === 8) {
            return false
        }
        return true
    }

    function u(e) {
        var t = null;
        if (e.indexOf("vim") !== -1) {
            var n = /vimeo.*\/(\d+)/i.exec(e);
            if (n) {
                t = n[1]
            }
        } else if (e.indexOf("yout") !== -1) {
            var r = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var n = e.match(r);
            if (n && n[2].length == 11) {
                t = n[2]
            }
        }
        return t
    }

    function a(t) {
        var n = t.link,
            r = t.url;
        e.ajax({
            url: r,
            dataType: "jsonp",
            success: function(e) {
                var t = e[0].title;
                var r = "by " + e[0].user_name;
                if (t.length > 50) {
                    n.find(".mbl_title").html(t.substr(0, 50) + "â€¦")
                } else {
                    n.find(".mbl_title").html(t)
                }
                n.find(".mbl_author").html(r);
                n.find(".mbl_thumbnail img").attr("src", e[0].thumbnail_small)
            }
        })
    }

    function f(t) {
        var n = t.link,
            r = t.url;
        e.ajax({
            url: r,
            dataType: "jsonp",
            success: function(e) {
                var t = e.entry["title"].$t;
                var r = "by " + e.entry["author"][0].name.$t;
                if (t.length > 50) {
                    n.find(".mbl_title").html(t.substr(0, 50) + "â€¦")
                } else {
                    n.find(".mbl_title").html(t)
                }
                n.find(".mbl_author").html(r)
            }
        })
    }

    function l(t, n) {
        e.ajax({
            url: "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=" + t + "&key=AIzaSyCIlwa-7d7qpKS0Nj5vhI7tb-0minC-qZ8",
            dataType: "jsonp",
            success: function(e) {
                n(e.items[0].contentDetails.relatedPlaylists.uploads)
            }
        })
    }

    function c(t, n) {
        e.ajax({
            url: "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=" + t + "&key=AIzaSyCIlwa-7d7qpKS0Nj5vhI7tb-0minC-qZ8",
            dataType: "jsonp",
            success: function(e) {
                n(e.items.reverse())
            }
        })
    }

    function h(t, n) {
        var r, i;
        for (var s = 0, o = t.length; s < o; s++) {
            r = t[s];
            i = r.snippet.resourceId.videoId;
            li = '<li><a href="https://www.youtube.com/watch?v=' + i + '"></a></li>';
            e(li).prependTo("#mbl_playlist")
        }
        n()
    }

    function p(t, n) {
        e.ajax({
            url: "http://vimeo.com/api/v2/" + t + "/videos.json",
            dataType: "jsonp",
            success: function(e) {
                n(e.reverse())
            }
        })
    }

    function d(t, n) {
        var r, i;
        for (var s = 0, o = t.length; s < o; s++) {
            r = t[s];
            i = r.id;
            li = '<li><a href="https://www.vimeo.com/' + i + '"></a></li>';
            e(li).prependTo("#mbl_playlist")
        }
        n()
    }

    function v(n, r) {
        this.element = n;
        this.options = e.extend({}, s, r);
        this._defaults = s;
        this._name = i;
        this._protocol = this.options.secure === "auto" ? t.location.protocol === "https:" ? "https://" : "http://" : this.options.secure ? "https://" : "http://";
        this.init()
    }
    var i = "responsiveplaylist";
    var s = {
        autoPlay: false,
        allowFullScreen: true,
        deepLinks: true,
        onChange: function() {},
        start: 1,
        youtube: {
            autohide: "2",
            rel: "1",
            theme: "dark",
            color: "white",
            showinfo: "1",
            vq: "medium"
        },
        vimeo: {
            title: "1",
            byline: "1",
            portrait: "1",
            color: "ffffff"
        },
        holderId: "mbl_video",
        secure: "auto"
    };
    v.prototype = {
        init: function() {
            var r = this;
            var i = r.options.deepLinks && t.location.hash.indexOf("#video-") !== -1 ? t.location.hash : null;
            var s = function() {
                e(r.element).find("li").each(function(t) {
                    var n = e(this),
                        s = t + 1;
                    n.find("a:first").each(function() {
                        var t = e(this),
                            i = u(t.attr("href")),
                            l = n.text();
                        t.data("yt-href", t.attr("href"));
                        t.attr("href", "#video-" + s);
                        t.data("yt-id", i);
                        var c, h = "";
                        if (!o(i)) {
                            a({
                                link: t,
                                url: r._protocol + "vimeo.com/api/v2/video/" + i + ".json"
                            })
                        } else {
                            f({
                                link: t,
                                url: r._protocol + "gdata.youtube.com/feeds/api/videos/" + i + "?v=3&alt=json"
                            });
                            h = r._protocol + "i.ytimg.com/vi/" + i + "/default.jpg"
                        }
                        c = '<span class="mbl_thumbnail"><img src="' + h + '" alt="' + l + '" /></span>';
                        t.empty().html(c + l).attr("title", l);
                        if (!r.options.deepLinks) {
                            t.click(function(e) {
                                e.preventDefault();
                                r.handleClick(t, r.options);
                                r.options.onChange.call()
                            })
                        }
                    });
                    var l = e(n.children("a")[0]);
                    if (i) {
                        if (l.attr("href") === i) {
                            r.handleClick(l, r.options)
                        }
                    } else if (s === r.options.start) {
                        r.handleClick(l, r.options)
                    }
                });
                if (r.options.deepLinks) {
                    e(t).bind("hashchange", function(n) {
                        var i = t.location.hash;
                        var s = e(r.element).find('a[href="' + i + '"]');
                        if (s.length > 0) {
                            r.handleClick(s, r.options)
                        } else if (i === "") {
                            r.handleClick(e(r.element).find("a:first"), r.options)
                        }
                    })
                }
                var s = n.createElement("div"),
                    l = n.getElementsByTagName("base")[0] || n.getElementsByTagName("script")[0];
                s.innerHTML = "Â­<style> iframe { visibility: hidden; } </style>";
                l.parentNode.insertBefore(s, l);
                t.onload = function() {
                    s.parentNode.removeChild(s)
                }
            };
            if (r.options.youtubeUsername && r.options.vimeoUsername) {
                l(r.options.youtubeUsername, function(e) {
                    c(e, function(e) {
                        h(e, function() {
                            p(r.options.vimeoUsername, function(e) {
                                d(e, s)
                            })
                        })
                    })
                })
            } else if (r.options.youtubeUsername) {
                l(r.options.youtubeUsername, function(e) {
                    c(e, function(e) {
                        h(e, s)
                    })
                })
            } else if (r.options.vimeoUsername) {
                p(r.options.vimeoUsername, function(e) {
                    d(e, s)
                })
            } else if (!r.options.youtubeUsername && !r.options.vimeoUsername) {
                s()
            }
        },
        getEmbedCode: function(e, t) {
            if (!o(t)) {
                var n = "";
                n += "<iframe";
                n += ' src="' + this._protocol + "player.vimeo.com/video/" + t;
                n += "?";
                n += e.autoPlay ? "autoplay=1" : "autoplay=0";
                n += "&title=" + e.vimeo.title;
                n += "&byline=" + e.vimeo.byline;
                n += "&portrait=" + e.vimeo.portrait;
                n += "&color=" + e.vimeo.color;
                n += '" ';
                if (e.allowFullScreen) {
                    n += " webkitAllowFullScreen mozallowfullscreen allowFullScreen "
                }
                n += ' type="text/html" frameborder="0" ></iframe>'
            } else {
                var n = "";
                n += "<iframe";
                n += ' src="' + this._protocol + "www.youtube.com/embed/" + t;
                n += "?";
                n += e.autoPlay ? "autoplay=1" : "autoplay=0";
                n += "&autohide=" + e.youtube.autohide;
                n += "&rel=" + e.youtube.rel;
                n += "&theme=" + e.youtube.theme;
                n += "&color=" + e.youtube.color;
                n += "&showinfo=" + e.youtube.showinfo;
                n += "&vq=" + e.youtube.vq;
                n += '" ';
                if (e.allowFullScreen) {
                    n += " webkitAllowFullScreen mozallowfullscreen allowFullScreen "
                }
                n += ' frameborder="0" ></iframe>'
            }
            return n
        },
        handleClick: function(e, t) {
            t.onChange.call();
            return this.handleVideoClick(e, t)
        },
        handleVideoClick: function(t, n) {
            var r = this;
            var i = n.holder ? n.holder : e("#" + n.holderId);
            i.html(r.getEmbedCode(r.options, t.data("yt-id")));
            t.parent().parent("ul").find("li.mbl_currentVideo").removeClass("mbl_currentVideo");
            t.parent("li").addClass("mbl_currentVideo");
            return false
        }
    };
    e.fn[i] = function(t) {
        return this.each(function() {
            if (!e.data(this, "plugin_" + i)) {
                e.data(this, "plugin_" + i, new v(this, t))
            }
        })
    }
})(jQuery, window, document)


/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
window.matchMedia = window.matchMedia || function(a) {
    "use strict";
    var c, d = a.documentElement,
        e = d.firstElementChild || d.firstChild,
        f = a.createElement("body"),
        g = a.createElement("div");
    return g.id = "mq-test-1", g.style.cssText = "position:absolute;top:-100em", f.style.background = "none", f.appendChild(g),
    function(a) {
        return g.innerHTML = '&shy;<style media="' + a + '"> #mq-test-1 { width: 42px; }</style>', d.insertBefore(f, e), c = 42 === g.offsetWidth, d.removeChild(f), {
            matches: c,
            media: a
        }
    }
}(document);

/*! Respond.js v1.1.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
(function(a) {
    "use strict";

    function x() {
        u(!0)
    }
    var b = {};
    if (a.respond = b, b.update = function() {}, b.mediaQueriesSupported = a.matchMedia && a.matchMedia("only all").matches, !b.mediaQueriesSupported) {
        var q, r, t, c = a.document,
            d = c.documentElement,
            e = [],
            f = [],
            g = [],
            h = {}, i = 30,
            j = c.getElementsByTagName("head")[0] || d,
            k = c.getElementsByTagName("base")[0],
            l = j.getElementsByTagName("link"),
            m = [],
            n = function() {
                for (var b = 0; l.length > b; b++) {
                    var c = l[b],
                        d = c.href,
                        e = c.media,
                        f = c.rel && "stylesheet" === c.rel.toLowerCase();
                    d && f && !h[d] && (c.styleSheet && c.styleSheet.rawCssText ? (p(c.styleSheet.rawCssText, d, e), h[d] = !0) : (!/^([a-zA-Z:]*\/\/)/.test(d) && !k || d.replace(RegExp.$1, "").split("/")[0] === a.location.host) && m.push({
                        href: d,
                        media: e
                    }))
                }
                o()
            }, o = function() {
                if (m.length) {
                    var b = m.shift();
                    v(b.href, function(c) {
                        p(c, b.href, b.media), h[b.href] = !0, a.setTimeout(function() {
                            o()
                        }, 0)
                    })
                }
            }, p = function(a, b, c) {
                var d = a.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),
                    g = d && d.length || 0;
                b = b.substring(0, b.lastIndexOf("/"));
                var h = function(a) {
                    return a.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, "$1" + b + "$2$3")
                }, i = !g && c;
                b.length && (b += "/"), i && (g = 1);
                for (var j = 0; g > j; j++) {
                    var k, l, m, n;
                    i ? (k = c, f.push(h(a))) : (k = d[j].match(/@media *([^\{]+)\{([\S\s]+?)$/) && RegExp.$1, f.push(RegExp.$2 && h(RegExp.$2))), m = k.split(","), n = m.length;
                    for (var o = 0; n > o; o++) l = m[o], e.push({
                        media: l.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/) && RegExp.$2 || "all",
                        rules: f.length - 1,
                        hasquery: l.indexOf("(") > -1,
                        minw: l.match(/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                        maxw: l.match(/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                    })
                }
                u()
            }, s = function() {
                var a, b = c.createElement("div"),
                    e = c.body,
                    f = !1;
                return b.style.cssText = "position:absolute;font-size:1em;width:1em", e || (e = f = c.createElement("body"), e.style.background = "none"), e.appendChild(b), d.insertBefore(e, d.firstChild), a = b.offsetWidth, f ? d.removeChild(e) : e.removeChild(b), a = t = parseFloat(a)
            }, u = function(b) {
                var h = "clientWidth",
                    k = d[h],
                    m = "CSS1Compat" === c.compatMode && k || c.body[h] || k,
                    n = {}, o = l[l.length - 1],
                    p = (new Date).getTime();
                if (b && q && i > p - q) return a.clearTimeout(r), r = a.setTimeout(u, i), void 0;
                q = p;
                for (var v in e)
                    if (e.hasOwnProperty(v)) {
                        var w = e[v],
                            x = w.minw,
                            y = w.maxw,
                            z = null === x,
                            A = null === y,
                            B = "em";
                        x && (x = parseFloat(x) * (x.indexOf(B) > -1 ? t || s() : 1)), y && (y = parseFloat(y) * (y.indexOf(B) > -1 ? t || s() : 1)), w.hasquery && (z && A || !(z || m >= x) || !(A || y >= m)) || (n[w.media] || (n[w.media] = []), n[w.media].push(f[w.rules]))
                    }
                for (var C in g) g.hasOwnProperty(C) && g[C] && g[C].parentNode === j && j.removeChild(g[C]);
                for (var D in n)
                    if (n.hasOwnProperty(D)) {
                        var E = c.createElement("style"),
                            F = n[D].join("\n");
                        E.type = "text/css", E.media = D, j.insertBefore(E, o.nextSibling), E.styleSheet ? E.styleSheet.cssText = F : E.appendChild(c.createTextNode(F)), g.push(E)
                    }
            }, v = function(a, b) {
                var c = w();
                c && (c.open("GET", a, !0), c.onreadystatechange = function() {
                    4 !== c.readyState || 200 !== c.status && 304 !== c.status || b(c.responseText)
                }, 4 !== c.readyState && c.send(null))
            }, w = function() {
                var b = !1;
                try {
                    b = new a.XMLHttpRequest
                } catch (c) {
                    b = new a.ActiveXObject("Microsoft.XMLHTTP")
                }
                return function() {
                    return b
                }
            }();
        n(), b.update = n, a.addEventListener ? a.addEventListener("resize", x, !1) : a.attachEvent && a.attachEvent("onresize", x)
    }
})(this);
 


	$(function() {
        $("ul#mbl_playlist").responsiveplaylist({
            autoPlay: false,
            allowFullScreen: true,
            deepLinks: true,
            onChange: function(){},
            start: 1,
            youtube: {
                autohide: '2', // '2' = autohide title, '1' = autohide everything, '0' = show all
                rel: '1', // '1' = show related videos, '0' = hide related videos
                theme: 'dark', // 'light' = standard theme, 'dark' = dark theme
                color: 'white', // 'red' = red progress bar, 'white' = white progress bar
                showinfo: '1', // '1' = show title and info, '0' = hide title and info
                vq: 'medium' // 'vq=small' = 240p, 'vq=medium' = 360p, 'vq=large' = 480p, 'vq=hd720' = 720p, 'vq=hd1080' = 1080p
            },
            vimeo: {
                title: '1', // '1' = show title, '0' = hide title
                byline: '1', // '1' = show byline, '0' = hide byline
                portrait: '1', // '1' = show portrait, '0' = hide portrait
                color: 'ffffff' // player interface color (do not include # symbol)
            },
            holderId: 'mbl_video',
            // youtubeUsername: 'username',
            // vimeoUsername: 'username',
            secure: 'auto' //false|true|'auto'
        });
    });
 
