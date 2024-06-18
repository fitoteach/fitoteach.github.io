<!--===// Start: Footer
	=================================-->
</div>
<footer id="footer-section" class="footer-section bg-secondary main-footer st-py-default">
	<div class="footer-support">
		<div class="container">
			<div class="row justify-content-end">
				<div class="col-lg-4 position-relative-md">
					<?php
					$hide_show_footer_top_support	= get_theme_mod('hide_show_footer_top_support','1');
					$footer_top_support_icon		= get_theme_mod('footer_top_support_icon','fa-phone');
					$footer_top_support_icon_link	= get_theme_mod('footer_top_support_icon_link','');
					$footer_top_support_ttl			= get_theme_mod('footer_top_support_ttl','24X7 Customer Support');
					$footer_top_support_text		= get_theme_mod('footer_top_support_text','<a href="tel:(+123) 456 7890">(+123) 456 7890</a>');
					if($hide_show_footer_top_support =='1'){
						?>
						<div class="widget-left support-widget">
							<aside class="widget widget-contact">
								<div class="contact-area">
									<div class="contact-icon">
										<a href="<?php echo esc_url( $footer_top_support_icon_link ); ?>" class="theme-btn">
											<i class="fa <?php echo esc_attr($footer_top_support_icon); ?>"></i>
										</a>
									</div>
									<div class="contact-info">
										<h6 class="title"><?php echo wp_kses_post($footer_top_support_ttl); ?></h6>
										<p class="text"><?php echo wp_kses_post($footer_top_support_text); ?></p>
									</div>
								</div>
							</aside>
						</div>
					<?php } ?>
				</div>
			</div>
		</div>
	</div>
	<?php  if ( is_active_sidebar( 'kundoo-footer-widget-area' ) ) { ?>
		<div class="footer-main">

			<div class="container">
				<div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
					<?php  dynamic_sidebar( 'kundoo-footer-widget-area' ); ?>
				</div>
			</div>
		</div>
	<?php } ?>
	<div class="footer-country">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-lg-8 col-12 col-xl-8">
					<aside class="widget widget-country">
						<ul>
							<?php do_action('kundoo_country_footer'); ?>
						</ul>
					</aside>
				</div>
				<div class="col-lg-4 col-xl-4 col-12">
					<div class="footer-above-widget text-lg-right text-md-left text-center">
						<aside class="widget widget_social_widget">
							<ul>
								<?php do_action('kundoo_social_icons_footer'); ?>
							</ul>
						</aside>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="footer-copyright">
		<div class="container">
			<div class="row align-items-center gy-lg-0 gy-4">
				<div class="col-lg-8 col-md-7 col-12 text-lg-left text-md-left text-center">
					<?php 
					$footer_copyright	= get_theme_mod('footer_copyright','Copyright &copy; [current_year] [site_title] | Powered by [theme_author]');
					if ( ! empty( $footer_copyright ) ){ ?>
						<?php 	
						$kundoo_copyright_allowed_tags = array(
							'[current_year]' => date_i18n('Y'),
							'[site_title]'   => get_bloginfo('name'),
							'[theme_author]' => sprintf(__('<a href="%s">Burger Software</a>', 'kundoo'), esc_url('https://burgerthemes.com/'))
						);
						?>                          
						<div class="copyright-text">
							<?php
							echo apply_filters('kundoo_footer_copyright', wp_kses_post(kundoo_str_replace_assoc($kundoo_copyright_allowed_tags, $footer_copyright)));
							?>
						</div>
					<?php } ?>		

				</div>
				<div class="col-lg-4 col-md-5 col-12 text-lg-right text-md-right text-center">
					<div class="payment-method">
						<ul class="payment_methods">
							<?php do_action('kundoo_paymentMethods_footer'); ?>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>

<!-- Scrolling Up -->
<button type="button" class="scrollingUp scrolling-btn" aria-label="scrollingUp">
	<i class="fa fa-angle-up"></i>
</button>	
</div>		
<?php wp_footer(); ?>
</body>
</html>
