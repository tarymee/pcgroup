(function(designWidth, maxWidth) {
	var doc = document,
		win = window;
	var docEl = doc.documentElement;
	var tid;

	// 设置 viewport 有的话修改 没有的话设置
	var metaEl = doc.querySelector('meta[name="viewport"]');
	var metaElCon = "width=device-width,initial-scale=1,maximum-scale=1.0,user-scalable=no";
	if (metaEl) {
		// console.warn("改变已有的meta标签来设置缩放比例");
		metaEl.setAttribute("content", metaElCon);
	} else {
		// console.warn("没有meta标签程序自动设置缩放比例");
		metaEl = doc.createElement("meta");
		metaEl.setAttribute("name", "viewport");
		metaEl.setAttribute("content", metaElCon);
		// console.log(docEl.firstElementChild);
		if (docEl.firstElementChild) {
			docEl.firstElementChild.appendChild(metaEl);
		} else {
			var wrap = doc.createElement("div");
			wrap.appendChild(metaEl);
			doc.write(wrap.innerHTML);
		}
	}

	function refreshRem() {
		// var width = parseInt(window.screen.width); // uc有bug
		var width = docEl.getBoundingClientRect().width;
		if (!maxWidth) {
			maxWidth = 540;
		};
		if (width > maxWidth) { // 淘宝做法：限制在540的屏幕下，这样100%就跟10rem不一样了
			width = maxWidth;
		}
		var rem = width * 100 / designWidth;
		// var rem = width / 10; // 如果要兼容vw的话分成10份 淘宝做法
		docEl.style.fontSize = rem + "px";
	};
	refreshRem();

	win.addEventListener("resize", function() {
		clearTimeout(tid); //防止执行两次
		tid = setTimeout(refreshRem, 300);
	}, false);

	win.addEventListener("pageshow", function(e) {
		if (e.persisted) { // 浏览器后退的时候重新计算
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

	if (doc.readyState === "complete") {
		doc.body.style.fontSize = "16px";
	} else {
		doc.addEventListener("DOMContentLoaded", function(e) {
			doc.body.style.fontSize = "16px";
		}, false);
	}
})(640, 640);