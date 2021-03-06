<?php
// Solo Framework table text component
if ( ! defined( 'ABSPATH' ) ) exit;
class SLFTableDate extends SLFTableComponent {
	public function __construct( $title, $name, $value ) {
		parent::__construct( $title, $name, $value, null );
	}
    public function renderCell(){
    	$format = get_option( 'date_format' );
		return wp_date( $format,   $this->value, new DateTimeZone( date_default_timezone_get() ) );
    }
    public function renderControl(){
    	$format = get_option( 'wbk_date_format_backend', 'm-d-y');
        $format = str_replace('y', 'Y', $format );

    	$html = '<label class="slf_table_component_label" >' . $this->title . '</label>';
    	$disabled = '';
    	 
		$html .= '<input class="slf_table_component_input slf_table_component_date slf_table_component_text" name="' . $this->name . '" data-type="date"  type="text" value="' . wp_date( $format,   $this->value, new DateTimeZone( date_default_timezone_get() ) ) . '"  />';
		return $html;
    }
}
