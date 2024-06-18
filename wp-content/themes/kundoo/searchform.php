<?php
/**
 * The template for displaying search form.
 *
 * @package     Kundoo
 * @since       1.0
 */
?>
<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label>
		<span class="screen-reader-text"><?php esc_html_e( 'Search for:', 'kundoo' ); ?></span>
		<input type="search" class="form-control header-search-field" placeholder="Search …" value="" name="s">
	</label>
	<button type="submit" class="search-submit" value="<?php esc_attr_e( 'Search', 'kundoo' ); ?>">
		<i class="fa fa-search"></i>
	</button>
</form>