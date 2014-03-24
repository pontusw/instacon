<?php
/*INSTA*/

class instagram{

	public $url;

	function __construct(){

		$sql = connect();
		$tag = $sql->real_escape_string($_GET['id']);
		$clientid = '3507cabe7e224460bd63428ecccc80d4';

		if($_GET['maxtag'] && $_GET['maxtag'] != ''){
			$pageURL = "&max_tag_id=" . $_GET['maxtag'];
		}
		$this->url = "https://api.instagram.com/v1/tags/" . $tag . "/media/recent?client_id=" . $clientid . $pageURL;

	}
	function fetch(){

		$url = $this->url;
		$file = 'cache/' . md5($url);
		$max_age = 60*60; // SECONDS
		$arr = array(); // RETURN ARRAY

		if (file_exists($file) && filemtime($file) >= time() - $max_age){
			// the cache file exists and is fresh enough
			$r = file_get_contents($file);
			$up = "old";

		}
		else{
			// GET ANT SET NEW CONTENT FEED
			$content = file_get_contents($url);
			$feed = file_put_contents($file, $content);
			$r = $content;
			$up = "new";
		}
		$content = json_decode($r);
		$data = $content->data;

		foreach($data as $insta){

			$reinsta = new stdClass();
			$reinsta->data = $insta;
			$reinsta->img = $insta->images->low_resolution->url;
			$reinsta->id = $insta->id;
			$reinsta->likes = $insta->likes->count;
			$reinsta->date = date("Y-m-d",$insta->created_time);		

			array_push($arr,$reinsta);

		}
		usort($arr, function($a, $b){
		    return $b->likes - $a->likes;
		});

		// RETURN 
		$d->data = $arr;
		$d->next = $content->pagination->next_max_id;
		$d->updated = $up." since: ".filemtime($file);

        return json_encode($d);
         


	}
}
?>