# 移动端针对不同屏幕尺寸的兼容适配方案


## 方案一：淘宝lib.flexible[【源码】](https://github.com/amfe/lib-flexible)[【实例】](https://m.taobao.com/#index)

先看一些资料，对rem以及淘宝lib.flexible方案有大概了解：

[lib.flexible原理解析](http://div.io/topic/1092)

[使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)

[rem 产生的小数像素问题](http://web.jobbole.com/84113/)

+ 方案完善，各方面都考虑到
+ 兼容高清屏 可实现"retina下border: 1px"
+ 可以用rem的方式写宽高百分比，支持高度[【demo】](flexible-simple/index.html)
+ 宽高数值用rem，根元素的rem基准是window.screen.width / 10，
	+ 以后可以兼容vw，并且百分比也可以换算成rem：比如10%=1rem，对于高度同样适用，
	+ 如果想用到一些具体的数值，数值计算【比如640的视觉稿，1rem = 64px，那么(320px \* 80px)的元素换算成(5rem \* 1.25rem)】
+ 字体用px，所以需针对不同的设备像素比写多套字体

## 方案二：viewport640[【demo】](viewport640/index.html)
```javascript
!(function () {
// 此处添加如下js 可以避免二倍图和百分比定位造成的不便
if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
	var version = parseFloat(RegExp.$1);
	if (version > 2.3) {
		var phoneScale = parseInt(window.screen.width) / 640;
		document.write('<meta name="viewport" content="width=640, minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
	} else {
		document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
	}
} else {
	document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi,minimal-ui">');
}
})();
```
+ 方便快捷，拆分设计稿时，数值只需按照原版设计稿大小写就行，并且可省略background-size；
+ 有时候不兼容app中的webview【比如亲子宝典-活动中的webview】
+ 简单粗暴，页面缩放比例为(window.screen.width) / 640，而不是根据设备像素比，不能实现"retina下border: 1px"
+ 直接设置viewport=640，页面统一缩放，不能实现精确的尺寸控制
+ **建议在移动端专题中使用**



## 方案三：我们采用lib.flexible简化版[【源码】](flexible/flexible.js)[【demo】](flexible-simple/index.html)
+ 取消设备像素比缩放，考虑到我们网站针对"retina下border: 1px"的效果基本没用到，而且这功能也可以通过其他方式实现
+ 因为取消设备像素比缩放，字体就不用针对不同的设备像素比写多套，同时也就取消了data-dpr属性
+ 可以用rem的方式写宽高百分比，支持高度[【demo】](flexible-simple/index.html)
+ 可以自由切换px或rem写法，判断不同的情况，根据需要用，方便灵活
+ 取消lib.flexible提供的一些api接口【尽量优化js文件大小】
+ **建议在移动端的项目中试用这套方案**
+ **针对更有追求的同学，如果觉得此方案取消了设备像素比缩放，不能更精确控制的话，也欢迎使用淘宝的lib.flexible方案【也就是方案一】**



## 三种方案优缺点对比
| 三种方案优缺点对比 | 优点 | 缺点 |
| :---: | :--- | :--- |
| 方案一<br />lib.flexible | 方案完善，各方面都考虑到<br />兼容高清屏 可实现"retina下border: 1px"<br />可以用rem的方式写宽高百分比，支持高度[【demo】](flexible-simple/index.html) | 字体用px，所以需针对不同的设备像素比写多套字体 |
| 方案二<br />viewport640 | 方便快捷，拆分设计稿时，数值只需按照原版设计稿大小写，可省略background-size<br />建议在移动端专题中使用 | 有时候不兼容app中的webview<br />不能实现"retina下border: 1px"，<br />简单粗暴，直接设置viewport=640，不能实现精确的尺寸控制 |
| 方案三<br />lib.flexible简化版 | 字体字号只需要写一套<br />可以用rem的方式写宽高百分比，支持高度[【demo】](flexible-simple/index.html)<br />可以自由切换px或rem写法，判断不同的情况，根据需要用，方便灵活<br />取消lib.flexible提供的一些api接口【尽量优化js文件大小】<br />建议在移动端的项目中试用这套方案 | 不能实现"retina下border: 1px"<br /> |


## 方案三的实战应用
我们采用lib.flexible简化版

建议对源码做压缩内嵌处理，放在head标签里面，style样式之前。

需要注意的是：样式的reset中需先设置html和body的初始化大小为32px和16px，这是为了防止js被禁用或者加载不到而做的兼容。

```html
<!doctype HTML>
<html>
<head>
<title>demo</title>
<script>
// 设置页面viewport && 基准rem
!function(a,b){function h(){var b,a=c.getBoundingClientRect().width;a>540&&(a=540),b=a/10,c.style.fontSize=b+"px"}var d,g,c=a.documentElement,e=a.querySelector('meta[name="viewport"]'),f="width=device-width,initial-scale=1,maximum-scale=1.0,user-scalable=no";e?e.setAttribute("content",f):(e=a.createElement("meta"),e.setAttribute("name","viewport"),e.setAttribute("content",f),console.log(c.firstElementChild),c.firstElementChild?c.firstElementChild.appendChild(e):(g=a.createElement("div"),g.appendChild(e),a.write(g.innerHTML))),h(),b.addEventListener("resize",function(){clearTimeout(d),d=setTimeout(h,300)},!1),b.addEventListener("pageshow",function(a){a.persisted&&(clearTimeout(d),d=setTimeout(h,300))},!1),"complete"===a.readyState?a.body.style.fontSize="16px":a.addEventListener("DOMContentLoaded",function(){a.body.style.fontSize="16px"},!1)}(document,window);
</script>
<style>
html{font-size:32px;}
body{font-size:16px;}
</style>
</head>
<body>
<!-- 页面结构写在这里 -->
</body>
</html>
```
内嵌了这段js之后，就可以在样式中使用rem了。



### 百分比与rem转换
目前Flexible会将视觉稿分成10份，基准也是(屏幕宽度/10)得到，因此:

width:100% == width:10rem;

但需要注意的是，10rem 跟 100% 用法又不尽相同，10rem是根据根元素html的字体大小做基准，而100%是根据父元素的宽度做基准。


### 把视觉稿中的px转换成rem
首先，目前日常工作当中，视觉设计师给到前端开发人员手中的视觉稿尺寸一般是基于640px、750px以及1125px宽度为准的。

我们如何将设计稿中的各元素的px转换成rem，以设计师给到的**640px**设计稿为例：

目前Flexible会将视觉稿分成10份，基准也是(屏幕宽度/10)得到，因此针对640px的设计稿:

1rem = 64px

这个640px稿子就分成了10rem，也就是整个宽度为10rem，html根元素对应的font-size为(width/10)px;

这样一来，对于视觉稿上的元素尺寸换算，只需要原始的px值除以rem基准值即可。

例如640px视觉稿中的字体为24px，那么可以写成24/64=0.375rem，

例如640px视觉稿中图片尺寸为128px \* 64px，那么转换成为2rem \* 1rem。

### 如何快速计算

在实际生产当中，如果每一次计算px转换rem，或许会觉得非常麻烦，或许直接影响大家平时的开发效率。在这里提供几个小方法：

1、用sublime开发的同学，可以用ctrl+shift+y进行数学运算，直接得出结果。

2、CSSREM是一个CSS的px值转rem值的Sublime Text3自动完成插件。这个插件是由@正霖编写。效果如下：

![](https://raw.githubusercontent.com/flashlizi/cssrem/master/cssrem.gif)

有关于CSSREM如何安装、配置教程可以[【点击这里查阅】](https://github.com/flashlizi/cssrem)。

3、用less的同学，可以使用less的Mixin类
```less
.px2rem(@name,@px1){
	@{name}: (@px1 / 64) * 1rem;
}
.px2rem(@name,@px1,@px2){
	@{name}: (@px1 / 64) * 1rem (@px2 / 64) * 1rem;
}
.px2rem(@name,@px1,@px2,@px3){
	@{name}: (@px1 / 64) * 1rem (@px2 / 64) * 1rem (@px3 / 64) * 1rem;
}
.px2rem(@name,@px1,@px2,@px3,@px4){
	@{name}: (@px1 / 64) * 1rem (@px2 / 64) * 1rem (@px3 / 64) * 1rem (@px4 / 64) * 1rem;
}

.aaa{.px2rem(top,128);}
.bbb{.px2rem(margin,128,128);}
.ccc{.px2rem(margin,128,128,2);}
.ddd{.px2rem(padding,128,128,18,65);}
```
上面的代码会编译成
```css
.aaa{top:2rem;}
.bbb{margin:2rem 2rem;}
.ccc{margin:2rem 2rem 0.03125rem;}
.ddd{padding:2rem 2rem 0.28125rem 1.015625rem;}
```

4、或者可以自己写Sass的函数、混合宏这些功能来实现

5、其他自动化工具

### 一些需要注意的点：
+ flexible做了一个限制，在屏幕宽度大于540的情况下，会强制用屏幕宽度=540来计算html的基准值【540/10】，因此在这种情况下，width:10rem != width:100%
+ 虽然理论上任何px值都可以转化为rem值，但也要根据需求，不要过度使用【有些情况元素或字体的是要求固定尺寸的，不需要随着屏幕宽度增大或缩小，这就要用px而不是用rem了】
+ 针对要转换的px值，如果设计稿是640px的话，最小值不得小于2且最好为双数【因为如果是1px的话，在320的屏幕下会缩放为0.5px，目前在移动端有些浏览器尚不支持有小数点的px值】




