/**
 * Created by M on 15/8/31.
 */
$(function(){

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
        step:0,
        animation_interval:50,
        init:function(){
            var _this = this;
            _this.loadImg(pics, _this.callback);
        },
        callback:function(){
            //loading页隐藏
            $("#loading").hide();
            layout.init();
        },
        load_width:function(n, callback) {
            var _this = this;
            var varName;
            var animation = function() {
                var step = _this.step;
                if (step <= n) {
                    $('#loading_bar>span').css({
                        width: step + "%"
                    });
                    $('#loading_process').text(step + "%");
                    if (step >= 100) {
                        // loading加载完毕 ！
                        setTimeout(function() {
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
        loadImg:function(pics, callback) {
            var _this = this;
            var index = 0;
            var len = pics.length;
            var img = new Image();
            var flag = false;
            var load = function() {
                img.src = pics[index];
                img.onload = function() {
                    // 控制台显示加载图片信息
                    console.log('第' + index + '个img被预加载', img.src);
                    //Math.floor(((index + 1) / len) * 100) + "%"
                    var _w = Math.floor((index + 1) / len * 100);
                    _this.load_width(_w,callback);
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
                pics:pics,
                load:load
            };
        }
    };
    loadCanvas.init();


    var layout = {
        imgData:[
            {
                'bg': 'img/page1.png',
                'animate': []
            },
            {
                'bg': 'img/page2.png',
                'animate': [
                    {'name':'slideInLeft', 'imgs':['img/t1.png']},
                    {'name':'slideInRight', 'imgs':['img/t2.png']},
                    {'name':'fadeIn', 'imgs':['img/stud.png']},
                    {'name':'seal', 'imgs':['img/seal.png']}
                ]
            },
            {
                'bg': 'img/page3.png',
                'animate': [
                    {'name':'photo', 'imgs':['img/photo.png']},
                    {'name':'belt', 'imgs':['img/belt1.png']},
                    {'name':'star', 'imgs':['img/star1.png']}
                ]
            },
            {
                'bg': 'img/page4.png',
                'animate': [
                    {'name':'door', 'imgs':['img/door1.png']}
                ]
            },
            {
                'bg': 'img/page5.png',
                'animate': [
                    {'name':'push', 'imgs':['img/juqi.png']},
                    {'name':'anniu', 'imgs':['img/anniu1.png']}
                ]
            },
            {
                'bg': 'img/page6.png',
                'animate': [
                    {'name':'blink', 'imgs':['img/blink1.png']}
                ]
            },
            {
                'bg': 'img/page7.png',
                'animate': [
                    {'name':'show', 'imgs':['img/welcome.png']}
                ]
            }

        ],
        init: function(){
            var _this = this;
            _this._w = $(window).width();
            _this._h = $(window).height();
            _this.showData();
            _this._len = $('.layout').length;
            _this.currPage = 0;
            $('.global,.layout').width(_this._w).height(_this._h);
            $('.screen').width(_this._w).height(_this._h*_this._len);
            _this.page();
            _this.swipe()
        },
        showData: function(){
            var _this = this;
            var h = '';
            for(i=0;i<_this.imgData.length;i++){
                h+='<div class="layout page'+(i+1)+'" style="background-image:url('+_this.imgData[i].bg+')"><img src="img/up.png" class="swipeUp"/>';
                var _a = _this.imgData[i].animate;
                for(j=0;j<_a.length;j++){
                    h+='<div class="animate '+_a[j].name+'">';
                    for(k=0;k<_a[j].imgs.length;k++){
                        h+='<div style="background-image:url('+_a[j].imgs[k]+')"></div>';
                    }
                    h+='</div>';
                }
                h+='</div>';
            }
            $('.screen').append(h);
            var btn = '<a href="https://hr.m.tencent.com/wechatlearning/activity/actdetails.php?ActId=76384"><img class="button" src="img/button.png"></a>';
            $(".page7").append(btn);
        },
        page: function(){
            var _this = this;
            var curr = _this.currPage;
            _this.currPage = curr<0?0:curr>=_this._len?_this._len-1:curr;
            $('.screen').css('-webkit-transform','translateY(-'+_this._h*_this.currPage+'px)');
            $('.layout').removeClass('active').eq(curr).addClass('active');
            if(_this.currPage==_this._len-1){
                $('.swipeUp').hide();
            }
            else {
                $('.swipeUp').show();
            }
        },
        swipe: function(){
            var _this = this;
            $('.global').off().on('swipeUp swipeDown',function(event){
                if(event.type=='swipeUp'){
                    _this.currPage++
                }
                else{
                    _this.currPage--
                }
                console.log(_this.currPage);
                _this.page()
            })
        }
    };

});

