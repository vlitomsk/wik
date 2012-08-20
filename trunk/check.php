<?php
require_once('mysql_conf.php');
require_once('mysql_common.php');
if (isset($_GET['qid']) && isset($_GET['aid']) && isset($_GET['uid'])) {
	$qid = intval($_GET['qid']);
	$aid = intval($_GET['aid']);
	$uid = intval($_GET['uid']);

	$row = mysql_select_by_id('questions', $qid);
	$ans_right = (intval($row[3]) == $aid);
	$row = mysql_select_by_id('users', $uid);
	$tries = unserialize($row[7]);

	$dbconn = mysql_open_connection();
	if (!$ans_right)
		$tries[$qid]++;
	mysql_query('UPDATE users SET tries='.serialize($tries).' WHERE id='.$uid);
	mysql_close_connection($dbconn);

	die('Checked question '.$qid.' from user '.$uid.'. Given answer '.$aid.'. Correct: '.$ans_right);

	echo $ans_right ? 'y' : 'n';	
}
?>
