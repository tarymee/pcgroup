;(function () {
	var lis = document.getElementById("Jslide").getElementsByTagName("li");
	for (var i = 0; i < lis.length; i++) {
		(function (m) {
		if (lis[m].getAttribute("data-type") == "sign") {
			starSign(lis[m]);
		};
		})(i)
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
			document.body.appendChild(JshowMsgWrap);
			JshowMsgWrap.innerHTML = '<div id="JshowMsg" style="width:200px;padding:10px;line-height:20px;font-size:12px;background-color:rgba(000,000,000,0.9);-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;color:#fff;text-align:center;position:absolute;top:50%;left:50%;margin-left:-110px;margin-top:-20px;"></div>';
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


	function starSign(obj) {
		var JsignForm = obj.querySelector("form");
		var JsignClose = obj.querySelector(".m-sign-close");
		var JsignSubmit = obj.querySelector(".m-sign-submit");
		var JsignBtn = obj.querySelector(".m-sign-btn");
		var JsignWrap = obj.querySelector(".m-valign");

		var JsignName = JsignForm.name;
		var JsignSex = JsignForm.sex;
		var JsignTel = JsignForm.tel;
		var JsignEmail = JsignForm.email;
		var JsignProvince = JsignForm.province;
		var JsignCity = JsignForm.city;
		var JsignAddress = JsignForm.address;
		var JsignSkin = JsignForm.skin;

		var signData = {};


		JsignClose.addEventListener("click",function(){
			JsignWrap.style.background = "none";
			JsignBtn.style.display = "block";
			JsignForm.style.display = "none";
			JsignClose.style.display = "none";
		},false);

		JsignBtn.addEventListener("click",function(){
			JsignWrap.style.background = "#fff";
			JsignBtn.style.display = "none";
			JsignForm.style.display = "block";
			JsignClose.style.display = "block";
		},false);

		// 获取城市数据
		if (JsignProvince && JsignCity && JsignAddress) {
			var provinceHtml = "";
			var cityHtml = "";
			signData.city = "";
			signData.province = "";

			loadJs(INTF.getArea, function(data) {
				var data = data.data;
				for (var i = 0, len = data.length; i < len; i++) {
					JsignProvince.add(new Option(data[i][1],data[i][0]));
				}
				JsignProvince.onchange = function() {
					// 赋予
					provinceHtml = this.options[this.selectedIndex].text;
					signData.province = this.value;
					cityHtml = "";
					signData.city = "";

					JsignCity.options.length = 1;
					loadJs(INTF.getArea + "?provinceId=" + signData.province, function(data) {
						var data = data.data;
						for (var i = 0, len = data.length; i < len; i++) {
							JsignCity.add(new Option(data[i][1],data[i][0]));
						}
					}, "getCityData");
				}

				JsignCity.onchange = function() {
					cityHtml = this.options[this.selectedIndex].text;
					signData.city = this.value;
				}
			}, "getProvinceData");

		};

		var isSend = false;
		JsignSubmit.addEventListener("click",function(){
			
			if (JsignName) {
				if (JsignName.value == "") {
					showMsg("请先填写您的姓名");
					hideMsg();
					return false;
				}else {
					signData.name = JsignName.value;
				};
			};
			if (JsignSex) {
				for (var i = 0; i < JsignSex.length; i++) {
					if (JsignSex[i].checked) {
						signData.sex = JsignSex[i].value;
					};
				};
			};
			if (JsignTel) {
				if (JsignTel.value == "") {
					showMsg("请先填写您的电话");
					hideMsg();
					return false;
				}else {
					signData.tel = JsignTel.value;
				};
			};
			if (JsignEmail) {
				if (JsignEmail.value == "") {
					showMsg("请先填写您的email");
					hideMsg();
					return false;
				}else {
					signData.email = JsignEmail.value;
				};
			};
			if (JsignProvince && JsignCity && JsignAddress) {
				if (signData.province == "") {
					showMsg("请先选择省份");
					hideMsg();
					return false;
				}
			};
			if (JsignProvince && JsignCity && JsignAddress) {
				if (signData.city == "") {
					showMsg("请先选择城市");
					hideMsg();
					return false;
				}
			};
			if (JsignProvince && JsignCity && JsignAddress) {
				if (JsignAddress.value == "") {
					showMsg("请先填写您的地址");
					hideMsg();
					return false;
				}else {
					signData.address = provinceHtml + cityHtml + JsignAddress.value;
				};
			};
			if (JsignSkin) {
				for (var i = 0; i < JsignSkin.length; i++) {
					if (JsignSkin[i].checked) {
						signData.skin = JsignSkin[i].value;
					};
				};
			};
			if (!isSend) {
				isSend = true;
			}else {
				showMsg("您已经报名了");
				hideMsg();
				return false;
			};
			showMsg("正在提交...");
			// escape(JSON.stringify(signData)) 之所以不用escape包着是因为在chrome和UC下传数据表示不一致
			loadJs(INTF.postEnroll + "?specialId="+ZTID+"&json=" + JSON.stringify(signData), function(data) {
				if (data.statusCode == 200) {
					showMsg("提交成功");
					hideMsg();
					JsignWrap.style.background = "none";
					JsignBtn.style.display = "block";
					JsignForm.style.display = "none";
					JsignClose.style.display = "none";
					setTimeout(function () {
						slide.next();
					},1000);

				}else {
					isSend = false;
					showMsg(data.message);
					hideMsg(1500);
				};
				
			}, "updateSign");
		},false);
	}
})()
