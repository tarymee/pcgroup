# 太平洋网站计数器
**【备注：演示代码均以太平洋汽车网为例，栏目计数器id为9999】**

## 新版【注意：目前只有家居网能用】
PC端和WAP端统一成一个版本，并且做了全站SSI

**注意：**
+ **各网引用的代码的时候pcxxx改成各网对应域名，如pcauto**
+ **因为是用ssi引入的方式，所以如果是本机地址或者是非六网正式域名的地址，是看不到计数器代码的，需要上线到六网对应正式域名后才可以看到**





**参数：**
+ **\_common\_counter\_code\_：栏目id，必填。格式：channel=9999**
+ **\_common\_counter\_uuid\_：定向广告id，选填。 格式：__uuid=9301:0.5;000039844:0.5:cms&**
+ **\_common\_counter\_from\_：来源页面。cms相关页面值为"cms"，非cms页面可为空或者忽略该参数。**

**静态页ssi引入：**
```
<script>
window._common_counter_code_ = "channel=9999";
window._common_counter_uuid_ = "";
window._common_counter_from_ = "";
<!--#include virtual="/global_ssi/pcxxx/count/index.html"-->
</script>
```

**JSP动态页调用：**
```
<script>
window._common_counter_code_ = "channel=9999";
window._common_counter_uuid_ = "";
window._common_counter_from_ = "";
<%@ include file="/global_ssi/pcxxx/count/index.html"%>
</script>
```


**cms置标调用：**
```
<cms:channel property="count_code4">{栏目计数器代码}</cms:channel>
```



**如果计数器有特殊需求的话，可以通过指定 channelcount 属性覆盖原栏目的计数器代码，例如：**
```
<cms:channel property="count_code4" channelcount="channel=1111">{栏目计数器代码}</cms:channel>
```





## 旧版【其他5网还不可以用新版，暂时用旧的】

**注意：**
+ **各网引用的代码的时候pcxxx改成各网对应域名，如pcauto**
+ **电脑网的计数器地址比较特殊，需要注意下**
    + 电脑网：http://count5.pconline.com.cn/newcount/count.php
    + 汽车网：http://count.pcauto.com.cn/count.php
    + 时尚网：http://count.pclady.com.cn/count.php
    + 亲子网：http://count.pcbaby.com.cn/count.php
    + 家居网：http://count.pchouse.com.cn/count.php
    + 游戏网：http://count.pcgames.com.cn/count.php

#### PC端JS版本：
```
<script>
window._common_counter_code_ = "channel=9999";
window._common_counter_uuid_ = "";
window._common_counter_from_ = "";
document.write("<img style=display:none src=http://count.pcxxx.com.cn/count.php?"+_common_counter_uuid_+_common_counter_code_+"&screen="+screen.width+"*"+screen.height+"&refer="+encodeURIComponent(document.referrer)+"&anticache="+new Date().getTime()+"&url="+encodeURIComponent(location.href)+"&from="+(window._common_counter_from_?window._common_counter_from_:"")+"&iframeCode="+(self===top?0:(top===parent?1:2))+" >");
</script>
```





#### 当用户在移动设备上通过搜索引擎比如百度，google搜到PC端的页面时，PC端的页面会自动跳转到WAP端页面，这时候WAP端的计数器请求来源【document.referrer】记录的是PC端页面，但是正确的来源应该是百度，google才对，因此需要修正WAP端计数器请求来源。
#### 修正请求来源WAP端JS版本：【这个方案只用于汽车网，并未普及六网。】
```
<script>
window._common_counter_code_ = "channel=9999";
window._common_counter_uuid_ = "";
window._common_counter_from_ = "";
document.body.insertBefore(document.createElement("script"),document.body.firstChild).src="http://count.pcauto.com.cn/count.php?"+_common_counter_uuid_+_common_counter_code_+"&screen="+screen.width+"*"+screen.height+"&refer="+encodeURIComponent(!!document.cookie.match(/(^|; )referrerUrl=[^;]+/)?document.cookie.match(/(^|; )referrerUrl=([^;]+)/)[2]:document.referrer)+"&anticache="+new Date().getTime()+"&url="+encodeURIComponent(location.href)+"&from="+(window._common_counter_from_?window._common_counter_from_:"")+"&iframeCode="+(self===top?0:(top===parent?1:2));document.cookie="referrerUrl=;expires="+new Date(new Date().getTime()-10000).toGMTString()+";path=/;domain=.pcauto.com.cn";
</script>
```





