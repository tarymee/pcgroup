// 获取id
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

// 获取距离 ele 最近的符合 selector 的父/组级元素 selector 只能用简单的选择器，#id, tagName, .className，单个无组合
function closest(ele, selector) {
	//查找匹配元素
	function matchSelector(ele, selector) {
		if (selector.charAt(0) === "#") {
			return ele.id === selector.slice(1);
		}
		if (selector.charAt(0) === ".") {
			return (" " + ele.className + " ").indexOf(" " + selector.slice(1) + " ") != -1;
		}
		return ele.tagName === selector.toUpperCase();
		// return ele.tagName.toLowerCase() === selector.toLowerCase();
	}
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

/*增删类*/
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
};

/*-------------------------- +
// 上传图片模块
+-------------------------- */
// (function (window,document) {
// 	if (window.UPCPic) {return};
	var JpicWrap = $$("JpicWrap");
	var Jpic = $$("Jpic");
	var JpicUpload = $$("JpicUpload");
	var JpicClose = $$("JpicClose");
	var JpicSave = $$("JpicSave");

	var picNum = CONSTANTS.picData.length;//上传图片张数
	var picNumId = CONSTANTS.picData.length;//控件id值

	var selPicIndex = -1;//选择的是第几张图片 -1是未选择
	var imgTarget;//图片最终插入目的

	function UPCPic(config) {
		this._init();
	}

	UPCPic.prototype = {
		_init : function() {
			var self = this;
			//初始化
			UPC.init(upcInitData);

			//初始化图片写入
			for (var i = 0; i < CONSTANTS.picData.length; i++) {
				var divEle = document.createElement("div");
				divEle.className = "m-pic-item";
				divEle.innerHTML = '<img src="' + CONSTANTS.picData[i].url + '" /><span>&times;</span><i>&radic;</i>';
				Jpic.appendChild(divEle);
			};

			// 关闭按钮
			JpicClose.addEventListener("click",function(){
				self.hidePicWrap();
			},false);

			// 保存按钮
			JpicSave.addEventListener("click",function(){
				// console.log(CONSTANTS.picData);
				// console.log("picNum:" + picNum);
				// console.log("picNumId:" + picNumId);
				if (CONSTANTS.picData.length == 0) {
					showMsg("请先上传图片");
					hideMsg();
					return false;
				};
				if (selPicIndex == -1) {
					showMsg("请先选择图片");
					hideMsg();
					return false;
				};
				if (!imgTarget) {
					showMsg("找不到目标");
					hideMsg();
					return false;
				}else {
					imgTarget.setAttribute("src",CONSTANTS.picData[selPicIndex].url);
					// imgTarget.setAttribute("value",CONSTANTS.picData[selPicIndex].url);
					JpicWrap.style.display = "none";
				};
			},false);

			// 事件委托 选择&删除图片
			Jpic.addEventListener("click",function(ev){
				var ev = ev || window.event;
				var target = ev.target || ev.srcElement;
				if (target.nodeName.toLowerCase() == "img") {
					var JpicItemImgsIndex = 0;
					var JpicItemImgs = Jpic.getElementsByTagName("img");
					for (var i = 0; i < JpicItemImgs.length; i++) {
						if (target == JpicItemImgs[i]) {
							break;
						}else {
							JpicItemImgsIndex ++;
						};
					};
					self.selPic(JpicItemImgsIndex,target);
				}
				if (target.nodeName.toLowerCase() == "span") {
					var JpicItemSpansIndex = 0;
					var JpicItemSpans = Jpic.getElementsByTagName("span");
					for (var i = 0; i < JpicItemSpans.length; i++) {
						if (target == JpicItemSpans[i]) {
							break;
						}else {
							JpicItemSpansIndex ++;
						};
					};
					self.delPic(JpicItemSpansIndex,target)
				}
			},false);
		},
		//每次选择完图片上传 , 同时隐藏这个上传控件 , 创建下一个不同id和name值的控件,这样做是为了能够实现多图片同时上传
		updatePic : function (obj) {
			if (!obj) return;
			if (obj.value == "") return;
			obj.id = "JpicInput" + picNumId;
			obj.name = "JpicInput" + picNumId;
			obj.style.display = "none";
			UPC.post({
				url: "/upload_quick.jsp",
				data: {
					rotate: 0,
					keepSrc: "yes"
				},
				file: [obj.id],
				complete: function (msg) {
					if (msg.retCode == 0) {
						picNum++;
						Jpic.querySelectorAll(".m-pic-item")[picNum - 1].innerHTML = '<img src="' + msg.files[2].url + '" /><span>&times;</span><i>&radic;</i>';
						CONSTANTS.picData.push(msg.files[2]);//把图片push进数组
					} else {
						showMsg("上传图片失败，" + retCodeDict[msg.retCode] + "。");
						hideMsg();
						Jpic.removeChild(Jpic.querySelectorAll(".m-pic-item")[picNum]);
					}
				}
			});

			//插入loading外壳
			var divEle = document.createElement("div");
			divEle.className = 'm-pic-item';
			Jpic.appendChild(divEle);
			picNumId++;
			//创建不同name和id值的上传空间
			var inputEle = document.createElement("input");
			inputEle.setAttribute("onchange", "UPCPic.updatePic(this)");
			inputEle.type = 'file';
			inputEle.accept = 'image/*'; //只限定图片
			inputEle.id = "JpicInput" + picNumId;
			inputEle.name = "JpicInput" + picNumId;
			JpicUpload.appendChild(inputEle);
		},
		hidePicWrap:function () {
			JpicWrap.style.display = "none";
			imgTarget = 0;
		},
		showPicWrap:function (obj) {
			JpicWrap.style.display = "block";
			imgTarget = obj;
		},
		// 选择某张图片
		selPic: function (index,obj) {
			selPicIndex = index;
			var JpicItems = Jpic.querySelectorAll(".m-pic-item");
			for (var i = 0; i < JpicItems.length; i++) {
				classEvent.removeClassName(JpicItems[i],"cur");
			};
			classEvent.addClassName(obj.parentNode,"cur");
			console.log(selPicIndex);
		},
		// 删除某张图片
		delPic : function (index,obj) {
			picNum--;
			Jpic.removeChild(obj.parentNode);
			CONSTANTS.picData.splice(index, 1);

			//处理删除的图片
			if (index == selPicIndex) {
				selPicIndex = -1;
			}else if (index < selPicIndex) {
				selPicIndex--;
			};
		}
	};
