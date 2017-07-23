<?php
header('Content-Type: text/plain');

$uname = $_REQUEST['uname'];
$upwd = $_REQUEST['upwd'];

$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);

$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "SELECT uid FROM bi_user WHERE uname='$uname' AND upwd='$upwd'";
$result = mysqli_query($conn, $sql);

if($result===false){
    echo 'sqlerr';
}else {
	$row = mysqli_fetch_assoc($result);
	if($row){
		echo 'ok';
	}else{
		echo 'err';
	}
}
