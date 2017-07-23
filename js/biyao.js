$(function(){
  $('div#header').load('header.php');
  $('div#footer').load('footer.php');
});
/**点击登录按钮，异步验证登录信息**/
$('#bt-login').click(function(){
  //读取用户的输入——表单序列化
  var inputData = $('#login-form').serialize();
  //异步提交请求，进行验证
  $.ajax({
    type: 'POST',
    url: 'data/login.php',
    data: inputData,
    success: function(txt, msg, xhr){
      if(txt=='ok'){  //登录成功
        $('.modal').fadeOut(300);
        var loginName = $('[name="uname"]').val();
        sessionStorage['loginName']= loginName;
        $('#loginBtn').html('欢迎回来：'+loginName); //修改页头上的欢迎消息
      }else { //登录失败
        $('.modal .alert').html('登录失败！错误消息为：'+txt);
      }
    }
  });
});
/**页面加载完成后，异步请求产品列表**/
$(function(){
  loadProductByPage(1);
});
/**用户点击分页条中的页号时，实现数据的异步加载**/
$('.pager').on('click','a',function(event){
  event.preventDefault(); //阻止跳转行为
  //获取要跳转的页号
  var pageNum = $(this).attr('href');
  loadProductByPage(pageNum);
  if(pageNum==1){
    $('#f1 h1').html('品质男装');
    $('#f1 p').html('Hugo Boss、PRADA  制造商出品<a href="#">更多商品&gt;</a>');
  }else if(pageNum==2){
    $('#f1 h1').html('潮流女装');
    $('#f1 p').html('MaxMara、Diesel  制造商出品<a href="#">更多商品&gt;</a>');
  }else if(pageNum==3){
    $('#f1 h1').html('内衣袜子');
    $('#f1 p').html('CK、LA PERLA等  制造商出品<a href="#">更多商品&gt;</a>');
  }
});
//分页加载商品数据，并动态创建分页条
function loadProductByPage(pageNum){
  $.ajax({
    url: 'data/product_select.php?pageNum='+pageNum,
    success: function(pager){
      //遍历读取到分页器对象，拼接HTML，追加到DOM树
      var s=pager.data[4].pid;
      sessionStorage['loginPid']= s;
      var html = '';
      $.each(pager.data,function(i,p){
        html += `
        <li><a href="${p.pid}" class="addcart"><img src="${p.pic}"/></a>
        <dl>
          <dt>${p.pname}</dt>
          <dd>￥${p.price}</dd>
        </dl>
        </li>
        `;
      });
      $('#f1 .glasses').html(html);
      //根据返回的分页数据，动态创建分页条内容
      var html = '';
      if(pager.pageNum-2>0){
        html += `<li><a href="${pager.pageNum-2}">${pager.pageNum-2}</a></li> `;
      }
      if(pager.pageNum-1>0){
        html += `<li><a href="${pager.pageNum-1}">${pager.pageNum-1}</a></li> `;
      }
      html += `<li class="active"><a href="#">${pager.pageNum}</a></li> `;
      if(pager.pageNum+1<=pager.pageCount){
        html += `<li><a href="${pager.pageNum+1}">${pager.pageNum+1}</a></li> `;
      }
      if(pager.pageNum+2<=pager.pageCount){
        html += `<li><a href="${pager.pageNum+2}">${pager.pageNum+2}</a></li> `;
      }
      $('.pager').html(html);
    }
  });
}

