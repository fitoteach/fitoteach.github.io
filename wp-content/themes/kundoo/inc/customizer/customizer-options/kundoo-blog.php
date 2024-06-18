<?php
function kundoo_blog_setting( $wp_customize ) {
	$selective_refresh = isset( $wp_customize->selective_refresh ) ? 'postMessage' : 'refresh';
	/*=========================================
	Frontpage Panel
	=========================================*/
	$wp_customize->add_panel(
		'kundoo_frontpage_sections', array(
			'priority' => 32,
			'title' => esc_html__( 'Frontpage Sections', 'kundoo' ),
		)
	);
	/*=========================================
	Blog Section
	=========================================*/
	$wp_customize->add_section(
		'blog_setting', array(
			'title' => esc_html__( 'Blog Section', 'kundoo' ),
			'priority' => 18,
			'panel' => 'kundoo_frontpage_sections',
		)
	);
	// Blog Settings Section // 
	$wp_customize->add_setting(
		'blog_setting_head'
		,array(
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_text',
			'priority'          => 2,
		)
	);

	$wp_customize->add_control(
		'blog_setting_head',
		array(
			'type' => 'hidden',
			'label' => __('Settings','kundoo'),
			'section' => 'blog_setting',
		)
	);
	// hide/show
	$wp_customize->add_setting( 
		'hs_blog' , 
		array(
			'default' => '1',
			'capability'        => 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_checkbox',
			'priority'          => 1,
		) 
	);
	$wp_customize->add_control(
		'hs_blog', 
		array(
			'label'	      => esc_html__( 'Hide/Show', 'kundoo' ),
			'section'     => 'blog_setting',
			'type'        => 'checkbox',
		) 
	);
    // Blog Settings Section // 
	$wp_customize->add_setting(
		'blog_content_head'
		,array(
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_text',
			'priority'          => 2,
		)
	);
	$wp_customize->add_control(
		'blog_content_head',
		array(
			'type' => 'hidden',
			'label' => __('Content','kundoo'),
			'section' => 'blog_setting',
		)
	);

	// Blog Title // 
	$wp_customize->add_setting(
		'blog_title',
		array(
			'default'			=> __('Our Latest Blog','kundoo'),
			'capability'     	=> 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_html',
			'priority' => 1
		)
	);	
	$wp_customize->add_control( 
		'blog_title',
		array(
			'label'    => __('Title','kundoo'),
			'section'  => 'blog_setting',
			'type'     => 'text',
		)  
	);
	// Button Label // 
	$wp_customize->add_setting(
		'blog_btnLabel',
		array(
			'default'			=> __('View all Blog','kundoo'),
			'sanitize_callback' => 'kundoo_sanitize_text',
			'capability'        => 'edit_theme_options',
			'priority'          => 2
		)
	);	
	$wp_customize->add_control( 
		'blog_btnLabel',
		array(
			'label'   		=> __('Button Label','kundoo'),
			'section' 		=> 'blog_setting',
			'type'		    =>	'text',
		)  
	);
	// Button Url // 
	$wp_customize->add_setting(
		'blog_btnUrl',
		array(
			'default'			=> '',
			'sanitize_callback' => 'kundoo_sanitize_url',
			'capability'        => 'edit_theme_options',
			'priority'          => 3
		)
	);	
	$wp_customize->add_control( 
		'blog_btnUrl',
		array(
			'label'   		=> __('Button Link','kundoo'),
			'section' 		=> 'blog_setting',
			'type'		    =>	'text',
		)  
	);
	// Blog Button New Tab // 
	$wp_customize->add_setting( 
		'blog_btnNewTab' , 
		array(
			'capability'        => 'edit_theme_options',
			'sanitize_callback' => 'kundoo_sanitize_checkbox',
			'priority'          => 4
		) 
	);
	$wp_customize->add_control(
		'blog_btnNewTab', 
		array(
			'label'	      => esc_html__( 'Open in New Tab ?', 'kundoo' ),
			'section'     => 'blog_setting',
			'type'        => 'checkbox',
		) 
	);
	// Blog button icon // 
	$wp_customize->add_setting(
		'blog_btn_icon',
		array(
			'default'           => 'fa-list-ul',
			'sanitize_callback' => 'sanitize_text_field',
			'capability'        => 'edit_theme_options',
			'priority'          => 5
		)
	);	
	$wp_customize->add_control(new Kundoo_Icon_Picker_Control($wp_customize, 
		'blog_btn_icon',
		array(
			'label'   		=> __('Blog Button Icon','kundoo'),
			'section' 		=> 'blog_setting',
			'iconset'       => 'fa'
		))  
);	

}

add_action( 'customize_register', 'kundoo_blog_setting' );

// blog selective refresh
function kundoo_blog_section_partials( $wp_customize ){	

	// blog title
	$wp_customize->selective_refresh->add_partial( 'blog_title', array(
		'selector'            => '.post-section .heading-default h2',
		'settings'            => 'blog_title',
		'render_callback'     => 'kundoo_blog_title_render_callback',
	) );

	// blog button
	$wp_customize->selective_refresh->add_partial( 'blog_btnLabel', array(
		'selector'            => '.post-section .text-lg-right',
		'settings'            => 'blog_btnLabel',
		'render_callback'     => 'kundoo_blog_button_render_callback',
	) );
}
// blog title
function kundoo_blog_title_render_callback() {
	return get_theme_mod( 'blog_title' );
}
// blog button
function kundoo_blog_button_render_callback() {
	return get_theme_mod( 'blog_btnLabel' );
}
add_action( 'customize_register', 'kundoo_blog_section_partials' );


