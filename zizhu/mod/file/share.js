;(function () {
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

	var lis = document.getElementById("Jslide").getElementsByTagName("li");
	for (var i = 0; i < lis.length; i++) {
		(function (m) {
		if (lis[m].getAttribute("data-type") == "share") {
			loadJs("http://js.3conline.com/pclady/2015/h5/admin/zt/bd_share_allin.js", function(data) {}, "loadShare");
		};
		})(i)
	};
})()
