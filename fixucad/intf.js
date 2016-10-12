// <%@page pageEncoding="GBK" %>
// <%@include file="/templateInclude.jsp" %>
!(function () {

	var head = document.getElementsByTagName("head")[0];
	var body = document.getElementsByTagName("body")[0];

	// 头部推广
	var topData = {
		"href" : "http://www1.pcauto.com.cn/zt/gz20151008/jump/jump-wap.html",
		"img" : "http://www1.pcauto.com.cn/wap/20151214/img/zixun.png",
		"name" : "<s></s>\u592a<s></s>\u5e73<s></s>\u6d0b<s></s>\u8f66<s></s>\u53cb<s></s>\u4f1a",
		"des" : "<s></s>\u4e70<s></s>\u8f66<s></s>\u5fc5<s></s>\u901b<s></s>",
		"btn" : "<s></s>\u9a6c<s></s>\u4e0a<s></s>\u52a0<s></s>\u5165"
	};

	function randomString(len) {
		var len = len || 32;
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		var maxPos = chars.length;
		var pwd = "";
		for (i = 0; i < len; i++) {
			pwd += chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	}
	// 随机类名
	var topClassname = randomString(32);
	// 生成样式插入
	var topStyle = '.'+topClassname+'{width:100%;height:48px;position:relative}.'+topClassname+' s{display:none}.'+topClassname+'>div{width:100%;height:48px;background:rgba(233,233,234,.9);vertical-align:top;position:relative;border-bottom:1px solid #ccc;position:fixed;top:0;left:0;z-index:10}.'+topClassname+'>div>span{display:block;width:20px;height:48px;color:#888;text-align:center;line-height:48px;font-size:20px;border-radius:10px;cursor:pointer;position:absolute;left:3px;top:0}.'+topClassname+' a{display:block;padding:0 10px 0 26px;margin:0 auto;overflow:hidden;cursor:pointer;height:48px}.'+topClassname+' a i{float:left;width:40px;height:40px;margin:5px 8px 0 0;border-radius:10px;overflow:hidden}.'+topClassname+' a i img{display:block;width:40px;height:40px;border-radius:10px}.'+topClassname+' a div{float:left;font-size:15px;height:20px;line-height:20px;margin-top:5px}.'+topClassname+' a div p:nth-child(1){font-size:15px;color:#333}.'+topClassname+' a div p:nth-child(2){font-size:12px;color:#777}.'+topClassname+' a span{display:block;position:absolute;right:10px;top:11px;padding:0 5px;color:#fff;font-size:13px;background:#ff7800;border-radius:4px;height:26px;line-height:26px}';
	var topStyleEle = document.createElement("style");
	topStyleEle.type = "text/css";
	topStyleEle.appendChild(document.createTextNode(topStyle));
	head.appendChild(topStyleEle);

	// 生成结构插入页面
	var topHtml = '<div><a><i><img src="'+topData.img+'"></i><div><p>'+topData.name+'</p><p>'+topData.des+'</p></div><span>'+topData.btn+'</span></a><span>×</span></div>';
	var topDivEle = document.createElement("div");
	topDivEle.className = topClassname;
	topDivEle.innerHTML = topHtml;
	topDivEle.setAttribute("style","display:block!important;");//初始化时设置 display:block!important
	body.insertBefore(topDivEle,body.childNodes[0]);

	// 点击关闭
	topDivEle.querySelector("div>span").addEventListener("click",function(){
		topDivEle.setAttribute("style","display:none!important;");
	},false);

	// 点击跳链接
	topDivEle.querySelector("a").addEventListener("click",function(){
		location.href = topData.href;
	},false);


})();