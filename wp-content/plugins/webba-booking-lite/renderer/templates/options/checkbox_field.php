<?php
if ( !defined( 'ABSPATH' ) ) exit;

$slug = $data[0];
$default_value = $data[1];
$value = get_option( $slug, $default_value );
?>
<input type="checkbox" <?php echo checked( 'true', $value, false ) ?> id="<?php echo $slug?>" name="<?php echo $slug?>" value="true">
