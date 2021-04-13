<?php
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Class WBK_Renderer is used for rendering interface elements of the plugin
 */
class WBK_Renderer {
    public function __construct() {

    }
    public static function load_template( $template, $data ){
        $file_name = WP_WEBBA_BOOKING__PLUGIN_DIR . DIRECTORY_SEPARATOR . 'renderer' . DIRECTORY_SEPARATOR . 'templates' . DIRECTORY_SEPARATOR . $template . '.php';
        ob_start();
        include $file_name;
        echo ob_get_clean();
    }
    public static function render_backend_page(){
        self::load_template( 'backend_page', null );
    }
}

?>
