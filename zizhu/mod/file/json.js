{
	"pic": {
		"type": "uploadPic",
		"title": "上传图片",
		"tip": "上传图片 尺寸 640*1000",
		"removeBtn": "1",
		"con": ""
	},
	"picLink": {
		"type": "inputText",
		"title": "图片链接",
		"tip": "如果不需要点击图片跳链接请留空",
		"con": ""
	},
	"textTitle": {
		"type": "inputText",
		"title": "文字标题",
		"tip": "必填",
		"con": ""
	},
	"textContent": {
		"type": "inputText",
		"title": "文字内容",
		"tip": "40个字以内",
		"con": ""
	},
	"textColor": {
		"type": "inputText",
		"title": "字体颜色",
		"tip": "#ffffff 或 rgba(000,000,000,0.5) 两种形式",
		"con": ""
	},
	"textBgcolor": {
		"type": "inputText",
		"title": "文字背景",
		"tip": "#ffffff 或 rgba(000,000,000,0.5) 两种形式",
		"con": ""
	},
	"bg": {
		"type": "uploadPic",
		"title": "背景图片",
		"tip": "背景 尺寸 640*1000 如不需要背景则不用上传",
		"removeBtn": "1",
		"con": ""
	},
	"bgMatte": {
		"type": "inputText",
		"title": "背景蒙层",
		"tip": "#ffffff 或 rgba(000,000,000,0.5) 两种形式",
		"con": ""
	},
	"sliderPic": {
		"type": "sliderPic",
		"tip": "组图 尺寸 640*484",
		"tip2": "40个字以内",
		"con": [{
			"picUrl": "",
			"textContent": ""
		}, {
			"picUrl": "http://cdn.duitang.com/uploads/item/201405/01/20140501101412_KSkt2.thumb.700_0.jpeg",
			"textContent": ""
		}, {
			"picUrl": "http://dev2.pconline.com.cn:9191/upcfiles/sns/1505/22/c0/15160_1432287471605.jpg",
			"textContent": ""
		}]
	}
}





