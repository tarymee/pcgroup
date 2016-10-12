/**
* 说明
* @全站公共评论
**/
(function (window,document) {
	function $$(id) {
		return (typeof id == "object") ? id : document.getElementById(id);
	}
	if (!$$("Jcmt")) return;
	if (typeof CommentNS == "undefined") {
		window.CommentNS = {};
	};
	var AllCommentNS = {
		dataCallback : function () {},
		voteUrl: "http://cmt.pcauto.com.cn/action/comment/support.jsp",//顶
		cmtUrl: "http://cmt.pcauto.com.cn/action/comment/create.jsp",//发表评论接口
		nextPageUrl: "http://cmt.pcauto.com.cn/action/comment/list_new_json.jsp",//评论具体信息
		topHotUrl: "http://cmt.pcauto.com.cn/intf/tophot.jsp",//推荐评论
		logedUserDataUrl: "http://my.pcauto.com.cn/intf/getLogedUser.jsp",//获取已经登录的用户信息
		ipUrl: "http://whois.pconline.com.cn/ipJson.jsp",//获取用户地址
		// cssLink: "http://js.3conline.com/wap/pcauto/common/cmt/v2/auto.css",//样式地址
		cssLink: "http://192.168.50.53/kuaipan/pcgroup/20160122pcautocmt/auto.css",//样式地址
		pageSize: 6,//每页几条评论
		cmtCount: 0,//评论总条数
		cmtHref: "",//评论终端地址
		domain: ".pcauto.com.cn",//主域
		loginHref: "http://m.pcauto.com.cn/my/passport/login.jsp?return=" + location.href,//登陆链接
		area: "广东省广州市", // 城市地区
		userName: "广东省广州市网友",// 用户名，非登录状态下默认为广州，然后再 ip 识别
		userId: "",//用户id
		cookieUserSession: "common_session_id",//检测用户是否存在的cookie名，可覆盖重新配置测试环境
		cookieUserCmu: "cmu",//用户名称的cookie名，可覆盖重新配置测试环境
		topicId: "",//评论id
		artUrl: location.href,
		artTitle: document.title,
		// 评论来源（可选参数 1:PC 2:Android 3:Iphone 4:新浪 5:QQ 6:Wap版 7:微信，默认为1）
		client: /micromessenger/i.test(navigator.userAgent.toLowerCase()) ?  7 : 6,
		//默认不需要验证码
		needCaptcha: 0
	};

	extendJson(CommentNS, AllCommentNS);
	// 评论终端页链接
	CommentNS.cmtHref = AllCommentNS.cmtHref = "http://www.pcauto.com.cn/3g/wap2013/x/cmt2/?" + CommentNS.artUrl + "&" + CommentNS.artTitle;

	// 如果newJson对象中没有allJson对象中的参数 则把allJson对象里面的参数更新到newJson中
	function extendJson(newJson, allJson) {
		for (var x in allJson) {
			if (!(x in newJson)) {
				newJson[x] = allJson[x];
			}
		}
		return newJson;
	}

	var Ajax = {
		get: function(url, fn) {
			var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
			xhr.open("get", url, true); //默认true为异步,false为同步
			if ("withCredentials" in xhr) { //默认情况下widthCredentials为false，我们需要设置widthCredentials为true开启跨域CORS
				xhr.withCredentials = true;
			}
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
					fn.call(this, xhr.responseText);
				}
			};
			xhr.send(null);
		},
		post: function(url, data, fn) {
			var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
			xhr.open("post", url, true); //默认true为异步,false为同步
			if ("withCredentials" in xhr) { //默认情况下widthCredentials为false，我们需要设置widthCredentials为true开启跨域CORS
				xhr.withCredentials = true;
			}
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
					fn.call(this, xhr.responseText);
				}
			};
			xhr.send(data);
		}
	};

	var Cookie = {
		get: function(check_name) {
			check_name = encodeURIComponent(check_name);
			var a_all_cookies = document.cookie.split(";");
			var a_temp_cookie = "";
			var cookie_name = "";
			var cookie_value = "";
			var b_cookie_found = false;
			var i = "";
			var len = a_all_cookies.length;
			for (i = 0; i < len; i++) {
				a_temp_cookie = a_all_cookies[i].split("=");
				cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, "");
				if (cookie_name == check_name) {
					b_cookie_found = true;
					if (a_temp_cookie.length > 1) {
						cookie_value = decodeURIComponent(a_temp_cookie[1].replace(/^\s+|\s+$/g, ""));
					}
					return cookie_value;
					break;
				}
				a_temp_cookie = null;
				cookie_name = "";
			}
			if (!b_cookie_found) {
				return null;
			}
		},
		set: function(name, value, expires, path, domain, secure) {
			var today = new Date();
			today.setTime(today.getTime());
			if (expires) {
				expires = expires * 1000 * 60 * 60 * 24;
			}
			var expires_date = new Date(today.getTime() + (expires));
			document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) +
				((expires) ? ";expires=" + expires_date.toGMTString() : "") + 
			((path) ? ";path=" + path : "") +
				((domain) ? ";domain=" + domain : "") +
				((secure) ? ";secure" : "");
		}
	};

	function touchEvent(elm,fn) {
		if ("ontouchstart" in document.documentElement) {
			elm.addEventListener("touchstart",fn,false);
		}else {
			elm.addEventListener("click",fn,false);
		}
	}

	
	// 简单的事件委托
	function delegateEvent(interfaceEle, selector, type, fn) {
		interfaceEle.addEventListener(type, function(e) {
			if (matchSelector(e.target, selector)) {
				if (fn) {
					fn.call(e.target, e);
				}
			}
		});
	}

	//查找匹配元素
	function matchSelector(ele, selector) {
		if (selector.charAt(0) === "#") {
			return ele.id === selector.slice(1);
		}
		if (selector.charAt(0) === ".") {
			return (" " + ele.className + " ").indexOf(" " + selector.slice(1) + " ") != -1;
		}
		return ele.tagName.toLowerCase() === selector.toLowerCase();
	}

	// 获取距离 ele 最近的符合 selector 的父/组级元素 selector 只能用简单的选择器，#id, tagName, .className，单个无组合
	function closest(ele, selector) {
		var result,
			tmp = ele.parentNode;
		while (tmp) {
			if (matchSelector(tmp, selector)) {
				result = tmp;
				break;
			}
			tmp = tmp.parentNode;
		}
		return result;
	}

	//加载callback函数
	function loadJs(url, fn, callbackName) {
		if (url.indexOf("?") != -1) {
			var url = url + "&callback=" + callbackName;
		} else {
			var url = url + "?callback=" + callbackName;
		}
		window[callbackName] = fn;
		var head = document.getElementsByTagName("head")[0];
		var script = document.createElement("script");
		script.src = url;
		script.onload = script.onreadystatechange = function() {
			var f = script.readyState;
			if (f && f != "loaded" && f != "complete") {
				return;
			}else {
				script.onload = script.onreadystatechange = null;
				head.removeChild(script);
				delete window[callbackName];
			}
		};
		head.appendChild(script);
	}

	//提示信息
	function showTopTip(msg) {
		var tipEle = $$("JtopTipMsg");
		if (!tipEle) {
			tipEle = document.createElement("div");
			tipEle.id = "JtopTipMsg";
			tipEle.style.cssText = "display:none;width:120px;padding:10px;line-height:20px;font-size:12px;background-color:rgba(000,000,000,0.9);-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;color:#fff;text-align:center;-webkit-transition:all 0.3s ease-in;transition:all 0.3s ease-in;position:fixed;top:50%;left:50%;margin-left:-70px;margin-top:-20px;opacity:1;z-index:999;";
			document.getElementsByTagName("html")[0].appendChild(tipEle);
		}
		tipEle.innerHTML = msg;
		tipEle.style.display = "block";
		setTimeout(function() {
			tipEle.style.opacity = "1";
		}, 0);
	}
	//隐藏提示信息
	function hideTopTip() {
		var tipEle = $$("JtopTipMsg");
		if (tipEle) {
			setTimeout(function() {
				tipEle.style.opacity = "0";
				setTimeout(function() {
					tipEle.style.display = "none";
				}, 300);
			}, 1500);
		}
	}


	function show(ele) {
		ele.style.display = "block";
	}

	function hide(ele) {
		ele.style.display = "none";
	}


	//引入css
	var link = document.createElement("link");
	link.setAttribute("type","text/css");
	link.setAttribute("rel","stylesheet");
	link.setAttribute("href",CommentNS.cssLink);
	document.getElementsByTagName("head")[0].appendChild(link);



	var body = document.getElementsByTagName("body")[0];
	var html = document.getElementsByTagName("html")[0];


	//初始化html
	var Jcmt = $$("Jcmt");
	var cmtHtml = ['<div class="m-cmt-section" id="JcmtAllSection"><span class="m-cmt-section-mark">所有评论</span></div>',
	'<div class="m-cmt-list" id="JcmtList"></div>',
	'<a class="m-cmt-more" id="JcmtMore" style="display:none;"></a>',
	'<div class="m-cmt-none" id="JcmtNone" style="display:none;"><span style="display:none;">>_< lll</span><p>暂无评论，快来抢沙发！</p></div>',
	'<div class="m-cmt-loading" id="JcmtLoading" style="display:none;"><p>正在加载中...</p></div>'].join("");
	Jcmt.innerHTML = cmtHtml;


	// 插入背景
	var bgEle = document.createElement("div");
	bgEle.className = "m-cmt-bg";
	bgEle.id = "JcmtBg";
	bgEle.style.display = "none";
	html.appendChild(bgEle);

	// 插入导航
	var navEle = document.createElement("div");
	navEle.className = "m-cmt-nav";
	navEle.id = "JcmtNav";
	navEle.style.display = "none";
	html.appendChild(navEle);

	// 在页面底部插入空白div 抵消fix的底部
	var bottomEle = document.createElement("div");
	bottomEle.className = "m-cmt-bottom-space";
	bottomEle.id = "JcmtBottomSpace";
	body.appendChild(bottomEle);

	// 插入底部条
	var tfEle = document.createElement("div");
	tfEle.className = "m-cmt-tf";
	tfEle.id = "JcmtTf";
	tfEle.innerHTML = '<div class="m-cmt-tf-con"><div class="m-cmt-tf-input" id="JcmtPostOpen">我来说两句...</div><a class="m-cmt-tf-num" id="JcmtCount" style="display:none;"></a><div class="m-cmt-tf-nav-btn" id="JcmtNavBtn" style="display:none;"></div></div>';
	html.appendChild(tfEle);

	// 插入评论框
	var postEle = document.createElement("div");
	postEle.className = "m-cmt-post-wrap";
	postEle.id = "JcmtPostWrap";
	// postEle.style.height = document.body.clientHeight + "px";
	postEle.style.display = "none";
	var cmtPostHtml = ['<div class="m-cmt-post" id="JcmtPost">',
	'<div class="m-cmt-post-th">',
	'<div class="m-cmt-post-th-l" id="JcmtPostClose">取消</div>',
	'<div class="m-cmt-post-th-r"><input type="submit" name="" value="发送" id="JcmtSubmit"></div>',
	'<div class="m-cmt-post-th-m">回复</div>',
	'</div>',
	'<div class="m-cmt-post-tb"><textarea rows="" cols="" id="JcmtCon" placeholder=""></textarea></div>',
	'<div class="m-cmt-post-identify" id="JcmtCaptchaWrap" style="display:none;">',
	'<span><input type="text" placeholder="" id="JcmtCaptcha"></span>',
	'<img src="http://www'+CommentNS.domain+'/blank.gif" id="JcmtCaptchaImg">',
	'</div>',
	'<div class="m-cmt-post-tf">',
	'<div class="m-cmt-post-emo-btn" id="JcmtFaceBtn"></div>',
	'<div class="m-cmt-post-tf-r" id="JcmtUser"><a class="m-cmt-post-tf-r-btn" href="'+CommentNS.loginHref+'">登录</a></div>',
	'</div>',
	'<div class="m-cmt-post-emo-list disn" id="JcmtFaceList"></div>',
	'</div>'].join("");
	postEle.innerHTML = cmtPostHtml;
	html.appendChild(postEle);



	var JcmtAllSection = $$("JcmtAllSection");//所有评论按钮
	var JcmtList = $$("JcmtList");//评论列表
	
	var JcmtNone = $$("JcmtNone");//暂无评论
	var JcmtLoading = $$("JcmtLoading");//正在加载中
	
	var JcmtMore = $$("JcmtMore");//所有评论按钮
	
	var JcmtBg = $$("JcmtBg");//灰色背景
	var JcmtPostClose = $$("JcmtPostClose");//取消发表评论
	var JcmtPostOpen = $$("JcmtPostOpen");//关闭评论

	var JcmtPostWrap = $$("JcmtPostWrap");//发表评论外壳
	var JcmtPost = $$("JcmtPost");//发表评论外壳
	var JcmtUser = $$("JcmtUser");//登录按钮
	var JcmtCon = $$("JcmtCon");//评论内容框
	var JcmtCaptchaWrap = $$("JcmtCaptchaWrap");//验证码框
	var JcmtCaptcha = $$("JcmtCaptcha");//验证码内容
	var JcmtCaptchaImg = $$("JcmtCaptchaImg");//验证码图片
	var JcmtSubmit = $$("JcmtSubmit");//提交按钮

	var JcmtFaceBtn = $$("JcmtFaceBtn");//表情按钮
	var JcmtFaceList = $$("JcmtFaceList");//表情框

	var JcmtNav = $$("JcmtNav");//文章导航
	var JcmtTf = $$("JcmtTf");//底部条
	var JcmtBottomSpace = $$("JcmtBottomSpace");//底部空白占位
	var JcmtCount = $$("JcmtCount");//评论数
	var JcmtNavBtn = $$("JcmtNavBtn");//文章导航按钮



	var replyData = {};// 回复已有评论时保存其内容
	var screenScroll = 0;// 记录屏幕滚动位置



	// 阻止默认事件
	JcmtBg.addEventListener("touchmove",function(e){
		e.preventDefault();
	},false);
	// JcmtPost.addEventListener("touchmove",function(e){
	// 	e.preventDefault();
	// },false);



	// 点击关闭评论和导航
	JcmtBg.addEventListener("click",function(){
		// 关闭导航
		openCmtNav(0);
		// 关闭评论
		openCmtPost(0);
	},false);

	// 处理文章导航
	if (typeof(CommentNS.navData) != "undefined" && CommentNS.navData.length > 0) {
		// 显示导航按钮
		show(JcmtNavBtn);
		// 写入导航
		var html = '<div class="m-cmt-nav-con">';
		for (var i = 0; i < CommentNS.navData.length; i++) {
			var isCur = false;
			if (location.href == CommentNS.navData[i].url || location.href + "#content_page_1" == CommentNS.navData[i].url) {
				isCur = true;
			};
			html += '<a href="' + CommentNS.navData[i].url + '" class="' + (isCur ? 'cur' : '') + '">' + (i+1) + '.'+ CommentNS.navData[i].title + '</a>';
		};
		html += '</div>';
		JcmtNav.innerHTML = html;
		var JcmtNavAs = JcmtNav.querySelectorAll(".m-cmt-nav-con a");
		// 最后一次点击的导航
		var navLastClick = 0;
		for (var i = 0; i < JcmtNavAs.length; i++) {
			(function (m) {
				if (JcmtNavAs[m].className == "cur") {
					navLastClick = m;
				}

				JcmtNavAs[m].addEventListener("click",function(){
					// 如果是当前导航，则不执行操作
					if (JcmtNavAs[m].className == "cur") {
						e.preventDefault();
					}else {
						JcmtNavAs[navLastClick].className = "";
						JcmtNavAs[m].className = "cur";
						openCmtNav(0);
						navLastClick = m;
						// 点击导航的时候执行callback
						if (typeof(CommentNS.navDataClick) == "function") {
							CommentNS.navDataClick(m);
						};
					};
				},false);
			})(i);
		};
		// 赋予按钮事件
		touchEvent(JcmtNavBtn,function () {
			JcmtNavBtn.className == "m-cmt-tf-nav-btn" ? openCmtNav(1) : openCmtNav(0);
		});
	}else {
		// 隐藏导航按钮
		hide(JcmtNavBtn);
	}

	// 导航关闭打开
	function openCmtNav(flag) {
		if (flag) {
			JcmtNavBtn.className = "m-cmt-tf-nav-btn cur";
			body.style.overflow = "hidden";
			show(JcmtNav);
			show(JcmtBg);
		}else {
			JcmtNavBtn.className = "m-cmt-tf-nav-btn";
			body.style.overflow = "scroll";
			hide(JcmtNav);
			hide(JcmtBg);
		};
	}

	//+++++++++++点击显示隐藏表情 插入表情代码++++++++++++++
	touchEvent(JcmtFaceBtn,function () {
		if (JcmtFaceList.children.length == 0) {
			JcmtFaceList.innerHTML = '<img title="[嘻嘻]" src="http://www.pconline.com.cn/images/comment/face201.gif" /><img title="[酷]" src="http://www.pconline.com.cn/images/comment/face202.gif" /><img title="[汗]" src="http://www.pconline.com.cn/images/comment/face203.gif"><img title="[鄙视]" src="http://www.pconline.com.cn/images/comment/face204.gif" /><img title="[阴险]" src="http://www.pconline.com.cn/images/comment/face205.gif" /><img title="[强]" src="http://www.pconline.com.cn/images/comment/face206.gif" /><img title="[弱]" src="http://www.pconline.com.cn/images/comment/face207.gif" /><img title="[花]" src="http://www.pconline.com.cn/images/comment/face208.gif" /><img title="[便便]" src="http://www.pconline.com.cn/images/comment/face209.gif" /><img title="[亲]" src="http://www.pconline.com.cn/images/comment/face210.gif" />';
		};
		if (JcmtFaceBtn.className == "m-cmt-post-emo-btn") {
			openCmtEmo(1);
		}else {
			openCmtEmo(0);
		};
	});

	// 表情关闭打开
	function openCmtEmo(flag) {
		if (flag) {
			JcmtFaceList.className = "m-cmt-post-emo-list";
			JcmtFaceBtn.className = "m-cmt-post-emo-btn cur";
			JcmtCon.blur();
		}else {
			JcmtFaceList.className = "m-cmt-post-emo-list disn";
			JcmtFaceBtn.className = "m-cmt-post-emo-btn";
		};
	}


	// 点击表情高亮 写入回复框
	delegateEvent(JcmtFaceList, "img", ("ontouchstart" in document.documentElement ? "touchstart" : "click"), function() {
		var that = this;
		that.className = "fn-hlight";
		setTimeout(function() {
			that.className = "";
		}, 300);
		insertText(JcmtCon,that.title);
		moveEnd(JcmtCon);
	});
	// touchstart之后是click，如果不聚焦的话每次添加表情输入框都会收起
	delegateEvent(JcmtFaceList, "img", "click", function() {
		JcmtCon.focus();
	});

	JcmtFaceList.addEventListener("click",function(){
		JcmtCon.focus();
	},false);

	touchEvent(JcmtFaceList,function () {
		JcmtCon.focus();
	});
	


	//在textarea插入
	function insertText(obj, str) {
		if (typeof obj.selectionStart === "number" && typeof obj.selectionEnd === "number") {
			var startPos = obj.selectionStart,
				endPos = obj.selectionEnd,
				cursorPos = startPos,
				tmpStr = obj.value;
			obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
			cursorPos += str.length;
			obj.selectionStart = obj.selectionEnd = cursorPos;
		} else {
			obj.value += str;
		}
	}
	//光标移到最后
	function moveEnd(obj) {
		JcmtCon.focus();
		var len = obj.value.length;
		if (typeof obj.selectionStart == "number" && typeof obj.selectionEnd == "number") {
			obj.selectionStart = obj.selectionEnd = len;
		}
	}


	//+++++++++++验证码功能++++++++++++++++
	if (CommentNS.needCaptcha) {
		updateCaptcha(1);
	} else {
		updateCaptcha(0);
	}
	//赋予点击更换验证码事件
	touchEvent(JcmtCaptchaImg,function () {
		getCaptcha();
	});

	// 验证码显示隐藏
	function updateCaptcha(isShow) {
		if (isShow) {
			CommentNS.needCaptcha = 1;
			show(JcmtCaptchaWrap);
			getCaptcha();
		} else {
			CommentNS.needCaptcha = 0;
			hide(JcmtCaptchaWrap);
		}
	}
	// 更新验证码
	function getCaptcha() {
		JcmtCaptchaImg.src = "http://captcha" + CommentNS.domain + "/captcha/v.jpg?" + new Date().getTime();
	}
	// 评论关闭打开
	function openCmtPost(flag) {
		if (flag) {
			// 记录页面滚动位置
			screenScroll = document.body.scrollTop || document.documentElement.scrollTop;
			JcmtPostWrap.style.height = document.body.clientHeight + "px";
			// hide(body);
			body.style.visibility = "hidden";
			// 打开评论之前先关闭导航
			openCmtNav(0);
			show(JcmtPostWrap);
			// 打开评论也要打开输入法
			JcmtCon.focus();
			// 回到顶部
			window.scrollTo(0, 1);
			// 隐藏底部条
			hide(JcmtTf);
			hide(JcmtBottomSpace);
		}else {
			// show(body);
			body.style.visibility = "visible";
			hide(JcmtPostWrap);
			// 页面滚到记录的位置
			window.scrollTo(0,screenScroll);
			// 显示底部条
			show(JcmtTf);
			show(JcmtBottomSpace);
			// 关闭评论也要关闭输入法
			JcmtCon.blur();
			// 关闭评论也要关闭表情
			openCmtEmo(0);
		};
	}

	//+++++++++点击回复评论+++++++++
	delegateEvent(Jcmt, ".m-cmt-list-item-repost", "click", function(e) {
		var item = closest(this, ".m-cmt-list-item");
		if (!item) return;

		var metaData = item.getAttribute("data-meta").split(",");

		replyData = {};//清除回复评论内容
		var replyBody = item.querySelector(".m-cmt-list-item-tb > .m-cmt-list-item-body"); // 该评论的内容
		var replyRepeat = item.querySelector(".m-cmt-list-item-tb .m-cmt-list-item-repeat"); // 该评论的嵌套，如果有
		replyData.content = replyBody.innerHTML;
		if (replyRepeat) {
			replyData.quoteContent = replyRepeat.innerHTML;
		}
		replyData.floor = metaData[0];
		replyData.userName = metaData[1];
		replyData.id = metaData[2];

		JcmtCon.placeholder = "回复" + metaData[0] + "楼（" + metaData[1] + "）：";

		// 打开评论
		openCmtPost(1);

	});

	// 点击显示
	JcmtPostOpen.addEventListener("click",function(){
		replyData = {};//清除回复评论内容
		JcmtCon.placeholder = "我来说两句...";
		// 打开评论
		openCmtPost(1);
	},false);


	// 点击隐藏
	JcmtPostClose.addEventListener("click",function(){
		openCmtPost(0);
	},false);

	//回复评论
	touchEvent(JcmtSubmit,function () {
		submitMessage();
	});


	//公用发送信息
	function submitMessage() {
		if(JcmtSubmit.getAttribute("disabled") == "1") return;
		JcmtSubmit.setAttribute("disabled", "1");

		//获取数据
		var ret = {
			isEncode: 1,
			//对输入的html标签进行编码
			encodeHtml: 1,
			windowname: 0,
			url: CommentNS.artUrl,
			title: CommentNS.artTitle,
			id: CommentNS.topicId || "",
			username: CommentNS.userName,
			needCaptcha: CommentNS.needCaptcha,
			// 评论来源（可选参数 1:PC 2:Android 3:Iphone 4:新浪 5:QQ 6:Wap版 7:微信，默认为1）
			client: CommentNS.client,
			captcha: JcmtCaptcha.value.trim(),
			content: translateFace(JcmtCon.value.trim())
		};
		// 如果是回复别人的评论，需要带回复楼层
		if (replyData.floor) {
			ret.replyFloor2 = replyData.floor || 0;
		};

		//验证评论
		if (ret.content == "") {
			JcmtCon.placeholder = "请先输入您的评论！";
			showTopTip("请先输入您的评论！");
			hideTopTip();
			JcmtSubmit.removeAttribute("disabled");
			return false;
		}
		if (ret.content.length > 500) {
			JcmtCon.placeholder = "评论内容字数不能超过500！";
			showTopTip("评论内容字数不能超过500！");
			hideTopTip();
			JcmtSubmit.removeAttribute("disabled");
			return false;
		}
		if (ret.needCaptcha && ret.captcha=="") {
			showTopTip("请填写验证码。");
			hideTopTip();
			JcmtSubmit.removeAttribute("disabled");
			return false;
		}

		showTopTip("正在发送");
		ret = encodeDataValue(ret);//对ret进行转码
		var postData = serialize(ret);//格式化数据 such as a=1&b=2

		// Ajax提交评论
		// Ajax.post(CommentNS.cmtUrl, postData, function(response) {
		// 	handleSuccessSend(response);
		// });

		// post方法提交评论
		loadJs(CommentNS.cmtUrl + "?" + postData, function(json) {
			handleSuccessSend(json);
		}, "postComment");
	}





	//发表成功
	function handleSuccessSend(responseText) {
		try {
			// var data = JSON.parse(responseText);//用ajax时格式化数据
			var data = responseText;//post方法提交评论时
		} catch (e) {
			hideTopTip();
			JcmtSubmit.removeAttribute("disabled");
			alert("很抱歉，提交数据发生异常");
			return;
		}

		// 如果一路成功
		// 验证码错误或别的错误需要根据 error code 等进行 if 分支处理
		if (data.resultCode >= 0) {
			//发表时先插入评论内容
			prependNewComment(data);

			//提交后清除已经发表的评论数据
			JcmtCon.value = "";
			JcmtCaptcha.value = "";

			//提交后隐藏无评论模块
			hide(JcmtNone);

			// 提交后关闭回复框
			openCmtPost(0);

			// 提交后跳到指定位置
			document.body.scrollTop = document.body.scrollTop + JcmtAllSection.getBoundingClientRect().top;

			showTopTip("发送成功");
		}else if (data.resultCode == -9) {
			showTopTip(data.resultMsg.split("[Error")[0]);
			updateCaptcha(1);
		} else {
			showTopTip(data.resultMsg.split("[Error")[0]);
			// 是否需要校验码
			if (data.commentCount > 5) {
				updateCaptcha(1);
			} else {
				updateCaptcha(CommentNS.needCaptcha || 0);
			}
		}

		hideTopTip();
		JcmtSubmit.removeAttribute("disabled");
	}


	function getAvatar(id) {
		id = "" + id;
		var ret = [],
			i = 0,
			l = id.length;
		while (i + 2 <= l) {
			ret.push(id.slice(i, i + 2));
			i += 2;
		}
		if (i < l) {
			ret.push(id.charAt(i));
		}
		return 'http://i6.3conline.com/images/upload/upc/face/' + ret.join('/') + '/' + id + '_100x100';
	}



	//+++++++++++插入刚评论的数据+++++++++++++++
	function prependNewComment(data) {
		var divEle = document.createElement("div");
		divEle.className = "m-cmt-list-item";
		divEle.setAttribute("data-meta", data.floor + "," + data.showName + "," + data.commentId);
		// 是否微信 手机
		var clientClass = CommentNS.client == 7 ? "m-cmt-list-item-name-wechat" : "m-cmt-list-item-name-mobile";
		// 用户有没有登陆，取得用户id
		var noNameClass = CommentNS.userId != "" ? "" : "m-cmt-list-item-name-none";

		var html = '';
		html += '<div class="m-cmt-list-item-l">';
		html += CommentNS.userId != '' ? '<a href="http://m' + CommentNS.domain + '/my/' + CommentNS.userId + '/">' : '';
		html += '<img src="' + getAvatar(CommentNS.userId ? CommentNS.userId : "00000000") + '" alt="" />';
		html += CommentNS.userId != '' ? '</a>' : '';
		html += '</div>';
		html += '<div class="m-cmt-list-item-con">';
		html += '<div class="m-cmt-list-item-th">';
		html += '<span class="m-cmt-list-item-name ' + clientClass + ' ' + noNameClass + '">' + data.showName + '</span>';
		html += '<span class="m-cmt-list-item-floor">' + data.floor + '楼</span>';
		html += '</div>';
		html += '<div class="m-cmt-list-item-tb">';
		html += generateQutoteContent();
		html += '<div class="m-cmt-list-item-body">' + data.brief + '</div>';
		html += '</div>';
		html += '<div class="m-cmt-list-item-tf">';
		html += '<div class="m-cmt-list-item-tip">感谢参与评论，您的评论内容将在审核后公开。</div>';
		html += '</div>';
		html += '</div>';
		divEle.innerHTML = html;
		if (JcmtList.children.length == 0) {
			JcmtList.appendChild(divEle);
		} else {
			JcmtList.insertBefore(divEle, JcmtList.firstElementChild);
		}
	}

	// 给新插入到页面的评论增加回复内容（如果是回复）
	function generateQutoteContent() {
		if (!replyData.floor) return "";
		var html = '<div class="m-cmt-list-item-repeat">';
		if (replyData.quoteContent) {
			html += '<div class="m-cmt-list-item-repeat">' + replyData.quoteContent + '</div>';
		}

		html += '<div class="m-cmt-list-item-inner">'
			+ '<div class="m-cmt-list-item-th">'
			+ '<span class="m-cmt-list-item-name">' + replyData.userName + '</span>'
			+ '<span class="m-cmt-list-item-floor">' + replyData.floor + '楼</span>'
			+ '</div>'
			+ '<div class="m-cmt-list-item-body">' + replyData.content + '</div>'
			+ '</div>';
		html += '</div>';
		return html;
	}

	// 发送评论前转换表情代码
	function translateFace(str) {
		var code = ["{201}", "{202}", "{203}", "{204}", "{205}", "{206}", "{207}", "{208}", "{209}", "{210}"];
		var name = ["[嘻嘻]", "[酷]", "[汗]", "[鄙视]", "[阴险]", "[强]", "[弱]", "[花]", "[便便]", "[亲]"];
		var p;
		for (var i = code.length - 1; i >= 0; i--) {
			p = new RegExp(name[i].replace("[", "\\[").replace("]", "\\]"), "gm");
			str = str.replace(p, code[i]);
		}
		return str;
	}

	//转码
	function encodeDataValue(data) {
		var ls = ["title", "username", "area", "content"];
		for (var i in data) {
			if (ls.indexOf(i) !== -1) {
				data[i] = encodeURIComponent(encodeURIComponent(data[i]));
			}
		}
		return data;
	}

	// serialize json object to post param string, such as a=1&b=2
	function serialize(obj) {
		var ret = [],
			i;
		for (i in obj) {
			if (obj.hasOwnProperty(i)) {
				ret.push("" + i + "=" + obj[i]);
			}
		}
		return ret.join("&");
	}


	
	var isDrawHotComments = false;// 是否出热门评论
	var index = 0;//已经加载的评论条数
	var pageNo = 1;//初始化评论信息页数
	show(JcmtLoading);//显示正在加载中


	//热门评论函数
	loadJs(CommentNS.topHotUrl + "?encodeHtml=1&url=" + CommentNS.artUrl,function (json) {
		if (json.error || json.comments.length == 0 || json.comments.length < 3) {
			isDrawHotComments = false;
		}else {
			isDrawHotComments = true;
			JcmtAllSection.querySelector(".m-cmt-section-mark").innerHTML = "热门评论";
			var data = json.comments;
			for (var i = 0; i < 3; i++) {
				JcmtList.appendChild(commentDiv(data[i]));
			};
		};

		drawComments();//加载第一页评论
	},"loadHotComments");


	//加载评论函数
	function drawComments() {
		JcmtMore.innerHTML = "正在加载中...";
		loadJs(CommentNS.nextPageUrl + "?encodeHtml=1&urlHandle=1&url=" + CommentNS.artUrl + "&pageNo=" + pageNo + "&pageSize=" + CommentNS.pageSize, function(json) {
			if (pageNo == 1) { //第一次加载时
				hide(JcmtLoading); //隐藏正在加载中
				if (json.error) { //没有评论时
					show(JcmtNone);
					return false;
				} else {
					if (json.data.length == 0) { //评论已经注册但后台还未审核完成时
						show(JcmtNone);
					} else {
						show(JcmtMore);
						CommentNS.cmtCount = AllCommentNS.cmtCount = json.total;
					};
					CommentNS.topicId = json.tid; //获取评论id
				}
				// 评论数
				if (JcmtCount) {
					JcmtCount.style.display = "block";
					JcmtCount.innerHTML = "<i>" + CommentNS.cmtCount + "</i>";
					JcmtCount.setAttribute("href", CommentNS.cmtHref);
				};
				//如果评论总数少于等于第一页加载个数 , 则不显示
				if (CommentNS.pageSize >= CommentNS.cmtCount) {
					hide(JcmtMore);
				}else {
					JcmtMore.innerHTML = "查看所有评论(<em>" + CommentNS.cmtCount + "</em>) &gt;";
					JcmtMore.setAttribute("href", CommentNS.cmtHref);
				}

				// callback
				if (typeof(CommentNS.dataCallback) == "function") {
					CommentNS.dataCallback(CommentNS);
				};
			}


			// 如果没有热门评论 则出最新评论
			if (!isDrawHotComments) {
				var data = json.data;
				for (var i = 0; i < data.length; i++) {
					index++; //个数累加
					JcmtList.appendChild(commentDiv(data[i]));
				}
			};


		}, "loadComments");
	}

	function commentDiv(data) {
		var divEle = document.createElement("div");
		var html = "";
		divEle.className = "m-cmt-list-item";
		divEle.setAttribute("data-meta", data.floor + "," + data.nickName + "," + data.id);
		var clientClass; //类名
		var clientNum = data.client; //评论从哪里发布 7:微信 6:炫版手机 1:pc
		if (clientNum == 6) {
			clientClass = "m-cmt-list-item-name-mobile";
		} else if (clientNum == 7) {
			clientClass = "m-cmt-list-item-name-wechat";
		} else {
			clientClass = "";
		};
		var noNameClass = "";
		if (data.userId == 0) {
			noNameClass = "m-cmt-list-item-name-none";
		};
		html += '<div class="m-cmt-list-item-l">';
		html += data.userId != 0 ? '<a href="http://m'+CommentNS.domain+'/my/' + data.userId + '/">' : '';
		html += '<img src="' + getAvatar(data.userId ? data.userId : "00000000") + '" alt="" />';
		html += data.userId != 0 ? '</a>' : '';
		html += '</div>';
		html += '<div class="m-cmt-list-item-con">';
		html += '<div class="m-cmt-list-item-th"><span class="m-cmt-list-item-name ' + clientClass + ' ' + noNameClass + '">' + data.nickName + '</span><span class="m-cmt-list-item-floor">' + data.floor + '楼</span></div>';
		html += '<div class="m-cmt-list-item-tb">';
		html += data.replyRef ? genReplyHtml(data.replyRef) : '';
		html += '<div class="m-cmt-list-item-body">' + data.content + '</div>';
		html += '</div>';
		html += '<div class="m-cmt-list-item-tf">';
		html += '<span class="m-cmt-list-item-date">' + data.createTime + '</span>';
		html += '<span class="m-cmt-list-item-btns"><a class="m-cmt-list-item-ding" onclick="cmt4_vote(' + data.id + ',1)"><i id="support' + data.id + '">' + data.support + '</i></a><a class="m-cmt-list-item-repost">回复</a></span>';
		html += '</div>';
		html += '</div>';
		divEle.innerHTML = html;
		hideFloor(divEle); //隐藏超过的楼层
		return divEle;
	}

	//隐藏超过的楼层
	function hideFloor(ele) {
		var JcmtListItemRepeat = ele.querySelectorAll(".m-cmt-list-item-repeat");
		if (JcmtListItemRepeat.length <= 3) return;
		for (var j = 1; j < JcmtListItemRepeat.length - 1; j++) {
			var aEle = document.createElement("a");
			aEle.className = "m-cmt-list-item-more";
			aEle.innerHTML = "↓ 点击展开隐藏楼层";
			(function(m) {
				if (m == 1) {
					JcmtListItemRepeat[1].insertBefore(aEle, JcmtListItemRepeat[1].lastChild);
					JcmtListItemRepeat[m].className = "m-cmt-list-item-repeat fn-no-m";
				} else {
					JcmtListItemRepeat[m].className = "m-cmt-list-item-repeat fn-no-m fn-no-bm";
				}
			})(j);
		}
	}

	//显示隐藏楼层
	function showfloor(btn) {
		var JcmtListItem = closest(btn, ".m-cmt-list-item"),
			JcmtListItemRepeat = JcmtListItem.querySelectorAll(".m-cmt-list-item-repeat");
		hide(btn);
		for (var i in JcmtListItemRepeat) {
			JcmtListItemRepeat[i].className = ("m-cmt-list-item-repeat");
		}
	}
	//点击显示楼层
	delegateEvent(Jcmt, ".m-cmt-list-item-more", ("ontouchstart" in document.documentElement ? "touchstart" : "click"), function(e) {
		showfloor(this);
	});



	//取得引用内容
	function genReplyHtml(data) {
		var html = '<div class="m-cmt-list-item-repeat">';
		if (data.replyRef) {
			html += genReplyHtml(data.replyRef);
		}


		var clientClass = "";//类名
		var clientNum = data.client;//评论从哪里发布 7:微信 6:炫版手机 1:pc
		if (clientNum == 6) {
			clientClass = "m-cmt-list-item-name-mobile";
		}else if (clientNum == 7) {
			clientClass = "m-cmt-list-item-name-wechat";
		}

		var noNameClass = "";
		if (data.userId == 0) {
			noNameClass = "m-cmt-list-item-name-none";
		};


		html += '<div class="m-cmt-list-item-inner">';
		html += '<div class="m-cmt-list-item-th">';
		html += '<span class="m-cmt-list-item-name '+ clientClass +' '+noNameClass+'">' + data.nickName + '</span>';
		html += '<span class="m-cmt-list-item-floor">' + data.floor + '楼</span>';
		html += '</div>';
		html += '<div class="m-cmt-list-item-body">' + data.content + '</div>';
		html += '</div>';
		html += '</div>';
		return html;
	}


	//++++++++获取用户地理位置并且存入cookie+++++++++++
	if (Cookie.get("m_CMT4_IP_AREA")) {
		CommentNS.area = Cookie.get("m_CMT4_IP_AREA");
	} else {
		loadJs(CommentNS.ipUrl,function (json) {
			var area = "";
			if (json.pro == json.city) {
				area = json.city;
			} else {
				area = json.pro + json.city;
			}
			if (area == "") {
				area = CommentNS.area;
			};
			CommentNS.area = area;

			Cookie.set("m_CMT4_IP_AREA", area, 90, "/", CommentNS.domain);
		},"getArea");
	}


	//++++++++++++登录和登出功能++++++++++
	//插入用户信息
	function insertLogedUser() {
		JcmtUser.innerHTML = '<a class="m-cmt-post-tf-r-avt" href="http://m'+CommentNS.domain+'/my/"><img src="' + getAvatar(CommentNS.userId) + '" /></a>';
	}

	setTimeout(function() {
		//如果用户有登录，则插入用户信息
		if (Cookie.get(CommentNS.cookieUserSession) && Cookie.get(CommentNS.cookieUserCmu)) {
			loadJs(CommentNS.logedUserDataUrl,function (json) {
				CommentNS.userName = json.nickName;
				CommentNS.userId = json.id;
				insertLogedUser();
			},"getLogedUserInfo");
		}else {
			CommentNS.userName = CommentNS.area ? CommentNS.area + "网友" : "广东省广州市网友";//如果用户未登录则说明他是哪个地区的网友
		}
	}, 100);



	// +++++++++++顶评论++++++++++++++
	function voteComment(id, support) {
		loadJs(CommentNS.voteUrl + "?cid=" + id + "&sp=" + support + "&version=2" + "&r=" + Math.random(),function (json) {
			if (json.code != 1) {
				showTopTip(json.msg);
				hideTopTip();
			}else {
				// voteSuccess("support" + id);
				// 投票成功
				var ele = $$("support" + id);
				if (!ele) return;
				ele.innerHTML = parseFloat(ele.innerHTML) + 1;
				var pw = 18;
				var plus = $$("Jplus1");
				if (!plus) {
					plus = document.createElement("div");
					plus.id = "Jplus1";
					plus.style.cssText = "position:absolute;width:" + pw + "px;line-height:20px;color:#F00;font-weight:bold;opacity:0;";
					plus.innerHTML = "+1";
					document.body.appendChild(plus);
				}
				var style = plus.style;
				style.webkitTransition = ""; // 先把动画效果置空，避免从别的地方滑入
				var p = ele.parentNode,
					pos = p.getBoundingClientRect(),
					w = p.offsetWidth;
				var dtop = document.body.scrollTop,
					dleft = document.body.scrollLeft;
				var left = dleft + pos.left + w / 2 - pw / 2,
					top = dtop + pos.top - 20;
				style.display = "block";
				style.left = left + "px";;
				style.top = top + "px";
				style.opacity = 1;
				setTimeout(function() {
					style.webkitTransition = "all 0.3s ease-in";
					style.opacity = 0;
					style.top = top - 20 + "px";
					setTimeout(function() {
						style.display = "none";
					}, 300);
				}, 100);

			};
		},"postVote");
	}
	// 扩展window方法
	window.cmt4_vote = voteComment;

})(window, document);
