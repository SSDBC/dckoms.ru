<!DOCTYPE html>
<!--[if lt IE 8 ]><html class="no-js ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="no-js ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 8)|!(IE)]><!-->
<html class="no-js" lang="en">
<!--<![endif]-->

<head>

	<!--- Basic Page Needs
   ================================================== -->
	<meta charset="utf-8">
	<title>Sparrow - Free Responsive HTML5/CSS3 Template</title>
	<meta name="description" content="">
	<meta name="author" content="">

	<!-- Mobile Specific Metas
   ================================================== -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<!-- Script
   ================================================== -->
	<script src="js/modernizr.js"></script>

	<!-- Favicons
	================================================== -->
	<link rel="shortcut icon" href="favicon.ico">

	<?php wp_head(); ?>

</head>

<body>

	<!-- Header
   ================================================== -->
	<header>

		<div class="row">

			<div class="twelve columns">

				<div class="logo">
					<!-- <a href="index.html"><img alt="" src="images/logo.png"></a> -->
					<?php the_custom_logo(); ?>
				</div>



				<nav id="nav-wrap">
					<?php wp_nav_menu([
						'theme_location'  => 'top',
						'menu'            => '',
						'container'       => false,
						'container_class' => '',
						'container_id'    => '',
						'menu_class'      => 'nav',
						'menu_id'         => 'nav',
						'echo'            => true,
						'fallback_cb'     => 'wp_page_menu',
						'before'          => '',
						'after'           => '',
						'link_before'     => '',
						'link_after'      => '',
						'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
						'depth'           => 0,
						'walker'          => '',
					]); ?>

					<a class="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
					<a class="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>

				</nav> <!-- end #nav-wrap -->

			</div>

		</div>

	</header> <!-- Header End -->