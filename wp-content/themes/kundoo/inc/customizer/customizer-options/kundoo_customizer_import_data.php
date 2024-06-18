<?php
class kundoo_import_dummy_data {

	private static $instance;

	public static function init( ) {
		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof kundoo_import_dummy_data ) ) {
			self::$instance = new kundoo_import_dummy_data;
			self::$instance->kundoo_setup_actions();
		}

	}

	/**
	 * Setup the class props based on the config array.
	 */
	

	/**
	 * Setup the actions used for this class.
	 */
	public function kundoo_setup_actions() {

		// Enqueue scripts
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'kundoo_import_customize_scripts' ), 0 );

	}
	
	public function kundoo_import_customize_scripts() {

	wp_enqueue_script( 'kundoo-import-customizer-js', KUNDOO_PARENT_INC_URI . '/customizer/customizer-notify/js/kundoo-import-customizer-options.js', array( 'customize-controls' ) );
	}
}

$kundoo_import_customizers = array(

		'import_data' => array(
			'recommended' => true,
			
		),
);
kundoo_import_dummy_data::init( apply_filters( 'kundoo_import_customizer', $kundoo_import_customizers ) );