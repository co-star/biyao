<?php
/**接收客户端提交的购物车详情记录编号(did)和购买数量(count)，更新到数据库，返回succ或err**/
header('Content-Type: text/html');

$did = $_REQUEST['did'];
$count = $_REQUEST['count'];

//连接数据库
$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);

//SQL1: 设置编码方式
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);

//SQL2：数据库更新语句
$sql = "UPDATE bi_cart_detail SET count='$count' WHERE did='$did'";
$result = mysqli_query($conn,$sql);

if($result){
	echo 'succ';
}else {
	echo 'sqlerr';
}