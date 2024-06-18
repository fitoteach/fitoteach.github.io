<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Kundoo
 */

get_header();
?>
<section class="section-404 st-py-default">
	<div class="container">
		<div class="row wow fadeInUp">
			<div class="col-lg-8 col-12 text-center mx-auto">
				<div class="card-404">
					<h2><?php esc_html_e('404','kundoo'); ?></h2>
					<div class="not-found-content">
						<h4><?php esc_html_e('4','kundoo'); ?> <i class="fa fa-minus-circle"></i><?php esc_html_e('4','kundoo'); ?> <span><?php esc_html_e("The Page can's be Found",'kundoo'); ?></span>
						</h4>
					</div>
				</div>
				<div class="card-404-btn">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary theme-btn">
						<i class="fa fa-home mr-1"></i> <?php esc_html_e('Back to Home','kundoo'); ?> </a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<?php get_footer(); ?>