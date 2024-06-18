<?php 
$breadcrumb_title_enable		= get_theme_mod('breadcrumb_title_enable','1');
$breadcrumb_path_enable			= get_theme_mod('breadcrumb_path_enable','1');
$breadcrumb_waves_enable		= get_theme_mod('breadcrumb_waves_enable','1');
$breadcrumb_bg_img				= get_theme_mod('breadcrumb_bg_img',get_template_directory_uri() .'/assets/images/bg/breadcrumbg.jpg'); 
$breadcrumb_back_attach			= get_theme_mod('breadcrumb_back_attach','scroll');
?>
<section id="breadcrumb-section" class="breadcrumb-area breadcrumb-center" style="background: url(<?php echo esc_url($breadcrumb_bg_img); ?>) center center <?php echo esc_attr($breadcrumb_back_attach); ?>;">
	<div class="container">
		<div class="row">
			<div class="col-12">
				<div class="breadcrumb-content">
					<?php if($breadcrumb_path_enable == '1') { ?>
						<ol class="breadcrumb-list wow slideInDown" data-wow-delay="0.1s" data-wow-duration="1000ms">
							<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><i class="fa fa-home"></i></a></li>
							<li><?php kundoo_breadcrumb_title(); ?></li>
						</ol>
					<?php } ?>
					<div class="breadcrumb-heading wow slideInUp" data-wow-delay="0.1s" data-wow-duration="1000ms">
						<?php if($breadcrumb_title_enable == '1') { ?>
							<h2><?php kundoo_breadcrumb_title(); ?></h2>
						<?php } ?>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php if($breadcrumb_waves_enable == '1') { ?>
		<svg class="breadcrumb-waves" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
			<defs>
				<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
			</defs>
			<g class="waves-parallax">
				<use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.2"></use>
				<use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.2)"></use>
				<use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.2)"></use>
				<use href="#gentle-wave" x="48" y="7" fill="rgba(255,255,255,0.2)"></use>
			</g>
		</svg>
	<?php } ?>	
</section>