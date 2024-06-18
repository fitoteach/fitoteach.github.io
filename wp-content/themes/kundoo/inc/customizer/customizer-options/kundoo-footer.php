<?php
function kundoo_footer( $wp_customize ) {
	$selective_refresh = isset( $wp_customize->selective_refresh ) ? 'postMessage' : 'refresh';
	// Footer Panel // 
	$wp_customize->add_panel( 
		'footer_section', 
		array(
			'priority'      => 34,
			'capability'    => 'edit_theme_options',
			'title'			=> __('Footer', 'kundoo'),
		) 
	);
	// Footer Top // 
	$wp_customize->add_section(
		'footer_top',
		array(
			'title' 		=> __('Footer Top','kundoo'),
			'panel'  		=> 'footer_section',
			'priority'      => 2,
		)
	);
	
	// Footer Support 
	$wp_customize->add_setting(
		'footer_top_support_head'
		,array(
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_text',
			'priority'          => 1,
		)
	);

	$wp_customize->add_control(
		'footer_top_support_head',
		array(
			'type' => 'hidden',
			'label' => __('Support','kundoo'),
			'section' => 'footer_top',
		)
	);	
	
	$wp_customize->add_setting( 
		'hide_show_footer_top_support' , 
		array(
			'default' => '1',
			'capability'        => 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_checkbox',
			'transport'         => $selective_refresh,
			'priority'           => 2,
		) 
	);
	
	$wp_customize->add_control(
		'hide_show_footer_top_support', 
		array(
			'label'	      => esc_html__( 'Hide/Show', 'kundoo' ),
			'section'     => 'footer_top',
			'type'        => 'checkbox',
		) 
	);	
	
	// icon // 
	$wp_customize->add_setting(
		'footer_top_support_icon',
		array(
			'default' => 'fa-phone',
			'sanitize_callback' => 'sanitize_text_field',
			'capability' => 'edit_theme_options',
			'priority'  => 3,
		)
	);	

	$wp_customize->add_control(new Kundoo_Icon_Picker_Control($wp_customize, 
		'footer_top_support_icon',
		array(
			'label'   		=> __('Icon','kundoo'),
			'section' 		=> 'footer_top',
			'iconset' => 'fa',
			
		))  
);

// Icon url // 
	$wp_customize->add_setting(
		'footer_top_support_icon_link',
		array(
			'default'			=> '',
			'sanitize_callback' => 'kundoo_sanitize_url',
			'transport'         => $selective_refresh,
			'capability'        => 'edit_theme_options',
			'priority'          => 3,
		)
	);	
	$wp_customize->add_control( 
		'footer_top_support_icon_link',
		array(
			'label'   	=> __('Link','kundoo'),
			'section' 	=> 'footer_top',
			'type'		=>	'text',
		)  
	);


    // Support Title // 
	$wp_customize->add_setting(
		'footer_top_support_ttl',
		array(
			'default'			=> __('24X7 Customer Support','kundoo'),
			'sanitize_callback' => 'kundoo_sanitize_html',
			'capability'        => 'edit_theme_options',
			'priority'          => 4,
		)
	);	
	$wp_customize->add_control( 
		'footer_top_support_ttl',
		array(
			'label'   		=> __('Title','kundoo'),
			'section' 		=> 'footer_top',
			'type'		    =>	'text',
			
		)  
	);

	// Support Text // 
	$wp_customize->add_setting(
		'footer_top_support_text',
		array(
			'default'			=> __('<a href="tel:(+123) 456 7890">(+123) 456 7890</a>','kundoo'),
			'sanitize_callback' => 'kundoo_sanitize_html',
			'capability'        => 'edit_theme_options',
			'priority'          => 5
		)
	);	
	$wp_customize->add_control( 
		'footer_top_support_text',
		array(
			'label'   		=> __('Text','kundoo'),
			'section' 		=> 'footer_top',
			'type'		    =>	'textarea'
		)  
	);		
    // Footer Bottom // 
	$wp_customize->add_section(
		'footer_bottom',
		array(
			'title' 		=> __('Footer Bottom','kundoo'),
			'panel'  		=> 'footer_section',
			'priority'      => 4,
		)
	);

	// Footer Copyright Head
	$wp_customize->add_setting(
		'footer_btm_copy_head'
		,array(
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_text',
			'priority'  => 3,
		)
	);

	$wp_customize->add_control(
		'footer_btm_copy_head',
		array(
			'type' => 'hidden',
			'label' => __('Copyright','kundoo'),
			'section' => 'footer_bottom',
		)
	);
	
	// Footer Copyright 
	$kundoo_foo_copy = esc_html__('Copyright &copy; [current_year] [site_title] | Powered by [theme_author]', 'kundoo' );
	$wp_customize->add_setting(
		'footer_copyright',
		array(
			'default'          => $kundoo_foo_copy,
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'wp_kses_post',
			'priority'          => 4,
		)
	);	

	$wp_customize->add_control( 
		'footer_copyright',
		array(
			'label'   		=> __('Copyright','kundoo'),
			'section'		=> 'footer_bottom',
			'type' 			=> 'textarea',
			'transport'     => $selective_refresh,
		)  
	);	
	
}
add_action( 'customize_register', 'kundoo_footer' );
// Footer selective refresh
 function kundoo_footer_partials( $wp_customize ){

	// footer_top_support_ttl
	$wp_customize->selective_refresh->add_partial( 'footer-support', array(
		'selector'            => '.footer-support .widget-contact .contact-info',
		'settings'            => 'footer_top_support_ttl',
		'render_callback'     => 'kundoo_footer_btm_support_ttl_render_callback',
	) );

	// footer_copyright
	$wp_customize->selective_refresh->add_partial( 'footer_copyright', array(
		'selector'            => '#footer-section .footer-copyright .copyright-text',
		'settings'            => 'footer_copyright',
		'render_callback'  => 'kundoo_footer_copyright_render_callback',
	) );

 }

 add_action( 'customize_register', 'kundoo_footer_partials' );

// footer_top_support_ttl
function kundoo_footer_btm_support_ttl_render_callback() {
	return get_theme_mod( 'footer_top_support_ttl' );
}
// footer_copyright
function kundoo_footer_copyright_render_callback() {
	return get_theme_mod( 'footer_copyright' );
}

