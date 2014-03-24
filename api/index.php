<?php

/* SETUP */
$root = $_SERVER['DOCUMENT_ROOT'];
if($_SERVER['SERVER_NAME']=="localhost"){
	$root = $root."/zquick/api/";
}
else{
	$root = $root."/api/";
}
$config = $root."config.php";

  
require_once($config);
$r = new router();

?>

