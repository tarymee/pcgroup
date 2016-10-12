function $$(id) {
	return (typeof id == "object") ? id : document.getElementById(id);
}


/*-------------------------- +
//提示信息 隐藏信息
+-------------------------- */
function showMsg(msg) {
	var JshowMsgWrap = document.getElementById("JshowMsgWrap");
	if (!JshowMsgWrap) {
		JshowMsgWrap = document.createElement("div");
		JshowMsgWrap.id = "JshowMsgWrap";
		JshowMsgWrap.style.cssText = "display:none;width:100%;height:100%;position:fixed;top:0;left:0;opacity:1;z-index:9999;background-color:rgba(255,255,255,0.5);";
		//-webkit-transition:all 0.3s ease-in;transition:all 0.3s ease-in;
		document.body.appendChild(JshowMsgWrap);
		JshowMsgWrap.innerHTML = '<div id="JshowMsg" style="width:240px;padding:10px;line-height:25px;font-size:14px;background-color:rgba(000,000,000,0.9);-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;color:#fff;text-align:center;position:absolute;top:50%;left:50%;margin-left:-130px;margin-top:-25px;"></div>';
	}
	document.getElementById("JshowMsg").innerHTML = msg;
	JshowMsgWrap.style.display = "block";
	setTimeout(function() {
		JshowMsgWrap.style.opacity = "1";
	}, 0);
}
function hideMsg(time) {
	if (!time) {
		var time = 500;
	};
	var JshowMsgWrap = document.getElementById("JshowMsgWrap");
	if (JshowMsgWrap) {
		setTimeout(function() {
			JshowMsgWrap.style.opacity = "0";
			setTimeout(function() {
				JshowMsgWrap.style.display = "none";
			}, 200);
		}, time);
	}
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


(function () {

	var JviewIphone = $$("JviewIphone");
	var Jnext = $$("Jnext");
	var Jprev = $$("Jprev");
	var Jinfo = $$("Jinfo");

	Jnext.addEventListener("click",function(){
		window.frames[0].slide.next();
	},false);

	Jprev.addEventListener("click",function(){
		window.frames[0].slide.prev();
	},false);


	Ajax.get(INTF.getSpecial + "?specialId="+ZTID, function(data) {
		var data = JSON.parse(data);
		if (data.statusCode == 200) {
			CONSTANTS.json = data.data.json || CONSTANTS.json;

			var iframeEle = document.createElement("iframe");
			iframeEle.setAttribute("width","320");
			iframeEle.setAttribute("height","568");
			iframeEle.setAttribute("frameborder","0");
			iframeEle.setAttribute("scrolling","no");
			iframeEle.setAttribute("src",INTF.view);
			JviewIphone.appendChild(iframeEle);

			var html = "";
			html += "<div class=\"m-view-con-info\">";
			html += "<a target=\"_blank\" href=\""+INTF.view+"\"><img src=\""+CONSTANTS.json.cover.con+"\" /></a>";
			html += "<div class=\"m-view-con-info-con\">";
			html += "<div class=\"m-view-con-info-con-title\">"+CONSTANTS.json.title.con+"</div>";
			html += "<div class=\"m-view-con-info-con-description\">"+CONSTANTS.json.description.con+"</div>";
			html += "</div>";
			html += "</div>";
			html += "<div class=\"m-view-con-erweima\" id=\"Jqrcode\"></div>";

			Jinfo.innerHTML = html;

			var qrcode = new QRCode($$("Jqrcode"), {
				width: 250,
				height: 250
			});
			qrcode.makeCode(INTF.view);
		}else {
			showMsg("加载失败");
			hideMsg();
		};
	});

})();