<?php

require_once('./mysql_config'); // ��������� MySQL - ���������� ��������

/**
 * ��������� ������ ���������
 */

// ������� �������� ������. ���� ������� �������� � ����, ����� �� ������������, �� �������� 0 �������
$VIK_BONUS_ARRAY[0] = 3; // c ������� ���� ��������
$VIK_BONUS_ARRAY[1] = 2; // �� ������� 
$VIK_BONUS_ARRAY[2] = 1; // ...

// ����������� �� ������. ������� ������������ ��� ��� ����� - $CERT_TEMPLATE_PATH 
$VIK_CERT_SCORES[0] = 39; // ������ ����� - >= 39 ������
$VIK_CERT_SCORES[1] = 34; // ������
$VIK_CERT_SCORES[2] = 28; // ...

/// ��� ������ ���� ��������� SMTP

$VIK_ROOT_EMAIL = 'asasdasdsd'; // ����, �� ������� ������������ ��������� ������������. ���� ���������� �� �����, ���������� � null
$VIK_SEND_CERTS = true; // ���������� �� ���������� ����������� �� �����

/**
 * ��������� �������� ����
 */

$VIK_DRAW_CERT = true; // ������������ ����������� �����������

$VIK_CERT_FONT_PATH = '/calibri.ttf'; // �����, ������������ � �����������

// ������� ������������. ��������� ������� - ��� � $CERT_SCORES
$VIK_CERT_TEMPLATE_PATH[0] = '/pic/cert_mag.png';
$VIK_CERT_TEMPLATE_PATH[1] = '/pic/cert_bak.png';
$VIK_CERT_TEMPLATE_PATH[2] = '/pic/cert_shk.png';

?>
