<?php
function kundoo_header_settings( $wp_customize ) {
	$selective_refresh = isset( $wp_customize->selective_refresh ) ? 'postMessage' : 'refresh';
	/*=========================================
	Header Settings Panel
	=========================================*/
	$wp_customize->add_panel( 
		'header_section', 
		array(
			'priority'      => 2,
			'capability'    => 'edit_theme_options',
			'title'			=> __('Header', 'kundoo'),
		) 
	);
	
	/*=========================================
	kundoo Site Identity
	=========================================*/
	$wp_customize->add_section(
		'title_tagline',
		array(
			'priority'      => 1,
			'title' 		=> __('Site Identity','kundoo'),
			'panel'  		=> 'header_section',
		)
	);
	/*=========================================
	Header Navigation
	=========================================*/	
	$wp_customize->add_section(
		'hdr_navigation',
		array(
			'priority'      => 3,
			'title' 		=> __('Header Navigation','kundoo'),
			'panel'  		=> 'header_section',
		)
	);

	// Header Hiring Section
	$wp_customize->add_setting(
		'hdr_nav_search_head'
		,array(
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_text',
			'priority'          => 2
		)
	);

	$wp_customize->add_control(
		'hdr_nav_search_head',
		array(
			'type' => 'hidden',
			'label' => __('Search','kundoo'),
			'section' => 'hdr_navigation'
		)
	);	
	
	// hide/show
	$wp_customize->add_setting( 
		'hs_nav_search' , 
		array(
			'default' => '1',
			'capability'        => 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_checkbox',
			'priority'          => 1
		) 
	);
	$wp_customize->add_control(
		'hs_nav_search', 
		array(
			'label'	      => esc_html__( 'Hide/Show', 'kundoo' ),
			'section'     => 'hdr_navigation',
			'type'        => 'checkbox',
		) 
	);
  // Header Button 
  // ==============	
	$wp_customize->add_setting(
		'hdr_btn_head'
		,array(
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_text',
			'priority'          => 3
		)
	);
	$wp_customize->add_control(
		'hdr_btn_head',
		array(
			'type' => 'hidden',
			'label' => __('Button','kundoo'),
			'section' => 'hdr_navigation'
		)
	);
// hide/show
	$wp_customize->add_setting( 
		'hide_show_hdr_btn' , 
		array(
			'default'           => '1',
			'capability'        => 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_checkbox',
			'priority'          => 1
		) 
	);
	$wp_customize->add_control(
		'hide_show_hdr_btn', 
		array(
			'label'	      => esc_html__( 'Hide/Show', 'kundoo' ),
			'section'     => 'hdr_navigation',
			'type'        => 'checkbox'
		) 
	);
// icon // 
	$wp_customize->add_setting(
		'hdr_btn_icon',
		array(
			'default'           => 'fa-check',
			'sanitize_callback' => 'sanitize_text_field',
			'capability'        => 'edit_theme_options',
			'priority'          => 2
		)
	);	
	$wp_customize->add_control(new Kundoo_Icon_Picker_Control($wp_customize, 
		'hdr_btn_icon',
		array(
			'label'   		=> __('Icon','kundoo'),
			'section' 		=> 'hdr_navigation',
			'iconset'       => 'fa'
		))  
);
// Button Label // 
	$wp_customize->add_setting(
		'hdr_btn_lbl',
		array(
			'default'			=> __('Get Started','kundoo'),
			'sanitize_callback' => 'kundoo_sanitize_text',
			'capability'        => 'edit_theme_options',
			'priority'          => 3
		)
	);	
	$wp_customize->add_control( 
		'hdr_btn_lbl',
		array(
			'label'   		=> __('Label','kundoo'),
			'section' 		=> 'hdr_navigation',
			'type'		    =>	'text'
		)  
	);
// Button URL // 
	$wp_customize->add_setting(
		'hdr_btn_url',
		array(
			'default'			=> '',
			'sanitize_callback' => 'kundoo_sanitize_url',
			'capability'        => 'edit_theme_options',
			'priority'          => 4
		)
	);	
	$wp_customize->add_control( 
		'hdr_btn_url',
		array(
			'label'   		=> __('Link','kundoo'),
			'section' 		=> 'hdr_navigation',
			'type'		    =>	'text',

		)  
	);
	// button open new tab // 
	$wp_customize->add_setting( 
		'hdr_btn_open_new_tab' , 
		array(
			'capability'        => 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_checkbox',
			'priority'          => 5
		) 
	);
	$wp_customize->add_control(
		'hdr_btn_open_new_tab', 
		array(
			'label'	      => esc_html__( 'Open in New Tab ?', 'kundoo' ),
			'section'     => 'hdr_navigation',
			'type'        => 'checkbox',

		) 
	);
	
	/*=========================================
	Sticky Header
	=========================================*/	
	$wp_customize->add_section(
		'sticky_header_set',
		array(
			'priority'      => 4,
			'title' 		=> __('Sticky Header','kundoo'),
			'panel'  		=> 'header_section',
		)
	);
	
	// Heading
	$wp_customize->add_setting(
		'sticky_head'
		,array(
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_text',
			'priority' => 1,
		)
	);

	$wp_customize->add_control(
		'sticky_head',
		array(
			'type' => 'hidden',
			'label' => __('Sticky Header','kundoo'),
			'section' => 'sticky_header_set',
		)
	);
	$wp_customize->add_setting( 
		'hide_show_sticky' , 
		array(
			'default' => '1',
			'capability'        => 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_checkbox',
			'priority' => 2,
		) 
	);
	$wp_customize->add_control(
		'hide_show_sticky', 
		array(
			'label'	      => esc_html__( 'Hide/Show', 'kundoo' ),
			'section'     => 'sticky_header_set',
			'type'        => 'checkbox'
		) 
	);	
}
add_action( 'customize_register', 'kundoo_header_settings' );

// Header selective refresh
function kundoo_header_partials( $wp_customize ){
	// Header Button
	$wp_customize->selective_refresh->add_partial( 'hdr_btn_lbl', array(
		'selector'            => '.navbar-area .button-area .theme-btn',
		'settings'            => 'hdr_btn_lbl',
		'render_callback'  => 'kundoo_hdr_btn_render_callback',
	) );
	
}
add_action( 'customize_register', 'kundoo_header_partials' );

// Header Button
function kundoo_hdr_btn_render_callback() {
	return get_theme_mod( 'hdr_btn_lbl' );
}
