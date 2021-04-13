<?php

if ( !defined( 'ABSPATH' ) ) {
    exit;
}
class WBK_Price_Processor
{
    static function calculate_single_booking_price( $booking_id, $booking_count = 1 )
    {
        $booking = new WBK_Booking( $booking_id );
        if ( $booking->get_name() == '' ) {
            return 0;
        }
        $service = new WBK_Service( $booking->get_service() );
        if ( $service->get_name() == '' ) {
            return 0;
        }
        $default_price = $service->get_price();
        if ( $default_price == 0 ) {
            return array(
                'price' => 0,
            );
        }
        return array(
            'price' => $default_price,
        );
    }
    
    static function get_multiple_booking_price( $booking_ids )
    {
        $total = 0;
        foreach ( $booking_ids as $booking_id ) {
            $booking = new WBK_Booking( $booking_id );
            if ( $booking->get_name() == '' ) {
                continue;
            }
            $total += $booking->get_price() * $booking->get_quantity();
        }
        return $total;
    }

}