图文模块
{"pic":{"type":"uploadPic","title":"上传图片","tip":"上传图片 尺寸 640*1000","removeBtn":"1","con":""},"picLink":{"type":"inputText","title":"图片链接","tip":"如果不需要点击图片跳链接请留空","con":""},"textTitle":{"type":"inputText","title":"文字标题","tip":"必填","con":""},"textContent":{"type":"inputText","title":"文字内容","tip":"40个字以内","con":""},"textColor":{"type":"inputText","title":"字体颜色","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""},"textBgcolor":{"type":"inputText","title":"文字背景","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""},"bg":{"type":"uploadPic","title":"背景图片","tip":"背景 尺寸 640*1000 如不需要背景则不用上传","removeBtn":"1","con":""},"bgMatte":{"type":"inputText","title":"背景蒙层","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""}}

<li><div class="m-bg">{{if bg.con}}<img src="{{bg.con}}" />{{/if}}<div class="m-bg-cover-color"{{if bgMatte.con}} style="background-color:{{bgMatte.con}};"{{/if}}></div></div><div class="m-valign"><div class="m-valign-item m-pic">{{if picLink.con}}<a href="{{picLink.con}}">{{/if}}<img src="{{pic.con}}" />{{if picLink.con}}</a>{{/if}}<div class="m-picA-text" style="background-color:{{textBgcolor.con}};"><div class="m-picA-tit" style="color:{{textColor.con}};">{{textTitle.con}}</div><div class="m-picA-des" style="color:{{textColor.con}};">{{textContent.con}}</div></div></div></div><div class="m-next"></div></li>



设置
{"title":"","summary":"","bg":"","cover":"","music":"","arrow":"singleBlack"}
{{if music}}<audio id="audio" src="{{music}}" preload loop style="display:none;height:0;overflow:hidden;"></audio>{{/if}}<style>{{if bg}}.m-bg{background:url({{bg}}) 0px 0px no-repeat;-webkit-background-size:cover;-moz-background-size:cover;background-size:cover;}{{/if}}{{if arrow}}.m-next{background:url(img/{{arrow}}.png) no-repeat 0px 0px;-webkit-background-size:20px;-moz-background-size:20px;background-size:20px;}{{/if}}</style>


地图
<li><div class="m-bg"><div class="m-bg-cover-color"></div></div><div class="m-address"{{if textBgcolor.con}} style="background-color:{{textBgcolor.con}};"{{/if}}><img src="{{pic.con}}" alt="" class=""/><div class="m-address-text"{{if textColor.con}} style="color:{{textColor.con}};"{{/if}}>{{textTitle.con}}</div></div><div class="m-next"></div></li>
{"pic":{"type":"uploadPic","title":"上传地图","tip":"上传图片 尺寸 640*640","removeBtn":"1","con":""},"textTitle":{"type":"inputText","title":"文字标题","tip":"必填","con":""},"textColor":{"type":"inputText","title":"字体颜色","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""},"textBgcolor":{"type":"inputText","title":"文字背景","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""}}

视频
{"videoLink":{"type":"inputText","title":"视频链接","tip":"在视频终端页的“分享”下拉栏中，复制“通用地址”（含iframe的地址），粘贴过来即可。","con":""}}
<li style="background-color:#000;"><div class="m-valign"><div class="m-valign-item">{{videoLink.con}}</div></div><div class="m-next"></div></li>



策划团队
{"pic":{"type":"uploadPic","title":"上传图片","tip":"上传图片 尺寸 640*640","removeBtn":"1","con":""},"textColor":{"type":"inputText","title":"字体颜色","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""},"textBgcolor":{"type":"inputText","title":"文字背景","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""},"textTitle":{"type":"inputText","title":"&ensp;标&emsp;题&ensp;","tip":"必填","con":""},"textChupin":{"type":"inputText","title":"&ensp;出&emsp;品&ensp;","tip":"必填","con":""},"textJianzhi":{"type":"inputText","title":"&ensp;监&emsp;制&ensp;","tip":"必填","con":""},"textBianji":{"type":"inputText","title":"&ensp;编&emsp;辑&ensp;","tip":"必填","con":""},"textSheji":{"type":"inputText","title":"&ensp;设&emsp;计&ensp;","tip":"必填","con":""},"textZhizuo":{"type":"inputText","title":"&ensp;制&emsp;作&ensp;","tip":"必填","con":""}}
<li><div class="m-bg"><div class="m-bg-cover-color"></div></div><div class="m-chupin"{{if textBgcolor.con}} style="background-color:{{textBgcolor.con}};"{{/if}}><img src="{{pic.con}}" /><div class="m-chupin-tit"{{if textColor.con}} style="color:{{textColor.con}};"{{/if}}>{{textTitle.con}}</div><div class="m-chupin-text"{{if textColor.con}} style="color:{{textColor.con}};"{{/if}}><span>出品/{{textChupin.con}}</span><span>监制/{{textJianzhi.con}}</span><span>编辑/{{textBianji.con}}</span><span>设计/{{textSheji.con}}</span><span>制作/{{textZhizuo.con}}</span></div></div><div class="m-next"></div></li>


轮播
{"sliderPic":{"type":"sliderPic","tip":"组图 尺寸 640*484","tip2":"40个字以内","con":[{"picUrl":"","textContent":""}]},"textColor":{"type":"inputText","title":"字体颜色","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""},"bg":{"type":"uploadPic","title":"背景图片","tip":"背景 尺寸 640*1000 如不需要背景则不用上传","removeBtn":"1","con":""},"bgMatte":{"type":"inputText","title":"背景蒙层","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""}}

<li data-type="lunbo" style="color:{{textColor.con}};">



<div class="m-bg">{{if bg.con}}<img src="{{bg.con}}" />{{/if}}<div class="m-bg-cover-color"{{if bgMatte.con}} style="background-color:{{bgMatte.con}};"{{/if}}></div></div>




<div class="m-valign"><div class="m-lunbo m-valign-item"><ul>{{each sliderPic.con as value i}}<li><img src="{{value.picUrl}}" /><div class="m-lunbo-tit">{{value.textContent}}</div><div class="m-lunbo-des">{{value.textContent}}</div></li>{{/each}}</ul><div class="m-lunbo-nav"></div></div></div><div class="m-next"></div></li>




<div class="m-valign">
<li data-type="lunbo" style="{{textColor.con}};">

<div class="m-bg">{{if bg.con}}<img src="{{bg.con}}" /><div class="m-bg-cover-color"{{if bgMatte.con}} style="background-color:{{bgMatte.con}};"{{/if}}></div>{{/if}}</div>

<div class="m-valign">
<div class="m-lunbo m-valign-item"><ul>{{each sliderPic.con as value i}}<li><img src="{{value.picUrl}}" /><div class="m-lunbo-tit" style="color:#fff">{{value.textContent}}</div><div class="m-lunbo-des" style="color:#fff">{{value.textContent}}</div></li>{{/each}}</ul><div class="m-lunbo-nav"></div></div></div><div class="m-next"></div></li>


抹一抹
{"bg":{"type":"uploadPic","title":"背景图片","tip":"背景 尺寸 640*1000","removeBtn":"1","con":""},"pic":{"type":"uploadPic","title":"覆&ensp;盖&ensp;图","tip":"上传图片 尺寸 640*1000","removeBtn":"1","con":""},"textTitle":{"type":"inputText","title":"主&ensp;标&ensp;题","tip":"15个字以内","con":""},"textContent":{"type":"inputText","title":"副&ensp;标&ensp;题","tip":"15个字以内","con":""},"textColor":{"type":"inputText","title":"字体颜色","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""},"maskPercent":{"type":"inputText","title":"涂抹比例(数字)比如：40%后自动抹净","tip":"(数字)比如：40%后自动抹净","con":""}}
<li disableSlide="true" data-type="gua"{{if textColor.con}} style="color:{{textColor.con}};"{{/if}}><div class="m-cover-bg" id="Jcover"{{if bg.con}} style="background:url({{bg.con}}) no-repeat;-webkit-background-size:100% 100%;-moz-background-size:100% 100%;background-size:100% 100%;"{{/if}}><canvas class="m-cover-mask"{{if pic.con}} data="{{pic.con}}"{{/if}}></canvas><div class="m-cover-hand"><img src="images/pen.png"><div class="m-cover-hand-tit">{{textTitle.con}}</div><div class="m-cover-hand-tip">{{textContent.con}}</div></div></div></li>



图片按钮
{"bg":{"type":"uploadPic","title":"背景图片","tip":"背景 尺寸 640*1000","removeBtn":"1","con":""},"bgMatte":{"type":"inputText","title":"背景蒙层","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""},"pic":{"type":"uploadPic","title":"覆&ensp;盖&ensp;图","tip":"上传图片 尺寸 640*640","removeBtn":"1","con":""},"btnText":{"type":"inputText","title":"按钮标题","tip":"15个字以内","con":""},"btnLink":{"type":"inputText","title":"按钮链接","tip":"如果不需要点击按钮跳链接请留空","con":""},"btnColor":{"type":"inputText","title":"文字颜色","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""},"btnBgcolor":{"type":"inputText","title":"按钮颜色","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""}}
<li><div class="m-bg">{{if bg.con}}<img src="{{bg.con}}" />{{/if}}<div class="m-bg-cover-color" {{if bgMatte.con}}style="background-color:{{bgMatte.con}};"{{/if}}></div></div><div class="m-valign"><div class="m-valign-item m-picBtn"><img src="{{pic.con}}" /><a href="{{btnLink.con}}" class="m-picBtn-btn" style="background-color:{{btnBgcolor.con}};color:{{btnColor.con}};">{{btnText.con}}</a></div></div><div class="m-next"></div></li>


报名
{"sign":{"type":"sign","title":"选择要提交的资料","tip":"上传图片 尺寸 640*1000","con":[{"name":"name","isWant":1},{"name":"sex","isWant":1},{"name":"tel","isWant":1},{"name":"email","isWant":1},{"name":"address","isWant":1},{"name":"skin","isWant":1}]},"textColor":{"type":"inputText","title":"字体颜色","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""},"textBgcolor":{"type":"inputText","title":"文字背景","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""},"bg":{"type":"uploadPic","title":"背景图片","tip":"背景 尺寸 640*1000 如不需要背景则不用上传","removeBtn":"1","con":""},"bgMatte":{"type":"inputText","title":"背景蒙层","tip":"#ffffff 或 rgba(000,000,000,0.5) 两种形式","con":""}}

<li data-type="sign"><div class="m-bg">{{if bg.con}}<img src="{{bg.con}}" />{{/if}}<div class="m-bg-cover-color"{{if bgMatte.con}} style="background-color:{{bgMatte.con}};"{{/if}}></div></div><div class="m-valign"><div class="m-valign-item"><div class="m-sign-btn" style="display:block;{{if textBgcolor.con}}background-color:{{textBgcolor.con}};{{/if}}{{if textColor.con}}color:{{textColor.con}};{{/if}}">我要报名</div><form class="m-sign" style="display:none">{{each sign.con as value i}}{{if value.name=="name" && value.isWant=="1"}}<div class="m-sign-item"><div class="m-sign-l">姓名：</div><input type="text" name="name" placeholder="" class="m-sign-text" ></div>{{/if}}{{if value.name=="sex" && value.isWant=="1"}}<div class="m-sign-item"><div class="m-sign-l">性别：</div><div class="m-sign-r"><label onclick=""><input type="radio" name="sex" checked="checked" value="男"/><span>男</span></label><label onclick=""><input type="radio" name="sex" value="女"/><span>女</span></label></div></div>{{/if}}{{if value.name == "tel" && value.isWant == "1"}}<div class="m-sign-item"><div class="m-sign-l">电话：</div><input type="text" name="tel" placeholder="" class="m-sign-text"></div>{{/if}}{{if value.name == "email" && value.isWant == "1"}}<div class="m-sign-item"><div class="m-sign-l">邮箱：</div><input type="text" name="email" placeholder="" class="m-sign-text"></div>{{/if}}{{if value.name == "address" && value.isWant == "1"}}<div class="m-sign-item"><div class="m-sign-l">地址：</div><input type="text" name="address" placeholder="" class="m-sign-text"></div>{{/if}}{{if value.name == "skin" && value.isWant == "1"}}<div class="m-sign-item"><div class="m-sign-l">肤质：</div><div class="m-sign-r"><label onclick=""><input type="radio" name="skin" checked="checked" value="中性"/><span>中性</span></label><label onclick=""><input type="radio" name="skin" value="混合性"/><span>混合性</span></label><label onclick=""><input type="radio" name="skin" value="油性"/><span>油性</span></label><label onclick=""><input type="radio" name="skin" value="干性"/><span>干性</span></label><label onclick=""><input type="radio" name="skin" value="敏感性"/><span>敏感性</span></label></div></div>{{/if}}{{/each}}<div class="m-sign-submit" style="{{if textBgcolor.con}}background-color:{{textBgcolor.con}};{{/if}}{{if textColor.con}}color:{{textColor.con}};{{/if}}">提交</div></form><div class="m-sign-close" style="display:none"></div></div></div></li>




<li data-type="sign"><div class="m-bg">{{if bg.con}}<img src="{{bg.con}}" />{{/if}}<div class="m-bg-cover-color"{{if bgMatte.con}} style="background-color:{{bgMatte.con}};"{{/if}}></div></div><div class="m-valign"><div class="m-valign-item"><div class="m-sign-btn" style="display:block;{{if textBgcolor.con}}background-color:{{textBgcolor.con}};{{/if}}{{if textColor.con}}color:{{textColor.con}};{{/if}}">我要报名</div><form class="m-sign" style="display:none">{{each sign.con as value i}}{{if value.name=="name" && value.isWant=="1"}}<div class="m-sign-item"><div class="m-sign-l">姓名：</div><input type="text" name="name" placeholder="" class="m-sign-text" ></div>{{/if}}{{if value.name=="sex" && value.isWant=="1"}}<div class="m-sign-item"><div class="m-sign-l">性别：</div><div class="m-sign-r"><label onclick=""><input type="radio" name="sex" checked="checked" value="男"/><span>男</span></label><label onclick=""><input type="radio" name="sex" value="女"/><span>女</span></label></div></div>{{/if}}{{if value.name == "tel" && value.isWant == "1"}}<div class="m-sign-item"><div class="m-sign-l">电话：</div><input type="text" name="tel" placeholder="" class="m-sign-text"></div>{{/if}}{{if value.name == "email" && value.isWant == "1"}}<div class="m-sign-item"><div class="m-sign-l">邮箱：</div><input type="text" name="email" placeholder="" class="m-sign-text"></div>{{/if}}{{if value.name == "address" && value.isWant == "1"}}<div class="m-sign-item"><div class="m-sign-l">地址：</div><input type="text" name="address" placeholder="" class="m-sign-text"></div>{{/if}}{{if value.name == "skin" && value.isWant == "1"}}<div class="m-sign-item"><div class="m-sign-l">肤质：</div><div class="m-sign-r"><label onclick=""><input type="radio" name="skin" checked="checked" value="中性"/><span>中性</span></label><label onclick=""><input type="radio" name="skin" value="混合性"/><span>混合性</span></label><label onclick=""><input type="radio" name="skin" value="油性"/><span>油性</span></label><label onclick=""><input type="radio" name="skin" value="干性"/><span>干性</span></label><label onclick=""><input type="radio" name="skin" value="敏感性"/><span>敏感性</span></label></div></div>{{/if}}{{/each}}<div class="m-sign-submit" style="{{if textBgcolor.con}}background-color:{{textBgcolor.con}};{{/if}}{{if textColor.con}}color:{{textColor.con}};{{/if}}">提交</div></form><div class="m-sign-close" style="display:none"></div></div></div></li>


var sss = {
	"sign": {
		"type": "sign",
		"title": "选择要提交的资料",
		"tip": "上传图片 尺寸 640*1000",
		"con": "name,sex,tel,email,address,skin"
	},
	"textColor": {
		"type": "inputText",
		"title": "字体颜色",
		"tip": "#ffffff 或 rgba(000,000,000,0.5) 两种形式",
		"con": ""
	},
	"textBgcolor": {
		"type": "inputText",
		"title": "文字背景",
		"tip": "#ffffff 或 rgba(000,000,000,0.5) 两种形式",
		"con": ""
	},
	"bg": {
		"type": "uploadPic",
		"title": "背景图片",
		"tip": "背景 尺寸 640*1000 如不需要背景则不用上传",
		"removeBtn": "1",
		"con": ""
	},
	"bgMatte": {
		"type": "inputText",
		"title": "背景蒙层",
		"tip": "#ffffff 或 rgba(000,000,000,0.5) 两种形式",
		"con": ""
	}
}