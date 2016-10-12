# 太平洋网站计数器
**【备注：演示代码均以太平洋汽车网为例，栏目计数器id为9999】**

## 历史版本
#### 第三阶段【2014年10月】
当用户在移动设备上通过搜索引擎比如百度，google搜到PC端的页面时，PC端的页面会自动跳转到WAP端页面，这时候WAP端的计数器请求来源【document.referrer】记录的是PC端页面，但是正确的来源应该是百度，google才对，因此需要修正WAP端计数器请求来源。

**PC端**
```
在设备跳转代码中检测到如果PC端的来源是非本站PC端的页面时，则把来源存到cookie中【cookie名：referrerUrl，有效期：10秒】，PC端计数器代码不用修改。
```
**WAP端：取页面来源时，先检测有没有cookie，如果有cookie，则把 cookie作为来源，如果没有，才用【document.referrer】作为来源，之后清除cookie**
```
document.body.insertBefore(document.createElement("script"),document.body.firstChild).src="http://count.count.com.cn/count.php?channel=9999&screen="+screen.width+"*"+screen.height+"&refer="+encodeURIComponent(!!document.cookie.match(/(^|; )referrerUrl=[^;]+/)?document.cookie.match(/(^|; )referrerUrl=([^;]+)/)[2]:document.referrer)+"&anticache="+new Date().getTime()+"&url="+encodeURIComponent(location.href);document.cookie="referrerUrl=;expires="+new Date(new Date().getTime()-10000).toGMTString()+";path=/;domain=.pcauto.com.cn";
```
备注：这个方案当时只用于汽车网，并未普及六网，没有做成CMS置标。



#### 第二版本【2014年】
为了应对UC、QQ等手机浏览器无图模式导致计数器无法激活的问题，WAP端页面需要修改为使用 script 来请求的方式，其他规范与PC端计数器一致。
比如：区别静/动态应用，静态页面，需在原栏目计数器上添加&from=cms参数，而动态应用则不需要。

**WAP端改为**
```
/* JS版本 */
document.body.insertBefore(document.createElement("script"),document.body.firstChild).src="http://count.pcauto.com.cn/count.php?channel=9999&screen="+screen.width+"*"+screen.height+"&refer="+encodeURIComponent(document.referrer)+"&anticache="+new Date().getTime()+"&url="+encodeURIComponent(location.href);

/* CMS版本 */
<cms:channel property="count_code2">{栏目计数器代码}</cms:channel>
```
#### 最初版本【2013年】

**PC端和WAP端都统一用**
```
/* JS版本 */
document.write("<img style=display:none src=http://count.pcauto.com.cn/count.php?channel=9999&screen="+screen.width+"*"+screen.height+"&refer="+escape(document.referrer)+"&anticache="+new Date().getTime()+location.hash.replace(/^#ad=/,"&ad=")+" >");

/* CMS版本 */
<cms:channel property="count_code">{栏目计数器代码}</cms:channel>
```


