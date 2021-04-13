<?php

if ( !defined( 'ABSPATH' ) ) {
    exit;
}
/**
 * Class WBK_Assets_Manager is used to perform requests to the REST API
 */
class WBK_Controller
{
    /**
     * constructor
     */
    public function __construct()
    {
        // register route for getting available timeslots for a day
        add_action( 'rest_api_init', function () {
            register_rest_route( 'wbk/v1', '/get-available-time-slots-day/', [
                'methods'             => 'POST',
                'callback'            => [ $this, 'get_available_time_slots_day' ],
                'permission_callback' => [ $this, 'get_available_time_slots_day_permission' ],
            ] );
        } );
        add_action( 'rest_api_init', function () {
            register_rest_route( 'wbk/v1', '/csv-export/', [
                'methods'             => 'POST',
                'callback'            => [ $this, 'wbk_csv_export' ],
                'permission_callback' => [ $this, 'wbk_csv_export_permission' ],
            ] );
        } );
    }
    
    /**
     * getting time slots for a given day
     * @param  WP_REST_Request $request rest request object
     * @return WP_REST_Response rest response object
     */
    public function get_available_time_slots_day( $request )
    {
        $day = $request['date'];
        $service_id = $request['service_id'];
        $current_booking = $request['current_booking'];
        
        if ( !WBK_Validator::is_service_exists( $service_id ) ) {
            $data = array(
                'Reason' => 'Service not exists',
            );
            $response = new \WP_REST_Response( $data );
            $response->set_status( 400 );
            return $response;
        }
        
        
        if ( !WBK_Validator::is_date( $day ) ) {
            $data = array(
                'Reason' => 'Wrong date passed',
            );
            $response = new \WP_REST_Response( $data );
            $response->set_status( 400 );
            return $response;
        }
        
        if ( !Plugion\Validator::check_integer( $current_booking, 1, 2147483647 ) ) {
            $current_booking = '';
        }
        $sp = new WBK_Schedule_Processor();
        date_default_timezone_set( get_option( 'wbk_timezone', 'UTC' ) );
        $day = strtotime( $day );
        $timeslots = $sp->get_time_slots_by_day(
            $day,
            $service_id,
            false,
            true,
            true
        );
        $time_slots_filtered = array();
        foreach ( $timeslots as $timeslot ) {
            $current_quantity = 0;
            if ( !is_array( $timeslot->getStatus() ) && $timeslot->getStatus() == 0 ) {
                $time_slots_filtered[] = $timeslot;
            }
            
            if ( !is_array( $timeslot->getStatus() ) && Plugion\Validator::check_integer( $timeslot->getStatus(), 1, 2147483647 ) ) {
                
                if ( $current_booking == $timeslot->getStatus() ) {
                    $booking = new WBK_Booking( $current_booking );
                    $current_quantity = $booking->get_quantity();
                }
                
                $timeslot->set_free_places( $timeslot->get_free_places() + $current_quantity );
                $time_slots_filtered[] = $timeslot;
            }
            
            
            if ( is_array( $timeslot->getStatus() ) && in_array( $current_booking, $timeslot->getStatus() ) ) {
                $booking = new WBK_Booking( $current_booking );
                $current_quantity = $booking->get_quantity();
                $timeslot->set_free_places( $timeslot->get_free_places() + $current_quantity );
                $time_slots_filtered[] = $timeslot;
            } elseif ( is_array( $timeslot->getStatus() ) ) {
                $timeslot->set_free_places( $timeslot->get_free_places() + $current_quantity );
                $time_slots_filtered[] = $timeslot;
            }
        
        }
        $data = array(
            'time_slots' => $time_slots_filtered,
        );
        $response = new \WP_REST_Response( $data );
        $response->set_status( 200 );
        date_default_timezone_set( 'UTC' );
        return $response;
    }
    
    /**
     * check if current user can get time slots per day
     * @param  WP_REST_Request $request rest request object
     * @return bool allow or not rest request
     */
    public function get_available_time_slots_day_permission( $request )
    {
        return true;
    }
    
    public function wbk_csv_export_permission()
    {
        return true;
    }
    
    /**
     * function CSV export
     * @return null
     */
    public function wbk_csv_export( $request )
    {
    }

}