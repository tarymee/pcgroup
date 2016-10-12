# 太平洋网络-设备判断跳转

太平洋网络-设备判断跳转是基于【太平洋网站群】pc端与移动端设备之间互相跳转的解决方案。

## 【重要说明】全站SSI目前只有【太平洋家居网】配置完成，其他网还没配，所以现在只有家居网能用。


## 如何使用
使用之前必须先引用该脚本代码，【太平洋网站群】已经分六网对这段代码做了**全站ssi**，不论是www1目录的专题，CMS的页面还是JSP动态开发页面，都可直接使用。

根据我们的网站架构，有CMS页面和www1专题页面【这两种统称为html页面】以及JSP动态页面，html页面和JSP动态页面的引用方法有点不同。

以下是六网ssi设备跳转代码，以英文名为区分：

网站  | html页面引用 | JSP页面引用
--- | --- | ---
电脑网 | &lt;!--#include virtual="/global_ssi/pconline/jump/index.html" --&gt; | &lt;%@ include file="/global_ssi/pconline/jump/index.html"%&gt;
汽车网 | &lt;!--#include virtual="/global_ssi/pcauto/jump/index.html" --&gt; | &lt;%@ include file="/global_ssi/pcauto/jump/index.html"%&gt;
时尚网 | &lt;!--#include virtual="/global_ssi/pclady/jump/index.html" --&gt; | &lt;%@ include file="/global_ssi/pclady/jump/index.html"%&gt;
亲子网 | &lt;!--#include virtual="/global_ssi/pcbaby/jump/index.html" --&gt; | &lt;%@ include file="/global_ssi/pcbaby/jump/index.html"%&gt;
家居网 | &lt;!--#include virtual="/global_ssi/pchouse/jump/index.html" --&gt; | &lt;%@ include file="/global_ssi/pchouse/jump/index.html"%&gt;
游戏网 | &lt;!--#include virtual="/global_ssi/pcgames/jump/index.html" --&gt; | &lt;%@ include file="/global_ssi/pcgames/jump/index.html"%&gt;





设备跳转代码有两种调用方式，
- 【直接跳转方式】默认调用方式，在pc端页面引用，用户用手机访问pc端页面时直接帮用户跳转到手机端页面。
- 【浮层弹窗方式：目前只有家居，亲子，时尚网提供这种方式】在pc端页面引用，用户用手机访问pc端页面时先弹出一个浮层窗口给用户选择要跳转的版本，并且记录用户的操作，然后再进行跳转，下次用户再访问的话就可以根据上次的操作记录直接跳转选择的版本。


### 第一种【直接跳转方式】，调用如下
- 设备跳转代码必须加在【PC端】页面的< head >标签里面，**并且必须先于其他资源加载**
- **以下调用方式是以【太平洋电脑网】为例的**，如用于其他网则需要把**/global_ssi/pconline/jump/index.html**中的**pconline**改成对应网站。

#### CMS页面调用【SSI】
```html
<head>
...
<%-- 这是用于文章页的，如果想用于栏目页，则需要把CMS置标 property="article" 改成 property="channel" --%>
<%-- 设备跳转模块 S --%>
<script>
<!--#include virtual="/global_ssi/pconline/jump/index.html" -->
<data:multiUrl id="" property="article" kind="json" mtplCate="wap_3g,wap,ipad,main" result="multiUrl" />
deviceJump.init(
${multiUrl}
);
</script>
<%-- 设备跳转模块 E --%>
...
</head>
```

#### JSP动态开发页面调用【SSI】
```html
<head>
...
<!-- 设备跳转模块 S -->
<script>
<%@ include file="/global_ssi/pconline/jump/index.html"%>
deviceJump.init({
	"main": "http://www.pconline.com.cn/",//这里需要开发动态写入pc版连接,如没有可为空
	"ipad": "http://ipad.pconline.com.cn/",//这里需要开发动态写入ipad版连接,如没有可为空
	"wap": "http://g.pconline.com.cn/w/",//这里需要开发动态写入简版连接,如没有可为空
	"wap_3g": "http://g.pconline.com.cn/"//这里需要开发动态写入炫版连接,如没有可为空
});
</script>
<!-- 设备跳转模块 E -->
...
</head>
```
#### 普通专题调用【SSI】
普通专题调用与JSP动态开发页面调用就只是include写法不同而已。
```html
<head>
...
<!-- 设备跳转模块 S -->
<script>
<!--#include virtual="/global_ssi/pconline/jump/index.html" -->
deviceJump.init({
	"main": "http://www.pconline.com.cn/",//这里需要自己手动写入pc版连接,如没有可为空
	"ipad": "http://ipad.pconline.com.cn/",//这里需要自己手动写入ipad版连接,如没有可为空
	"wap": "http://g.pconline.com.cn/w/",//这里需要自己手动写入简版连接,如没有可为空
	"wap_3g": "http://g.pconline.com.cn/"//这里需要自己手动写入炫版连接,如没有可为空
});
</script>
<!-- 设备跳转模块 E -->
...
</head>
```

