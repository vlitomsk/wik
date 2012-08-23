<?php
require_once('./config.php');
if (isset($_GET['qid']) && isset($_GET['aid']) && isset($_GET['uid'])) {
	$qid = intval($_GET['qid']);
	$aid = intval($_GET['aid']);
	$uid = mysql_real_escape_string($_GET['uid']);

	/*$row = mysql_select_by_id('questions', $qid);
	$ans_right = (intval($row[3]) == $aid);*/
	$dbconn = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);
	mysql_select_db(MYSQL_DB_NAME);
	
	$qres = mysql_query('SELECT * FROM questions WHERE id='.$qid);
	$row = mysql_fetch_row($qres);
	$ans_right = (intval($row[3]) == $aid);

	$qres = mysql_query('SELECT * FROM users WHERE uid=\''.$uid.'\'');	
	if (mysql_num_rows($qres) <= 0)
		die('Hey, nigger! Do you work!');
	$row = mysql_fetch_row($qres);
	$score = intval($row[6]);

	$tries = null;
	if (strlen(trim($row[7])) == 0) {
		$qres = mysql_query('SELECT * FROM questions WHERE 1');
		$maxid = -1;
		// ищем максимальный id вопроса, чтобы сздать массив попыток длиной id+1
		while ($row = mysql_fetch_row($qres)) {
			if (intval($row[0]) > $maxid)
				$maxid = intval($row[0]);
		}
		//die('∆ќѕјЌќ¬џ…√ќƒ '.intval($row[0]));
		$tries = array_fill(0, $maxid + 1, 0);
	} else
		$tries = unserialize($row[7]);

	if (!$ans_right) {		
		$tries[$qid]++;
	} else {
		$try_n = $tries[$qid];
		if ($try_n < count($VIK_BONUS_ARRAY))
			$score += $VIK_BONUS_ARRAY[$try_n];
	}
	mysql_query('UPDATE users SET tries=\''.mysql_real_escape_string(serialize($tries)).'\', score='.$score.' WHERE uid=\''.$uid.'\'');

	mysql_close($dbconn);

	$tries_str = '';
	foreach ($tries as $try) {
		$tries_str = $tries_str.'; '.$try;
	}

	echo $ans_right ? 'y' : 'n';	
} else if (isset($_GET['uid']) && isset($_GET['get_score'])) {
	$uid = mysql_real_escape_string($_GET['uid']);
	$dbconn = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);
	mysql_select_db(MYSQL_DB_NAME);
	$qres = mysql_query('SELECT * FROM users WHERE uid=\''.$uid.'\'');
	$row = mysql_fetch_row($qres);
	$user_score = intval($row[6]);
	mysql_close($dbconn);

	$user_has_cert = -1;
	for ($i = 0; $i < $VIK_CERT_SCORES; $i++) {
		if ($user_score >= $VIK_CERT_SCORES[$i]) {
			$user_has_cert = $i;
			break;
		}
	}

	if ($user_has_cert >= 0) {
		if ($VIK_DRAW_CERT) {
			$cert_orig_path = $VIK_CERT_TEMPLATE_PATH[$user_has_cert];

			if ($cert_orig_path) {
				$im = imagecreatefrompng($cert_orig_path);
				$redcolor = imagecolorallocate($im, 255, 0, 0);
				imagettftext($im, 12, 0, 47, 113, $redcolor, $VIK_CERT_FONT_PATH, $row[1].' '.$row[2].' -> '.$row[6]);
				imagepng($im, 'pic/cert/c_'.$uid.'.png');
			}
		}
	}

	echo $user_score;
}
?>
