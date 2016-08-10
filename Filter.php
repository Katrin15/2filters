<?php
	header("Content-Type: text/html; charset=utf-8");
	$string = file_get_contents("moscow.json");
	$json_a = json_decode($string, true);//, JSON_UNESCAPED_UNICODE);

	/*echo "Строка".$string."<br><br><br>";
	echo "Массив<br>";
	print_r($json_a);

	$error = json_last_error_msg();
	echo $error;*/

	
	echo json_encode($json_a);
?>