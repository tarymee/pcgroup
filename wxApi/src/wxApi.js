/*
* +++++++++++++++++太平洋网络-微信JS-SDK-封装接口+++++++++++++++
* 1. 加载微信api的js接口
* 2. 检测当前域名，请求对应六网的token接口注入配置信息【如果不属于六网域名则不加载任何接口，return false】
* 3. 初始化wx.config，注册各事件接口
* 3. 暴露给全局函数，请根据需要引用
* 4. 完整 微信JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
*
* author：zhuanghuanbin【庄焕滨】
* Email：zhuanghuanbin@pconline.com.cn
*/
var wxApi = {
	CONSTANTS : {
		wxApiSignUrl_online: "http://mrobot.pconline.com.cn/v3/weixin/getSign?account=pconline_cn&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),
		wxApiSignUrl_auto: "http://mrobot.pcauto.com.cn/v3/weixin/getSign?account=pcautoweixin1&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),
		wxApiSignUrl_baby: "http://mrobot.pcbaby.com.cn/v3/weixin/getSign?account=pcbaby_cn&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),
		wxApiSignUrl_lady: "http://mrobot.pclady.com.cn/v3/weixin/getSign?account=pclady2004&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),
		wxApiSignUrl_games: "http://mrobot.pcgames.com.cn/v3/weixin/getSign?account=pcgames_cn&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),
		wxApiSignUrl_house: "http://mrobot.pchouse.com.cn/v3/weixin/getSign?account=PChouse-2010&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),
		wxApiSignUrl_yqhapp: "http://mrobot.pconline.com.cn/v3/weixin/getSign?account=yqhapp&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),
		wxApiJSUrl: "http://res.wx.qq.com/open/js/jweixin-1.0.0.js"
	},
	getScript: function (option) {
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
	wxConfig: function (data) {
		wx.config({
			debug: false,// 是否开启PC端调试模式 true为开启 false为不开启 上线必须改为false
			appId: data.appId,
			timestamp: data.timestamp,
			nonceStr: data.nonceStr,
			signature: data.signature,
			jsApiList: [
				'checkJsApi',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'hideMenuItems',
				'showMenuItems',
				'hideAllNonBaseMenuItem',
				'showAllNonBaseMenuItem',
				'translateVoice',
				'startRecord',
				'stopRecord',
				'onRecordEnd',
				'playVoice',
				'pauseVoice',
				'stopVoice',
				'uploadVoice',
				'downloadVoice',
				'chooseImage',
				'previewImage',
				'uploadImage',
				'downloadImage',
				'getNetworkType',
				'openLocation',
				'getLocation',
				'hideOptionMenu',
				'showOptionMenu',
				'closeWindow',
				'scanQRCode',
				'chooseWXPay',
				'openProductSpecificView',
				'addCard',
				'chooseCard',
				'openCard'
			]
		});
	},
	init: function (fn) {
		// 如果不是在微信浏览器， 则返回
		if (navigator.userAgent.toLowerCase().match(/micromessenger/i) != "micromessenger") return ;
		var wxApiSignUrl;
		switch (window.location.hostname.replace(/\w+((\.\w+)+)/, "$1")) {
			case ".pconline.com.cn":
			wxApiSignUrl = this.CONSTANTS.wxApiSignUrl_online;
				break;
			case ".pcauto.com.cn":
			wxApiSignUrl = this.CONSTANTS.wxApiSignUrl_auto;
				break;
			case ".pclady.com.cn":
			wxApiSignUrl = this.CONSTANTS.wxApiSignUrl_lady;
				break;
			case ".pcbaby.com.cn":
			wxApiSignUrl = this.CONSTANTS.wxApiSignUrl_baby;
				break;
			case ".pcgames.com.cn":
			wxApiSignUrl = this.CONSTANTS.wxApiSignUrl_games;
				break;
			case ".pchouse.com.cn":
			wxApiSignUrl = this.CONSTANTS.wxApiSignUrl_house;
				break;
			case ".yqhapp.com":
			wxApiSignUrl = this.CONSTANTS.wxApiSignUrl_yqhapp;
				break;
			default :
				// console.log("必须在六网域名内才能引用微信api接口");
				return false;
				break;
		}
		var _this = this;
		_this.getScript({
			url: this.CONSTANTS.wxApiJSUrl,// 请求微信api的js接口
			callback: function(){
				_this.getScript({
					url: wxApiSignUrl,// 请求token权限接口
					callback: function(){
						wx.ready(function () {
							fn && fn();
						});
						wx.error(function (res) {
							// console.log(res.errMsg);
							alert("初始化失败：" + res.errMsg);
						});
					}
				})
			}
		})
	}
}
