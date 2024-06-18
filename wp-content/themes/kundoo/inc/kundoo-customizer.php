<?php
/**
 * Kundoo Theme Customizer.
 *
 * @package Kundoo
 */

 if ( ! class_exists( 'Kundoo_Customizer' ) ) {

	/**
	 * Customizer Loader
	 *
	 * @since 1.0
	 */
	class Kundoo_Customizer {

		/**
		 * Instance
		 *
		 * @access private
		 * @var object
		 */
		private static $instance;

		/**
		 * Initiator
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self;
			}
			return self::$instance;
		}

		/**
		 * Constructor
		 */
		public function __construct() {
			/**
			 * Customizer
			 */
			add_action( 'customize_preview_init',                  array( $this, 'kundoo_customize_preview_js' ) );
			add_action( 'customize_register',                      array( $this, 'kundoo_customizer_register' ) );
			add_action( 'after_setup_theme',                       array( $this, 'kundoo_customizer_settings' ) );
		}
		
		/**
		 * Add postMessage support for site title and description for the Theme Customizer.
		 *
		 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
		 */
		function kundoo_customizer_register( $wp_customize ) {
			
			$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
			$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
			$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';
			$wp_customize->get_setting( 'background_color' )->transport = 'postMessage';
			$wp_customize->get_setting('custom_logo')->transport = 'refresh';			
			
			/**
			 * Helper files
			 */
			require KUNDOO_PARENT_INC_DIR . '/customizer/controls/font-control.php';
			require KUNDOO_PARENT_INC_DIR . '/customizer/sanitization.php';
		}
		
		/**
		 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
		 */
		function kundoo_customize_preview_js() {
			wp_enqueue_script( 'kundoo-customizer', KUNDOO_PARENT_INC_URI . '/customizer/assets/js/customizer-preview.js', array( 'customize-preview' ), '20151215', true );
		}

		// Include customizer customizer settings.
			
		function kundoo_customizer_settings() {	
			  require KUNDOO_PARENT_INC_DIR . '/customizer/customizer-options/kundoo-header.php';
			  require KUNDOO_PARENT_INC_DIR . '/customizer/customizer-options/kundoo-blog.php';
			  require KUNDOO_PARENT_INC_DIR . '/customizer/customizer-options/kundoo-general.php';
			  require KUNDOO_PARENT_INC_DIR . '/customizer/customizer-options/kundoo-footer.php';
			  require KUNDOO_PARENT_INC_DIR . '/customizer/customizer-options/kundoo_recommended_plugin.php';
			  require KUNDOO_PARENT_INC_DIR . '/customizer/customizer-options/kundoo_customizer_import_data.php';
			  require KUNDOO_PARENT_INC_DIR . '/customizer/customizer-pro/class-customize.php';
		}

	}
}// End if().

/**
 *  Kicking this off by calling 'get_instance()' method
 */
Kundoo_Customizer::get_instance();