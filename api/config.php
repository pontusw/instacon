<?php
// SET SERVER
if($_SERVER['SERVER_NAME']=="localhost"){
	$serv = "http://localhost/zquick/";
}
else{
	$serv = "http://woms.se/";
}
define("SERV",$serv);


// AUTOLOAD CLASS
function __autoload($class_name) {
	// INCLUDE CLASS FILE
	$inc = "class/".$class_name.".php";	
    include $inc;
}

function connect(){
	if($_SERVER['SERVER_NAME']=="localhost"){
		$host = "localhost";
		$user = "root";
		$pass = "";
		$db = "insta";
	}
	else{
		$host = "localhost";
		$db = "woms";
		$user = "root";
		$pass = "ckr30aik";
	}
	$mysqli = new mysqli($host, $user, $pass, $db);
	$mysqli->set_charset("utf8");
	return $mysqli;
}



