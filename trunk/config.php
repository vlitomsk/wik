<?php

require_once('./mysql_config'); // настройки MySQL - посмотреть отдельно

/**
 * Настройки логики викторины
 */

// Раздача бонусных баллов. Если человек отвечает с раза, здесь не объявленного, то получает 0 бонусов
$VIK_BONUS_ARRAY[0] = 3; // c первого раза ответили
$VIK_BONUS_ARRAY[1] = 2; // со второго 
$VIK_BONUS_ARRAY[2] = 1; // ...

// Разбалловка по местам. Шаблоны сертификатов под эти места - $CERT_TEMPLATE_PATH 
$VIK_CERT_SCORES[0] = 39; // Первое место - >= 39 баллов
$VIK_CERT_SCORES[1] = 34; // Второе
$VIK_CERT_SCORES[2] = 28; // ...

/// Тут должны быть настройки SMTP

$VIK_ROOT_EMAIL = 'asasdasdsd'; // Ящик, на который отправляются дубликаты сертификатов. Если отправлять не нужно, установить в null
$VIK_SEND_CERTS = true; // Отправлять ли участникам сертификаты по почте

/**
 * Настройки внешнего вида
 */

$VIK_DRAW_CERT = true; // Использовать графические сертификаты

$VIK_CERT_FONT_PATH = '/calibri.ttf'; // Шрифт, используемый в сертификате

// Шаблоны сертификатов. Индекация массива - как у $CERT_SCORES
$VIK_CERT_TEMPLATE_PATH[0] = '/pic/cert_mag.png';
$VIK_CERT_TEMPLATE_PATH[1] = '/pic/cert_bak.png';
$VIK_CERT_TEMPLATE_PATH[2] = '/pic/cert_shk.png';

?>
