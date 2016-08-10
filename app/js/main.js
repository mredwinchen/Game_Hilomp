/* ProjectNme : ZYC18.COM Game_Hilomp 
 Author :Edwin Chen
 LastEditTime : 2016/07/29
 FileType : Javascript
 */

//判断浏览器
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {         //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}


if (browser.versions.mobile) {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        $("body").addClass("wechat");
        setTimeout(function () {
            $(".anyway").hide();
        },3000);
    }
    if (ua.match(/WeiBo/i) == "weibo") {}
    if (ua.match(/QQ/i) == "qq") {}
    if (browser.versions.ios) {}
    if (browser.versions.android) {}
}
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
    /*var width = window.innerWidth || document.documentElement.clientWidth;
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
    }*/
}
anyWay();

//手机加载loading
function loading() {
    window.onload = function () {
        try {
            document.body.removeChild(document.getElementById('loading'));
        } catch (e) {
        }
        try {
            initEvent(); //固定加载事件方法
        } catch (e) {
        }
        try {
            doAction(); //每个页面都必须存在，用来执行该页面的方法
        } catch (e) {
        }
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
        //window.setTimeout("secondCounter1(" + document.getElementById(dispObj).getAttribute("defSec") + ",\"" + func + "\",\"" + dispObj + "\")", 1000);
    } else
        window.setTimeout("secondCounter1(" + defSec + ",\"" + func + "\",\"" + dispObj + "\")", 1000);
}

