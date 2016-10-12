!(function(window,document) {
	var ua = navigator.userAgent.toLowerCase(),
		locHref = location.href.toLowerCase(),
		/*www.pconline.com.cn*/
		locHrefHostname = location.hostname,
		rf = document.referrer.toLowerCase(),
		rfHostname = rf.split("/")[2],
		locSearch = location.search,
		locHash = location.hash,
		domain = ".pchouse.com.cn",
		wap_3gHostname = "m.pchouse.com.cn",
		ipadHostname = "pad.pchouse.com.cn",
		// 创建PCGPARAM全局对象
		PCGPARAM = {},

		browser = {
			/*ie内核的浏览器(包括手机 pc 等)
			trident: ua.indexOf("trident") > -1,
			*/
			/*QQ浏览器
			QQbro: ua.indexOf("mqqbrowser") > -1,
			*/
			/*
			ucLowEnd: ua.indexOf("ucweb7.") > -1,
			ucSpecial: ua.indexOf("rv:1.2.3.4") > -1,
			webKit: ua.indexOf("applewebkit") > -1,
			*/
			/*塞班系统 Symbian*/
			SB: ua.indexOf("symbian") > -1,
			/*Nokia*/
			NK: ua.indexOf("nokia") > -1,
			/*黑莓 blackBerry*/
			BB:ua.indexOf("blackberry") > -1,
			/*魅族 多普达 windows ce 系统*/
			WCE: ua.indexOf("windows ce") > -1,
			// WNT: ua.indexOf("windows nt") > -1,
			/*wp手机浏览器*/
			WP: ua.indexOf("windows phone") > -1,

			Mobile: ua.indexOf("mobile") > -1,
			Android: ua.indexOf("android") > -1,
			Iphone: ua.indexOf("iphone") > -1,
			Ipod: ua.indexOf("ipod") > -1,
			Ipad: ua.indexOf("ipad") > -1,

			/*小米平板*/
			Mipad: ua.indexOf("mi-pad") > -1,
			/*微信 Weixin*/
			WX: ua.indexOf("micromessenger") > -1
		};

	if (browser.weixin) {
		PCGPARAM.bIsWeixin = true;
	}else {
		PCGPARAM.bIsWeixin = false;
	}
	if (browser.Ipad || browser.Mipad) {
		PCGPARAM.browserType = "ipad";
	}else if (browser.SB || browser.BB || browser.WCE || browser.WP || browser.NK) {
		PCGPARAM.browserType = "wap";
	}else if (browser.Mobile || browser.Android || browser.Iphone || browser.Ipod) {
		PCGPARAM.browserType = "wap_3g";
	}else {
		PCGPARAM.browserType = "main";
	};
	// 暴露PCGPARAM全局对象给window
	if (!(window.PCGPARAM && typeof(window.PCGPARAM) == "object")) {
		window.PCGPARAM = PCGPARAM;
	}

	var deviceJump = function() {};
	deviceJump.prototype = {
		init: function(objLink, fn , type) {
			var jumpType = PCGPARAM.browserType,
					jumpUrl = objLink[jumpType];
			// 拓展一个callback函数，对一些特定的页面在跳转前有特殊需求的时候可以做处理
			if (typeof(fn) == "function") {
				fn(jumpType, objLink);
			};

			/* 集合浮层跳转的方式 */
			if (type == "jump2" && typeof(objLink) != "undefined" && typeof(objLink.wap_3g) != "undefined" && PCGPARAM.browserType != "main") {
				window.deviceJumpUrl = objLink;
				document.addEventListener("DOMContentLoaded",function(){
					// document.domain = domain.substring(1);
					var iframe = document.createElement("iframe");
					// 浮层弹窗方式需要加载的iframe
					iframe.src = "/global_ssi/pchouse/jump_layer/";
					iframe.style.display = "none";
					iframe.id = "JiframeDeviceJump";
					document.body.appendChild(iframe);
					// document.addEventListener("load",function(){
					// 	iframe.style.height = document.body.clientHeight + "px";
					// },false);
				},false);
				return false;
			};

			/*如果是电脑访问 则统一不跳转*/
			/*如果检测到有不跳转标识【type=checked】 则不启动跳转机制*/
			/*当前链接有cms.pc关键字 不跳转*/
			/*如果不存在要跳转版本的链接 或者 跳转版本的链接为空 则不跳转*/
			if (jumpType == "main" || locSearch.indexOf("type=checked") > -1 || locHrefHostname.indexOf("cms.pc") > -1 || typeof(jumpUrl) == "undefined" || jumpUrl == "") return false;

			if (locHref.indexOf(jumpUrl) != -1) {
				var wapIndexLink = "http://" + wap_3gHostname + "/w/";
				if (locHref != wapIndexLink) {
					/*如果当前连接的字符串包含将要跳转的链接,则不跳转(简版首页除外)*/
					return false;
				};
			}


			/*默认不跳转*/
			var jumpYN = false,
			/*设置cookie的名字*/
				cookieName = "referrerUrl";
			/*设置cookie*/
			function cookieSet(name, value, expires, path, domain) {
				document.cookie = name + "=" + value + ";expires=" + new Date(new Date().getTime() + (expires)).toGMTString() + ";path=" + path + ";domain=" + domain;
			}
			if (rf == "") {
				/*如果来源为空 则跳转*/
				jumpYN = true;
				cookieSet(cookieName,rf, -1000, "/", domain);
			} else {
				if (rfHostname.indexOf(domain) == -1 || rfHostname.indexOf("mrobot") != -1) {
					/*如果是非本站来源或者来源有mrobot关键字,则跳转*/
					jumpYN = true;
					cookieSet(cookieName,rf, 10000, "/", domain);
				};
				if ((rfHostname != locHrefHostname) && (rf + locHref).split(wap_3gHostname).length >= 2) {
					/*如果来源不为空&&来源与当前链接不同域&&来源与当前链接中有一个与m.pconline.com.cn同域 则跳转*/
					jumpYN = true;
					cookieSet(cookieName,rf, 10000, "/", domain);
				};
				if ((rfHostname != locHrefHostname) && (rf + locHref).split(ipadHostname).length >= 2) {
					/*如果来源不为空&&来源与当前链接不同域&&来源与当前链接中有一个与ipad.pconline.com.cn同域 则跳转*/
					jumpYN = true;
					cookieSet(cookieName,rf, 10000, "/", domain);
				};
			};
			/*如果不为以上情况 则不跳转*/
			if (!jumpYN) return false;


			// 转移fromApp参数
			if (locSearch && locSearch.indexOf("fromApp") > -1) {
				if (jumpUrl.indexOf("?") != -1) {
					jumpUrl += "&fromApp";
				}else {
					jumpUrl += "?fromApp";
				};
			};

			// 转移ad计数器
			// xxx#ad=1234 可以计数
			// xxx?other#ad=1234 可以计数
			// xxx?ad=1234 可以计数
			// xxx?other&ad=1234 不可以计数
			// xxx#ad=1234?other&other 不可以计数
			// xxx?ad=1234&other 可以计数
			// xxx?ad=1234&other#other 可以计数
			// xxx#ad=1234&other#other 不可以计数
			// ?ad=1234是之前的，有可能会影响SEO， #ad=1234对SEO没影响
			if (locHash || locSearch) {
				var array = /[\?|#]ad=([^&|^#]*)/i.exec(locSearch + locHash);
				if (array) {
					var adNum = array[1];
					if (jumpUrl.indexOf("?") != -1) {
						jumpUrl += "#ad=" + adNum;
					}else if(jumpUrl.indexOf("#") != -1){
						jumpUrl += "?ad=" + adNum;
					}else {
						jumpUrl += "#ad=" + adNum;
					}
				}
			}

			location.href = jumpUrl;
		}
	};
	window.deviceJump = new deviceJump();
})(window,document);