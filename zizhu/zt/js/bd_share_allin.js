/**
* 说明
* 时尚百度分享V3 时尚网自助专题专用
* @create by @tarymee_zhuanghuanbin  20150717*
**/
(function(){
	var Jbdshare_wrap = document.getElementById("Jbdshare_wrap");
	if (!Jbdshare_wrap) return;
	var titleReg=/([^_]*)_?.*/;//匹配第一个空格前的字符
	var shareTopic = "#PCLADY手机触屏版#";
	var shareTitle = document.title.replace(titleReg, "$1");
	var shareUrl = window.location.href;
	window.bds_config = {
		'bdText': shareTopic + shareTitle,
		"wbUid" : "1746250183",
		"snsKey" : {
			"tsina" : "1536120080"
		}
	};
	window.shareTimeline=function(){
	    var title = document.title;
	    var url = location.href;
	    if(/(iPad|iPhone|iPod)/i.test(ua)){
	        ucbrowser.web_share(title, '', url, 'kWeixinFriend', '', '', '');
	    }else{
	        ucweb.startRequest("shell.page_share", [title, '', url, 'WechatTimeline', '', '', ''])
	    };
	}
	var ua = navigator.userAgent.toLowerCase();
	var ifWeixin = '', ifUC = '';
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		ifWeixin = '<a class="weixin" onclick="alert(\'请点击当前屏幕右上角按钮进行分享。\')">微信</a>';
	}
	//只有UC浏览器支持调用分享到朋友圈
	if(/UCBrowser/i.test(ua)){
	    ifUC='<a class="timeline weixin" onclick="shareTimeline();">朋友圈</a>'
	}
	var shareContent = '<p class="p_tit">分享到：</p>'+
						'<div id="bdshare" class="bdshare_t bds_tools get-codes-bdshare">'+
						'<a class="bds_tsina">新浪微博</a>'+
						'<a class="bds_tqq">腾讯微博</a>'+
						'<a class="bds_qzone">QQ空间</a>'+ifWeixin+ifUC+
						'</div>';


	Jbdshare_wrap.innerHTML = shareContent;
	var queue = [{
		config: {
			id: 'bdshare_js',
			data: 'type=tools&mini=1&uid=635720'
		}
	}, {
		url: 'http://bdimg.share.baidu.com/static/js/shell_v2.js?t=' + new Date().getHours()
	}]
	for (var i = 0, l = queue.length; i < l; i++) {
		var script = document.createElement('script');
		if (queue[i].config) {
			var c = queue[i].config;
			for (var j in c) {
				if (c.hasOwnProperty(j)) {
					script.setAttribute(j, c[j])
				}
			}
		}
		document.getElementsByTagName('head')[0].appendChild(script);
		queue[i].url && (script.src = queue[i].url);
	}
})();