#### 时尚网WAP端暂时添加艾瑞达广告代码检测
#### 时尚网WAP端JS版本：【这个方案只用于时尚网部分频道主页，并未普及六网。】

#### 以下是所用到具体的栏目主页：
+ http://g.pclady.com.cn/x/gentleman/
+ http://g.pclady.com.cn/x/dress/
+ http://g.pclady.com.cn/x/luxury/
+ http://g.pclady.com.cn/baike/
+ http://g.pclady.com.cn/x/beauty/
+ http://g.pclady.com.cn/x/beauty/pc/
+ http://g.pclady.com.cn/x/star/
+ http://g.pclady.com.cn/x/lohas/
+ http://g.pclady.com.cn/x/health/
+ http://g.pclady.com.cn/x/emotion/
+ http://g.pclady.com.cn/x/beauty/hairstyle/


```
<script>
window._common_counter_code_ = "channel=9999";
window._common_counter_uuid_ = "";
window._common_counter_ad_ = "";
window._common_counter_from_ = "";
if (window.location.search.match(/(^|&|\?)ad=0001(&|$)/i)) {
	window._common_counter_ad_ = "autox=1&";
}
document.body.insertBefore(document.createElement("script"),document.body.firstChild).src="http://count.pclady.com.cn/count.php?"+_common_counter_ad_+_common_counter_uuid_+_common_counter_code_+"&screen="+screen.width+"*"+screen.height+"&refer="+encodeURIComponent(document.referrer)+"&anticache="+new Date().getTime()+"&url="+encodeURIComponent(location.href)+"&from="+(window._common_counter_from_?window._common_counter_from_:"")+"&iframeCode="+(self===top?0:(top===parent?1:2));
</script>
```

#### 其他网【电脑网】【游戏网】【亲子网】WAP端JS版本：
```
<script>
window._common_counter_code_ = "channel=9999";
window._common_counter_uuid_ = "";
window._common_counter_from_ = "";
document.body.insertBefore(document.createElement("script"),document.body.firstChild).src="http://count.pcxxx.com.cn/count.php?"+_common_counter_uuid_+_common_counter_code_+"&screen="+screen.width+"*"+screen.height+"&refer="+encodeURIComponent(document.referrer)+"&anticache="+new Date().getTime()+"&url="+encodeURIComponent(location.href)+"&from="+(window._common_counter_from_?window._common_counter_from_:"")+"&iframeCode="+(self===top?0:(top===parent?1:2));
</script>
```






#### cms置标调用：五网PC端和WAP端统一
```
<cms:channel property="count_code4">{栏目计数器代码}</cms:channel>
```
**cms置标输出的代码为：**
```
<script>
window._common_counter_code_ = "channel=9999";
window._common_counter_uuid_ = "";
document.body.insertBefore(document.createElement("script"),document.body.firstChild).src="http://count.pcxxx.com.cn/count.php?"+_common_counter_uuid_+_common_counter_code_+"&screen="+screen.width+"*"+screen.height+"&refer="+encodeURIComponent(document.referrer)+"&anticache="+new Date().getTime()+"&url="+encodeURIComponent(location.href)+"&from="+(window._common_counter_from_?window._common_counter_from_:"cms")+"&iframeCode="+(self===top?0:(top===parent?1:2));
</script>
```
**需要注意的是：cms置标输出的与JS版本的相比稍有不同：**
```
// cms置标输出的少了定义变量
window._common_counter_from_ = "";

// 并且，from参数也不同，cms置标为
(window._common_counter_from_?window._common_counter_from_:"cms")

// JS版本的from参数为
(window._common_counter_from_?window._common_counter_from_:"")
```
**这个是历史遗留问题才导致了两个版本，不过等六网全站SSI搞好了，我们会做修复的。**