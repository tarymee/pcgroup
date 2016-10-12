function $$(id) {
	return (typeof id == "object") ? id : document.getElementById(id);
}

var JmodWrap = $$("JmodWrap");
var typeIndex = 0;

var CONSTANTS = window.parent.CONSTANTS;
(function () {
	var CONSTANTSFAKE = window.parent.CONSTANTSFAKE;//暂时存的
	for (var x in CONSTANTSFAKE.json) {
		CONSTANTSFAKE.json[x].con = CONSTANTS.json[x].con;
		console.log(x);
	}
	CONSTANTS.json = CONSTANTSFAKE.json;
})()

var html = '';
html += '<p class="m-mod-show-tit">欢迎您使用太平洋时尚网自助专题</p>';
html += '<p>为了让你更好的使用这个系统，请注意以下几点：</p>';
html += '<p>0、请使用chrome【谷歌浏览器】访问。</p>';
html += '<p>1、为了更好的存储数据，在编辑完每一帧之后，都要点击【暂存】按钮，才可以继续别的操作。</p>';
html += '<p>2、在编辑的过程中，可以在【暂存】之后点击预览，实时看到修改的部分。</p>';
html += '<p>3、上传图片的尺寸已在编辑区中标示，请上传符合尺寸规范要求的图片。</p>';
html += '<p>4、【分享】和【报名】模块每个专题只能使用一次。</p>';
html += '<p>5、当整个专题编辑完成时，请点击【保存并提交】按钮，提交整个专题数据。</p>';
html += '<p>6、【保存并提交】之后，该专题在后台的状态会变成【待审核】，需要审核并且发布之后才可以上线。</p>';


$$("Jdirection").innerHTML = html;

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
	console.log(window.parent.CONSTANTS);
	checkChange();
	CONSTANTS.json = JSON.parse(JSON.stringify(CONSTANTSHOLD.json));//深度复制json
	CONSTANTS.html = template.compile(CONSTANTS.temple)(CONSTANTS.json);
	window.parent.CONSTANTS.json = CONSTANTS.json;
	window.parent.CONSTANTS.html = CONSTANTS.html;
	// window.parent.CONSTANTS = JSON.parse(JSON.stringify(window.parent.CONSTANTS));//深度复制json
	console.log(window.parent.CONSTANTS);
	window.parent.saveSpecialData(FN_success,FN_fail);
	// 点击暂存之后 如果没有模板 则先初始化新建模板
	if (window.parent.CONSTANTS.stArray.length == 0) {
		window.parent.addNav();
	};
}



// 保存并提交
function saveDone(FN_success,FN_fail) {
	checkChange();
	CONSTANTS.json = JSON.parse(JSON.stringify(CONSTANTSHOLD.json));//深度复制json
	CONSTANTS.html = template.compile(CONSTANTS.temple)(CONSTANTS.json);
	window.parent.CONSTANTS.json = CONSTANTS.json;
	window.parent.CONSTANTS.html = CONSTANTS.html;
	// window.parent.CONSTANTS = JSON.parse(JSON.stringify(window.parent.CONSTANTS));//深度复制json
	window.parent.saveSpecialData(FN_success,FN_fail);
}


