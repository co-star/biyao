$(function(){
  $('div#header').load('header.php');
  $('div#footer').load('footer.php');
});
/**用户点击“添加到购物车”则实现商品的购物车添加**/
$('#panel-main li').on('click','.addcart',function(event){
  //发起异步请求
  event.preventDefault();
  location.href='shopping.html';
  $.ajax({
    type: 'POST',
    url: 'data/cart_add.php',
    data: {uname:sessionStorage['loginName'],pid:sessionStorage['loginPid']},
    success: function(obj){
      $('#shopCar').html(obj.count);
      $('#subShopCar').html(obj.count);
    }
  });
});
/*导航*/
var masterGuy;
masterGuy = {
  categoryState: 0,
  categoryScroll: function () {
    var t = $("#nav-more");
    t.on("mouseenter",
      function () {
        masterGuy.categoryState % 2 ? ($(".nav-main").animate({top: 0}, 300),
            t.find("span").html("更多"),
            t.find("i").css("background", 'url("http://static2.biyao.com/pc/common/img/master/category-up.png") 100% 25% no-repeat')
        ) : ($(".nav-main").animate({top: "-37px"}, 300),
          t.find("span").html("返回"),
          t.find("i").css("background", 'url("http://static3.biyao.com/pc/common/img/master/category-down.png") 100% 25% no-repeat')),
          masterGuy.categoryState++
      }
    )
  },
  categoryBarScroll: function () {
    var s = $(".nav");
    $(window).scroll(
      function () {
        $("body").scrollTop() >= 80 || document.documentElement.scrollTop >= 80 ? s.addClass("retract") : s.removeClass("retract")
      }
    )
  },
  categoryShow: function () {
    $(".nav-normal div li").hover(function () {
        $(".nav-main > li").each(function (t) {
            masterGuy.categoryState % 2 ? 8 >= t && $(this).css("visibility", "hidden") : t > 8 && $(this).css("visibility", "hidden")
          }
        ),
          $(".nav-normal div").css("overflow", "visible"),
          $(".nav-normal div a").removeClass('nav-active'),
          $(this).children('a').addClass('nav-active')
      },
      function () {
        $(".nav-normal div").css("overflow", "hidden"),
          $(".nav-main > li").css("visibility", "visible"),
          $(this).children('a').addClass('nav-active'),
          $(".nav-normal div a").removeClass('nav-active'),
          $(".nav-normal div>a").addClass('nav-active')
      }
    )
  },
  init: function () {
    var t = this;
    this.categoryScroll(),
      this.categoryShow(),
      this.categoryBarScroll(),
      $(".nav-normal div>a").addClass("nav-active")
  }
};
$(function(){masterGuy.init()});
/*回到顶部*/
$(function () {
  showScroll();
  function showScroll() {
    $(window).scroll(function () {
      var scrollValue = $(window).scrollTop();
      scrollValue > 100 ? $('#rightBar .rightBar-top').fadeIn() : $('#rightBar .rightBar-top').fadeOut();
    });
    $('#rightBar .rightBar-top').click(function () {
      $("html,body").animate({ scrollTop: 0 }, 200);
    });
  }
});
/*放大镜效果*/
var zoom={
  moved:0,//保存左移的li个数
  WIDTH:62,//保存每个li的宽度
  OFFSET:20,//保存ul的起始left值
  MAX:3,//保存可左移的最多li个数
  MSIZE:175,//保存mask的大小
  MAXLEFT:175,MAXTOP:175,//保存mask可用的最大坐标
  init:function(){
    //为id为preview下的h1添加单击事件代理，仅a能响应事件，事件处理函数为move
    $("#preview>h1").on(
      "click","a",this.move.bind(this));
    //为id为icon_list的ul添加鼠标进入事件代理，仅li下的img可响应事件，处理函数为changeImgs
    $("#icon_list").on(
      "mouseover","li>img",this.changeImgs);
    //为id为superMask的div添加hover事件,切换mask的显示和隐藏,再绑定鼠标移动事件为moveMask

    $("#superMask").hover(this.toggle,this.toggle)
      .mousemove(
      this.moveMask.bind(this));
  },
  moveMask:function(e){
    var x=e.offsetX;//获得鼠标相对于父元素的x
    var y=e.offsetY;//获得鼠标相对于父元素的y
    //计算mask的left: x-MSIZE/2
    var left=x-this.MSIZE/2;
    //计算mask的top: y-MSIZE/2
    var top=y-this.MSIZE/2;
    //如果left越界，要改回边界值
    left=left<0?0:
      left>this.MAXLEFT?this.MAXLEFT:
        left;
    //如果top越界，要改回边界值
    top=top<0?0:
      top>this.MAXTOP?this.MAXTOP:
        top;
    //设置id为mask的元素的left为left,top为top
    $("#mask").css({left:left,top:top});
    //设置id为largeDiv的背景图片位置:
    $("#largeDiv").css(
      "backgroundPosition",
      -left*16/7+"px "+-top*16/7+"px");
  },
  toggle:function(){//切换mask的显示和隐藏
    $("#mask").toggle();
    $("#largeDiv").toggle();
  },
  move:function(e){//移动一次
    var $target=$(e.target);//获得目标元素$target
    var btnClass=$target.attr("class");
    //如果btnClass中没有disabled
    console.log(btnClass);
    if(btnClass.indexOf("disabled")==-1){
      //如果btnClass以forward开头
      //将moved+1
      //否则
      //将moved-1
      this.moved+=
        btnClass.indexOf("forward")!=-1?1:-1;
      //设置id为icon_list的ul的left为-moved*WIDTH+OFFSET
      $("#icon_list").css(
        "left",-this.moved*this.WIDTH+this.OFFSET);
      this.checkA();//检查a的状态:
    }
  },
  checkA:function(){//检查两个a的状态
    //查找class属性以backward开头的a，保存在$back
    var $back=$("a[class^='backward']");
    //查找class属性以forward开头的a，保存在$for
    var $for=$("a[class^='forward']");
    if(this.moved==0){//如果moved等于0
      //设置$back的class为backward_disabled
      $back.attr("class","backward_disabled");
    }else if(this.moved==this.MAX){
      //否则，如果moved等于MAX
      //设置$for的class为forward_disabled
      $for.attr("class","forward_disabled");
    }else{//否则
      //$back的class为backward
      $back.attr("class","backward");
      //$for的class为forward
      $for.attr("class","forward");
    }
  },
  changeImgs:function(e){//根据小图片更换中图片
    //获得目标元素的src属性，保存在变量src中
    var src=$(e.target).attr("src");
    //查找src中最后一个.的位置i
    var i=src.lastIndexOf(".");
    //设置id为mImg的元素的src为:
    $("#mediumDiv").css(
      "background",
      "url("+src.slice(0,i)+'x'+src.slice(i)+") no-repeat");
    $("#largeDiv").css(
      "background",
      "url("+src.slice(0,i)+'l'+src.slice(i)+") no-repeat"
    );
  }
}
zoom.init();
/*商品与评价*/
jQuery(document).ready(function($) {
  $("#warpi li:nth-child(1)").click(function () {
    $('#warp .ping').fadeOut(1000, function () {
      $('#warp .warp').fadeIn(1000);
    });
    return false;
  });

  $("#warpi li:nth-child(2)").click(function () {
    $('#warp .warp').fadeOut(1000, function () {
      $('#warp .ping').fadeIn(1000);
    });
    return false;
  })

  $("#warpi li").click(function(e){
    e.preventDefault();
    var $target=$(e.target);
    console.log($target);
    $target.addClass('warp_box').siblings('.warp_box').removeClass('warp_box');
  })
});
