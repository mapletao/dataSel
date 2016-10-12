$(function() {
	$("#beginTime").click(function() {
		that = this;
		init();
		showTimeS();
	});
	$("#endTime").click(function() {
		that = this;
		init();
		showTimeS();
	});
	setTimeDateSet(); //设置操作
});
var that; //保存当前点击的时间对象
function setTimeDateSet() {
	$(".z-qc").unbind("click");
	$(".z-prev").unbind("click");
	$(".z-next").unbind("click");
	$(".z-qd").unbind("click");
	//取消
	$(".z-qc").click(function(e) {
		e.preventDefault();
		closeTimeS();
	});
	//上一步
	$(".z-prev").click(function(e) {
		e.preventDefault();
		$(".timeSelectBox").removeClass('hidden zfadeInUp zfadeOutDown');
		$(this).parent().parent().addClass('hidden');
	});
	//下一步
	$(".z-next").click(function(e) {
			e.preventDefault();
			$(".timeSelectBox").removeClass('hidden zfadeInUp zfadeOutDown');
			$(this).parent().parent().addClass('hidden');
		})
		//确定
	$(".z-qd").click(function(e) {
		e.preventDefault();
		var str = "";
		$(".zcurrent").each(function() {
			str += $(this).html() + ",";
		});
		var arr = str.split(",");
		if(arr.length>3){
			var str = arr[0] + arr[1] + arr[2] + " " + arr[3] + ":" + arr[4];
		}else{
			var str=arr[0] + ":" + arr[1];
		}
		$(that).val(str);
		closeTimeS();
	});
}

function init() {
	$(".zcurrent").removeClass("zcurrent");
	var now = new Date();
	var y = now.getFullYear();
	var m = now.getMonth();
	var d = now.getDate();
	var h = now.getHours();
	var mm = now.getMinutes();
	var maxd = new Date(y, (m + 1), 0).getDate();
	setMonthLi(m); //月份初始化
	setYearLi(y); //年份初始化
	setDayLi(d, maxd); //日期初始化
	setHour(h); //设置小时
	setMins(mm); //设置分钟
	setUlHeight(); //设置ul的高度
	setTouch(); //设置touch事件	
	reselveTouch(); //接触不需的touch事件
}
//设置时间 小时
function setHour(h) {
	var lis = "";
	for (var i = 0; i < 24; i++) {
		lis += "<li>" + (i > 9 ? i : "0" + i) + "</li>";
	}
	$(".zt-hour").html(lis);
	var t = (h) * 36;
	$(".zt-hour li").eq(h).addClass('zcurrent');
	$(".zt-hour").css("transform", "translateY(-" + t + "px)");
}
//设置分钟
function setMins(mm) {
	var lis = "";
	for (var i = 0; i < 60; i++) {
		lis += "<li>" + (i > 9 ? i : "0" + i) + "</li>";
	}
	$(".zt-mins").html(lis);
	var t = mm * 36;
	$(".zt-mins li").eq(mm).addClass('zcurrent');
	$(".zt-mins").css("transform", "translateY(-" + t + "px)");
}
//年份初始化
function setYearLi(y) {
	var lis = "";
	var arr = [];
	for (var j = 1; j < 10; j++) {
		arr.unshift(y - j);
	}
	for (var j = 0; j < 10; j++) {
		arr.push(y + j);
	}
	for (var i = 0; i < arr.length; i++) {
		var li = "<li>" + arr[i] + "</li>";
		lis += li;
	}
	$(".z-year").html(lis);
	$(".z-year li").eq(9).addClass('zcurrent');
	$(".z-year").css("transform", "translateY(-324px)");
}
//月份初始化
function setMonthLi(m) {
	var t = (m) * 36;
	$(".z-month li").eq(m).addClass('zcurrent');
	$(".z-month").css("transform", "translateY(-" + t + "px)");
}
//日期初始化
function setDayLi(d, maxd) {
	var lis = "";
	for (var i = 0; i < 31; i++) {
		var li = "<li>" + ((i + 1) > 9 ? (i + 1) : "0" + (i + 1)) + "</li>";
		lis += li;
	}
	$(".z-day").html(lis);
	for (var j = maxd; j < 31; j++) {
		$(".z-day li").eq(j).remove();
	}
	$(".z-day li").eq(d).addClass('zcurrent');
	$(".z-day").css("transform", "translateY(-" + (36 * d) + "px)");
}
//设置li透明
function setLiPos(n) {
	$(n).find(".zcurrent").prev().css("opacity", ".8");
	$(n).find(".zcurrent").prev().prev().css("opacity", ".4");
	$(n).find(".zcurrent").next().css("opacity", ".8");
	$(n).find(".zcurrent").next().next().css("opacity", ".4");
}
//关闭弹窗
function closeTimeS() {
	$(".zmask").addClass('hidden');
	$(".timeSelectBox").removeClass("zfadeInUp").addClass('hidden zfadeOutDown');
}
//弹框
function showTimeS() {
	$(".zmask").removeClass('hidden');
	$(".timeSelectBox").eq(0).removeClass('hidden zfadeOutDown').addClass("zfadeInUp");
}
//设置外层ul高度
function setUlHeight() {
	$(".zmod ul").each(function() {
		$(this).css("height", ($(this).find("li").length) * 36);
		setLiPos(this);
	})
}
//开始touch
function setTouch() {
	$(".zmod ul").each(function() {
		var obj = this;
		if (window.addEventListener) {
			obj.addEventListener('touchstart', function(e) {
				ztouchstart(e, obj);
			}, false);
			obj.addEventListener('touchmove', function(e) {
				ztouchmove(e, obj);
			}, false);
			obj.addEventListener('touchend', function(e) {
				ztouchend(e, obj);
			}, false);
		} else if (window.attachEvent) {
			obj.attach('ontouchstart', function(e) {
				ztouchstart(e, obj);
			});
			obj.attach('ontouchmove', function(e) {
				ztouchmove(e, obj);
			});
			obj.attach('ontouchend', function(e) {
				ztouchend(e, obj);
			});
		}
	})
};
//touch事件
function ztouchstart(e, obj) {
	e.preventDefault();
	var touch = e.targetTouches[0];
	startY = touch.pageY;
	var arr2 = $(obj).css("transform").split(",");
	var mrTop = Number(arr2[5].slice(0, arr2[5].length - 1));
	$(obj).attr("mrTop", mrTop);
	var cy = $(".zcurrent").eq(0).html();
	var cm = $(".zcurrent").eq(1).html();
	var maxd = new Date(cy, cm, 0).getDate();
	var dl = $(".z-day li").length;
	if (dl > maxd) {
		for (var j = 31; j < maxd; j--) {
			$(".z-day li").eq(j).remove();
		}
	} else {
		var lis = "";
		for (var j = dl; j < maxd; j++) {
			lis += "<li>" + (j + 1) + "</li>";
		};
		$(".z-day").append(lis);
	}
	setUlHeight();
};

