uname.onblur = function(){
  if(this.validity.valueMissing){
    this.nextElementSibling.innerHTML = '用户名不能为空';
    this.setCustomValidity('用户名不能为空');
  }else if(this.validity.tooShort){
    this.nextElementSibling.innerHTML = '用户名不能少于6位';
    this.setCustomValidity('用户名不能少于6位');
  }else {
    this.nextElementSibling.innerHTML = '';
    this.setCustomValidity('');
  }
}
uname.onfocus = function(){
  this.nextElementSibling.innerHTML = '用户名长度在6到9位之间';
  this.nextElementSibling.className = 'msg-default';
}

upwd.onblur = function(){
  if(this.validity.valueMissing){
    this.nextElementSibling.innerHTML = '密码不能为空';
    this.setCustomValidity('密码不能为空');
  }else if(this.validity.tooShort){
    this.nextElementSibling.innerHTML = '密码不能少于6位';
    this.setCustomValidity('密码不能少于6位');
  }else {
    this.nextElementSibling.innerHTML = '';
    this.setCustomValidity('');
  }
}
upwd.onfocus = function(){
  this.nextElementSibling.innerHTML = '密码长度在6到12位之间';
  this.nextElementSibling.className = 'msg-default';
}

/*3.对邮箱地址进行验证*/
email.onblur = function(){
  if(this.validity.valueMissing){
    this.nextElementSibling.innerHTML = '邮箱不能为空';
    this.setCustomValidity('邮箱不能为空');
  }else if(this.validity.typeMismatch){
    this.nextElementSibling.innerHTML = '邮箱格式不正确';
    this.setCustomValidity('邮箱格式不正确');
  }else {
    this.nextElementSibling.innerHTML = '';
    this.setCustomValidity('');
  }
}
email.onfocus = function(){
  this.nextElementSibling.innerHTML = '请输入合法的邮箱地址';
  this.nextElementSibling.className = 'msg-default';
}

yzm.onblur = function(){
  if(this.validity.valueMissing){
    this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = '验证码不能为空';
    this.setCustomValidity('验证码不能为空');
  }else if(this.validity.patternMismatch){
    this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = '验证码不正确';
    this.setCustomValidity('验证码不正确');
  }else {
    this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = '';
    this.setCustomValidity('');
  }
}
yzm.onfocus = function(){
  this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = '请输入正确验证码';
  this.nextElementSibling.nextElementSibling.nextElementSibling.className = 'msg-default';
}

a1.onclick=function(e) {
  e.preventDefault();
  dian();
  s=dian();
  console.log(s);
};
function dian(){
  var ctx = vcode.getContext('2d');
  var w = vcode.width;
  var h = vcode.height;
  //填充一个矩形做背景
  ctx.fillStyle = rc(180,240);
  ctx.fillRect(0,0,w,h);
  //绘制5个随机字符
  var pool = 'ABCDEFGHJKLMNPQRSTWXY3456789';
  ctx.textBaseline = 'bottom';
  var src='';
  for(var i=0; i<5; i++){
    var x = 18*i+5;   //文本的X
    var y = h;        //文本的Y
    var c = pool[rn(0,pool.length)];
    src+=c;
    ctx.fillStyle = rc(30,180); //文本颜色
    ctx.font = rn(10,30)+'px Arial'; //文本大小
    var deg = rn(-45, 45);//文本旋转
    ctx.translate(x, y);
    ctx.rotate(deg * Math.PI/180);
    ctx.fillText(c, 0, 0);
    ctx.rotate(-deg * Math.PI/180);
    ctx.translate(-x, -y);
  }
  //绘制5条干扰线
  for(var i=0; i<5; i++){
    ctx.beginPath();
    ctx.moveTo(rn(0,w), rn(0,h));
    ctx.lineTo(rn(0,w), rn(0,h));
    ctx.strokeStyle = rc(30,180);
    ctx.stroke();
  }
  //绘制50个杂色点——半径为1的圆
  for(var i=0; i<50; i++){
    ctx.beginPath();
    ctx.arc(rn(0,w),rn(0,h),1,0,2*Math.PI);
    ctx.fillStyle = rc(30,230);
    ctx.fill();
  }
  //获取一个指定范围内随机数 random number
  function rn(min, max){
    return Math.floor( Math.random()*(max-min)+min );
  }
  //获取一个指定范围内随机颜色 random color
  function rc(min, max){
    var r = rn(min, max);
    var g = rn(min, max);
    var b = rn(min, max);
    return `rgb(${r},${g},${b})`;
  }
  return src;
}
dian();
s=dian();
console.log(s);
$('#yzm').attr('pattern',s);

$('#bt-register').click(function(){
  var data=$('#form-register').serialize();
  $.ajax({
    type:'POST',
    url:'data/user_add.php',
    data:data,
    success:function(result){
      console.log("开始处理服务器端返回的注册结果");
      console.log(result);
      if(result.msg=='succ'){
        location.href='biyao.html';
      }else{
        alert("注册失败");
      }
    }
  })
});
