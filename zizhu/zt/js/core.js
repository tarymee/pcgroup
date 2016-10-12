(function() {
	function touchEvent(elm,fn) {
		if ("ontouchstart" in document.documentElement) {
			elm.addEventListener("touchstart",fn,false);
		}else {
			elm.addEventListener("click",fn,false);
		}
	}
	function loadJs(url, fn, callbackName) {
		if (url.indexOf("?") != -1) {
			var url = url + '&callback=' + callbackName;
		} else {
			var url = url + '?callback=' + callbackName;
		}
		if (!window[callbackName]) {
			window[callbackName] = fn;
		};
		var head = document.getElementsByTagName("head")[0];
		var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", url);
		head.appendChild(script);
		script.onload = script.onreadystatechange = function() {
			var f = script.readyState;
			if (f && f != "loaded" && f != "complete") return;
			script.onload = script.onreadystatechange = null;
			head.removeChild(script);
			// delete window[callbackName];
		};
	}
	var classEvent ={
		hasClassName: function(element, className) {
			if (!element) return;
			var elementClassName = element.className;
			if (elementClassName.length == 0) return false;
			//用正则表达式判断多个class之间是否存在真正的class（前后空格的处理）
			if (elementClassName == className || elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))
				return true;
			return false;
		},

		addClassName: function(element, className) {
			if (!element) return;
			var elementClassName = element.className;
			if (elementClassName.length == 0) {
				element.className = className;
				return;
			}
			if (elementClassName == className || elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))
				return;
			element.className = elementClassName + " " + className;
		},

		removeClassName: function(element, className) {
			if (!element) return;
			var elementClassName = element.className;
			if (elementClassName.length == 0) return;
			if (elementClassName == className) {
				element.className = "";
				return;
			}
			if (elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))
				element.className = elementClassName.replace((new RegExp("(^|\\s)" + className + "(\\s|$)")), " ");
		}
	}
	// slider
	var h = document.documentElement.clientHeight;
	document.getElementById("Jslide").style.height = h + "px";
	var last = 0;
	window.slide = swipe(document.getElementById("Jslide"), {
		// speed: 100,
		callback: function (index , ele) {
			classEvent.removeClassName(ele.parentNode.children[last],"play");
			classEvent.addClassName(ele,"play");
			last = index;
		},
		vertical: true
	});


	// 隐藏地址栏
	setTimeout(function() {
		window.scrollTo(0, 1)
	}, 0);


	// 音乐模块
	var Jaudio = document.getElementById("Jaudio");
	var Jmusic = document.getElementById("Jmusic");
	if (Jaudio && Jmusic) {
		var allowIos = false;//刚开始不允许自动播放
		var sUserAgent = navigator.userAgent.toLowerCase();
		var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad',
			bIsIphoneOs = sUserAgent.match(/iphone/i) == 'iphone',
			bIsIpod = sUserAgent.match(/ipod/i) == 'ipod',
			bIsAndroid = sUserAgent.match(/android/i) == 'android';
		if (bIsIpad || bIsIphoneOs || bIsIpod) {
			touchEvent(document.body, function() {
				if (!allowIos) {
					allowIos = true;
					Jaudio.load();//允许ios播放
					Jaudio.play();//自动播放
					Jmusic.className = "m-music-icon m-music-play";
				};
			});
		} else {
			allowIos = true;
			Jaudio.play();//安卓自动播放
			Jmusic.className = "m-music-icon m-music-play";
		};

		Jmusic.addEventListener("click",function(){
			if (Jmusic.className == "m-music-icon m-music-play") {
				Jaudio.pause();
				Jmusic.className = "m-music-icon";
				Jmusic.style.webkitAnimationPlayState="paused";
				Jmusic.style.MozAnimationPlayState="paused";
			}else {
				Jaudio.play();
				Jmusic.className = "m-music-icon m-music-play";
				Jmusic.style.webkitAnimationPlayState="running";
				Jmusic.style.MozAnimationPlayState="running";
			};
		},false);
	};

	// load分享到朋友圈
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("src", "http://js.3conline.com/wap/common/wxApi.min.js");
	head.appendChild(script);
	script.onload = script.onreadystatechange = function() {
		var f = script.readyState;
		if (f && f != "loaded" && f != "complete") return;
		script.onload = script.onreadystatechange = null;
		wxApi.init(function() {
			var shareData = {
				title: document.title,
				desc: document.getElementsByName("description")[0].getAttribute("content"),
				link: location.href,
				imgUrl: "http://www1.pclady.com.cn/global/2015/h5/admin/img/cover.png"
			};
			var link = document.getElementsByTagName("link");
			for (var i = 0; i < link.length; i++) {
				if (link[i].rel == "apple-touch-icon-precomposed") {
					shareData.imgUrl = link[i].href;
				};
			};
			wx.onMenuShareAppMessage(shareData); // 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
			wx.onMenuShareTimeline(shareData); // 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
			wx.onMenuShareQQ(shareData); // 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
			wx.onMenuShareWeibo(shareData); // 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
		});
	};



})();