// 	window.UPCPic = new UPCPic();//暴露命名
// })(window,document);

//当前屏 0为设置 1为第一屏 以此类推
var currentNav = 0;

// 左边导航
var Jnav = $$("Jnav");
// 增加页面按钮
var JnavAdd = $$("JnavAdd");
//右边模块外框
var JmodWrap = $$("JmodWrap");

// 暂存按钮
var JsaveHold = $$("JsaveHold");
// 保存并提交
var JsaveDone = $$("JsaveDone");
// 预览
var Jpreview = $$("Jpreview");

// 选择模块
var JselModWrap = $$("JselModWrap");
var JselMod = $$("JselMod");
var JselModLis = $$("JselMod").getElementsByTagName("li");
var JselModSave = $$("JselModSave");


// load新的帧模板数据
function updateSpecialData() {
	showMsg("正在保存");
	console.log(CONSTANTS.stArray);
	// loadJs(INTF.getSpecial+"?specialId="+ZTID, function(data) {
	Ajax.get(INTF.getSpecial+"?specialId="+ZTID, function(data) {
		var data = JSON.parse(data);
		if (data.statusCode == 200) {
			CONSTANTS.stArray = data.data.stArray;
			hideMsg();
		}else {
			showMsg("保存失败");
			hideMsg();
		};
	});
	// }, "getSpecialData");
}