//游戏初始化
function initializeGame() {
    $(".game").append('<div class="countdown"><p>' + gameObj.playerState.name + ' 欢迎回来，当前<span id="nowGameTime"></span>期</p><span class="cdt-cell">游戏即将开始，请稍后(<span class="cdt-num" id="cdt" defSec="10"></span>)</span></div>')
    $("#name").html(gameObj.playerState.name);
    $("#xingbi").html(gameObj.playerState.xingbi);
    $("#nowGameTime").html(gameObj.gameTime);
    $("#link").attr("href", sysObj.getXingbi)
    //var Objlength = Math.floor(Math.random() * 6 + 1);
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
        $("#gameContent").append('<li id="b' + j + '"><div class="bottom-box">0</div><span class="xb-icon"></span><span class="win-icon"></span></li>');
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

function showGetXb() {
    $(".game").append('<div class="get-xb-box"><div class="box-content"><p>亲爱的 ' + gameObj.playerState.name + ' ,您的星币不足,马上赚星币!</p><a href="' + sysObj.getXingbi + '" class="yel-btn"></a></div></div>');
    $(".get-xb-box").click(function () {
        $(this).remove();
    })
}

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

//游戏下注交互
function gameCathectic() {
    $(".content").find("li").unbind("click").click(function () {
        var bpm = parseInt($("#botPourMoney").val());
        var tXb = $(this).find(".bottom-box").text();
        var MyXb = $('#xingbi').text();
        if (parseInt($('#xingbi').text()) == 0 || parseInt($('#xingbi').text()) < 0) {
            showGetXb();
        } else if (parseInt(MyXb) < parseInt(bpm)) {
            showGetXb();
        } else {
            $(this).find(".bottom-box").show();
            $(this).find(".xb-icon").show();
            var tBpm = parseInt(tXb) + parseInt(bpm);
            $(this).find(".bottom-box").html(tBpm);
            var NowMyXb = parseInt(MyXb) - parseInt(bpm);
            $('#xingbi').html(NowMyXb);
        }
    });
    $(".btngroup").find("button").click(function () {
        $("button").removeClass("active");
        $(this).addClass("active");
        var GetNum = $(this).val();
        $("#botPourMoney").val(GetNum);
    });
}

//骰子交互
function gameDice() {
    $(".game").append('<div class="dice-content"><div class="content-cell"><div id="dice1" class="dice dice_1"></div> <div id="dice2" class="dice dice_1"></div><p class="cell-txt">本局点数是 <span id="result1"></span>,<span id="result2"></span></p></div></div>');
    function diceAn(id, mask, result) {
        var dice = $(id);
        dice.attr("class", "dice");//清除上次动画后的点数
        dice.css("cursor", "default");
        $(".wrap").append("<div id='" + mask + "'></div>");//加遮罩
        var num = Math.floor(Math.random() * 6 + 1);//产生随机数1-6
        //var num = 1;
        dice.animate({left: '+2px'}, 100, function () {
            dice.addClass("dice_t");
        }).delay(200).animate({top: '-2px'}, 100, function () {
            dice.removeClass("dice_t").addClass("dice_s");
        }).delay(200).animate({opacity: 'show'}, 600, function () {
            dice.removeClass("dice_s").addClass("dice_e");
        }).delay(100).animate({left: '-2px', top: '2px'}, 100, function () {
            dice.removeClass("dice_e").addClass("dice_" + num);
            $(".cell-txt").show();
            $(result).html(num);
            dice.css('cursor', 'pointer');
            $("#" + mask + "").remove();//移除遮罩
        });
    }

    diceAn("#dice1", "diceMask1", "#result1");
    diceAn("#dice2", "diceMask2", "#result2");

}
//游戏进行Step


secondCounter1(gameObj.startTime, "step1()", "cdt");

function step1() {
    $(".countdown").hide();
    step2();
}

function step2() {
    $(".bagin").show();
    secondCounter1(gameObj.cathecticTime, "step3()", "bcdt");
    gameCathectic();
}


function step3() {
    $(".bagin").hide();
    gameDice();
    setTimeout(function () {
        var diceNum1 = $("#result1").text();
        var diceNum2 = $("#result2").text();
        var AXb = $("#xingbi").text();
        var GXb1 = 0, GXb3 = 0, GXb4 = 0, GXb5 = 0, GXb6 = 0, GXb7 = 0, GXb8 = 0, GXb9 = 0, GXb10 = 0, GXb11 = 0, GXb12 = 0, GXb13 = 0, GXb14 = 0, GXb15 = 0, GXb16 = 0, GXb17 = 0, GXb18 = 0, GXb19 = 0, GXb20 = 0;
        $(".dice-content").remove();
        if (parseInt(diceNum1) + parseInt(diceNum2) == 2) {
            if (parseInt($("#b4").find(".bottom-box").text()) > 0) {
                var TXb4 = parseInt($("#b4").find(".bottom-box").text());
                var GXb4 = TXb4 * 50;
                $("#b4").find(".win-icon").show();
            }
            if (diceNum1 == diceNum2) {
                if (parseInt($("#b15").find(".bottom-box").text()) > 0) {
                    var TXb15 = parseInt($("#b15").find(".bottom-box").text());
                    var GXb15 = TXb15 * 50;
                    $("#b15").find(".win-icon").show();
                }
            }
        } else if (parseInt(diceNum1) + parseInt(diceNum2) == 3) {
            if (parseInt($("#b5").find(".bottom-box").text()) > 0) {
                var TXb5 = parseInt($("#b5").find(".bottom-box").text());
                var GXb5 = TXb5 * 18;
                $("#b5").find(".win-icon").show();
            }
        } else if (parseInt(diceNum1) + parseInt(diceNum2) == 4) {
            if (parseInt($("#b6").find(".bottom-box").text()) > 0) {
                var TXb6 = parseInt($("#b6").find(".bottom-box").text());
                var GXb6 = TXb6 * 14;
                $("#b6").find(".win-icon").show();
            }
            if (diceNum1 == diceNum2) {
                if (parseInt($("#b16").find(".bottom-box").text()) > 0) {
                    var TXb16 = parseInt($("#b16").find(".bottom-box").text());
                    var GXb16 = TXb16 * 50;
                    $("#b16").find(".win-icon").show();
                }
            }
        } else if (parseInt(diceNum1) + parseInt(diceNum2) == 5) {
            if (parseInt($("#b7").find(".bottom-box").text()) > 0) {
                var TXb7 = parseInt($("#b7").find(".bottom-box").text());
                var GXb7 = TXb7 * 12;
                $("#b7").find(".win-icon").show();
            }
        } else if (parseInt(diceNum1) + parseInt(diceNum2) == 6) {
            if (parseInt($("#b8").find(".bottom-box").text()) > 0) {
                var TXb8 = parseInt($("#b8").find(".bottom-box").text());
                var GXb8 = TXb8 * 8;
                $("#b8").find(".win-icon").show();
            }
            if (diceNum1 == diceNum2) {
                if (parseInt($("#b17").find(".bottom-box").text()) > 0) {
                    var TXb17 = parseInt($("#b17").find(".bottom-box").text());
                    var GXb17 = TXb17 * 50;
                    $("#b17").find(".win-icon").show();
                }
            }
        } else if (parseInt(diceNum1) + parseInt(diceNum2) == 7) {
            if (parseInt($("#b9").find(".bottom-box").text()) > 0) {
                var TXb9 = parseInt($("#b9").find(".bottom-box").text());
                var GXb9 = TXb9 * 6;
                $("#b9").find(".win-icon").show();
            }
        } else if (parseInt(diceNum1) + parseInt(diceNum2) == 8) {
            if (parseInt($("#b10").find(".bottom-box").text()) > 0) {
                var TXb10 = parseInt($("#b10").find(".bottom-box").text());
                var GXb10 = TXb10 * 8;
                $("#b10").find(".win-icon").show();
            }
            if (diceNum1 == diceNum2) {
                if (parseInt($("#b18").find(".bottom-box").text()) > 0) {
                    var TXb18 = parseInt($("#b18").find(".bottom-box").text());
                    var GXb18 = TXb18 * 50;
                    $("#b18").find(".win-icon").show();
                }
            }
        } else if (parseInt(diceNum1) + parseInt(diceNum2) == 9) {
            if (parseInt($("#b11").find(".bottom-box").text()) > 0) {
                var TXb11 = parseInt($("#b11").find(".bottom-box").text());
                var GXb11 = TXb11 * 12;
                $("#b11").find(".win-icon").show();
            }
        } else if (parseInt(diceNum1) + parseInt(diceNum2) == 10) {
            if (parseInt($("#b12").find(".bottom-box").text()) > 0) {
                var TXb12 = parseInt($("#b12").find(".bottom-box").text());
                var GXb12 = TXb12 * 14;
                $("#b12").find(".win-icon").show();
            }
            if (diceNum1 == diceNum2) {
                if (parseInt($("#b19").find(".bottom-box").text()) > 0) {
                    var TXb19 = parseInt($("#b19").find(".bottom-box").text());
                    var GXb19 = TXb19 * 50;
                    $("#b19").find(".win-icon").show();
                }
            }
        } else if (parseInt(diceNum1) + parseInt(diceNum2) == 11) {
            if (parseInt($("#b13").find(".bottom-box").text()) > 0) {
                var TXb13 = parseInt($("#b13").find(".bottom-box").text());
                var GXb13 = TXb13 * 18;
                $("#b13").find(".win-icon").show();
            }
        } else if (parseInt(diceNum1) + parseInt(diceNum2) == 12) {
            if (parseInt($("#b14").find(".bottom-box").text()) > 0) {
                var TXb14 = parseInt($("#b14").find(".bottom-box").text());
                var GXb14 = TXb14 * 50;
                $("#b14").find(".win-icon").show();
            }
            if (diceNum1 == diceNum2) {
                if (parseInt($("#b20").find(".bottom-box").text()) > 0) {
                    var TXb20 = parseInt($("#b20").find(".bottom-box").text());
                    var GXb20 = TXb20 * 50;
                    $("#b20").find(".win-icon").show();
                }
            }
        }
        if (parseInt(diceNum1) + parseInt(diceNum2) <= 6) {
            if (parseInt($("#b3").find(".bottom-box").text()) > 0) {
                var TXb3 = parseInt($("#b3").find(".bottom-box").text());
                var GXb3 = TXb3 * 2;
                $("#b3").find(".win-icon").show();
            }
        } else if (parseInt(diceNum1) + parseInt(diceNum2) <= 12) {
            if (parseInt($("#b1").find(".bottom-box").text()) > 0) {
                var TXb1 = parseInt($("#b1").find(".bottom-box").text());
                var GXb1 = TXb1 * 2;
                $("#b1").find(".win-icon").show();
            }
        }
        var AGXb = GXb1 + GXb3 + GXb4 + GXb5 + GXb6 + GXb7 + GXb8 + GXb9 + GXb10 + GXb11 + GXb12 + GXb13 + GXb14 + GXb15 + GXb16 + GXb17 + GXb18 + GXb19 + GXb20;
        var NAXb = AGXb + parseInt(AXb);
        $("#xingbi").html(NAXb);
        setTimeout(function () {
            /*$.ajax({
             type: "POST",
             url: "http://192.168.1.24:3000/",
             data: {},
             success: function (result) {
             if (result.success) {

             }
             else {
             window.location.reload();
             }
             }
             });*/
        }, 2000)
    }, 3000);
}
