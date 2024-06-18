<?php
/**
 * The template for displaying archive pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Kundoo
 */

get_header();
?>
<section id="post-section" class="post-section st-py-default bg-gray-light">
	<div class="container">
		<div class="row gy-lg-0 gy-5 wow fadeInUp">
			<div class="<?php esc_attr(kundoo_post_layout()); ?>">
				<div class="row row-cols-1 gy-4 wow fadeInUp">
					<?php if( have_posts() ): ?>
						<?php while( have_posts() ): the_post(); ?>
							<div class="col">
								<article id="post-<?php the_ID(); ?>" class="post-items post-single post-single-border-bottom post-padding-item">
									<?php if ( has_post_thumbnail() ) : ?>
										<figure class="post-image">
											<div class="featured-image">
												<a href="javascript:void(0);" class="post-hover">
													<?php the_post_thumbnail(); ?>
												</a>
											</div>
										</figure>
									<?php endif; ?>	
									<div class="post-content">
										<span class="post-date">
											<a href="<?php echo esc_url(get_month_link(get_post_time('Y'),get_post_time('m'))); ?>"><span><?php echo esc_html(get_the_date('j')); echo esc_html(get_the_date('M')); ?></span> <?php echo esc_html(get_the_date(' Y')); ?></a>
										</span>
										<div class="post-meta">

											<span class="author-profile">
												<a href="javascript:void(0);" class="author meta-info hide-on-mobile">
													<span class="author-image">
														<?php echo get_avatar( get_the_author_meta('ID'), 200); ?>
													</span><?php esc_html(the_author()); ?></a>
												</span>
												<span class="comment-count">
													<i class="fa fa-comment"></i><?php echo get_comments_number(); ?>  <?php esc_html_e( 'Comments', 'kundoo' ); ?> </span>
												</div>
												<?php
												if ( is_single() ) :

													the_title('<h5 class="post-title">', '</h5>' );
												else:
													the_title( sprintf( '<h5 class="post-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h5>' );

												endif; 
												?>
											</div>
										</article>
									</div>
								<?php endwhile; ?>
							<?php endif; ?>
							<div class="col">
								<div class="post-content post-single-border-bottom">
									<?php
									the_content( 
										sprintf( 
											__( 'Read More', 'kundoo' ), 
											'<span class="screen-reader-text">  '.esc_html(get_the_title()).'</span>' 
										) 
									);
									?>
								</div>
							</div>
							<div class="col">
								<article class="post-items post-single post-single-border-bottom">
									<div class="post-meta">
										<span class="post-list">
											<ul class="post-tag">
												<li>
													<i class="fa fa-tags"></i><?php esc_html_e( 'Tags:', 'kundoo' ); ?> <?php if( has_tag() ) : ?>
													<?php echo get_the_tag_list('', ',','' );  ?>
												<?php endif; ?>
											</li>
										</ul>
									</span>
									<span class="post-list">
										<ul class="post-categories">
											<li>
												<i class="fa fa-th-large" aria-hidden="true"></i>
												<a href="<?php echo esc_url(get_permalink());?>"><?php the_category(', '); ?></a>
											</li>
										</ul>
									</span>
								</div>
								<?php get_template_part('template-parts/content/content-author','meta'); ?>
							</article>
						</div>
						<?php comments_template( '', true ); // show comments  ?>
					</div>
				</div>
				<?php  get_sidebar(); ?>
			</div>
		</div>
	</section>
	<?php get_footer(); ?>