// 初始化页面模板
var CONSTANTSFAKE = JSON.parse(JSON.stringify(CONSTANTS));//深度复制json

// loadJs(INTF.getSpecial + "?specialId="+ZTID, function(data) {
Ajax.get(INTF.getSpecial + "?specialId="+ZTID, function(data) {
	var data = JSON.parse(data);
	if (data.statusCode == 200) {
		// CONSTANTS = data.data;
		CONSTANTS.stArray = data.data.stArray || CONSTANTS.stArray;
		CONSTANTS.picData = data.data.picData || CONSTANTS.picData;
		CONSTANTS.json = data.data.json || CONSTANTS.json;
		CONSTANTS.html = data.data.html || CONSTANTS.html;
		// CONSTANTS.temple = data.data.temple || CONSTANTS.temple;
		console.log(CONSTANTS);
		// 初始化基本设置
		if (CONSTANTS.json) {
			createIframe("setting.html");
			createNav(0);
			showMod(0);
			Jnav.getElementsByTagName("li")[0].className += " cur";
		};
		picNum = CONSTANTS.picData.length;//更新上传图片张数
		picNumId = CONSTANTS.picData.length;//更新控件id值
		window.UPCPic = new UPCPic();//初始化图片上传

		if (CONSTANTS.stArray) {
			for (var i = 0; i < CONSTANTS.stArray.length; i++) {
				createIframe("mod.html?stId="+CONSTANTS.stArray[i].stId);
				createNav(i+1,CONSTANTS.stArray[i].cover);
			};
		};
	}else {
		showMsg("加载失败");
		hideMsg();
	};
});
// }, "loadFirstSpecialData");



// 初始化选择的模板
var modListData;
// loadJs(INTF.getTemplateList, function(data) {
Ajax.get(INTF.getTemplateList, function(data) {
	var data = JSON.parse(data);
	if (data.statusCode == 200) {
		modListData = data.data.templateList;
		for (var i = 0; i < modListData.length; i++) {
				var liEle = document.createElement("li");
				liEle.setAttribute("onclick","selMod(this,'"+modListData[i].modelType+"','"+modListData[i].commonTemplateId+"','"+modListData[i].cover+"')");
				liEle.innerHTML = '<img src="'+modListData[i].cover+'" /><span>'+modListData[i].title+'</span>';
				JselMod.appendChild(liEle);
		}
	}else {
		showMsg("加载失败");
		hideMsg();
	};
});
// }, "loadModList");



// 选择模块函数 赋予当前模块导航高亮和显示
function selNav(index) {
	var JnavLis = Jnav.getElementsByTagName("li");
	// 如果还是选择当前模块，则不做操作
	if (currentNav == index) {
		classEvent.addClassName(JnavLis[index],"cur");
		console.log("相同");
		return false;
	};
	// console.log(window.frames[currentNav]);
	// 检查上一模块有没有保存 如果没保存，则先不选择其他模块
	if (typeof(window.frames[currentNav]) != "undefined" && window.frames[currentNav].checkChange()) {
		
		for (var i = 0; i < JnavLis.length; i++) {
			classEvent.removeClassName(JnavLis[i],"cur");
		};
		classEvent.addClassName(JnavLis[index],"cur");
		currentNav = index;
		// 如果不是基本设置模块并且该模块还未选定模板 则先让用户选定模板
		if (index != 0 && index > CONSTANTS.stArray.length) {
			showMod("JselModWrap");
		}else {
			showMod(index);
		};
	}else {
		showMsg("先保存本模块信息再做其他操作");
		hideMsg(1000);
		return false;
	};
}

