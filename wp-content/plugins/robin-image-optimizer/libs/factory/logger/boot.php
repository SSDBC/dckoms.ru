<?php

use WBCR\Factory_Logger_111\Logger;

/**
 * Factory Logger
 *
 * @author        Artem Prihodko <webtemyk@yandex.ru>
 * @since         1.0.0
 *
 * @package       factory-logger
 * @copyright (c) 2020, Webcraftic Ltd
 *
 * @version       1.1.1
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( defined( 'FACTORY_LOGGER_111_LOADED' ) || ( defined( 'FACTORY_LOGGER_STOP' ) && FACTORY_LOGGER_STOP ) ) {
	return;
}

define( 'FACTORY_LOGGER_111_LOADED', true );
define( 'FACTORY_LOGGER_111_VERSION', '1.1.1' );
define( 'FACTORY_LOGGER_111_DIR', dirname( __FILE__ ) );
define( 'FACTORY_LOGGER_111_URL', plugins_url( null, __FILE__ ) );

load_plugin_textdomain( 'wbcr_factory_logger_111', false, dirname( plugin_basename( __FILE__ ) ) . '/langs' );

require_once( FACTORY_LOGGER_111_DIR . '/includes/class-logger.php' );

if ( is_admin() ) {
	require_once( FACTORY_LOGGER_111_DIR . '/includes/class-log-export.php' );
	require_once( FACTORY_LOGGER_111_DIR . '/pages/class-logger-impressive-page.php' );
	require_once( FACTORY_LOGGER_111_DIR . '/pages/class-logger-admin-page.php' );
}

/**
 * @param Wbcr_Factory446_Plugin $plugin
 */
add_action( 'wbcr_factory_logger_111_plugin_created', function ( $plugin ) {
	/* @var Wbcr_Factory446_Plugin $plugin */

	/* Settings of Logger
	 	$settings = [
			'dir' => null,
			'file' => 'app.log',
			'flush_interval' => 1000,
			'rotate_size' => 5000000,
			'rotate_limit' => 3,
		];

		$plugin->set_logger( "WBCR\Factory_Logger_111\Logger", $settings );
	*/
	$plugin->set_logger( "WBCR\Factory_Logger_111\Logger" );
} );
