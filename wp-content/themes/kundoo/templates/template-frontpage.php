<?php 
/**
Template Name: Frontpage
*/

get_header();
add_action( 'kundoo_sections', function() {
	get_template_part( 'template-parts/sections/section', 'blog' );
}, 15 );
do_action( 'kundoo_sections', false );
get_footer(); ?>