//重写序号
function writeCount() {
	var JnavCounts = Jnav.querySelectorAll(".m-nav-count");
	for (var i = 0; i < JnavCounts.length; i++) {
		JnavCounts[i].innerHTML = i;
	};
}
// 删除模块函数
function delNav(index) {
	// 检查上一模块有没有保存 如果没保存，则先不进行其他操作
	if (typeof(window.frames[currentNav]) != "undefined" && window.frames[currentNav].checkChange()) {
		if (confirm("确定删除？")) {
			if (JmodWrap.getElementsByTagName("iframe")[index]) {
				//删除对应数据
				var delData = CONSTANTS.stArray.splice(index-1,1);
				//保存失败，还原
				// CONSTANTS.stArray.splice(index-1,0,delData[0]);
				//删除对应的iframe模块
				var JcurIframe = JmodWrap.getElementsByTagName("iframe")[index];
				JcurIframe.parentNode.removeChild(JcurIframe);
				//暂时保存
				CONSTANTS.status = 3;
				saveSpecialData();
			};
			//删除导航
			var JcurLi = Jnav.getElementsByTagName("li")[index];
			JcurLi.parentNode.removeChild(JcurLi);
			//重写序号
			writeCount();
			currentNav = 0;
			selNav(0);
			showMod(0);
		}
	}else {
		showMsg("先保存本模块信息再做其他操作");
		hideMsg(1000);
		return false;
	};
}

function insertAfter(newEl, targetEl) {
	var parentEl = targetEl.parentNode;
	if (parentEl.lastChild == targetEl) {
		parentEl.appendChild(newEl);
	} else {
		parentEl.insertBefore(newEl, targetEl.nextSibling);
	}
}


function insertBefore(newEl, targetEl) {
	targetEl.parentNode.insertBefore(newEl,targetEl);
}


// 事件委托 选择&删除模块
Jnav.addEventListener("click",function(ev){
	var ev = ev || window.event;
	var target = ev.target || ev.srcElement;

	if (target.nodeName.toLowerCase() == "i") {
		var JnavIs = Jnav.getElementsByTagName("i");
		var JnavIsIndex = 0;
		for (var i = 0; i < JnavIs.length; i++) {
			if (target == JnavIs[i]) {
				break;
			}else {
				JnavIsIndex ++;
			};
		};
		console.log(JnavIsIndex);
		delNav(JnavIsIndex);

	}else if (target.nodeName.toLowerCase() == "a") {

		if (typeof(window.frames[currentNav]) != "undefined" && window.frames[currentNav].checkChange()) {
			var JnavAs = Jnav.getElementsByTagName("a");
			var JnavAsIndex = 0;
			for (var i = 0; i < JnavAs.length; i++) {
				if (target == JnavAs[i]) {
					break;
				}else {
					JnavAsIndex ++;
				};
			};

			var JnavLis = Jnav.getElementsByTagName("li");
			var Jiframes = JmodWrap.getElementsByTagName("iframe");
			// 调整导航和iframe顺序
			insertBefore(JnavLis[JnavAsIndex],JnavLis[JnavAsIndex-1]);
			insertBefore(Jiframes[JnavAsIndex],Jiframes[JnavAsIndex-1]);
			// 重写序号
			writeCount();
			// 调整stArray顺序
			CONSTANTS.stArray = changeArray(CONSTANTS.stArray,JnavAsIndex-1,JnavAsIndex-2);
			//暂时保存
			CONSTANTS.status = 3;
			saveSpecialData();
			console.log("向上");

		}else {
			showMsg("先保存本模块信息再做其他操作");
			hideMsg();
			return false;
		};

	}else if (target.nodeName.toLowerCase() == "span") {
		if (typeof(window.frames[currentNav]) != "undefined" && window.frames[currentNav].checkChange()) {
			var JnavSpans = Jnav.getElementsByTagName("span");
			var JnavSpansIndex = 0;
			for (var i = 0; i < JnavSpans.length; i++) {
				if (target == JnavSpans[i]) {
					break;
				}else {
					JnavSpansIndex ++;
				};
			};
			var JnavLis = Jnav.getElementsByTagName("li");
			var Jiframes = JmodWrap.getElementsByTagName("iframe");
			// 调整导航和iframe顺序
			insertAfter(JnavLis[JnavSpansIndex],JnavLis[JnavSpansIndex+1]);
			insertAfter(Jiframes[JnavSpansIndex],Jiframes[JnavSpansIndex+1]);
			// 重写序号
			writeCount();
			// 调整stArray顺序
			CONSTANTS.stArray = changeArray(CONSTANTS.stArray,JnavSpansIndex-1,JnavSpansIndex);
			//暂时保存
			CONSTANTS.status = 3;
			saveSpecialData();
			console.log("向下");
		}else {
			showMsg("先保存本模块信息再做其他操作");
			hideMsg();
			return false;
		};


	}else {
		var JcurLi = closest(target,"li");
		if (JcurLi) {
			var JnavLis = Jnav.getElementsByTagName("li");
			var JnavLisIndex = 0;
			for (var i = 0; i < JnavLis.length; i++) {
				if (JcurLi == JnavLis[i]) {
					break;
				}else {
					JnavLisIndex ++;
				};
			};
			selNav(JnavLisIndex);
		};
	}
},false);




