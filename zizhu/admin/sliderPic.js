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


function createSliderPic(data,id) {
	var divEle = document.createElement("div");
	divEle.setAttribute("class","m-mod-item-wrap");
	var html = '<div class="m-mod-item"><div class="m-mod-item-l">图片帧数：</div><div class="m-mod-item-r" id="'+(id+'LbNav')+'"><div class="m-mod-lb-add" id="'+(id+'LbNavAdd')+'">+</div></div><ul id="'+(id+'LbCon')+'"></ul></div>';
	divEle.innerHTML = html;
	JmodWrap.appendChild(divEle);

	var JmodLbNav = $$(id + "LbNav");
	var JmodLbNavAdd = $$(id + "LbNavAdd");
	var JmodLbCon = $$(id + "LbCon");

	// 赋予
	var itemsCount = 0;
	if (data.con && data.con.length >=1) {
		for (var x in data.con) {
			itemsCount ++;
			createNav(itemsCount);
			createLi(data.con[x].picUrl,data.con[x].textContent);
		}
		classEvent.addClassName(JmodLbNav.getElementsByTagName("a")[0],"current");
		JmodLbCon.getElementsByTagName("li")[0].style.display = "block";
	};

	// 点击增加按钮
	JmodLbNavAdd.addEventListener("click",function(){
		itemsCount ++;
		createNav(itemsCount);
		createLi("","");
	},false);

	// 事件委托 选择&删除模块
	JmodLbNav.addEventListener("click",function(ev){
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		console.log(target.nodeName.toLowerCase());
		if (target.nodeName.toLowerCase() == "span") {
			var JmodLbNavSpans = JmodLbNav.getElementsByTagName("span");
			var JmodLbNavSpansIndex = 0;
			for (var i = 0; i < JmodLbNavSpans.length; i++) {
				if (target == JmodLbNavSpans[i]) {
					break;
				}else {
					JmodLbNavSpansIndex ++;
				};
			};
			delNav(JmodLbNavSpansIndex);
		}else if (target.nodeName.toLowerCase() == "em") {
			var JmodLbNavEms = JmodLbNav.getElementsByTagName("em");
			var JmodLbNavEmsIndex = 0;
			for (var i = 0; i < JmodLbNavEms.length; i++) {
				if (target == JmodLbNavEms[i]) {
					break;
				}else {
					JmodLbNavEmsIndex ++;
				};
			};
			selNav(JmodLbNavEmsIndex);
		};
	},false);

	//事件委托 点击图片上传
	JmodLbCon.addEventListener("click",function(ev){
		var ev = ev || window.event;
		var target = ev.target || ev.srcElement;

		if (target.className == "m-mod-bg") {
			window.parent.UPCPic.showPicWrap(target.querySelector("img"));
		};
		var JcurImgWrap = closest(target,".m-mod-bg");
		if (JcurImgWrap) {
			window.parent.UPCPic.showPicWrap(JcurImgWrap.querySelector("img"));
		};
	},false);






	// 选择模块函数 赋予当前模块导航高亮和显示
	function selNav(index) {
		var JmodLbNavAs = JmodLbNav.getElementsByTagName("a");
		var JmodLbConLis = JmodLbCon.getElementsByTagName("li");
		for (var i = 0; i < JmodLbNavAs.length; i++) {
			classEvent.removeClassName(JmodLbNavAs[i],"current");
			JmodLbConLis[i].style.display = "none";
		};
		classEvent.addClassName(JmodLbNavAs[index],"current");
		JmodLbConLis[index].style.display = "block";
	}

	function delNav(index) {
		//删除导航
		var JcurA = JmodLbNav.getElementsByTagName("a")[index];
		JcurA.parentNode.removeChild(JcurA);
		//删除对应的iframe模块
		var JcurLi = JmodLbCon.getElementsByTagName("li")[index];
		JcurLi.parentNode.removeChild(JcurLi);
		itemsCount --;
		//重写序号
		var JmodLbNavSpans = JmodLbNav.getElementsByTagName("em");
		for (var i = 0; i < JmodLbNavSpans.length; i++) {
			JmodLbNavSpans[i].innerHTML = i+1;
		};
		console.log(itemsCount);

		//回到第一张
		if (itemsCount > 0) {
			var JmodLbNavAs = JmodLbNav.getElementsByTagName("a");
			var JmodLbConLis = JmodLbCon.getElementsByTagName("li");
			for (var i = 0; i < JmodLbNavAs.length; i++) {
				classEvent.removeClassName(JmodLbNavAs[i],"current");
				JmodLbConLis[i].style.display = "none";
			};
			classEvent.addClassName(JmodLbNavAs[0],"current");
			JmodLbConLis[0].style.display = "block";
		};
	}

	function createNav(itemsCount) {
		var aEle = document.createElement("a");
		aEle.setAttribute("class","m-mod-lb-item");
		aEle.innerHTML = "<em>"+itemsCount+"</em><span>×</span>";
		JmodLbNav.appendChild(aEle);
	}

	function createLi(picUrl,textContent) {
		var liEle = document.createElement("li");
		liEle.style.display = "none";
		liEle.innerHTML = '<div class="m-mod-item"><div class="m-mod-bg-wrap"><div class="m-mod-bg" id="JmodBgWrap"><img src="'+picUrl+'"></div><div class="m-mod-bg-tip">'+data.tip+'</div></div></div><div class="m-mod-item"><div class="m-mod-item-l">&ensp;内&emsp;容&ensp;：</div><div class="m-mod-item-r"><textarea name="" rows="" cols="" placeholder="'+data.tip2+'" class="m-input-textarea">'+textContent+'</textarea></div></div>';
		JmodLbCon.appendChild(liEle);
	}






}




