;(function(window){
	var defaultOptions = {
        container: "#wrap",
        curClass: "play",
        item : ".item",
        fullScreen : !0,//是否为全屏，默认为全屏滚动
        vertical : !0,
        preDistance : 25,
        speed : 300,
        slideCallback: function(){},
        onBeforeScrollStart: function(e){},
        touchCallback: function(){}
    };

	function touchSlider(options){
		this.opts=this.extend(defaultOptions,options);
		this.init();
		this._bind();
	}
	touchSlider.prototype={
		wrap: null,
		_prev: null,
        _next: null,
        _current: null,
        _tpl: [],
        index: 0,
        length: 0,
        _lockToNext: !1,
        _lockToPrev: !1,
        _lockToSlide: !1,
        _scrollNum : 0,
        $: function(node,context){
        	return (context || document).querySelector(node);
        },
		init: function(){
			var op = this.opts;
			this.wrap = "string" == typeof op.container ? this.$(op.container) : op.container;

			this._tpl = this.wrap.cloneNode(!0);
			this._tpl = op.item ? this._tpl.querySelectorAll(op.item) : this._tpl.children;

			for (var i = 0; i < this._tpl.length; i++){
				this._tpl[i].style.cssText += "display:block;position:absolute;left:0;top:0;width:100%;height:100%";
			}
			this.length = this._tpl.length;
			this.touchstartX = 0; //开始触屏移动的X坐标
            this.touchEndX = 0;//结束触屏移动的X坐标
            this.touchstartY = 0;
            this.touchEndY = 0;

            this.totalDist = 0;
            this._showPopEle = false;

			if(op.fullScreen){
				var style = document.createElement("style");
				style.innerHTML = "html,body{width:100%;height:100%;overflow:hidden}";
				document.head.appendChild(style);
			}
            
            this.wrap.style.cssText += ";display:block;position:relative;" + (this.opts.fullScr ? "width:100%;height:100%" : "");

            this.displayWidth = this.wrap.clientWidth;
            this.displayHeight = this.wrap.clientHeight;

            this.scrollDist =  this.displayHeight ;
            //插入hTML结构
            this._setHtml();

            //是否有loading动画的问题

            //页面初始化 加play
            this._pageInit()
		},
		addClass: function(node,className){
			node.classList ? node.classList.add(className) : node.className +=" "+ className;
		},
		removeClass: function(node,className){
			node.classList ? node.classList.remove(className) : node.className = node.className.replace(new RegExp("\\s*\\b" + s + "\\b", "g"), "")
		},
		_bind: function(){
			var self = this,
				op = this.opts,
				swaper = op.fullScreen ? this.$("body") : this.wrap; 

			//捆绑事件
			swaper.addEventListener("touchstart", function(e){
				self._touchstart(e);
			}, false)
			swaper.addEventListener("touchmove", function(e){
				e.preventDefault();
				// e.stopPropagation();
				self._touchmove(e);
			}, false)
			swaper.addEventListener("touchend", function(e){
				self._touchend(e);
			}, false)
			swaper.addEventListener("touchcancle", function(e){
				self._touchend(e);
			}, false)
		},
		_unlockToSlide: function(){
			this._lockToNext = !1;
			this._lockToPrev = !1;
			this._lockToSlide = !1;
			this._scrollNum = 0;
		},
		_pageInit: function(){
			var op = this.opts;
				_this =this,

			setTimeout(function() {
	            _this.addClass(_this._current, op.curClass);
	           	op.slideCallback && op.slideCallback.call(_this,_this.index);
	        }, 150)
		},
		_touchstart: function(e){
			if(e.touches.length !==1){
				return false;
			}
			var op=this.opts;
			this.touchEndX = this.touchstartX = e.touches[0].pageX;
			this.touchstartY = e.touches[0].pageY;
			
			this.starPosPrev = -this.scrollDist;
			this.startPosNext = this.scrollDist;

			if(this._lockToSlide) return false;
			this._next && (this._next.style.cssText += "-webkit-transition-duration:0;");
            this._current.style.cssText += "-webkit-transition-duration:0;";

            this._prev && (this._prev.style.cssText += "-webkit-transition-duration:0;");
			// this.hasPrev = !!$j1(op.preElem);
		},
		_touchmove: function(e){
			if(e.touches.length !==1){
				return false;
			}
			var op=this.opts;

			this.touchEndX = e.touches[0].pageX;
			this.touchEndY = e.touches[0].pageY;

			this.totalDist = this.touchEndY - this.touchstartY;

			var pos_cur = this.totalDist;

			if(this._lockToSlide) return false;

			if(this.totalDist<0 && !this._lockToNext){//证明下一屏
				this._current.style.cssText += this._getTransform(pos_cur + "px");
				this._next  && (
					this.totalDist2 = this.startPosNext + this.totalDist,
					this._next.style.cssText += this._getTransform(this.totalDist2+"px")
				)
			}else if(this.totalDist >=0 && !this._lockToPrev){
				this._current.style.cssText += this._getTransform(pos_cur + "px");
				this._prev && (
					this.totalDist2 = this.starPosPrev + this.totalDist,
					this._prev.style.cssText += this._getTransform(this.totalDist2+"px")
				)
			}
		},
		_touchend: function(e){
			var op=this.opts,
				_this = this;
				
			var num = this._current.dataset.slide;
			if(num){
				if(this.totalDist < -op.preDistance){
	            	this._scrollNum++  // 1 2
	            	if(this._scrollNum < num*1 + 1){
	            		op.touchCallback && op.touchCallback.call(_this,_this.index,_this._scrollNum);
	            	}else if(this._next && !this._showPopEle){
	            		this._unlockToSlide();
	            	}
	            }
	            if(this.totalDist > op.preDistance){
	            	if(this._scrollNum > 0){
	            		op.touchCallback && op.touchCallback.call(_this,_this.index,_this._scrollNum);
	            		this._scrollNum--
	            	}else if(this._prev && !this._showPopEle){
	            		this._unlockToSlide();
	            	}
	            }
			}
			
            if(this.totalDist < -op.preDistance && !this._lockToNext && !this._lockToSlide){
            	this.next();
            }else{
            	if(this.totalDist > op.preDistance && !this._lockToPrev && !this._lockToSlide){
            		this.prev();
            	}else{
            		this.itemReset(); 
            	}
            }

            this.totalDist = 0;   
		},
		itemReset: function(){
        	this._current.style.cssText += "-webkit-transition-duration:" + this.opts.speed + "ms;" + this._getTransform(0);
        	this._prev && (this._prev.style.cssText += "-webkit-transition-duration:" + this.opts.speed + "ms;" + this._getTransform("-" + this.scrollDist + "px"));
        	this._next && (this._next.style.cssText += "-webkit-transition-duration:" + this.opts.speed + "ms;" + this._getTransform(this.scrollDist + "px"));
		},
		playTo: function(t){
			var op=this.opts,
				_this = this;

			if(t>=0 && t < this.length){
				this._unlockToSlide();
				if(t> this.index){
					//next
					
					//步骤1：先将上一屏变成当前屏划上去（效果上实现统一）
					this._prev && this.wrap.removeChild(this._prev);

					this._next && this.wrap.removeChild(this._next);
					

					//步骤2： 设置当前屏幕为指定屏
					this.index = t; 


					//替换下一步的内容
					this._next = this._tpl[this.index].cloneNode(!0);
					this._next.style.cssText += "-webkit-transition-duration:0ms;" + this._getTransform(this.scrollDist + "px");
					this.wrap.appendChild(this._next);

					
					setTimeout(function(){
						_this._prev = _this._current;
						_this._current = _this._next;
						_this._next = null;

						_this._prev.style.cssText += "-webkit-transition-duration:" + _this.opts.speed + "ms;" + _this._getTransform("-" + _this.scrollDist + "px");
						_this._current.style.cssText += "-webkit-transition-duration:" + _this.opts.speed + "ms;" + _this._getTransform(0);
					},0)
					
					setTimeout(function() {
						_this.slideTo(_this.index);
			        }, 400);	

				}else if(t< this.index){
					//prev
					
					//步骤1：先将下一屏变成当前屏划上去（效果上实现统一）

					this._prev && this.wrap.removeChild(this._prev);

					this._next && this.wrap.removeChild(this._next);
					

					//步骤2： 设置当前屏幕为指定屏
					this.index = t; 


					//替换下一步的内容
					this._prev = this._tpl[this.index].cloneNode(!0);
					this._prev.style.cssText += "-webkit-transition-duration:" + this.opts.speed +"ms;" + this._getTransform("-" + this.scrollDist + "px");
					this.wrap.insertBefore(this._prev, this._current);


					setTimeout(function(){
						_this._next = _this._current;
						_this._current = _this._prev;
						_this._prev = null;
						_this._next.style.cssText += "-webkit-transition-duration:" + _this.opts.speed + "ms;" + _this._getTransform(_this.scrollDist + "px");
						_this._current.style.cssText += "-webkit-transition-duration:" + _this.opts.speed + "ms;" + _this._getTransform(0);
					},0)
					setTimeout(function() {
						_this.slideTo(_this.index);
			        }, 400);	
				}else{
					return false;
				}
			}else{
				throw Error("该屏不存在！")
			}
		},
		_setHtml: function(t){
			t >= 0 && (this.index = t);
			this.wrap.innerHTML = "";
			var frag = document.createDocumentFragment();

			this.index > 0 && (
				this._prev = this._tpl[this.index - 1].cloneNode(!0),
				this._prev.style.cssText += this._getTransform("-" + this.scrollDist + "px"),
				frag.appendChild(this._prev)
			);

			this._current = this._tpl[this.index].cloneNode(!0);
			this._current.style.cssText += this._getTransform(0) ;
			frag.appendChild(this._current);

			this.index < this.length-1 && (
				this._next = this._tpl[this.index + 1].cloneNode(!0),
				this._next.style.cssText += this._getTransform(this.scrollDist + "px"),
				frag.appendChild(this._next)
			)

			this.wrap.appendChild(frag);
		},
		_getTransform: function(s){
			return ";-webkit-transform : translate3d(0,"+ s +",0)";
		},
		prev: function(){
			var op = this.opts,
				_this = this;

			if(this.index > 0){
				this.index--;
			}else{
				this.itemReset();
				return false;
			}
			this._unlockToSlide();


			// var nextIndex = this.index + 1 > this.length -1 ? 0 : this.index + 1;


			this._next && this.wrap.removeChild(this._next);

			this._next = this._current;
			this._current = this._prev;
			this._prev = null;

			this._next.style.cssText += "-webkit-transition-duration:" + this.opts.speed + "ms;" + this._getTransform(this.scrollDist + "px");

			this._current.style.cssText += "-webkit-transition-duration:" + this.opts.speed + "ms;" + this._getTransform(0);


			setTimeout(function() {
				_this.$("." + op.curClass , _this.wrap) && _this.removeClass(_this.$("." + op.curClass , _this.wrap),op.curClass);
				_this.addClass(_this._current,op.curClass);

				op.slideCallback && op.slideCallback.call(_this,_this.index);

				var prevIndex = _this.index - 1;

				if(prevIndex >= 0){
					_this._prev = _this._tpl[prevIndex].cloneNode(!0);
					_this._prev.style.cssText += "-webkit-transition-duration:" + _this.opts.speed + "ms;" + _this._getTransform("-" + _this.scrollDist + "px");
					_this.wrap.insertBefore(_this._prev, _this._current);
				}
	        }, 150)
		},
		next: function(){
			var op=this.opts;

			if(this.index < this.length -1){
				this.index++;
			}else{
				this.itemReset();
				return false;
			}
			this._unlockToSlide();
			this._prev && this.wrap.removeChild(this._prev);

			this._prev = this._current;
			this._current = this._next;
			this._next = null;

			this._prev.style.cssText += "-webkit-transition-duration:" + this.opts.speed + "ms;" + this._getTransform("-" + this.scrollDist + "px");

			this._current.style.cssText += "-webkit-transition-duration:" + this.opts.speed + "ms;" + this._getTransform(0);

			setTimeout(function() {
				_this.$("." + op.curClass , _this.wrap) && _this.removeClass(_this.$("." + op.curClass , _this.wrap),op.curClass);
				_this.addClass(_this._current,op.curClass);

				op.slideCallback && op.slideCallback.call(_this,_this.index);

				var nextIndex = _this.index + 1;

				if(nextIndex < _this.length){
					_this._next = _this._tpl[nextIndex].cloneNode(!0);
					_this._next.style.cssText += "-webkit-transition-duration:0ms;" + _this._getTransform(_this.scrollDist + "px");
					_this.wrap.appendChild(_this._next);
				}
	        }, 150)
		},
		extend: function(target,source){
			for(var i in source){
		        target[i] = source[i];
			}
			return target;
		},
		slideTo: function(inx){
			this._setHtml(inx);
			this._pageInit();
		}
	}
	window.touchSlider=touchSlider;
})(window);