function reselveTouch() {
	$(".timeSelectBox .contain").each(function() {
		var obj = this;
		if (window.addEventListener) {
			obj.addEventListener('touchstart', function(e) {
				e.preventDefault();
			}, false);
		} else if (window.attachEvent) {
			obj.attach('ontouchstart', function(e) {
				e.preventDefault();
			});
		};
	});
	var obj = $(".zmask")[0];
	if (window.addEventListener) {
		obj.addEventListener('touchstart', function(e) {
			closeTimeS();
		}, false);
	} else if (window.attachEvent) {
		obj.attach('ontouchstart', function(e) {
			closeTimeS();
		});
	};
}

var mt = 10;
var mtt = 9;

function ztouchmove(e, n) {
	// var arr2=$(n).css("transform").split(",");
	e.preventDefault();
	if (e.targetTouches.length > 1 || e.scale && e.scale !== 1) return;
	var touch = e.targetTouches[0];
	distanceY = touch.pageY - startY;
	if (distanceY > 10) {
		var k = parseInt(distanceY / mt);
		var mrTop = $(n).attr("mrTop");
		var t = Number(mrTop) + Number(k * mtt);
		if (t > 0) {
			t = 0;
		};
		update(t, n);
	} else if (distanceY < -10) {
		var k = parseInt(distanceY / mt);
		var mrTop = $(n).attr("mrTop");
		var h = parseInt($(n).css("height")) - 36;
		var t = Number(mrTop) + Number(k * mtt);
		if (t < -h) {
			t = -h;
		}
		update(t, n);
	};
};

function ztouchend(e, obj) {
	var arr2 = $(obj).css("transform").split(",");
	var h = Number(arr2[5].slice(0, arr2[5].length - 1));
	if (h % 36 != 0) {
		$(obj).css("transform", "translateY(" + (parseInt(h / 36) * 36) + "px)");
	}
}
//刷新当前时间
function update(t, n) {
	var g = parseInt(-t / 36);
	$(n).css("transform", "translateY(" + t + "px)");
	$(n).find("li").removeClass('zcurrent').css("opacity", "1").eq(g).addClass('zcurrent');
	setLiPos(n);
}