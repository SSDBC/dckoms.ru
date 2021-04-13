<?php
if ( ! defined( 'ABSPATH' ) ) exit;
class WBK_Coupon extends WBK_Model_Object{
    public function __construct( $id ) {
        $this->table_name = 'wbk_coupons';
		parent::__construct( $id );

	}

}
