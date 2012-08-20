<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
	"http://www.w3.org/TR/html4/loose.dtd">
<HTML lang="ru">
	<HEAD>
		<META http-equiv="Content-Type" content="text/html; charset=windows-1251">
		<META http-equiv="imagetoolbar" content="no">

<SCRIPT type="text/javascript" src="js/jquery.min.js"></SCRIPT>

<SCRIPT type="text/javascript" src="js/jquery.hoverIntent.js"></SCRIPT>
<SCRIPT type="text/javascript" src="js/jquery.cluetip.js"></SCRIPT>
<LINK rel="stylesheet" type="text/css" href="css/jquery.cluetip.css">

<LINK type="text/css" href="css/main.css" rel="stylesheet">	
<SCRIPT type="text/javascript" src="js/mainhist.js"></SCRIPT>

<TITLE>Рейтинг</TITLE>
</HEAD>
<BODY>

<DIV id="test">                          <!-- История -->
<A href=index.htm><DIV id="test_title"></DIV></A>  <!-- Заголовок  -->
<DIV id="test_work">                   <!-- Рабочая область -->
<DIV id="test_begin">              <!-- Область для текста -->	
<H2>Рейтинг</H2>
<P>
<!-- TODO: запилить валидацию данных с помощью JS -->
<table>
<?php
function newcell($key, $val) {
	echo '<td>';
	echo iconv('utf-8', 'windows-1251', $key);
	echo '</td>';

	echo '<td>';
	echo iconv('utf-8', 'windows-1251', $val);
	echo '</td>';
}

require_once('mysql_conf.php');
$dbconn = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);
mysql_select_db(MYSQL_DB_NAME);
$qres = mysql_query('SELECT * FROM users WHERE 1 ORDER BY score DESC');
while ($row = mysql_fetch_row($qres)) {
	echo '<tr>';
	newcell($row[1].' '.$row[2], $row[6]);
	echo '</tr>';
}
mysql_close($dbconn);
?>
</table>
</P>
</DIV>     

<DIV id="test_area_boxes">  <!-- Область для кнопок -->
<A href="index.htm"><IMG class=but src="pic/index1.png" 
width=115 height=50 border=0
onclick="this.src='./pic/index3.png'"
onmouseover="this.src='./pic/index2.png'"
onmouseout="this.src='./pic/index1.png'"
alt="Начало"></A> 
<A href="game.htm"><IMG class=but src="pic/game1.png" 
width=115 height=50 border=0
onclick="this.src='./pic/game3.png'"
onmouseover="this.src='./pic/game2.png'"
onmouseout="this.src='./pic/game1.png'"
alt="Начать игру"></A> 
<IMG class=but src="pic/history2.png" width=115 height=50 border=0 
alt="Из истории">
<A href="autors.htm"><IMG class=but src="pic/autors1.png" 
width=115 height=50 border=0
onclick="this.src='./pic/autors3.png'"
onmouseover="this.src='./pic/autors2.png'"
onmouseout="this.src='./pic/autors1.png'"
alt="Авторы"></A>          
</DIV>                      
<DIV id="test_photo">       <!-- Область для фотогалереи -->
<IMG class=basic id="his1"
src="pic/sdvorva.jpg" width=142 height=218 border=0
alt="Дворжецкий Вацлав Янович">
<P class="space">
&nbsp;
</P>
	<IMG class=basic id="his2"
	src="pic/soxlop.jpg" width=142 height=175 border=0
	alt="Охлопков Николай Павлович">

	<P class="space">
	&nbsp;
</P>
	<IMG class=basic id="his3"
	src="pic/sdvor.jpg" width=142 height=165 border=0
	alt="Дворжецкий Владимир Вацлович">

	</DIV>
	</DIV>                                 <!-- Рабочая область -->
	</DIV>                                 <!-- История --> 

	</BODY>
	</HTML>
