<?php

$captcha_width = 100;
$captcha_height = 50;
$captcha_length = 4; // символа

require_once('mysql_conf.php');

// для заданного id капчи сравнивает введенное значение со значением в базе
function check_captcha($captcha_id, $captcha_input) { 

	$dbconn = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);
	mysql_select_db(MYSQL_DB_NAME);
	$qres = mysql_query('SELECT * FROM captcha WHERE id='.$captcha_id);
	$row = mysql_fetch_row($qres);
	$orig_value = intval($row[1]);
	mysql_close($dbconn);
	//die('Checking captcha. id='.$captcha_id.'; input='.$captcha_input.'; original='.$orig_value);

	return ($orig_value == $captcha_input);	
}

// рисует капчу с числом $cval, сохраняет ее в pic/captcha/#{$cid}.png
function draw_new_captcha($cval, $cid) {
	global $captcha_width, $captcha_height, $captcha_length;
	$lines_per_character = 4;
	$cval = strval($cval);
	//$cval = $_GET["draw_captcha"];		
	//die(var_dump($captcha_width, $captcha_height));
	$im = imagecreate($captcha_width, $captcha_height);
	$black_col = imagecolorallocate($im, 0, 0, 0);
	imagefill($im, 0, 0, $black_col);
	$width_step = $captcha_width / $captcha_length;
	for ($i = 0; $i < $captcha_length; $i++) {		
		$char_x = rand($i * $width_step, ($i + 1) * $width_step - 20);
		$char_y = rand(0, $captcha_height - 20);
		$rnd_color = imagecolorallocate($im, rand(100, 255), rand(100, 255), rand(100, 255));
		imagestring($im, 5, $char_x, $char_y, $cval[$i], $rnd_color); 
		for ($j = 0; $j < $lines_per_character; $j++)
			imageline($im,
						rand(0, $captcha_width), 
						rand(0, $captcha_height), 
						rand(0, $captcha_width), 
						rand(0, $captcha_height), 
						$rnd_color);
	}
	imagepng($im, 'pic/captcha/'.$cid.'.png');
	imagedestroy($im);
}

// создает новую капчу (запись в БД + картинка в pic/captcha)
function register_new_captcha($captcha_value) {
	$dbconn = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);
	mysql_select_db(MYSQL_DB_NAME);
	mysql_query( 'INSERT INTO captcha VALUES (DEFAULT, '.$captcha_value.')');
	$qres = mysql_query( 'SELECT * FROM captcha WHERE value='.$captcha_value );
	$row = mysql_fetch_row($qres);
	$captcha_id = intval($row[0]);
	mysql_close($dbconn);

	draw_new_captcha($captcha_value, $captcha_id);

	return $captcha_id;
}

// убирает из pic/captcha и БД капчу с заданным id
function unlink_captcha($captcha_id) {
	$dbconn = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);
	mysql_select_db(MYSQL_DB_NAME);
	mysql_query('DELETE FROM captcha WHERE id='.$captcha_id);	
	mysql_close($dbconn);

	$filename = 'pic/captcha/'.$captcha_id.'.png';
	if (file_exists($filename))
	unlink($filename);
}

?>
