# WAP端网速优化方案【新版草案】 #
## 主要的优化方向 & 策略 ##

+ 尽量减少每个页面需要获取额外资源的HTTP请求数
+ 尽量减少每个请求加载的大小【图片 js css等资源压缩合并】
+ 尽量优化客户端执行的优先级和脚本执行的效率
+ 根据太平洋网站群的特点做性能和用户体验优化

---------------------------



## 一、资源优化 ##

#### 1、JS文件优化 ####
+ JS库和JS插件统一用[【WAP端合并压缩工具】](http://zzsvn.pcauto.com.cn/svn/data/min2/builder_v2/pcMinConfig.html)
+ JS放页面底部，body结束标签之前，个数规定为3-4个，分别为：
	+ 库类JS文件【移动端推荐统一用Zepto v1.1.6版本，之所以独立不合并是因为基本上移动端都要用Zepto，整站可以做缓存】
	+ 合并压缩后的插件类JS文件【如 lazy swipe iscroll 等】
	+ 前端的业务逻辑JS文件
	+ 如果是动态开发页面，还需要加上开发自己写的后端业务逻辑JS文件【要求开发不要内嵌，单独做成一个JS文件放他们那边的服务器】


#### 2、针对CMS项目： ####
+ 大首页CSS要内嵌
+ 首页，栏目页最后在上线的时候第二和第三个JS文件【插件类和业务逻辑类文件】要内嵌，CMS中一二级栏目有此功能，
+ 文章页和其他页面不需要内嵌，统一用外链

```
<!-- CMS中一二级栏目会自动把JS内嵌 -->
<script src="xxx.js" charset="utf-8"></script>

<!-- 文章页和其他页面如不需要内嵌，可加上class=" defer"，注意defer前面有一个空格 -->
<script src="xxx.js" charset="utf-8" class=" defer"></script>
```
#### 3、图片优化 ####
+ 优化图片大小[【tinyPNG】](https://tinyjpg.com/)
+ 背景图片用图片精灵CSS Sprites
+ 视情况使用dataURI【超过3K不建议】
+ 灵活应用CSS，可用CSS实现的效果就尽量用CSS
+ 按需加载非首屏图片【使用插件：lazy】[【WAP端合并压缩工具】](http://zzsvn.pcauto.com.cn/svn/data/min2/builder_v2/pcMinConfig.html)

## 二、性能优化 ##

#### HTML ####
+ 精简HTML结构
+ 避免空链接和#号【img/iframe/css/script】 [Avoid bad requests](https://varvy.com/pagespeed/avoid-bad-requests.html)

#### CSS ####
+ CSS外链不超过1个，放页面头部
+ CSS避免使用@import【SVN中有针对CSS的ssi功能】
+ 避免使用CSS表达式：[Avoid CSS Expressions](https://developer.yahoo.com/performance/rules.html#css_expressions)
+ 避免使用Filters：[Avoid Filters](https://developer.yahoo.com/performance/rules.html#no_filters=)
+ 使用CSS3动画代替JS动画
+ 注意reflow和repaint
	+ 设置图片的宽高
	+ 尽可能少的修改元素style上的属性
	+ 通过修改className来修改样式
	+ 或者通过cssText属性来一次性设置样式值

#### JS ####
+ 将JavaScript脚本放在页面的底部
+ 按需加载非首屏业务模块，js按需执行【使用插件：lazy】[【WAP端合并压缩工具】](http://zzsvn.pcauto.com.cn/svn/data/min2/builder_v2/pcMinConfig.html)
+ 尽量避免全局变量，多用局部变量【特别是在需要跟开发配合的动态页面中】
+ 缓存 DOM 高效选择与计算
+ 尽可能使用事件代理，避免批量绑定事件
+ 兼容移动端touchstart与click事件【click事件在触摸屏设备上，触屏时，会有大约半秒（大多数设备差不多都是300毫秒）的延迟，这个延迟会很明显地影响用户期望的响应性能。】
+ 数据离线化，考虑将数据缓存在 localStorage


## 三、用户体验优化 ##
+ 采用lazy按需加载的图片或接口资源，在加载前必须有loadding的提示[【demo】](loadding.html)
+ 小型静态资源，如设备判断js、推广位等，通过ssi引入
+ 避免js阻塞导致页面空白问题，头尾供外接口改成html格式，通过ssi引入 [【六网WAP公共头尾】](http://zzsvn.pcauto.com.cn/svn/other/wap/doc/%d2%c6%b6%af%b9%e6%b7%b6/head-foot.html)
+ 通过cookie保存城市定位信息 [【demo】](http://zzsvn.pconline.com.cn/svn/other/doc/common/location/ip.html)







