# WAP端百度分享

## 先看一些资料，对百度分享有大概了解

+ [百度分享1.0 API](http://share.baidu.com/help/customization/config)
+ [百度分享2.0 API](http://share.baidu.com/code/advance)

1.0优缺点
+ 同个页面可以定义多个分享按钮 每个分享按钮可以有不同的链接和内容
+ 可以定义 wbUid 参数 分享的时候自动@新浪用户
+ 修改样式只能用css覆盖的方式
+ 代码结构不简练 需要引入多个script标签
+ 1.0版本现在官网已经不更新维护了

2.0优缺点：
+ 同个页面可以定义多个分享，但只能是同个链接和内容
+ 没有1.0的 wbUid 参数，不能分享的时候自动@新浪用户【但也可以自己写入】
+ 可以通过 bdCustomStyle 参数自定义样式 1.0版本的只能覆盖
+ 官网主推2.0版本

现在WAP端【新版】推荐统一用2.0版本，之前的做法是做成插件，现在不做成插件了，仅提供最基本的简单代码示例【需要更多功能请参考官网API或自行扩展】。



```html
<!-- 
HTML结构可以放在body的任意位置，可复制多份。 
class＝"bdsharebuttonbox" 部分为dom选择器，请勿改动。
data-tag属性为分享按钮标识，用于实现同一页面中多分享按钮不同配置，详见设置部分。
data-cmd属性为分享目标标识，取值请参见：分享媒体id对应表。此外值为more时点击展现更多弹窗，值为count时展现分享数。
-->
<div class="bdsharebuttonbox" data-tag="share_1">
	<a class="bds_weixin" data-cmd="weixin"></a>
	<a class="bds_mshare" data-cmd="mshare"></a>
	<a class="bds_qzone" data-cmd="qzone"></a>
	<a class="bds_tsina" data-cmd="tsina"></a>
	<a class="bds_baidu" data-cmd="baidu"></a>
	<a class="bds_renren" data-cmd="renren"></a>
	<a class="bds_count" data-cmd="count"></a>
</div>
<!-- 
JS部分：
一般放于页面底部，外链，方便修改
可配合lazy.js实现按需加载
 -->
<script>
window._bd_share_config = {
	common : {
		//此处放置通用设置
		// "bdText" : "自定义分享标题 留空或不写则为默认",
		// "bdDesc" : "自定义分享摘要 留空或不写则为默认",
		// "bdUrl" : "自定义分享url地址 留空或不写则为默认",
		// "bdPic" : "自定义分享图片 留空或不写则为默认"

		// bdSign: 是否进行回流统计 参数为
		// on: 默认值，使用正常方式挂载回流签名（#[数字签名]）
		// off: 关闭数字签名，不统计回流量
		// normal: 使用&符号连接数字签名，不破坏原始url中的#锚点
		bdSign : "normal",
		// bdSnsKey: 自定义分享平台的key 六网各不同 这里是以电脑网为例
		// pconline 2953917903
		// pcauto 3549659419
		// pclady 1536120080
		// pcbaby 3787104594
		// pchouse 1207940458
		// pcgames 736770245
		"bdSnsKey":{"tsina":"2953917903"}
	},
	share : [{
		"tag" : "share_1",//这里的值对应html的data-tag属性
		"bdCustomStyle":"xxx.css"// 自定义样式地址 根据设计稿创建不同的样式文件来引用
	}]
}
with(document)0[(getElementsByTagName("head")[0]||body).appendChild(createElement("script")).src="http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion="+~(-new Date()/36e5)];
</script>
```

## 关于微信分享

百度的微信分享，点击是出现一个二维码给用户扫描分享，这在pc端是可以的，因为有手机可以扫，但在WAP端因为已经是手机上了，所以要换另一种方式，并且在UC浏览器中，UC有提供API支持一键分享到微信

所以整个流程是这样的：
```javascript
var ua = navigator.userAgent.toLowerCase();
if (/UCBrowser/i.test(ua)) {
	if (/(iPad|iPhone|iPod)/i.test(ua)) {
		alert("ios");
		ucbrowser.web_share(document.title, "", location.href, "kWeixinFriend", "", "", "");
	} else {
		ucweb.startRequest("shell.page_share", [document.title, "", location.href, "WechatTimeline", "", "", ""]);
	}
}else {
	if (/micromessenger/i.test(ua)) {
		alert("请点击当前屏幕右上角按钮进行分享。");
	} else {
		alert("请通过微信搜索\"太平洋电脑网\"并添加为好友，通过微信分享精彩内容。");
	}
}
```
[一个具体的demo](http://www1.pconline.com.cn/wap/20151116/test/demo.html)