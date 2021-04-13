<?php

if ( !defined( 'ABSPATH' ) ) exit;
final class WBK_Options_Processor {

    /**
     * The single instance of the class.
     * @var WBK_Options_Processor
     */
    protected static $inst = null;


    protected $options;

    private function __construct() {

    }


    public function add_option( $slug, $type, $title, $description, $section, $default_value, $extra = null  ){
        switch ( $type ) {
            case 'text':
                $render_callback = 'render_text';
                $validation_callback = 'validate_text';
                break;
            case 'pass':
                $render_callback = 'render_pass';
                $validation_callback = 'validate_text';
                break;
            case 'textarea':
                $render_callback = 'render_textarea';
                $validation_callback = 'validate_text';
                break;
            case 'checkbox':
                $render_callback = 'render_checkbox';
                $validation_callback = 'validate_checkbox';
                break;
            case 'select':
                $render_callback = 'render_select';
                $validation_callback = 'validate_select';
                break;
            default:
                $render_callback = 'render_text';
                $validation_callback = 'validate_text';
                break;
        }

        add_settings_field(
            $slug,
            $title,
            array( $this, $render_callback ),
            'wbk-options',
            $section,
            array( $slug, $default_value, $description, $extra )
        );
        register_setting(
            'wbk_options',
            $slug,
            array ( $this, $validation_callback )
        );
    }

    public function validate_text( $input ){
        return sanitize_text_field( $input );
    }

    public function validate_checkbox( $input ){
        return sanitize_text_field( $input );
    }

    public function validate_select( $input ){
        return sanitize_text_field( $input );
    }

    public function render_text( $args ){
        WBK_Renderer::load_template( 'options/text_field', $args );
    }
    public function render_pass( $args ){
        WBK_Renderer::load_template( 'options/pass_field', $args );
    }
    public function render_textarea( $args ){
        WBK_Renderer::load_template( 'options/textarea_field', $args );
    }
    public function render_checkbox( $args ){
        WBK_Renderer::load_template( 'options/checkbox_field', $args );
    }
    public function render_select( $args ){
        WBK_Renderer::load_template( 'options/select_field', $args );
    }


    public function wbk_settings_section_callback( $arg ){

    }

    /**
     * returns instance of Plugion object
     */
    public static function Instance() {
        if ( is_null( self::$inst ) ) {
            self::$inst = new self();
        }

        return self::$inst;
    }

}

if( !function_exists('wbk_opt') ){
	function wbk_opt() {
	    return WBK_Options_Processor::instance();
	}
}
