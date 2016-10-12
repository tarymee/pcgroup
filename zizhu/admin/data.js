var CONSTANTS = {
	"picData":[],
	"html":"",
	"temple":"{{if music.con}}<audio id=\"Jaudio\" src=\"{{music.con}}\" preload loop style=\"display:none;height:0;overflow:hidden;\"></audio><div id=\"Jmusic\" class=\"m-music-icon\"></div>{{/if}}<style>{{if bg.con}}.m-bg{background:url({{bg.con}}) no-repeat center center;-webkit-background-size:cover;-moz-background-size:cover;background-size:cover;}{{/if}}{{if bgOpacity.con}}.m-bg-cover-color{background-color:{{bgColor.con}};opacity:{{bgOpacity.con/100}};}{{/if}}</style>{{if arrow.con}}<style>.m-next{display:block;background:url(http://www1.pclady.com.cn/global/2015/h5/admin/zt/img/{{arrow.con}}.png) no-repeat 0px 0px;-webkit-background-size:20px;-moz-background-size:20px;background-size:20px;}</style>{{/if}}",
	"json":{
		"title": {
			"type": "inputText",
			"title": "专题标题",
			"tip": "请填写专题标题",
			"con": ""
		},
		"description": {
			"type": "textarea",
			"title": "专题简介",
			"tip": "请填写专题简介 40个字以内",
			"con": ""
		},
		"keywords": {
			"type": "inputText",
			"title": "关键字",
			"tip": "请填写关键字 以英文逗号,分隔",
			"con": ""
		},
		"music": {
			"type": "inputText",
			"title": "背景音乐",
			"tip": "请填写线上mp3文件地址 如不需要音乐请留空",
			"con": ""
		},
		"arrow": {
			"type": "inputRadio",
			"title": "箭头样式",
			"options": [
				["doubleWhite","双白"],
				["singleWhite","单白"],
				["doubleBlack","双黑"],
				["singleBlack","单黑"],
				["","无箭头"]
			],
			"tip": "",
			"con": "doubleWhite"
		},
		"cover": {
			"type": "uploadPic",
			"title": "专题封面",
			"tip": "100*100 微信分享封面图 点击可更换",
			"removeBtn": "0",
			"con": "http://www1.pclady.com.cn/global/2015/h5/admin/img/cover.png"
		},
		"bg": {
			"type": "uploadPic",
			"title": "背景图片",
			"tip": "背景尺寸640*1000<br />此设置为全局 会应用到专题的每一屏背景中<br />如不需要则不用上传 也可以在单屏页面各自设置<br />下面的背景颜色也同理",
			"removeBtn": "1",
			"con": ""
		},
		"bgColor": {
			"type": "inputColor",
			"title": "背景颜色",
			"tip": "16进制颜色 比如 #ffffff",
			"con": "#ffffff"
		},
		"bgOpacity": {
			"type": "inputRange",
			"title": "不透明度",
			"min": "0",
			"max": "100",
			"step": "1",
			"tip": "背景颜色 0表示完全透明 100表示完全不透明",
			"con": "0"
		}
	},
	"stArray":[]
};