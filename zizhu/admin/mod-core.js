function $$(id) {
	return (typeof id == "object") ? id : document.getElementById(id);
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



var fatherIframes = window.parent.frames;
var index = 0;
for (var i = 0; i < fatherIframes.length; i++) {
	// console.log(fatherIframes[i].location.href);
	// console.log(window.location.href);
	if (window == fatherIframes[i]) {
		break;
	}else {
		index ++;
	};
};
// var mod9Data = window.parent.CONSTANTS.stArray[index - 1];

// console.log(index);

// console.log(window.location.href.split("?stId=")[1]);


var stId = window.location.href.split("?stId=")[1];
var JmodWrap = $$("JmodWrap");
var typeIndex = 0;

var CONSTANTS = {};


// loadJs(window.parent.INTF.getTemplate+"?stId="+stId, function(data) {
Ajax.get(window.parent.INTF.getTemplate+"?stId="+stId, function(data) {
	var data = JSON.parse(data);
	if (data.statusCode == 200) {
		CONSTANTS = data.data;
		$$("Jcover").setAttribute("src",CONSTANTS.cover);
		for (var x in CONSTANTS.json) {
			switch (CONSTANTS.json[x].type) {
				case "uploadPic" :
					createPic(CONSTANTS.json[x],"J"+typeIndex);
					break;
				case "sign" :
					createSign(CONSTANTS.json[x],"J"+typeIndex);
					break;
				case "textarea" :
					createTextarea(CONSTANTS.json[x],"J"+typeIndex);
					break;
				case "inputRange" :
					createInputRange(CONSTANTS.json[x],"J"+typeIndex);
					break;
				case "inputText" :
					createInputText(CONSTANTS.json[x],"J"+typeIndex);
					break;
				case "inputRadio" :
					createInputRadio(CONSTANTS.json[x],"J"+typeIndex);
				break;
				case "inputColor" :
					createInputColor(CONSTANTS.json[x],"J"+typeIndex);
					break;
				case "sliderPic" :
					createSliderPic(CONSTANTS.json[x],"J"+typeIndex);
					break;
				default :
					// console.log("other");
					break;
			}
			typeIndex ++;
		}
	}else {
		window.parent.showMsg("加载失败");
		window.parent.hideMsg();
	};
});
// }, "getModData");


function createPic(data,id) {
	var divEle = document.createElement("div");
	divEle.setAttribute("class","m-mod-item");
	var html = '<div class="m-mod-bg-wrap"><div class="m-mod-bg-tit">'+data.title+'：</div><div class="m-mod-bg" id="'+(id+'imgWrap')+'"><img src="'+data.con+'" value="'+data.con+'" id="'+id+'"></div><div class="m-mod-bg-tip">'+data.tip+'</div>' + (data.removeBtn == 1 ? '<div class="m-mod-bg-btn"><a id="'+(id+'Remove')+'">移除</a></div>' : '') + '</div>';
	divEle.innerHTML = html;
	JmodWrap.appendChild(divEle);

	var img = $$(id);
	$$(id+"imgWrap").addEventListener("click",function(){
		window.parent.UPCPic.showPicWrap(img);
	},false);
	if (data.removeBtn == 1) {
		$$(id+"Remove").addEventListener("click",function(){
			img.setAttribute("src","");
		},false);
	};
}

function createInputText(data,id) {
	var divEle = document.createElement("div");
	divEle.setAttribute("class","m-mod-item");
	var html = '<div class="m-mod-item-l">'+data.title+'：</div><div class="m-mod-item-r"><input type="text" name="" class="m-input-text" placeholder="'+data.tip+'" value="'+data.con+'" id="'+id+'"/></div>';
	divEle.innerHTML = html;
	JmodWrap.appendChild(divEle);
}


function createInputRange(data,id) {
	var divEle = document.createElement("div");
	divEle.setAttribute("class","m-mod-item");
	var tip = '';
	if (data.tip) {
		tip = '<div class="m-mod-item-tip">'+data.tip+'</div>';
	};
	var html = '<div class="m-mod-item-l">'+data.title+'：</div><div class="m-mod-item-r"><input type="range" name="" class="m-input-range" step="'+data.step+'" min="'+data.min+'" max="'+data.max+'" value="'+data.con+'" id="'+id+'"/><span class="m-input-range-count">'+data.con+'</span><i class="m-input-range-i">%</i></div>' + tip;
	divEle.innerHTML = html;
	JmodWrap.appendChild(divEle);
	var JinputRange = $$(id);
	JinputRange.addEventListener("change",function(){
		JinputRange.parentNode.querySelector(".m-input-range-count").innerHTML = JinputRange.value;
	},false);
}

function createTextarea(data,id) {
	var divEle = document.createElement("div");
	divEle.setAttribute("class","m-mod-item");
	var html = '<div class="m-mod-item-l">'+data.title+'：</div><div class="m-mod-item-r"><textarea name="" rows="" cols="" placeholder="'+data.tip+'" class="m-input-textarea" id="'+id+'">'+data.con+'</textarea></div>';
	divEle.innerHTML = html;
	JmodWrap.appendChild(divEle);
}


function createInputColor(data,id) {
	var divEle = document.createElement("div");
	divEle.setAttribute("class","m-mod-item");
	var html = '<div class="m-mod-item-l">'+data.title+'：</div><div class="m-mod-item-r"><input type="color" name="" class="m-input-color" value="'+data.con+'" id="'+id+'"/></div>';
	divEle.innerHTML = html;
	JmodWrap.appendChild(divEle);
}

function createInputRadio(data,id) {
	var divEle = document.createElement("div");
	divEle.setAttribute("class","m-mod-item");
	var html = '';
	html += '<div class="m-mod-item-l">'+data.title+'：</div><form class="m-mod-item-r" id="'+id+'">';
	for (var i = 0; i < data.options.length; i++) {
		if (data.options[i][0] == data.con) {
			html += '<label onclick="" class="m-input-radio-wrap"><input type="radio" name="option" checked="checked" value="'+data.options[i][0]+'"/><span>'+data.options[i][1]+'</span></label>';
		}else {
			html += '<label onclick="" class="m-input-radio-wrap"><input type="radio" name="option" value="'+data.options[i][0]+'"/><span>'+data.options[i][1]+'</span></label>';
		};
	};
	html += '</form>';
	if (data.tip) {
		html += '<div class="m-mod-item-tip">'+data.tip+'：</div>';
	};
	divEle.innerHTML = html;
	JmodWrap.appendChild(divEle);
}

function createSign(data,id) {
	var divEle = document.createElement("div");
	divEle.setAttribute("class","m-mod-item");
	var html = '<p>选择要提交的资料</p><form id="'+id+'" class="m-input-checkbox-wrap">';

	for (var x in data.con) {
		if (data.con[x].name == "name") {
			if (data.con[x].isWant){
				html += '<label><input type="checkbox" name="name" checked="checked" class="m-input-checkbox"><span>姓名</span></label>';
			}else {
				html += '<label><input type="checkbox" name="name" class="m-input-checkbox"><span>姓名</span></label>';
			};
		}else if (data.con[x].name == "sex") {
			if (data.con[x].isWant){
				html += '<label><input type="checkbox" name="sex" checked="checked" class="m-input-checkbox"><span>性别</span></label>';
			}else {
				html += '<label><input type="checkbox" name="sex" class="m-input-checkbox"><span>性别</span></label>';
			};
		}else if (data.con[x].name == "tel") {
			if (data.con[x].isWant){
				html += '<label><input type="checkbox" name="tel" checked="checked" class="m-input-checkbox"><span>电话</span></label>';
			}else {
				html += '<label><input type="checkbox" name="tel" class="m-input-checkbox"><span>电话</span></label>';
			};
		}else if (data.con[x].name == "email") {
			if (data.con[x].isWant){
				html += '<label><input type="checkbox" name="email" checked="checked" class="m-input-checkbox"><span>邮箱</span></label>';
			}else {
				html += '<label><input type="checkbox" name="email" class="m-input-checkbox"><span>邮箱</span></label>';
			};
		}else if (data.con[x].name == "address") {
			if (data.con[x].isWant){
				html += '<label><input type="checkbox" name="address" checked="checked" class="m-input-checkbox"><span>地址</span></label>';
			}else {
				html += '<label><input type="checkbox" name="address" class="m-input-checkbox"><span>地址</span></label>';
			};
		}else if (data.con[x].name == "skin") {
			if (data.con[x].isWant){
				html += '<label><input type="checkbox" name="skin" checked="checked" class="m-input-checkbox"><span>肤质</span></label>';
			}else {
				html += '<label><input type="checkbox" name="skin" class="m-input-checkbox"><span>肤质</span></label>';
			};
		}else {
			
		};
	}
	html += '</form>';
	divEle.innerHTML = html;
	JmodWrap.appendChild(divEle);
}


// 暂存json数组
var CONSTANTSHOLD = [];
function checkChange() {
	CONSTANTSHOLD.json = JSON.parse(JSON.stringify(CONSTANTS.json));//深度复制json
	var typeIndex = 0;
	for (var x in CONSTANTS.json) {
		switch (CONSTANTS.json[x].type) {
			case "uploadPic" :
				var value = $$("J"+typeIndex).getAttribute("src");
				break;
			case "sliderPic" :
				var value = [];
				var JmodLbConLis = $$("J"+typeIndex + "LbCon").querySelectorAll("li");
				for (var n = 0; n < JmodLbConLis.length; n++) {
					value.push({
						picUrl:JmodLbConLis[n].querySelector("img").getAttribute("src"),
						textContent:JmodLbConLis[n].querySelector("textarea").value
					});
				};
				break;
			case "sign" :
				var value = [];
				var JmodSignInputs = $$("J"+typeIndex).querySelectorAll("input");
				for (var n = 0; n < JmodSignInputs.length; n++) {
					value.push({
						name:JmodSignInputs[n].getAttribute("name"),
						isWant:(JmodSignInputs[n].checked?1:0)
					});
				};
				break;
			case "inputRadio" :
				var Joptions = $$("J"+typeIndex).option;
				for (var i = 0; i < Joptions.length; i++) {
					if (Joptions[i].checked) {
						var value = Joptions[i].value;
					};
				};
				break;
			default :
				var value = $$("J"+typeIndex).value;
				break;
		}
		CONSTANTSHOLD.json[x].con = value;
		typeIndex ++;
	}
	if (JSON.stringify(CONSTANTSHOLD.json) == JSON.stringify(CONSTANTS.json)) {
		// console.log("没修改");
		return true;
	}else {
		// console.log("有修改");
		return false;
	};
}


// 暂存函数
function saveHold(FN_success,FN_fail) {
	checkChange();
	CONSTANTS.json = JSON.parse(JSON.stringify(CONSTANTSHOLD.json));//深度复制json
	CONSTANTS.html = template.compile(CONSTANTS.temple)(CONSTANTS.json);
	window.parent.showMsg("正在保存");

	// loadJs(window.parent.INTF.updateTemplate + "?stId="+stId+"&json=" + escape(JSON.stringify(CONSTANTS.json)) + "&html=" + escape(CONSTANTS.html), function(data) {
	Ajax.post(window.parent.INTF.updateTemplate, "stId=" + stId + "&json=" + escape(JSON.stringify(CONSTANTS.json)) + "&html=" + escape(CONSTANTS.html), function(data) {
		var data = JSON.parse(data);
		if (data.statusCode == 200) {
			window.parent.saveSpecialData(FN_success,FN_fail);
		}else {
			window.parent.showMsg("错误代码：" + data.statusCode + "<br />错误信息：" + data.message);
			window.parent.hideMsg(1000);
		};
	});
	// }, "saveHoldModData");

}

// 保存并提交
function saveDone(FN_success,FN_fail) {
	checkChange();
	CONSTANTS.json = JSON.parse(JSON.stringify(CONSTANTSHOLD.json));//深度复制json
	CONSTANTS.html = template.compile(CONSTANTS.temple)(CONSTANTS.json);
	window.parent.showMsg("正在保存");

	Ajax.post(window.parent.INTF.updateTemplate, "stId=" + stId + "&json=" + escape(JSON.stringify(CONSTANTS.json)) + "&html=" + escape(CONSTANTS.html), function(data) {
		var data = JSON.parse(data);
		if (data.statusCode == 200) {
			window.parent.saveSpecialData(FN_success,FN_fail);
		}else {
			window.parent.showMsg("错误代码：" + data.statusCode + "<br />错误信息：" + data.message);
			window.parent.hideMsg(1000);
		};
	});

}
