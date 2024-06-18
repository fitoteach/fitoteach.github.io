<?php
/**
 * Template part for displaying page content in page.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Kundoo
 */

?>
<article id="post-<?php the_ID(); ?>" <?php post_class('post-items'); ?>>
	
		<figure class="post-image post-image-absolute">
			<div class="featured-image">
				<?php if ( has_post_thumbnail() ) : ?>
				<a href="javascript:void(0);" class="post-hover">
					<?php the_post_thumbnail(); ?>
				</a>
				<?php endif; ?>	
			</div>
		</figure>
	
	<div class="post-content">
		<span class="post-date">
			<a href="<?php echo esc_url(get_month_link(get_post_time('Y'),get_post_time('m'))); ?>">
				<span><?php echo esc_html(get_the_date('j')); echo esc_html(get_the_date('M')); ?></span> <?php echo esc_html(get_the_date(' Y')); ?> </a>
			</span>
			<div class="post-meta post-mt-100">
				<span class="post-list">
					<ul class="post-tag">
						<li>
							<i class="fa fa-tags"></i>
							<?php if( has_tag() ) : ?>
								<?php echo get_the_tag_list('', ',','' );  ?>
							<?php endif; ?>
						</li>
					</ul>
				</span>
			</div>
			<?php 
			if ( is_single() ) :

				the_title('<h5 class="post-title">', '</h5>' );

			else:

				the_title( sprintf( '<h5 class="post-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h5>' );

			endif; 

			the_content( 
				sprintf( 
					__( 'Read More', 'kundoo' ), 
					'<span class="screen-reader-text">  '.esc_html(get_the_title()).'</span>' 
				) 
			);
			?>
			<div class="post-meta post-mt-50">
				<span class="post-list">
					<ul class="post-categories">
						<li>
							<i class="fa fa-th-large" aria-hidden="true"></i>
							<a href="<?php echo esc_url(get_permalink());?>"><?php the_category(', '); ?></a>
						</li>
					</ul>
				</span>
				<span class="author-profile">
					<a href="<?php echo esc_url(get_author_posts_url( get_the_author_meta( 'ID' ) ));?>" class="author meta-info hide-on-mobile">
						<span class="author-image">
							<?php echo get_avatar( get_the_author_meta('ID'), 200); ?>
						</span> <?php esc_html(the_author()); ?>  </a>
					</span>
				</div>
			</div>
		</article>