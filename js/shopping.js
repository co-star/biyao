/**
 * Created by Administrator on 2016/11/9.
 */
$(function(){
  $('div#header').load('header.php');
  $('div#footer').load('footer.php');
});
$(function(){
  $.ajax({
    url: 'data/cart_detail.php',
    data: {uname: sessionStorage['loginName']},
    success: function(detailList){
      var html = '';
      $.each(detailList, function(i, d){
        html += `
        <tr>
            <td>
                <input type="checkbox"/>
                <input type="hidden" name="did" value="${d.did}" />
                <div><img src="${d.pic}"></div>
            </td>
            <td><a href="">${d.pname}</td>
            <td>${d.price}</td>
            <td>
                <button>-</button><input type="text" value="${d.count}"/><button>+</button>
            </td>
            <td class="a1">${d.price}</td>
            <td><a href="${d.did}">删除</a></td>
        </tr>
        `;
      });
      $('#cart tbody').html(html);
    }
  });
});
/**单击+和-修改购物数量**/
$('#cart').on('click','button',function(){
  //客户端修改
  var self = this;
  var operation = $(this).html();
  var count = parseInt($(this).siblings('input').val());
  var price = parseInt($(this).parent().prev().html());
  count+=(operation=="+"?1:count>1?-1:0);
  //服务器端修改
  var did = $(this).parent().parent().find('input[name="did"]').val();
  $.ajax({
    url: 'data/cart_update.php',
    data: {did: did, count: count},
    success: function(txt){
      if(txt=='succ'){
        console.log('修改成功');
        $(self).siblings('input').val(count);
        var tds=document.querySelectorAll("#tbody_box td.a1");
        for (var i=0,total=0;i<tds.length;i++)
        {total+=parseFloat(tds[i].innerHTML.slice());
        }
        document.querySelector("#f20").innerHTML=total.toFixed(2);
        var s=price*count;
        $(self).parent().next().html(s.toFixed(2));
        $('#shopCar').html(count);
        $('#subShopCar').html(count);
      }else{
        console.log('修改失败');
      }
    }
  });

});
/**单击"删除"超链接删除该商品**/
$('#cart').on('click','a:contains("删除")',function(e){
  e.preventDefault();
  //服务器端修改
  var did = $(this).attr('href');
  var self = this;
  $.ajax({
    url: 'data/cart_detail_delete.php',
    data: {did: did},
    success: function(txt){
      if(txt=='succ'){
        console.log('删除成功');
        //客户端TR元素的删除
        $(self).parent().parent().remove();
      }else{
        alert('删除失败');
      }
    }
  });
});
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