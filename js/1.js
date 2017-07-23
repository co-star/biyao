
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