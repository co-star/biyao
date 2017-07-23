<?php
header('Content-Type: application/json;charset=UTF-8');

@$uname =$_REQUEST['uname'];
@$upwd = $_REQUEST['upwd'];
@$email = $_REQUEST['email'];

$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
$sql="SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "INSERT INTO bi_user VALUES(null,'$uname','$upwd','$email')";
$result = mysqli_query($conn, $sql);

$output=[];
if($result){
	$output['msg']='succ';
    $output['uid']=mysqli_insert_id($conn);
}else {
   $output['msg']='err';
   $output['sql']=$sql;
}

echo json_encode($output);