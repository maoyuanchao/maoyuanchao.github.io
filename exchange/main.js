/**
 * Created by M on 15/8/29.
 */
$(function() {
    var pics = [
        "http://mat1.gtimg.com/news/2015/zt/letter/img/loading.gif",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/bg.jpg",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/offer.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/copyright.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/title.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/boy.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/ques1.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/ques2.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/input.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/button1.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/up.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/good1.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/go1.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/fall.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/button3.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/button2.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/bad1.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/name1.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/name2.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/name3.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/fake.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/stamp.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/button4.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/last.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/open/1.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/break.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/img/main6.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/open/19_1.png",
        "http://mat1.gtimg.com/news/2015/zt/letter/open/20_2.png"
    ];
    var loadCanvas = {
        step: 0,
        animation_interval: 10,
        init: function () {
            var _this = this;
            _this.loadImg(pics, _this.callback);
        },
        callback: function () {
            //loading页隐藏
            $(".load").hide();
            exchange.init();
        },
        load_width: function (n, callback) {
            var _this = this;
            var varName;
            var animation = function () {
                var step = _this.step;
                if (step <= n) {
                    $('.load_process span').text(step + "%");

                    if (step >= 100) {
                        // loading加载完毕 ！
                        setTimeout(function () {
                            console.log("load end");
                            callback();
                        }, 300);
                    }
                    _this.step++;
                } else {
                    clearInterval(varName);
                }
            };
            clearInterval(_this.varName);
            _this.varName = setInterval(animation, _this.animation_interval);
        },
        loadImg: function (pics, callback) {
            var _this = this;
            var index = 0;
            var len = pics.length;
            var img = new Image();
            var flag = false;
            var load = function () {
                img.src = pics[index];
                img.onload = function () {
                    // 控制台显示加载图片信息
                    console.log('第' + index + '个img被预加载', img.src);
                    //Math.floor(((index + 1) / len) * 100) + "%"
                    var _w = Math.floor((index + 1) / len * 100);
                    _this.load_width(_w, callback);
                    index++;
                    if (index < len) {
                        load();
                    } else {
                        // callback();
                    }
                };
                return img;
            };
            if (len > 0) {
                load();
            } else {
                progress("100%");
            }
            return {
                pics: pics,
                load: load
            };
        }
    };
    loadCanvas.init();

});

var exchange={
    init:function(){
        var _this = this;
        _this._w = $(window).width();
        _this._h = $(window).height();
        $(".load,.cover,.option,.part1,.part2,.page3").width(_this._w).height(_this._h);
        _this.swipe();
        _this.tap();
    },
    swipe:function(){
        var p1=$(".part1");
        var p2=$(".part2");
        var p3=$(".part3");
        var h = $(window).height();
        p1.eq(0).on("swipeUp",function(){
            p1.css('-webkit-transform','translateY(-'+h+'px)');
            p1.eq(1).addClass("active");
        });
        p2.eq(0).on("swipeUp",function(){
            p2.css('-webkit-transform','translateY(-'+h+'px)');
            p2.eq(1).addClass("active");
        });
        var pageId=1;
        p3.on("swipeUp",function(){
            $(this).next().addClass("active");
            if(pageId<4){
                p3.css("-webkit-transform","translateY(-"+pageId* h + "px)");
            }
            pageId++;
        });

    },
    tap:function(){
        $(".cover>.button").on("tap",function(){
            $(".cover").hide();
        });
        $(".part1>.button").on("tap",function(){
            $(".part1").hide();
        });
        $(".part2>.button").on("tap",function(){
            $(".part2").hide();
        });
        $(".part3>.button").on("tap",function(){
            $(".part3").hide();
        });
        $('.opt1,.opt2,.opt3').on("tap",function(){
            $(".option").hide();
        });
        $(".opt1").on("tap",function(){
            for(i=1;i<8;i++){
                $(".page"+i).css("background-image","url(img/china_"+i+".png)");
            };
            shareData.desc = "老师寄语：我罚你抄，不是我不原谅你，是科学不原谅你";
            console.log(shareData.desc);
        });
        $(".opt2").on("tap",function(){
            for(i=1;i<8;i++){
                $(".page"+i).css("background-image","url(img/uk_"+i+".png)");
            };
            shareData.desc = "老师：some people come to school can do everything,except reading  翻译：有些人来学校啥事都干，除了学习";
            console.log(shareData.desc);
        });
        $(".opt3").on("tap",function(){
            for(i=1;i<8;i++){
                $(".page"+i).css("background-image","url(img/jp_"+i+".png)");
            };
            shareData.desc = "老师：釣魚島は中国の  翻译：钓鱼岛是中国的";
            console.log(shareData.desc);
        });

    }

};

