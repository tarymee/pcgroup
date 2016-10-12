# 移动端针对不同屏幕尺寸的兼容适配方案


## 方案一：vd【viewportWidth=designWidth】
#### [【源码】](vd/vd.js) [【demo】](vd/index.html) [【下载模板】](vd/model.html)
#### 建议在移动端专题中使用 vd 方案

## 方案二：flexible-simple【淘宝lib.flexible简化版】
#### [【源码】](flexible-simple/flexible-simple.js) [【demo】](flexible-simple/index.html) [【下载模板】](flexible-simple/model.html)
#### 我们建议在移动端的项目中使用flexible-simple


## 两种方案优缺点对比
| 两种方案优缺点对比 | 优点 | 缺点 |
| :---: | :--- | :--- |
| 方案一<br />viewport640 | 方便快捷，拆分设计稿时，数值只需按照原版设计稿大小写<br />写css时可省略background-size | 有时候不兼容app中的webview<br />不能实现"retina下border: 1px"【指的是物理像素下的1px，影响不大】，<br />简单粗暴，直接设置viewportWidth=designWidth，不能实现精确的尺寸控制 |
| 方案二<br />lib.flexible简化版 | 字体字号只需要写一套<br />可以用rem的方式写宽高百分比【width:6.4rem=width:100%】，同时也支持高度<br />可以自由切换px或rem写法，判断不同的情况，根据需要用，方便灵活<br />取消lib.flexible提供的一些api接口【尽量优化js文件大小】 | 不能实现"retina下border: 1px"【指的是物理像素下的1px，影响不大】<br /> |



## 方案二的实战应用

#### 1、对源码做压缩内嵌处理，放在head标签里面，css样式文件之前。
```
// 接受两个参数
// 1 根据设计稿的宽度来传参 比如640 750 1125
// 2 设置屏幕最大宽度基准 非必须 如不填默认是540
// 实际内嵌到页面时删除这些注释
(function(f,j){var i=document,d=window;var b=i.documentElement;var c;var h=i.querySelector('meta[name="viewport"]');var e="width=device-width,initial-scale=1,maximum-scale=1.0,user-scalable=no";if(h){h.setAttribute("content",e)}else{h=i.createElement("meta");h.setAttribute("name","viewport");h.setAttribute("content",e);if(b.firstElementChild){b.firstElementChild.appendChild(h)}else{var a=i.createElement("div");a.appendChild(h);i.write(a.innerHTML)}}function g(){var k=b.getBoundingClientRect().width;if(!j){j=540}if(k>j){k=j}var l=k*100/f;b.style.fontSize=l+"px"}g();d.addEventListener("resize",function(){clearTimeout(c);c=setTimeout(g,300)},false);d.addEventListener("pageshow",function(k){if(k.persisted){clearTimeout(c);c=setTimeout(g,300)}},false);if(i.readyState==="complete"){i.body.style.fontSize="16px"}else{i.addEventListener("DOMContentLoaded",function(k){i.body.style.fontSize="16px"},false)}})(640,640);
```
**需要注意的是：**
- 样式的reset中需先设置html字体的初始化大小为50px，这是为了防止js被禁用或者加载不到或者执行错误而做的兼容
- 样式的reset中需先设置body字体的初始化大小为16px，这是为了让body内的字体大小不继承父级html元素的50px，而用系统默认的16px


内嵌了这段js以及设置html和body的字体大小之后，就可以在样式中使用rem了。

#### 2、把设计稿中的px转换成rem
目前日常工作当中，设计师给到前端开发人员手中的设计稿尺寸一般是基于640px、750px以及1125px宽度为准的。

我们如何将设计稿中的各元素的px转换成rem，以设计师给到的**640px**设计稿为例：
先把640做为参数传入JS中【如果是750或者1125的设计稿则同理传参】

然后，对于设计稿上的元素尺寸换算，只需要原始的px值除以100即可。

例如640px设计稿中的字体为24px，那么可以写成
**24/100=0.24rem**

例如640px设计稿中图片尺寸为128px \* 64px，那么转换成为
**1.28rem \* 0.64rem**


#### 3、百分比与rem转换
针对640的设计稿，传参为640，则
**width:100% == width:6.4rem**

如果是750的设计稿，传参为750，则
**width:100% == width:7.5rem**

以此类推。。

但需要注意的是，flexible做了一个限制，在屏幕宽度大于540【也可以使用第二个参数来自定义】的情况下，会强制用屏幕宽度=540来计算html的基准值【540*100/640】，因此在这种情况下，width:6.4rem != width:100%


#### 4、如何快速计算

(1)、用sublime开发的同学，可以用ctrl+shift+y进行数学运算，直接得出结果。

(2)、CSSREM是一个CSS的px值转rem值的Sublime Text3自动完成插件。这个插件是由@正霖编写。效果如下：

![](https://raw.githubusercontent.com/flashlizi/cssrem/master/cssrem.gif)

有关于CSSREM如何安装、配置教程可以[【点击这里查阅】](https://github.com/flashlizi/cssrem)。

(3)、用less的同学，可以使用less的Mixin类
```less
.px2rem(@name,@px1){
	@{name}: (@px1 / 100) * 1rem;
}
.px2rem(@name,@px1,@px2){
	@{name}: (@px1 / 100) * 1rem (@px2 / 100) * 1rem;
}
.px2rem(@name,@px1,@px2,@px3){
	@{name}: (@px1 / 100) * 1rem (@px2 / 100) * 1rem (@px3 / 100) * 1rem;
}
.px2rem(@name,@px1,@px2,@px3,@px4){
	@{name}: (@px1 / 100) * 1rem (@px2 / 100) * 1rem (@px3 / 100) * 1rem (@px4 / 100) * 1rem;
}

.aaa{.px2rem(top,128);}
.bbb{.px2rem(margin,128,128);}
.ccc{.px2rem(margin,128,128,2);}
.ddd{.px2rem(padding,128,128,18,65);}
```
上面的代码会编译成
```css
.aaa{top:1.28rem;}
.bbb{margin:1.28rem 1.28rem;}
.ccc{margin:1.28rem 1.28rem 0.02rem;}
.ddd{padding:1.28rem 1.28rem 0.18rem 0.65rem;}
```

(4)、或者可以自己写Sass的函数、混合宏这些功能来实现

(5)、其他自动化工具【比如gulp grunt等】

#### 5、一些需要注意的点：
+ 虽然理论上任何px值都可以转化为rem值，但也要根据需求，不要过度使用【有些情况元素或字体的是要求固定尺寸的，不需要随着屏幕宽度增大或缩小，这就要用px而不是用rem了】
+ 针对要转换的px值，如果设计稿是640px的话，最小值不得小于2且最好为双数【因为如果是1px的话，在320的屏幕下会缩放为0.5px，目前在移动端有些浏览器尚不支持有小数点的px值】
+ 如需使用 background-image，尽量为背景图设置一定的空白间隙 原因详见[【rem 产生的小数像素问题】](http://web.jobbole.com/84113/)


#### 6、参考资料
+ [淘宝lib.flexible](https://github.com/amfe/lib-flexible)
+ [lib.flexible原理解析](http://div.io/topic/1092)
+ [使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)