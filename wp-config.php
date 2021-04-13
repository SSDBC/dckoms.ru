<?php
/**
 * Основные параметры WordPress.
 *
 * Скрипт для создания wp-config.php использует этот файл в процессе
 * установки. Необязательно использовать веб-интерфейс, можно
 * скопировать файл в "wp-config.php" и заполнить значения вручную.
 *
 * Этот файл содержит следующие параметры:
 *
 * * Настройки MySQL
 * * Секретные ключи
 * * Префикс таблиц базы данных
 * * ABSPATH
 *
 * @link https://ru.wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define( 'DB_NAME', 'host1300799_4321' );

/** Имя пользователя MySQL */
define( 'DB_USER', 'host1300799_4321' );

/** Пароль к базе данных MySQL */
define( 'DB_PASSWORD', '7d32173a' );

/** Имя сервера MySQL */
define( 'DB_HOST', 'localhost' );

/** Кодировка базы данных для создания таблиц. */
define( 'DB_CHARSET', 'utf8mb4' );

/** Схема сопоставления. Не меняйте, если не уверены. */
define( 'DB_COLLATE', '' );

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'pl@$.Zz5 6%&rbzO,:,Y<FqQ6Tp) ;WK#.XYo;]gIYYIn>x&+p^S4yR-3htT?#)g' );
define( 'SECURE_AUTH_KEY',  '#JO{b5;(Y]*!bXL?5(jEi/rugqIM-BqwFJ3%k$p$U37ZW{D.Ib6-Db8t.o1Y6w6d' );
define( 'LOGGED_IN_KEY',    'Q0$=Bu<0qKbrW(`v!JJ5Q1D;4?|4:0a LZ.)z7ePjB]%:Kd$~1ztb?-[R{=A!IGR' );
define( 'NONCE_KEY',        'Q5q,-$MCcj51)*S4Og:r|c?9#N))*>MZilm@h{x%?89qA@k {%UZ)sMJ;BH,aMK@' );
define( 'AUTH_SALT',        'VWC~x%CS~Kk104OM5pIPSK7lH[^ed|fjA|s4s?A[2BB>a#C6rdAJP V~1!4:_.`W' );
define( 'SECURE_AUTH_SALT', 'd9{Z:N@J^JjB8?q8A:#N)E{)<dr;F]~uv*O{-6SurRo2)(S-%Db-bDo7xx(T%7ei' );
define( 'LOGGED_IN_SALT',   '=q5e!_gn3D hTEL7DH{aDHX3ZkCZvo|xKR(ea{s;BO1&r9>+>wdx{ZgrOv*m9xG0' );
define( 'NONCE_SALT',       'Bc(Dp:Bttp8n!EQ9gbX< 94nvt}JJk>]vM)^<s=o-]-(0BET92`,l-m0N0+>YlGG' );

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix = 'jos_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 *
 * Информацию о других отладочных константах можно найти в документации.
 *
 * @link https://ru.wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Инициализирует переменные WordPress и подключает файлы. */
require_once ABSPATH . 'wp-settings.php';