#### JS版【JS外链】
注意：由于全站已经做了SSI，所以理论上全站都可以用SSI嵌入而不用JS版了，但是如果有些页面不那么在意网速问题，那也可以用JS外链引用，这里一并提供。
```html
<head>
...
<!-- 设备跳转模块 S -->
<script src="http://www.pconline.com.cn/global_ssi/pconline/jump/index.html"></script>
<script>
deviceJump.init({
	"main": "http://www.pconline.com.cn/",//这里需要自己手动写入pc版连接,如没有可为空
	"ipad": "http://ipad.pconline.com.cn/",//这里需要自己手动写入ipad版连接,如没有可为空
	"wap": "http://g.pconline.com.cn/w/",//这里需要自己手动写入简版连接,如没有可为空
	"wap_3g": "http://g.pconline.com.cn/"//这里需要自己手动写入炫版连接,如没有可为空
});
</script>
<!-- 设备跳转模块 E -->
...
</head>
```
### 第二种【浮层弹窗方式】
【浮层弹窗】跟第一种【直接跳转】调用方式差不多，只是在初始化deviceJump.init()的时候多了两个参数:
```javascript
deviceJump.init(obj,fn,type);
```
其中，fn写undefined，type写"jump2"表示调用第二种【浮层弹窗方式】。

#### CMS页面调用【SSI】
```html
<head>
...
<%-- 这是用于文章页的，如果想用于栏目页，则需要把CMS置标 property="article" 改成 property="channel" --%>
<%-- 设备跳转模块 S --%>
<script>
<!--#include virtual="/global_ssi/pconline/jump/index.html" -->
<data:multiUrl id="" property="article" kind="json" mtplCate="wap_3g,wap,ipad,main" result="multiUrl" />
deviceJump.init(${multiUrl},undefined,"jump2");
</script>
<%-- 设备跳转模块 E --%>
...
</head>
```
JSP动态开发页面调用【SSI】 普通专题调用【SSI】 JS版【JS外链】 都是一样多写两个参数 undefined 和 "jump2"，其他都跟第一种方式一样，在此不一一写出了。




## PCGPARAM全局变量
PCGPARAM全局变量是【太平洋网站群】作用于公共模块的一个对象，初始化设备跳转代码后自动创建，该对象包含一些公共模块的重要属性，可根据需要调用。<br />
目前有两个属性，分别为：
- browserType: | main | ipad | wap | wap_3g | 【根据设备分为四种浏览类型，值为分别对应 | pc版 | ipad版 | 简版 | 炫版 | 】
- bIsWeixin: | true | false | 【判断是不是微信浏览器】

如果有同事发现有些公共属性是可以增加的，欢迎联系网速组。<br />

## 更新日志
- 2015-09-14 整合设备跳转第二种方式：浮层弹窗
- 2015-08-19 修复bug
- 2015-08-18 增加fromApp参数转移
- 2015-07-30 兼容六网
- 2015-07-03 创建PCGPARAM全局对象
- 2014-11-19 修改如果当前连接与将要跳转的链接相同 则不跳转(之前规则不合理,重写)
- 2014-11-04 记录来源用cookie存10秒:解决计数器来源问题
- 2014-05-29 增加小米平板判断:跳去pad版
- 2014-03-25 修改规则:取消上一个规则
- 2014-03-11 修改规则:修改AD计数转移规则，如果有设备跳转，则把当前的reffer转入将要跳转的URL
- 2014-01-08 修改规则:如果来源不为空&&来源与当前链接不同域&&来源与当前链接中有一个与ipad.pcauto.com.cn同域 则跳转
- 2014-01-08 修改规则:如果来源不为空&&来源与当前链接不同域&&来源与当前链接中有一个与m.pcauto.com.cn同域 则跳转
- 2014-01-08 修改规则:来源为空 则跳转 如果是非本站来源或者来源有mrobot关键字 则跳转
- 2013-10-17 增加同源不跳转功能 来源如果为mrobot 则继续跳转
- 2013-08-07 增加处理ad计数功能
- 2013-04-26 create




## 存放位置
- 源码位置：svn\data\js\common\deviceJump
- ssi更新位置：cms\全站公共ssi\全站设备跳转_js
- ssi跳转浮层cms更新位置：cms\全站公共ssi\全站设备跳转_浮层