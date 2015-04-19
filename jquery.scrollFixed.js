/**
 *jquery侧边栏模块滚动定位显示插件: jquery.scrollFixed.js
 * @authors phpvar
 * @date    2015-04-16 10:59:13
 * @version v1.0
 *配置详解
 * defaults = {
	 	relative: position:relative属性的父元素[null],
	 	topBar: 带position:fixed属性的顶部导航栏[null],
	 	footer: 页脚标签标识[footer],
	 	spacing: 滚动定位的侧边栏模块固定显示时，距离浏览器可视视窗顶部(简称浏览器顶部)距离[10px,不用带px单位],
	 	pointTop: 当滚动页面，滚动定位的侧边栏接触到浏览器顶部时就固定侧边栏显示；
	 			  若设置pointTop:false则表示：侧边栏底部接触到浏览器顶部时才固定侧边栏显示[true]
	 };
 */
 (function($) {
 	$.fn.extend({
 		scrollFixed: function(options) {
 			var defaults = {
 				relative:null,
 				topBar: null,
 				footer: "footer",
 				spacing: 10,
 				pointTop: true
 			};
 			var opts = $.extend(defaults, options);
 			var _this = this;
 			var topBarH=$(opts.topBar).height();
 			var sbTop = opts.pointTop ? this.offset().top:this.offset().top + this.outerHeight(true);
 			var rLeft=opts.relative?$(opts.relative).offset().left:0;
  			var rTop=opts.relative?$(opts.relative).offset().top:0;
  			var sbLeft=this.offset().left;
  			var sbRLeft=this.position().left;
 			var fHeight=$(opts.footer).outerHeight();
 			var fTop = $(opts.footer).offset().top;
 			var sbEvent = function(e) {
 				// 页面增删内容时，fTop坐标会改变，需重新计算
 				fTop=$(opts.footer).offset().top;
 				// resize时重新计算侧边栏位置
 				_this.css("position", "static");
 				sbLeft = _this.offset().left;
 				var wTop = $(window).scrollTop();
 				var wLeft = $(window).scrollLeft();
 				var dValue = wTop + topBarH + opts.spacing + _this.outerHeight(true) - fTop; //差值
 				if (wTop + topBarH >= sbTop && dValue < 0) { //当滚动值+顶部导航栏>sbTop值时成立，且侧边栏底部未接触到页脚顶部区域时
 					_this.css({
 						position: "fixed",
 						left: sbLeft - wLeft,
 						top: topBarH + opts.spacing //侧边栏距离管理员导航栏10px
 					});
 					if (typeof(document.body.style.maxHeight) == 'undefined') {
 						_this.css({
 							position: "absolute",
 							top: wTop + topBarH + opts.spacing //ie6下,侧边栏距离管理员导航栏10px
 						})
 					}
 				} else if (dValue >= 0) { //当侧边栏底部接触到页脚顶部区域时
 					_this.css({
 						position: "absolute",
 						left: opts.relative?sbRLeft:sbLeft,
 						top: wTop+ topBarH - rTop-dValue
 					})
 				} else {
 					_this.css("position", "static");
 					_this.css("top", 0);
 				}
 			};
 			$(window).on('scroll resize', sbEvent);
 		}
 	})
 })(jQuery);