// changeArray(CONSTANTS.stArray,2,0);
// console.log(CONSTANTS.stArray);
//互换数组中的位置
function changeArray(array,num1,num2) {
	//先调整sort值
	// array[num1].sort = num2;
	// array[num2].sort = num1;
	//互换
	// var a = array.splice(num1,1,array[num2]);
	array.splice(num2,1,array.splice(num1,1,array[num2])[0]);
	return array;
}

// 增加右边iframe模块内容
function createIframe(link) {
	var iframeEle = document.createElement("iframe");
	iframeEle.setAttribute("width","100%");
	iframeEle.setAttribute("height","100%");
	iframeEle.setAttribute("frameborder","0");
	iframeEle.setAttribute("scrolling","no");
	iframeEle.setAttribute("src",link);
	iframeEle.setAttribute("style","display:none");
	JmodWrap.appendChild(iframeEle);
}
// 增加左边模块导航
function createNav(index,cover) {
	var liEle = document.createElement("li");
	if (index == 0) {
		liEle.setAttribute("class","m-nav-system");
		liEle.innerHTML = '<div class="m-nav-count">'+index+'</div><div class="m-nav-system-text"><i>x</i><a>↑</a><span>↓</span>基本设置</div>';
	}else {
		liEle.innerHTML = '<div class="m-nav-count">'+index+'</div><div class="m-nav-img"><i>x</i><a>向上</a><span>向下</span><img src="'+cover+'" /></div>';
	};
	Jnav.appendChild(liEle);
}

// 显示当前模块
function showMod(index) {
	var JmodWrapIframes = JmodWrap.getElementsByTagName("iframe");
	for (var i = 0; i < JmodWrapIframes.length; i++) {
		JmodWrapIframes[i].style.display = "none";
	};
	// 如果
	if (index != "JselModWrap") {
		JselModWrap.style.display = "none";
		JmodWrapIframes[index].style.display = "block";
	}else {
		JselModWrap.style.display = "block";
	};
}

function addNav() {
	// 检查模块有没有保存 如果没保存，则先不保存
	console.log(currentNav);
	if (typeof(window.frames[currentNav]) != "undefined" && window.frames[currentNav].checkChange()) {
		var JmodWrapIframes = JmodWrap.getElementsByTagName("iframe");
		var JnavLis = Jnav.getElementsByTagName("li");

		// if (JnavLis.length - 1 == JmodWrapIframes.length) {
		// 	showMsg("请先选择上一个页面的模块");
		// 	hideMsg();
		// 	return false;
		// };
		createNav(CONSTANTS.stArray.length + 1,"http://www1.pclady.com.cn/global/2015/h5/admin/img/noselect.jpg");
		selNav(CONSTANTS.stArray.length + 1);
		console.log(currentNav);
		//导航定位
		var JnavWrap = document.querySelector(".m-nav-wrap");
		var canScroll = JnavWrap.scrollHeight - JnavWrap.offsetHeight;
		if (canScroll > 0) {
			JnavWrap.scrollTop = canScroll;
		}
	}else {
		showMsg("先保存本模块信息再做其他操作");
		hideMsg();
		return false;
	};
}

