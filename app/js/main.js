/* ProjectNme : ZYC18.COM Game_Hilomp 
   Author :Edwin Chen
   LastEditTime : 2016/07/29
   FileType : Javascript
*/
//判断手机横竖屏
function anyWay() {
	var anywayTips = $(".anyway");

	function horizontal() {
		if (window.orientation == 180 || window.orientation == 0) {
			anywayTips.show();
		}
	}

	function vertical() {
		if (window.orientation == 90 || window.orientation == -90) {
			anywayTips.hide();
		}
	}
	horizontal();
	vertical();
	window.addEventListener('orientationchange', function (event) {
		horizontal();
		vertical();
	});
	//判断设备宽度
	var width = window.innerWidth || document.documentElement.clientWidth;
	if (width < 768) {
		console.log("您在使用手机浏览");
	} else if (width >= 768) {
		console.log("您在使用平板浏览");
		anywayTips.hide();
	} else if (width >= 992) {
		console.log("您在使用电脑浏览");
		anywayTips.hide();
	} else if (width >= 1200) {
		console.log("您在使用大屏电脑浏览");
		anywayTips.hide();
	} else {
		console.log("找不到你的设备尺寸");
	}
}
anyWay();

//手机加载loading
function loading() {
	window.onload = function () {
		try {
			document.body.removeChild(document.getElementById('loading'));
		} catch (e) {}
		try {
			initEvent(); //固定加载事件方法
		} catch (e) {}
		try {
			doAction(); //每个页面都必须存在，用来执行该页面的方法
		} catch (e) {}
	}
}
loading();


//Header动画交互
function heaAn(OClass, Num, Speed) {
	$(OClass).animate({
		top: Num
	}, Speed);
}

//Footer动画交互Show
function fooAn(OClass, Num, Speed) {
	$(OClass).animate({
		bottom: Num
	}, Speed);
}


//玩家动画交互Show
function pncAn(Num) {
	var pnc = 6;
	for (var a = 0; a < pnc; a++) {
		var c = a + 1;
		if (c > 3) {
			$(".player:nth-child(" + c + ")").animate({
				right: Num
			}, 300 * c);
		} else {
			$(".player:nth-child(" + c + ")").animate({
				left: Num
			}, 600 * c);
		}
	}
}

//赌桌动画交互
function conAn(ObjName, OMargin, OWidth, OHeight, Speed) {
	$(ObjName).animate({
		margin: OMargin,
		width: OWidth,
		height: OHeight
	}, Speed);
}

//隐藏于显示交互
function clickShow(a, b) {
	$(a).click(function () {
		$(b).show();
		$(b).click(function () {
			$(this).hide();
		})
	});
}

/*白色背景模态框插件*/
(function ($) {
	$.fn.modal = function (options) {
		var modalparameter = {
			showbtn: "",
			modaltitle: "",
			modalcontent: ""
		};
		var opts = $.extend(modalparameter, options);
		$(this).append('<div class="modal">' +
			'<div class="modal-content">' +
			'<h3 class="title">' + modalparameter.modaltitle + '</h3>' +
			'<p class="txt">' + modalparameter.modalcontent + '</p>' +
			'</div>' +
			'</div>');
		modalparameter.showbtn.click(function () {
			$('.modal').css('display', 'block');
		});
		$('.modal').click(function () {
			$(this).hide();
		});
	}
})(jQuery);


//倒计时
function secondCounter1(defSec, func, dispObj) {

	document.getElementById(dispObj).innerHTML = defSec--;
	if (defSec < 0) {
		eval(func);
		window.setTimeout("secondCounter1(" + document.getElementById(dispObj).getAttribute("defSec") + ",\"" + func + "\",\"" + dispObj + "\")", 1000);
	} else
		window.setTimeout("secondCounter1(" + defSec + ",\"" + func + "\",\"" + dispObj + "\")", 1000);
}

