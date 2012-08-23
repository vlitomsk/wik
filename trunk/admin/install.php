<?php
require_once('../mysql_conf.php');
$sql_captcha = 'CREATE TABLE IF NOT EXISTS `captcha` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1' ;

$sql_questions = 'CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) CHARACTER SET utf8 NOT NULL,
  `variants` text CHARACTER SET utf8 NOT NULL,
  `correct` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1' ;

$sql_users = 'CREATE TABLE IF NOT EXISTS `users` (
  `uid` varchar(32) NOT NULL,
  `family` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `age` int(11) NOT NULL,
  `city` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `score` int(11) NOT NULL,
  `tries` text NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8';

$dbconn = mysql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);
mysql_query('CREATE DATABASE '.MYSQL_DB_NAME.' DEFAULT CHARSET utf8');
mysql_select_db(MYSQL_DB_NAME);

mysql_query($sql_captcha);
mysql_query($sql_questions);
mysql_query($sql_users);

mysql_close($dbconn);
?>
