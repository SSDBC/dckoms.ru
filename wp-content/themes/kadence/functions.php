<?php

/**
 * Kadence functions and definitions
 *
 * This file must be parseable by PHP 5.2.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package kadence
 */

define('KADENCE_VERSION', '1.0.18');
define('KADENCE_MINIMUM_WP_VERSION', '5.2');
define('KADENCE_MINIMUM_PHP_VERSION', '7.0');

// Bail if requirements are not met.
if (version_compare($GLOBALS['wp_version'], KADENCE_MINIMUM_WP_VERSION, '<') || version_compare(phpversion(), KADENCE_MINIMUM_PHP_VERSION, '<')) {
	require get_template_directory() . '/inc/back-compat.php';
	return;
}

// Include WordPress shims.
require get_template_directory() . '/inc/wordpress-shims.php';

// Load the `kadence()` entry point function.
require get_template_directory() . '/inc/class-theme.php';

// Load the `kadence()` entry point function.
require get_template_directory() . '/inc/functions.php';

// Initialize the theme.
call_user_func('Kadence\kadence');

## Закрывает все маршруты REST API от публичного доступа
add_filter('rest_authentication_errors', function ($result) {
	if (empty($result) && !current_user_can('edit_others_posts')) {
		return new WP_Error('rest_forbidden', 'You are not currently logged in.', array('status' => 401));
	}
	return $result;
});
