<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Класс для ленивой загрузки изображений.
 *
 * @author        Artem Prihodko <webtemyk@yandex.ru>
 * @copyright (c) 2020, Webcraftic
 * @version       1.0
 */
class WRIO_Lazy_Load {

	/**
	 * The single instance of the class.
	 *
	 * @since  1.0.0
	 * @access protected
	 * @var    object
	 */
	protected static $_instance;

	/**
	 * @return object|\WRIO_Lazy_Load object Main instance.
	 *
	 * @since  1.0.0
	 */
	public static function get_instance() {
		if ( ! isset( static::$_instance ) ) {
			static::$_instance = new static();
		}

		return static::$_instance;
	}

	/**
	 * Установка хуков
	 */
	public function init() {
		if ( WRIO_Plugin::app()->getOption( 'use_lazy_load', false ) ) {
			add_action( 'wp_enqueue_scripts', [ $this, 'front_scripts' ] );
			add_filter( 'wp_get_attachment_image_attributes', [ $this, 'image_attributes' ], 10, 3 );
		}
	}

	public function image_attributes( $attr, $attachment, $size ) {
		if ( ! isset( $attr['loading'] ) ) {
			$attr['loading'] = "lazy";
		}

		if ( isset( $attr['src'] ) ) {
			$attr['data-src'] = $attr['src'];
			unset( $attr['src'] );

			if ( isset( $attr['srcset'] ) ) {
				unset( $attr['srcset'] );
			}
		}

		return $attr;
	}

	public function front_scripts() {
		global $wp_version;
		//do lazy
		wp_enqueue_script( 'wbcr-jquery-lazy-load', WRIO_PLUGIN_URL . '/assets/js/jquery.lazy.min.js', [ 'jquery' ], false, true );
		wp_enqueue_script( 'wbcr-robin-lazy-load', WRIO_PLUGIN_URL . '/assets/js/lazy-load.js', [ 'jquery' ], false, true );
		wp_localize_script( 'wbcr-robin-lazy-load', 'wbcr_robin', [
			'wpCompatibleLazy' => (version_compare( $wp_version, '5.5.0' ) >= 0) ? 'yes' : 'no',
		] );
	}

}