// 点击增加页面
JnavAdd.addEventListener("click",function(){
	addNav();
},false);

var selModelType = "";
var selCommonTemplateId = "";
var selCover = "";
function selMod(obj,type,commonTemplateId,cover) {
	for (var i = 0; i < JselModLis.length; i++) {
		classEvent.removeClassName(JselModLis[i],"cur");
	};
	classEvent.addClassName(obj,"cur");
	selModelType = type;
	selCommonTemplateId = commonTemplateId;
	selCover = cover;
}

// 点击保存选择模块
JselModSave.addEventListener("click",function(){
	//加载对应ifram模块
	loadJs(INTF.createTemplate + "?specialId="+ZTID+"&commonTemplateId="+selCommonTemplateId, function(data) {
		if (data.statusCode == 200) {
			// load新iframe
			createIframe("mod.html?stId="+data.data.stId);
			// 更新数据
			updateSpecialData();
			//显示
			showMod(currentNav);
			// CONSTANTS.stArray[currentNav-1].modelType = selModelType;
			Jnav.getElementsByTagName("li")[currentNav].getElementsByTagName("img")[0].setAttribute("src",selCover);
		}else {
			showMsg("错误代码：" + data.statusCode + "<br />错误信息：" + data.message);
			hideMsg(1000);
		};
	}, "createTemplate");
},false);

// 保存专题整个设置
function saveSpecialData(FN_success,FN_fail) {
	showMsg("正在保存");
	// loadJs(INTF.postSpecial + "?specialId=" + ZTID+ "&json=" + escape(JSON.stringify(CONSTANTS)), function(data) {
	Ajax.post(INTF.postSpecial, "specialId=" + ZTID + "&json=" + escape(JSON.stringify(CONSTANTS)), function(data) {
		var data = JSON.parse(data);
		if (data.statusCode == 200) {
			showMsg("保存成功");
			hideMsg();
			if (FN_success) {
				window["FN_success"] = FN_success;
				FN_success();
			};
		}else {
			showMsg("错误代码：" + data.statusCode + "<br />错误信息：" + data.message);
			hideMsg(1000);
			if (FN_fail) {
				window["FN_fail"] = FN_fail;
				FN_fail();
			};
		};
	});
	// }, "saveConstantsData");
}

// 暂存
JsaveHold.addEventListener("click",function(){
	CONSTANTS.status = 3;
	if (typeof(window.frames[currentNav]) != "undefined") {
		window.frames[currentNav].saveHold(function () {
			console.log("成功");
		},function () {
			console.log("失败");
		});
	}else {
		showMsg("先保存本模块信息再做其他操作");
		hideMsg(1000);
		return false;
	};
},false);

// 保存并提交
JsaveDone.addEventListener("click",function(){
	CONSTANTS.status = 0;
	if (typeof(window.frames[currentNav]) != "undefined") {
		window.frames[currentNav].saveDone(function () {
			window.open(INTF.pcView + "?specialId=" + ZTID);
		});
	}else {
		showMsg("先保存本模块信息再做其他操作");
		hideMsg(1000);
		return false;
	};
},false);


// 预览
Jpreview.addEventListener("click",function(){
	if (typeof(window.frames[currentNav]) != "undefined" && window.frames[currentNav].checkChange()) {
		// location.href = INTF.pcView + "?specialId=" + ZTID;
		window.open(INTF.pcView + "?specialId=" + ZTID);
	}else {
		showMsg("先保存本模块信息再做其他操作");
		hideMsg(1000);
		return false;
	};
},false);