$('#f1 .glasses').on('click','.addcart',function(){
  //JS跳转到购物车详情页
  event.preventDefault();
  var pid = $(this).attr('href');
  sessionStorage['loginPid']= pid;
  location.href='xiangqing.html';
});
/*轮播图*/
var imgs=[
  {"i":0,"img":"img/1.jpg"},
  {"i":1,"img":"img/2.jpg"},
  {"i":2,"img":"img/3.jpg"},
  {"i":3,"img":"img/4.jpg"},
  {"i":4,"img":"img/5.jpg"},
  {"i":5,"img":"img/6.jpg"}
];
var slider={
  LIWIDTH:0,
  DURATION:1000,
  WAIT:3000,
  timer:null,
  canAuto:true,
  init:function(){
    this.LIWIDTH=parseFloat(
      $("#slider").css("width")
    );
    this.updateView();
    $("#indexs").on("mouseover","li:not(.hover)",
      function(e){
        var $target=$(e.target);
        this.move($target.html()-$target.siblings(".hover").html());
      }.bind(this));
    $("#slider").hover(
      function(){this.canAuto=false;}.bind(this),
      function(){this.canAuto=true;}.bind(this)
    )
    this.autoMove();
  },
  autoMove:function(){
    this.timer=setTimeout(
      function(){
        if(this.canAuto){
          this.move(1);
        }else{
          this.autoMove();
        }
      }.bind(this),
      this.WAIT
    );
  },
  move:function(n){
    clearTimeout(this.timer);
    this.timer=null;
    $("#imgs").stop(true);
    if(n<0){
      n*=-1;
      imgs=
        imgs.splice(imgs.length-n,n).concat(imgs);
      this.updateView();
      var left=parseFloat($("#imgs").css("left"));
      $("#imgs").css("left",left-n*this.LIWIDTH);
      $("#imgs").animate(
        {left:"0"},
        this.DURATION,
        this.autoMove.bind(this)
      );
    }else{
      $("#imgs").animate(
        {left:-n*this.LIWIDTH+"px"},
        this.DURATION,
        this.endMove.bind(this,n)
      );
    }
  },
  endMove:function(n){
    imgs=imgs.concat(imgs.splice(0,n));
    this.updateView();
    $("#imgs").css("left",0);
    this.autoMove();
  },
  updateView:function(){
    for(var i=0,html="",idxs="";i<imgs.length;i++){
      html+="<li><img src='"+imgs[i].img+"'></li>";
      idxs+="<li>"+(i+1)+"</li>";
    }
    $("#imgs").html(html)
      .css("width",this.LIWIDTH*imgs.length);
    $("#indexs").html(idxs);
    $("#indexs>li:eq("+imgs[0].i+")")
      .addClass("hover")
      .siblings(".hover").removeClass("hover");
  }
};
slider.init();
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
/*手风琴*/
$(function() {
  var box = document.getElementById('accordion_box');
  var li = box.getElementsByTagName('li');
  var imgWidth = li[0].offsetWidth;
  var exposeWidth = 125;
  var boxWidth = imgWidth + (li.length - 1) * exposeWidth;
  box.style.width = boxWidth + 'px';
  function setImgsPos() {
    for (var i = 1, len = li.length; i < len; i++) {
      li[i].style.left = imgWidth + exposeWidth * (i - 1) + 'px';
    }
  }
  setImgsPos();
  var translate = imgWidth - exposeWidth;
  for (var i = 0, len = li.length; i < len; i++) {
    (function(i) {
      li[i].onmouseover = function() {
        setImgsPos();
        for (var j = 1; j <= i; j++) {
          li[j].style.left = parseInt(li[j].style.left) - translate + 'px';
        }
      };
    })(i);
  }
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
/*爬楼特效*/
var elevator={
  FHEIGHT:0,
  UPLEVEL:0,
  DOWNLEVEL:0,
  DURATION:1000,
  init:function(){
    this.FHEIGHT=parseFloat($("#f2").css("height"))+parseFloat($("#f2").css("marginBottom"));
    this.UPLEVEL=(innerHeight-this.FHEIGHT)/2;
    this.DOWNLEVEL=this.UPLEVEL+this.FHEIGHT;
    console.log(this.DOWNLEVEL);
    $(document).scroll(this.scroll.bind(this));
    $("#elevator>ul").on("mouseover","li",
      function(e){
        var $target=$(e.target);
        if(e.target.nodeName=="A"){
          $target=$target.parent();
        }
        $target.children(":first").hide();
        $target.children(":last").show();
      }
    );
    $("#elevator>ul").on("mouseout","li",
      function(e){
        var $target=$(e.target);
        if(e.target.nodeName=="A"){
          $target=$target.parent();
        }
        var i=$target.index("#elevator>ul>li");
        var $span=$(".floor>header>span:eq("+i+")");
        if(!$span.hasClass("hover")){
          $target.children(":first").show();
          $target.children(":last").hide();
        }
      }
    );
    $("#elevator>ul").on("click","li>a.etitle",function(e){
      $("body").stop(true);
      var $li=$(e.target).parent();
      var i=$li.index("#elevator>ul>li");
      var $span=$(".floor>header>span:eq("+i+")");
      $("body").animate({scrollTop:$span.offset().top-this.UPLEVEL},this.DURATION)
    }.bind(this));
  },
  scroll:function(){
    $(".floor>header>span").each(
      function(i,elem){
        var totalTop=$(elem).offset().top;
        var scrollTop=$("body").scrollTop();
        var innerTop=totalTop-scrollTop;
        if((innerTop>this.UPLEVEL)&&(innerTop<=this.DOWNLEVEL)){
          $(elem).addClass("hover");
          $("#elevator>ul>li:eq("+i+")>a:first").hide();
          $("#elevator>ul>li:eq("+i+")>a:last").show();
        }else{
          $(elem).removeClass("hover");
          $("#elevator>ul>li:eq("+i+")>a:first").show();
          $("#elevator>ul>li:eq("+i+")>a:last").hide();
        }
      }.bind(this)
    );
    $(".floor>header>span.hover").length>0?($("#elevator").show()):($("#elevator").hide());
  },
}
elevator.init();