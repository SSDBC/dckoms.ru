<?php add_action('wp_enqueue_scripts', 'style_theme');
function style_theme()
{
	wp_enqueue_style('style', get_stylesheet_uri());
	wp_enqueue_style('default', get_template_directory_uri() . '/assets/css/default.css');
	wp_enqueue_style('layout', get_template_directory_uri() . '/assets/css/layout.css');
	wp_enqueue_style('fonts', get_template_directory_uri() . '/assets/css/fonts.css');
	wp_enqueue_style('media-queries', get_template_directory_uri() . '/assets/css/media-queries.css');
}

add_action('wp_footer', 'scripts_pdv');
function scripts_pdv()
{
	wp_enqueue_script('init', get_template_directory_uri() . '/assets/js/init.js');
	wp_enqueue_script('doubletaptogo', get_template_directory_uri() . '/assets/js/doubletaptogo.js');
	wp_enqueue_script('flexslider', get_template_directory_uri() . '/assets/js/jquery.flexslider.js');
}

// Подключение jQuery
add_action('wp_enqueue_scripts', 'my_scripts_method');
function my_scripts_method()
{
	// отменяем зарегистрированный jQuery
	wp_deregister_script('jquery-core');
	wp_deregister_script('jquery');

	// регистрируем
	wp_register_script('jquery-core', 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', false, null, true);
	wp_register_script('jquery', false, array('jquery-core'), null, true);

	// подключаем
	wp_enqueue_script('jquery');
}

add_action('after_setup_theme', 'main_menu');
function main_menu()
{
	register_nav_menu('top', 'Верхнее меню');
}

add_action('after_setup_theme', 'logo_setup');
function logo_setup()
{
	add_theme_support('custom-logo', [
		'height'      => 190,
		'width'       => 190,
		'flex-width'  => false,
		'flex-height' => false,
		'header-text' => '',
		'unlink-homepage-logo' => false, // WP 5.5
	]);
}
