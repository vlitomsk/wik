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

<TITLE>�������</TITLE>
</HEAD>
<BODY>

<DIV id="test">                          <!-- ������� -->
<A href=index.htm><DIV id="test_title"></DIV></A>  <!-- ���������  -->
<DIV id="test_work">                   <!-- ������� ������� -->
<DIV id="test_begin">              <!-- ������� ��� ������ -->	
<H2>�������</H2>
<P>
<!-- TODO: �������� ��������� ������ � ������� JS -->
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

<DIV id="test_area_boxes">  <!-- ������� ��� ������ -->
<A href="index.htm"><IMG class=but src="pic/index1.png" 
width=115 height=50 border=0
onclick="this.src='./pic/index3.png'"
onmouseover="this.src='./pic/index2.png'"
onmouseout="this.src='./pic/index1.png'"
alt="������"></A> 
<A href="game.htm"><IMG class=but src="pic/game1.png" 
width=115 height=50 border=0
onclick="this.src='./pic/game3.png'"
onmouseover="this.src='./pic/game2.png'"
onmouseout="this.src='./pic/game1.png'"
alt="������ ����"></A> 
<IMG class=but src="pic/history2.png" width=115 height=50 border=0 
alt="�� �������">
<A href="autors.htm"><IMG class=but src="pic/autors1.png" 
width=115 height=50 border=0
onclick="this.src='./pic/autors3.png'"
onmouseover="this.src='./pic/autors2.png'"
onmouseout="this.src='./pic/autors1.png'"
alt="������"></A>          
</DIV>                      
<DIV id="test_photo">       <!-- ������� ��� ����������� -->
<IMG class=basic id="his1"
src="pic/sdvorva.jpg" width=142 height=218 border=0
alt="���������� ������ ������">
<P class="space">
&nbsp;
</P>
	<IMG class=basic id="his2"
	src="pic/soxlop.jpg" width=142 height=175 border=0
	alt="�������� ������� ��������">

	<P class="space">
	&nbsp;
</P>
	<IMG class=basic id="his3"
	src="pic/sdvor.jpg" width=142 height=165 border=0
	alt="���������� �������� ��������">

	</DIV>
	</DIV>                                 <!-- ������� ������� -->
	</DIV>                                 <!-- ������� --> 

	</BODY>
	</HTML>
