;(function() {

    var Location = {
        cookieName: 'locationWap',
        // 定位回调函数队列
        callbackQueue: [],
        cityUser: 0,
        // 默认城市
        _defaultCityCode: "440100",
        setCookie: function(name, value) {
            document.cookie = name + "=" + encodeURIComponent(value) + "; path=/; domain=" + window.location.hostname.replace(/.+((\.\w+)\.com(\.cn)?)/, "$1") + "; expires=" + new Date(+new Date() + 1024 * 24 * 3600 * 1000).toGMTString()
        },
        getCookie: function(name) {
            return decodeURIComponent(document.cookie.replace(new RegExp(".*(?:^|; )" + name + "=([^;]*).*|.*"), "$1"))
        },
        parseQuery: function(obj) {
            var ret = '';
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    ret += '&' + i + '=' + obj[i];
                }
            }
            return ret;
        },
        parseResult: function(ret) {
            if (!ret) return;
            if (window.JSON && typeof window.JSON.parse === 'function') {
                return JSON.parse(ret)
            } else {
                return eval('(' + ret + ')');
            }
        },
        stringifyResult: (function() {
            var stringfiy = function(input) {
                var isArray = function(arr) {
                    if (typeof Array.isArray === 'function') {
                        return Array.isArray(arr);
                    } else {
                        return Object.prototype.toString.call(arr).slice(8, -1) === 'Array';
                    }
                }
                var isObject = function(obj) {
                    return Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
                }
                var parse = function(input) {
                    if (isArray(input)) {
                        for (var i = 0; i < input.length; i++) {
                            input[i] = parse(input[i]);
                        }
                        return '[' + input.join(',') + ']';
                    } else if (isObject(input)) {
                        var ret = [];
                        for (var i in input) {
                            if (input.hasOwnProperty(i)) {
                                ret.push('"' + i + '":' + parse(input[i]));
                            }
                        }
                        return '{' + ret.join(',') + '}';
                    } else if (typeof input === "string") {
                        return '"' + input.toString() + '"';
                    } else {
                        return input.toString();
                    }
                }
                return parse(input);
            }
            return function(ret) {
                if (window.JSON && typeof window.JSON.stringify === 'function') {
                    return JSON.stringify(ret);
                } else {
                    return stringfiy(ret);
                }
            }
        })(),
        getScript: function(option) {
            //url,callback,charset
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = option.url;
            script.charset = option.charset || "UTF-8";
            script.onload = script.onreadystatechange = function() {
                if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
                    this.onload = this.onreadystatechange = null;
                    option.callback && option.callback();
                }
            }
            document.getElementsByTagName("head")[0].appendChild(script);
        },
        getPcAddress: function(args) {
            if (args.pro) {
                var cityCode = this.getCityCode(args);

                this.getRegion({
                    cityCode: cityCode
                });
            } else {
                this.error = 'TypeIp';
                this.geolocation_fallback({
                    'sts': this.error
                });
            }
        },
        getLocation: function(args) {
            if (args.error) {
                this.error = args.error;
            } else {
                var cityCode = this.getCityCode(args);

                this.getRegion({
                    cityCode: cityCode
                });
            }
        },
        getCityCode: function(args) {
            //如果定位不到城市，默认先去到广州
            var cityCode;
            if (args.cityCode) {
                cityCode = args.cityCode;
            } else {
                cityCode = this._defaultCityCode;
            }

            return cityCode;
        },
        // 获取经销商信息
        getRegion: function(obj) {
            var str;
            for (var x in obj) {
                str = x + "=" + obj[x];
            }
            var url = "http://price.pcauto.com.cn/interface/cms/region_ipArea.jsp?callback=Location.success&m=getCityById&encode=utf8&" + str;
            this.getScript({
                url: url
            });
        },
        /* @region{Object}
        {
            "proId": 5,
            "cityId": 1,
            "proCode": "440000",
            "cityCode": "440100",
            "url": "http://www.pcauto.com.cn/qcbj/gz/",
            "proLetter": "G",
            "area": "华南",
            "near": "华中",
            "cityLetter": "G",
            "name": "广州",
            "pro": "广东",
            "core": true,
            "proPinyin": "guangdong",
            "pinyin": "guangzhou"
        }
        */
        success: function(region) {

            var data;

            if (!region.result) {
                this.error = "Nnavailable";
                data = {
                    error: 1
                }
            } else {

                var cityData = region.cityData;

                data = {
                    isUser: this.cityUser,
                    pro: cityData.pro + "省",
                    city: cityData.name + "市",
                    cityCode: cityData.cityCode,
                    proCode: cityData.proCode,
                    cityUser: cityData.name + "市", //用户偏好城市城市（过度用）
                    cityCodeUser: cityData.cityCode, //用户偏好城市城市代码（过度用）
                    proCodeUser: cityData.proCode, //用户偏好城市省份代码(过度用)
                    regionPro: cityData.proId,
                    regionCity: cityData.cityId,
                    url: cityData.url.replace(/www\.pcauto\.com\.cn/, "m\.pcauto\.com\.cn/x"), // 分站地址
                    expires: +new Date + 1296 * 1e6 //过期时间 15天
                }


                this.setCookie(this.cookieName, this.stringifyResult(data));
                this.error = null;
            }

            this.doCallback(data);
        },
        geolocation_fallback: function(args) {
            var url = 'http://whois.pconline.com.cn/ipJson.jsp?rep=pcauto&callback=Location.getLocation';
            if (args) {
                url += this.parseQuery(args);
            }
            this.getScript({
                url: url
            });
        },
        geolocation_html5: function(isDisableIP) {
            var _this = this;
            navigator.geolocation.getCurrentPosition(getLocation, handleLocationError, {
                timeout: 1e4
            });

            function handleLocationError(error) {
                switch (error.code) {
                    case 1:
                        _this.error = 'RejectShare';
                        break;
                    case 2:
                        _this.error = 'GetError';
                        break;
                    case 3:
                        _this.error = 'Timeout';
                        break;
                }
                if (isDisableIP) {
                    _this.doCallback({
                        error: 1
                    });
                    return;
                }
                _this.geolocation_fallback({
                    'sts': _this.error
                });
            }

            function getLocation(position) {
                var lat = position.coords.latitude,
                    lng = position.coords.longitude,
                    url = "http://whois.pconline.com.cn/ipAreaCoordJson.jsp?coords=" + lng + "," + lat + "&level=2&callback=Location.getPcAddress";
                _this.getScript({
                    url: url
                });
            }

        },
        getLocationCookie: function() {
            return this.parseResult(this.getCookie(this.cookieName));
        },

        updateLocationCookie: function(obj) {
            // update 默认都会延长期限
            var locationCookie = this.getLocationCookie() || {};
            obj = obj || {};
            locationCookie['expires'] = +new Date + 1296 * 1e6;
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    locationCookie[i] = obj[i];
                }
            }
            this.setCookie(this.cookieName, this.stringifyResult(locationCookie));
        },
        // 通过定位城市ID:cityCode
        setLocationCity: function(cityCode, callback) {
            this.cityUser = 1;

            if (callback) this.callbackQueue.push(callback);

            this.getRegion({
                cityCode: cityCode
            });
        },
        // 通过经销商城市ID:regionCode
        setLocationRegion: function(regionCode, callback) {
            this.cityUser = 1;

            if (callback) this.callbackQueue.push(callback);

            this.getRegion({
                cityId: regionCode
            });
        },

        doCallback: function(location) {
            var queue = this.callbackQueue,
                i = 0;
            length = queue.length;

            for (; i < length; i++) {
                queue[i].call(this, location);
            }

            this.callbackQueue = [];
            // this.callback && this.callback.call(this, location);
        },

        init: function(callback, isDisableIP) {
            var locationCookie = this.getLocationCookie(),
                now = +new Date;

            this.callbackQueue.push(callback);

            if (locationCookie && locationCookie.regionCity && locationCookie.expires > now) {
                this.doCallback(locationCookie);
            } else {
                if (navigator.geolocation) {
                    this.geolocation_html5(isDisableIP);
                } else {
                    this.error = 'NotHtml5';
                    this.geolocation_fallback({
                        'sts': this.error
                    });
                }
            }
        }
    };
    window.Location = Location;
})()