//游戏初始化
function initializeGame() {
	$("body").append('<div class="countdown"><p>' + gameObj.playerState.name + ' 欢迎回来，当前<span id="nowGameTime"></span>期</p><span class="cdt-cell">游戏即将开始，请稍后(<span class="cdt-num" id="cdt" defSec="10"></span>)</span></div>')
	$("#name").html(gameObj.playerState.name);
	$("#xingbi").html(gameObj.playerState.xingbi);
	$("#nowGameTime").html(gameObj.gameTime);
	$("#link").attr("href", sysObj.getXingbi)
	var Objlength = gameObj.autoPlayer.length;
	for (var i = 0; i < Objlength; i++) {
		$("#autoPlayer").append('<div class="player"><span class="player-num"><span>' + gameObj.autoPlayer[i].xingbi + '</span>万</span></div>');
	}
	$("#lastTime").append('<span class="date">' + gameObj.history[0].gameTime + '期</span><span class="numbroup"><span class="num ' + gameObj.history[0].num1 + '"></span><span class="num ' + gameObj.history[0].num2 + '"></span></span><span class="txt">' + gameObj.history[0].txt + '</span>');
	var hilength = gameObj.history.length;
	for (var i = 0; i < hilength; i++) {
		$("#historyList").append('<li><span class="date">' + gameObj.history[i].gameTime + '期</span><span class="numbroup"><span class="num ' + gameObj.history[i].num1 + '"></span><span class="num ' + gameObj.history[i].num2 + '"></span></span><span class="txt">' + gameObj.history[i].txt + '</span></li>')
	}
	var liLen = 20;
	for (var l = 0; l < liLen; l++) {
		var j = l + 1;
		$("#gameContent").append('<li id="b' + j + '"><div class="bottom-box"></div><span class="xb-icon"><span></li>');
	}
	var Navlength = sysObj.nav.length;
	for (var n = 0; n < Navlength; n++) {
		$("#navList").append('<li><a href="' + sysObj.nav[n].link + '" class="' + sysObj.nav[n].class + '" id="' + sysObj.nav[n].id + '"></a></li>')
	}
	var Btnlength = sysObj.btn.length;
	for (var n = 0; n < Btnlength; n++) {
		$("#btnGroup").append('<button class="gre-btn" value="' + sysObj.btn[n].value + '">' + sysObj.btn[n].value + '</button>');
	}
	$("#ruleModal").modal({
		showbtn: $('#rule'),
		modaltitle: '游戏规则',
		modalcontent: sysObj.rule,
	});
	var firBtn = $(".btngroup").find("button:first");
	firBtn.addClass("active");
	var firBtnVal = firBtn.val();
	$("#botPourMoney").val(firBtnVal);
}
initializeGame();

//游戏交互
function interactionGame() {
	heaAn(".header", "0", 500);
	fooAn(".footer", "0", 900);
	pncAn("0");
	$("#fullpage").click(function () {
		heaAn(".header", "-120", 500);
		pncAn("-120");
		conAn(".content", "4.9% auto", "92%", "70%", 600);
		$(".game").append('<span class="header-btn"><i></i></span>');
		$(".header-btn").bind("click", function () {
			heaAn(".header", "0", 500);
			pncAn("0");
			conAn(".content", "9.6% auto", "80%", "65%", 600);
			$(this).remove();
		})
	});
	clickShow(".nav-btn", ".nav-list");
	clickShow(".header-content", ".history");
}
interactionGame();

//游戏进行Step

secondCounter1(10, "step1()", "cdt");

function step1() {
	$(".countdown").hide();
	step2();
}

function step2() {
	$(".bagin").show();
	secondCounter1(10, "step3()", "bcdt");
	step4();
}

function step3() {
	$(".bagin").hide();
}

function step4() {
	var bpm = parseInt($("#botPourMoney").val()); 
	$(".content").find("li").click(function () {
		$(this).find(".bottom-box").show();
		$(this).find(".xb-icon").show();
		
		$(this).append('');
		$(this).find(".bottom-box").html(bpm);
		$(this).click(function(){
		    bpm++;
			$(this).find(".bottom-box").html(bpm);
		});
	});
	$(".btngroup").find("button").click(function () {
		$("button").removeClass("active");
		$(this).addClass("active");
		var GetNum = $(this).val();
		$("#botPourMoney").val(GetNum);
	});
}