<?php
/**接收客户端提交的用户名，向客户端输出该用户的购物车详情**/
header('Content-Type: application/json;charset=UTF-8');

$uname = $_REQUEST['uname'];

//连接数据库
$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);

//SQL1: 设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);

//SQL2：根据用户名查询用户编号，再根据用户编号查询出购物车编号
$sql = "SELECT cid FROM bi_cart WHERE userId=( SELECT uid FROM bi_user WHERE uname='$uname' )";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_all($result,MYSQLI_ASSOC);
$cid = $row['cid'];

//SQL3：根据购物车编号查询出其中的产品
$sql = "SELECT did,cartId,productId,count,pname,price,pic FROM bi_cart_detail,bi_product WHERE cartId='$cid'  AND  productId=pid ";
$result = mysqli_query($conn,$sql);
$list = mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($list);