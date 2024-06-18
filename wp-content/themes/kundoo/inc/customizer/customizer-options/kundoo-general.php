<?php
function kundoo_general_setting( $wp_customize ) {
	$selective_refresh = isset( $wp_customize->selective_refresh ) ? 'postMessage' : 'refresh';
	$wp_customize->add_panel(
		'kundoo_general', array(
			'priority' => 31,
			'title' => esc_html__( 'General', 'kundoo' ),
		)
	);
/*=========================================
	Preloader
	=========================================*/
	$wp_customize->add_section(
		'preloader', array(
			'title' => esc_html__( 'Preloader', 'kundoo' ),
			'priority' => 1,
			'panel'    => 'kundoo_general',
		)
	);
	$wp_customize->add_setting( 
		'hs_preloader' , 
		array(
			'default'           => '',
			'sanitize_callback' => 'kundoo_sanitize_checkbox',
			'capability'        => 'edit_theme_options',
			'priority'          => 1,
		) 
	);
	$wp_customize->add_control(
		'hs_preloader', 
		array(
			'label'	      => esc_html__( 'Hide / Show Preloader', 'kundoo' ),
			'section'     => 'preloader',
			'type'        => 'checkbox'
		) 
	);
	
	/*=========================================
	Breadcrumb  Section
	=========================================*/
	$wp_customize->add_section(
		'breadcrumb_setting', array(
			'title' => esc_html__( 'Breadcrumb Section', 'kundoo' ),
			'priority' => 2,
			'panel' => 'kundoo_general',
		)
	);
	
	// Settings
	$wp_customize->add_setting(
		'breadcrumb_settings'
		,array(
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_text',
		)
	);

	$wp_customize->add_control(
		'breadcrumb_settings',
		array(
			'type' => 'hidden',
			'label' => __('Settings','kundoo'),
			'section' => 'breadcrumb_setting',
			'priority' => 1,
		)
	);
     // Enable on Page Title
	$wp_customize->add_setting(
		'breadcrumb_title_enable'
		,array(
			'default'           => '1',
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_checkbox',
		)
	);
	$wp_customize->add_control(
		'breadcrumb_title_enable',
		array(
			'type'    => 'checkbox',
			'label'   => __('Enable Page Title on Breadcrumb?','kundoo'),
			'section' => 'breadcrumb_setting',
			'priority'          => 3,
		)
	);
    // Enable on Page Path
	$wp_customize->add_setting(
		'breadcrumb_path_enable'
		,array(
			'default'           => '1',
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_checkbox',
		)
	);
	$wp_customize->add_control(
		'breadcrumb_path_enable',
		array(
			'type' => 'checkbox',
			'label' => __('Enable Page Path on Breadcrumb?','kundoo'),
			'section' => 'breadcrumb_setting',
			'priority'          => 4,
		)
	);

   // Enable on Waves
	$wp_customize->add_setting(
		'breadcrumb_waves_enable'
		,array(
			'default'           => '1',
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_checkbox',
			
		)
	);
	$wp_customize->add_control(
		'breadcrumb_waves_enable',
		array(
			'type'    => 'checkbox',
			'label'   => __('Enable Waves on Breadcrumb?','kundoo'),
			'section' => 'breadcrumb_setting',
			'priority'          => 5,
		)
	);

	// Background // 
	$wp_customize->add_setting(
		'breadcrumb_bg_head'
		,array(
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_text',
		)
	);

	$wp_customize->add_control(
		'breadcrumb_bg_head',
		array(
			'type' => 'hidden',
			'label' => __('Background','kundoo'),
			'section' => 'breadcrumb_setting',
			'priority' => 9,
		)
	);
	
	// Background Image // 
	$wp_customize->add_setting( 
		'breadcrumb_bg_img' , 
		array(
			'default' 			=> esc_url(get_template_directory_uri() .'/assets/images/bg/breadcrumbg.jpg'),
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_url',
		) 
	);
	
	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize , 'breadcrumb_bg_img' ,
		array(
			'label'          => esc_html__( 'Background Image', 'kundoo'),
			'section'        => 'breadcrumb_setting',
			'priority' => 10,
		) 
	));
	
	// Background Attachment // 
	$wp_customize->add_setting( 
		'breadcrumb_back_attach' , 
		array(
			'default' => 'scroll',
			'capability'     => 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_select',
		) 
	);
	
	$wp_customize->add_control(
		'breadcrumb_back_attach' , 
		array(
			'label'          => __( 'Background Attachment', 'kundoo' ),
			'section'        => 'breadcrumb_setting',
			'type'           => 'select',
			'priority' => 10,
			'choices'        => 
			array(
				'inherit' => __( 'Inherit', 'kundoo' ),
				'scroll' => __( 'Scroll', 'kundoo' ),
				'fixed'   => __( 'Fixed', 'kundoo' )
			) 
		) 
	);

}

add_action( 'customize_register', 'kundoo_general_setting' );


// breadcrumb selective refresh
function kundoo_breadcrumb_section_partials( $wp_customize ){

	// breadcrumb_title_enable
	$wp_customize->selective_refresh->add_partial(
		'breadcrumb_title_enable', array(
			'selector'            => '#breadcrumb-section .breadcrumb-heading',
			'container_inclusive' => true,
			'render_callback'     => 'breadcrumb_setting',
			'fallback_refresh'   => true,
		)
	);
	// breadcrumb_path_enable
	$wp_customize->selective_refresh->add_partial(
		'breadcrumb_path_enable', array(
			'selector'            => '#breadcrumb-section .breadcrumb-list',
			'container_inclusive' => true,
			'render_callback'     => 'breadcrumb_setting',
			'fallback_refresh'    => true,
		)
	);	
}
add_action( 'customize_register', 'kundoo_breadcrumb_section_partials' );
