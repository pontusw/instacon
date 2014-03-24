<?php
class testobject{
	public $type;
	function __construct($type = ""){

		$this->type = $type;
		$sql = connect();
		$return = array();
		$res = $sql->query("SELECT * FROM winner");

		while($obj = $res->fetch_object()){	
			array_push($return,$obj);
		}
		return $return;
		
	}
}
?>