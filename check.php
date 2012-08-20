<?php
require_once('mysql_conf.php');
require_once('mysql_common.php');
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
	$row = mysql_fetch_row($qres);
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

	if (!$ans_right)
		$tries[$qid]++;
	mysql_query('UPDATE users SET tries=\''.serialize($tries).'\' WHERE uid=\''.$uid.'\'');

	mysql_close($dbconn);

	$tries_str = '';
	foreach ($tries as $try) {
		$tries_str = $tries_str.'; '.$try;
	}

	echo $ans_right ? 'y' : 'n';	
}
?>
