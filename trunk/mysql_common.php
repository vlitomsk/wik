<?php
require_once('mysql_conf.php');

function mysql_open_connection() {
	$dbconn = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);	
	mysql_select_db(MYSQL_DB_NAME);

	return $dbconn;
}

function mysql_close_connection($dbconn) {
	mysql_close($dbconn);
}

function mysql_select_by_id($table, $id) {
	$dbconn = mysql_open_connection();
	$table = mysql_real_escape_string($table);
	$qres = mysql_query('SELECT * FROM '.$table.' WHERE id='.intval($id)); // конечно, можно запилить и чтение в ассоциативные массивы...
	mysql_close_connection($dbconn);

	return mysql_fetch_row($qres);
}

?>
