<?php
require_once('mysql_conf.php');
require_once('captcha.php');

function iconv1251_8($txt) {
	return iconv('windows-1251', 'UTF-8', $txt);
}

// ���������� id ������ ����� � ������� users
function register_new_user($fam, $name, $age, $city, $email) {
	$fam = mysql_real_escape_string(iconv1251_8($fam));
	$name = mysql_real_escape_string(iconv1251_8($name));
	$city = mysql_real_escape_string(iconv1251_8($city));
	$email = mysql_real_escape_string(iconv1251_8($email));
	$new_uid = md5($fam.$name.strval($age).$city.'fuckin8_s@1t!@#');

	$dbconn = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);
	mysql_select_db(MYSQL_DB_NAME);
	$qres = mysql_query('SELECT * FROM users WHERE uid=\''.$new_uid.'\'');
	$row = mysql_fetch_row($qres);
	
	if ($row[0] != NULL) {
		//die('exists');
		$new_uid = NULL;
	} else 
		mysql_query('INSERT INTO users VALUES (\''.$new_uid.'\', \''.$fam.'\', \''.$name.'\', '.$age.', \''.$city.'\', \''.$email.'\', 0, "")');
	mysql_close($dbconn);

	return $new_uid;
}

$go_register = false;
$cap_valid = false;
$uid = NULL;

if (isset($_GET["uid"]) && isset($_GET["score"])) {
	$user_id = mysql_real_escape_string($_GET["uid"]);
	$user_score = intval($_GET["score"]);

	$dbconn = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);
	mysql_select_db(MYSQL_DB_NAME);
	mysql_query('UPDATE users SET score='.$user_score.' WHERE uid=\''.$user_id.'\'');
	$qres = mysql_query('SELECT * FROM users WHERE uid=\''.$user_id.'\'');
	$row = mysql_fetch_row($qres); 	
	mysql_close($dbconn);
	//die('Updated UID ('.$user_id.'). Score='.$user_score.'.');

} else if (isset($_POST["vik_fam"]) && isset($_POST["vik_name"]) &&
isset($_POST["vik_age"]) && isset($_POST["vik_email"]) && 
isset($_POST["vik_city"]) && isset($_POST["vik_cap"]) && 
isset($_POST["vik_capid"])) {
	$cap_valid = check_captcha(intval($_POST["vik_capid"]), intval($_POST["vik_cap"]));
	if ($cap_valid) { 
		$uid = register_new_user($_POST["vik_fam"], $_POST["vik_name"], intval($_POST["vik_age"]), $_POST["vik_city"], $_POST["vik_email"]);
	}
	unlink_captcha(intval($_POST["vik_capid"]));
} else {
	$go_register = true;
}

?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
  "http://www.w3.org/TR/html4/loose.dtd">
<HTML lang="ru">
  <HEAD>
    <META http-equiv="Content-Type" content="text/html; charset=windows-1251">
    <META http-equiv="imagetoolbar" content="no">


    <!--LINK type="text/css" href="css/ui-lightness/jquery-ui-1.8.6.custom.css" rel="stylesheet"-->
    <SCRIPT type="text/javascript" src="js/jquery.min.js"></SCRIPT>
    <SCRIPT type="text/javascript" src="js/jquery-ui-1.7.2.custom.min.js"></SCRIPT>

    <LINK type="text/css" href="css/exam.css" rel="stylesheet">	
    <LINK type="text/css" href="css/main.css" rel="stylesheet">	
    <SCRIPT type="text/javascript" src="js/exam.js"></SCRIPT>
	<SCRIPT type="text/javascript" src="js/examtask.js"></SCRIPT>
    <TITLE>����&nbsp;&mdash; 1 ����</TITLE>
  </HEAD>
  <BODY>
<?php
if ($go_register || (!$cap_valid) || ($uid == NULL)) {
?>
	
    <DIV id="test">                          <!-- �������� -->
      <A href=index.htm><DIV id="test_title"></DIV></A>  <!-- ���������  -->
      <DIV id="test_work">                   <!-- ������� ������� -->
		<DIV id="test_begin">              <!-- ������� ��� ������ -->
			<P>
<?php
if ($go_register) 
	print '������ �������� <A href=reg.php>�����������</A>.';
else if (!$cap_valid)
	print '������� ������� ����� � ��������. ������������ <A href=reg.php>�����������</A>';
else
	print '�� ��� ��������� ���������.';
?>
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
    </DIV>                                 <!-- �������� --> 

<?php
} else {
?>
	<INPUT type="hidden" value="<?= $uid ?>" id="form_uid">
	
    <DIV id="exam">                          <!-- ���� (1 ����) -->
      <A href=index.htm><DIV id="exam_title"></DIV></A> <!-- ���������  -->
      <DIV id="exam_work">                   <!-- ������� ������� -->
        <DIV id="exam_question">         <!-- ������� ��� ������� -->
        </DIV>       
        <DIV id="exam_answers">              <!-- ������� � �������� -->
        </DIV>                       
 
<IMG id="index"                   
     src="pic/index1.png"
     width=115 height=50 border=0 alt="� ������">

<IMG id="game"                   
     src="pic/game1.png"
     width=115 height=50 border=0 alt="� ������">
 
<IMG id="exam_clear"                   
     src="pic/clear1.png"
     width=115 height=50 border=0 alt="�����">

        <DIV id="exam_mess"></DIV>             <!-- ���������� ������ -->
        <DIV id="exam_ntask"></DIV>            <!-- ����� �������� ������� -->
        <DIV id="exam_z"></DIV>                <!-- ������ -->
      </DIV>                                 <!-- ������� ������� -->
    </DIV>                                 <!-- ���� (1 ����) -->

<?php
}
?>
  </BODY>
</HTML>
