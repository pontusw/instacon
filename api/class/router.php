<?php
/* CONTROLLER */
class router{
	function __construct(){

	 	// GET DATA
	 	$obj 	= $_REQUEST['object'];
	 	$method = $_REQUEST['method'];
	 	$id 	= $_REQUEST['id'];

	 	// DO STUFF
	 	$o 		= new $obj();
	 	$res 	= $o->$method($id);

	 	// RETURN
	 	echo $res;

	}

}
?>