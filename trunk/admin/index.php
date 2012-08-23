<?php
require_once('../mysql_conf.php');
if (isset($_POST['qid'])) {
	$dbconn = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);
	mysql_select_db(MYSQL_DB_NAME);
	mysql_query('DELETE FROM questions WHERE id='.intval($_POST['qid']));
	mysql_close($dbconn);
}
if (isset($_POST['q_text']) && isset($_POST['q_answers']) && isset($_POST['q_correct'])) {
	$qtext = mysql_real_escape_string(iconv('windows-1251', 'utf-8', $_POST['q_text']));
	$answers = mysql_real_escape_string(serialize(explode('#', iconv('windows-1251', 'utf-8', $_POST['q_answers']))));
	$correct = intval($_POST['q_correct']);
	$dbconn = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);
	mysql_select_db(MYSQL_DB_NAME);
	mysql_query('INSERT INTO questions(title, variants, correct) VALUES (\''.$qtext.'\', \''.$answers.'\', '.$correct.')');
	mysql_close($dbconn);
}

function load_questions($fd) {
	$dbconn = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);
	mysql_select_db(MYSQL_DB_NAME);
	$questions_res = mysql_query('SELECT * FROM questions WHERE 1');
	fwrite($fd, "exam.tasks = [\n");
	$counter = 0;
	while ($question = mysql_fetch_row($questions_res)) {		
		if ($counter != 0) {
			fwrite($fd, "  options: {next: true}\n");
			fwrite($fd, "}\n");
			fwrite($fd, ",\n");
		}
		fwrite($fd, "{\n");
		fwrite($fd, "  question: \"".iconv('utf-8', 'windows-1251', $question[1])."\",\n");
		fwrite($fd, "  id:".$question[0].",\n");
		fwrite($fd, "  answers:\n");
		fwrite($fd, "        [\n");
		
		$answers = unserialize($question[2]);
		for ($i = 0; $i < count($answers); $i++) {
			if ($i != 0)
				fwrite($fd, ",\n");
			fwrite($fd, "          {\n");
			fwrite($fd, '           aid: '.($i + 1).",\n");
			fwrite($fd, "           correct: false,\n");
			fwrite($fd, "           content: \"".iconv('utf-8', 'windows-1251', $answers[$i])."\"\n");
			fwrite($fd, "          }");
		}
		
		fwrite($fd, "\n        ],\n");
		$counter++;
	}
	fwrite($fd, "  options: {next: false}}];\n");
	mysql_close($dbconn);
}


if (isset($_POST['upd_examtask'])) {
	$file = fopen('../js/examtask.js', 'w');
	load_questions($file);	
	fclose($file);
}
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251">
</head>
<body>
<h1>Админка</h1>
<h2>Удаление вопросов</h2>
<?php
$dbconn = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);
mysql_select_db(MYSQL_DB_NAME);
$qres = mysql_query('SELECT * FROM questions WHERE 1');
echo "<table border=1>\n";
?>
  <tr>
	<td>
      <b>Вопрос</b>
    </td>
	<td>
      <b>Ответы (жирный - верный)</b>
    </td>
	<td>
      <b>Кнопочка</b>
    </td>
  </tr>
<?php
while ($row = mysql_fetch_row($qres)) {
	echo "  <tr>\n";
	echo "    <form action=index.php method=POST>\n";
	echo "    <input type=hidden name=qid value=".intval($row[0]).">\n";
	echo "    <td>\n";
	echo "      ".iconv('utf-8', 'windows-1251', $row[1]);
	echo "    </td>\n";
	echo "    <td>\n";
	$answers = unserialize($row[2]);
	for ($i = 0; $i < count($answers); $i++) {
		$cur_correct = (($i + 1) == intval($row[3]));
		echo "      ".($cur_correct ? "<b>" : "").($i + 1).") ".iconv('utf-8', 'windows-1251', $answers[$i]).($cur_correct ? "</b>" : "")."<br>\n";	
	}
	echo "    </td>\n";
	echo "    <td>\n";
	echo "    <input type=submit value=Удалить>\n";
	echo "    </td>\n";
	echo "    </form>\n";
	echo "  </tr>\n";
}
echo "</table>";
mysql_close($dbconn);
?>
<h2>Добавить вопрос</h2>
<form action=index.php method=POST>
Текст вопроса: <input type=text name=q_text><br>
Ответы (ввести через &#035;):<br>
<textarea name=q_answers rows=12 cols=40></textarea><br>
Номер верного ответа (счет с 1): <input type=text name=q_correct><br>
<input type=submit value=Добавить><br>
</form>
<h2>Другое</h2>
<form action=index.php method=POST>
<input type=submit value="Обновить еxamtask.js">
<input type=hidden name=upd_examtask>
</form>
</body>
</html>
