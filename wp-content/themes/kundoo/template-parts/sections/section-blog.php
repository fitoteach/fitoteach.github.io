<?php
$kundoo_hs_blog		 	    = get_theme_mod('hs_blog','1');
$blog_title			        = get_theme_mod('blog_title','Our Latest Blog');
$blog_btnLabel			    = get_theme_mod('blog_btnLabel','View all Blog');
$blog_btnUrl			    = get_theme_mod('blog_btnUrl','');
$blog_btnNewTab			    = get_theme_mod('blog_btnNewTab','');
$blog_btn_icon			    = get_theme_mod('blog_btn_icon','fa-list-ul');
$kundoo_blog_display_num	= get_theme_mod('blog_display_num','3');
if($kundoo_hs_blog == '1'){	
	?>
	<section id="post-section" class="post-section bg-secondary st-py-default ">
		<div class="container">
			<div class="row">
				<div class="col-lg-6 col-12 mb-3 mb-lg-4  text-left">
					<div class="heading-default text-white wow fadeInUp">
						<?php if ( ! empty( $blog_title ) ) : ?>
							<h2><?php echo wp_kses_post($blog_title); ?></h2>
						<?php endif; ?>
					</div>
				</div>
				<div class="col-lg-6 col-12 mb-4 mb-lg-4">
					<div class="text-lg-right">
						<?php if ( ! empty( $blog_btnLabel ) ) : ?>
							<a href="<?php echo esc_url($blog_btnUrl); ?>" <?php if($blog_btnNewTab) { echo "target='_blank'"; } ?> class="btn btn-primary theme-btn"><?php echo wp_kses_post($blog_btnLabel); ?> <i class="fa <?php echo esc_attr( $blog_btn_icon ); ?>"></i>
							</a>
						<?php endif; ?>
					</div>
				</div>
			</div>
			<div class="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-lg-4 g-4 wow fadeInUp">
				<?php 	
				$kundoo_blogs_args = array( 'post_type' => 'post', 'posts_per_page' => $kundoo_blog_display_num,'post__not_in'=>get_option("sticky_posts")) ; 	
				$kundoo_blog_wp_query = new WP_Query($kundoo_blogs_args);
				if($kundoo_blog_wp_query)
				{	
					while($kundoo_blog_wp_query->have_posts()):$kundoo_blog_wp_query->the_post(); ?>
						<div class="col">
							<?php get_template_part('template-parts/content/content','page-grid'); ?>
						</div>
						<?php
					endwhile;
				}
				?>
			</div>
		</div>
	</section>
	<?php } ?>