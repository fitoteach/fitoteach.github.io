<?php
/* Notifications in customizer */


require KUNDOO_PARENT_INC_DIR . '/customizer/customizer-notify/kundoo-notify.php';
$kundoo_config_customizer = array(
	'recommended_plugins'       => array(
		'burger-companion' => array(
			'recommended' => true,
			'description' => sprintf(__('Install and activate <strong>Burger Companion</strong> plugin for taking full advantage of all the features this theme has to offer Kundoo.', 'kundoo')),
		),
	),
	'recommended_actions'       => array(),
	'recommended_actions_title' => esc_html__( 'Recommended Actions', 'kundoo' ),
	'recommended_plugins_title' => esc_html__( 'Recommended Plugin', 'kundoo' ),
	'install_button_label'      => esc_html__( 'Install and Activate', 'kundoo' ),
	'activate_button_label'     => esc_html__( 'Activate', 'kundoo' ),
	'kundoo_deactivate_button_label'   => esc_html__( 'Deactivate', 'kundoo' ),
);
Kundoo_Customizer_Notify::init( apply_filters( 'kundoo_customizer_notify_array', $kundoo_config_customizer ) );
