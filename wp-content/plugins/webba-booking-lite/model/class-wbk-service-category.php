<?php
if ( ! defined( 'ABSPATH' ) ) exit;
class WBK_Service_Category extends WBK_Model_Object{
    public function __construct( $id ) {
        $this->table_name = 'wbk_service_categories';
		parent::__construct( $id );

	}

}
